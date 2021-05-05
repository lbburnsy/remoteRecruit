const router = require("express").Router();
const { User, FullStack, BackEnd, FrontEnd } = require("../models");
const withAuth = require("../utils/auth");

// Get route that fetches a profile by id, then renders the correct profile.
router.get("/freelancer", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
    });

    const user = userData.get({ plain: true });

    res.render("freelancerProfile", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get route that fetches a profile by id, then renders the correct profile.
router.get("/employer", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
    });

    const user = userData.get({ plain: true });

    res.render("employerProfile", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get route that takes you to the job dashboard on the employer profile.
router.get("/employer/jobs", withAuth, async (req, res) => {
  try {
    // Gets the user by primary key, including all of the job models.
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: FrontEnd }, { model: BackEnd }, { model: FullStack }],
    });

    // Returns plain data
    const user = userData.get({ plain: true });

    // Three ternary's that return a boolean for handlebars to use dynamically.
    let frontEndJobs =
      user.frontends.length > 0 ? { ...user.frontends } : false;

    let backEndJobs = user.backends.length > 0 ? { ...user.backends } : false;

    let fullStackJobs =
      user.fullstacks.length > 0 ? { ...user.fullstacks } : false;

    // renders employerJobs page with all needed data.
    res.render("employerJobs", {
      ...user,
      frontEndJobs,
      backEndJobs,
      fullStackJobs,
      logged_in: true,
      role: req.session.role,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Simple route to get the create job page.
router.get("/employer/create", withAuth, async (req, res) => {
  try {
    res.render("createJob", {
      logged_in: req.session.logged_in,
      role: req.session.role,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
