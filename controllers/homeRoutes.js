const router = require("express").Router();
const { User, FullStack, BackEnd, FrontEnd } = require("../models");
const withAuth = require("../utils/auth");

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
