const router = require("express").Router();
const { User, FrontEnd, BackEnd, FullStack } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.role = userData.role;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.role = userData.role;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
      console.log("session destroyed");
    });
  } else {
    res.status(404).end();
  }
});

router.post("/frontend", withAuth, async (req, res) => {
  try {
    const frontEndData = await FrontEnd.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(frontEndData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/backend", withAuth, async (req, res) => {
  try {
    const backEndData = await BackEnd.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(backEndData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/fullstack", withAuth, async (req, res) => {
  try {
    const fullStackData = await FullStack.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(fullStackData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/frontend/:id", withAuth, async (req, res) => {
  try {
    const jobData = await FrontEnd.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    res.status(200).json(jobData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/backend/:id", withAuth, async (req, res) => {
  try {
    const jobData = await BackEnd.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    res.status(200).json(jobData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/fullstack/:id", withAuth, async (req, res) => {
  try {
    const jobData = await FullStack.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    res.status(200).json(jobData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
