const router = require("express").Router();
const { User, FullStack, BackEnd, FrontEnd } = require("../models");
const withAuth = require("../utils/auth");

// Homepage route that gets all job data, and renders it to the homepage.
router.get("/", async (req, res) => {
  try {
    const frontEndData = await FrontEnd.findAll();
    const frontEndJobs = frontEndData.map((data) => data.get({ plain: true }));

    const backEndData = await BackEnd.findAll();
    const backEndJobs = backEndData.map((data) => data.get({ plain: true }));

    const fullStackData = await FullStack.findAll();
    const fullStackJobs = fullStackData.map((data) =>
      data.get({ plain: true })
    );

    // Boolean value to aid in handlebar dynamics
    const hasJobs =
      frontEndJobs.length > 0 ||
      backEndJobs.length > 0 ||
      fullStackJobs.length > 0
        ? true
        : false;

    res.render("homepage", {
      fullStackJobs,
      backEndJobs,
      frontEndJobs,
      hasJobs,
      logged_in: req.session.logged_in,
      role: req.session.role,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to render the freelancer signup page
router.get("/signup/freelancer", (req, res) => {
  try {
    res.render("signupFreelancer");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to render the employer signup
router.get("/signup/employer", (req, res) => {
  try {
    res.render("signupEmployer");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to fetch routes by category.
router.get("/jobs/:category", withAuth, async (req, res) => {
  try {
    // Category is passed in from parameters
    const category = req.params.category;
    // Empty variable to store job data.
    let jobData;
    // If else to actually retrieve the data from the parameter provided.
    if (category == "FrontEnd") {
      jobData = await FrontEnd.findAll();
    } else if (category == "BackEnd") {
      jobData = await BackEnd.findAll();
    } else {
      jobData = await FullStack.findAll();
    }
    // Returns plain data
    const jobs = jobData.map((data) => data.get({ plain: true }));

    // Sets jobCategory for handlebars to use.
    const jobCategory = category;

    // Renders jobCategory page with all needed data.
    res.render("jobCategory", {
      jobs,
      jobCategory,
      logged_in: req.session.logged_in,
      role: req.session.role,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Same idea as above, but this time use the id passed in to findByPk
router.get("/jobs/:category/:id", withAuth, async (req, res) => {
  try {
    const category = req.params.category;
    const id = req.params.id;
    let jobData;

    console.log(category, id);

    if (category == "FrontEnd") {
      jobData = await FrontEnd.findByPk(id, {
        include: [{ model: User }],
      });
    } else if (category == "BackEnd") {
      jobData = await BackEnd.findByPk(id, {
        include: [{ model: User }],
      });
    } else {
      jobData = await FullStack.findByPk(id, {
        include: [{ model: User }],
      });
    }

    job = jobData.get({ plain: true });

    res.render("jobPosting", {
      ...job,
      logged_in: req.session.logged_in,
      role: req.session.role,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Same idea as above - but this time we're only rendering jobs that belong to a specific employer.
router.get("/employer/jobs/:id", withAuth, async (req, res) => {
  try {
    let id = req.params.id;
    const userData = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
      include: [{ model: FrontEnd }, { model: BackEnd }, { model: FullStack }],
    });

    const user = userData.get({ plain: true });

    let frontEndJobs =
      user.frontends.length > 0 ? { ...user.frontends } : false;

    let backEndJobs = user.backends.length > 0 ? { ...user.backends } : false;

    let fullStackJobs =
      user.fullstacks.length > 0 ? { ...user.fullstacks } : false;

    res.render("employerCategory", {
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

// A simple get route that pages under construction link to.
router.get("/construction", async (req, res) => {
  res.render("underConstruction");
});

// Handles the logout request.
router.get("/logout", async (req, res) => {
  try {
    res.redirect("/");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Handles the login request.
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router;
