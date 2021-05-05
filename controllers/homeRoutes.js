const router = require("express").Router();
const e = require("express");
const { User, FullStack, BackEnd, FrontEnd } = require("../models");
const withAuth = require("../utils/auth");
const { route } = require("./profileRoutes");

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

    const hasJobs = ((frontEndJobs.length > 0) || (backEndJobs.length > 0) || (fullStackJobs.length > 0)) ? true : false;

    console.log(hasJobs);

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

router.get("/signup/freelancer", (req, res) => {
  try {
    res.render("signupFreelancer");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/signup/employer", (req, res) => {
  try {
    res.render("signupEmployer");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/jobs/:category", withAuth, async (req, res) => {
  try {
    
    const category = req.params.category;
    let jobData;
    if (category == 'FrontEnd') {
      jobData = await FrontEnd.findAll();
    } else if (category == 'BackEnd') {
      jobData = await BackEnd.findAll();
    } else {
      jobData = await FullStack.findAll();
    }
    const jobs = jobData.map((data) => data.get({ plain: true }));
const jobCategory=category;
console.log("Helloooooo"+jobCategory);

    res.render("jobCategory", {
      jobs,
      jobCategory,
      logged_in: req.session.logged_in,
      role: req.session.role
    })
  } catch (err) {
    res.status(500).json(err);
  }
})

router.get("/jobs/:category/:id", withAuth, async (req, res) => {
  try {
    const category = req.params.category;
    const id = req.params.id;
    let jobData;

    console.log(category, id);

    if (category == 'FrontEnd') {
      jobData = await FrontEnd.findByPk(id, {
        include: [{ model: User}]
      })
    } else if (category == 'BackEnd') {
      jobData = await BackEnd.findByPk(id, {
        include: [{ model: User}]
      })
    } else {
      jobData = await FullStack.findByPk(id, {
        include: [{ model: User}]
      })
    }

    job = jobData.get({ plain: true });
    console.log(job);

    res.render("jobPosting", {
      ...job,
      logged_in: req.session.logged_in,
      role: req.session.role
    })

  } catch (err) {
    res.status(500).json(err);
  }
})

router.get("/employer/jobs/:id", async (req, res) => {
  try{
    let id = req.params.id;
    const userData = await User.findByPk(id, {
      attributes: {exclude: ["password"]},
      include: [{ model: FrontEnd }, {model: BackEnd}, { model: FullStack }],
    });

    const user = userData.get({ plain: true });

    console.log(user);

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
      role: req.session.role
    });
    
  } catch (err) {
    res.status(500).json(err);
  }
})

router.get("/logout", async (req, res) => {
  try {
    res.redirect("/");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

//My Stuff
//   router.get('/freelancerhome', async (req, res) => {
//     try {
//         const freelancerProfileData=await User.GetProfile()
//         const freelancerProfile=freelancerProfileData.map(data => data.get({ plain: true }));
//         const frontEndData = await FrontEnd.findAll();
//         const frontEndJobs = frontEndData.map(data => data.get({ plain: true }));

//         const backEndData = await BackEnd.findAll();
//         const backEndJobs = backEndData.map(data => data.get({ plain: true }));

//         const fullStackData = await FullStack.findAll();
//         const fullStackJobs = fullStackData.map(data => data.get({ plain: true }));

//         res.render('homepage', {
//             freelancerProfileData,
//             fullStackJobs,
//             backEndJobs,
//             frontEndJobs,
//             logged_in: req.session.logged_in
//         })
//     } catch (err) {
//         res.status(500).json(err);
//     }
// })

// router.get('/employerhome', async (req, res) => {
//     try {

//         const frontEndData = await FrontEnd.findByEmployeeID();
//         const frontEndJobs = frontEndData.map(data => data.get({ plain: true }));

//         const backEndData = await BackEnd.findByEmployeeID();
//         const backEndJobs = backEndData.map(data => data.get({ plain: true }));

//         const fullStackData = await FullStack.findByEmployeeID();
//         const fullStackJobs = fullStackData.map(data => data.get({ plain: true }));

//         res.render('homepage', {
//             fullStackJobs,
//             backEndJobs,
//             frontEndJobs,
//             isEmployer:true,
//             logged_in: req.session.logged_in
//         })
//     } catch (err) {
//         res.status(500).json(err);
//     }
// })

module.exports = router;
