const router = require("express").Router();
const { User, FrontEnd, BackEnd, FullStack } = require("../../models");

// Post route to create the user.
router.post("/", async (req, res) => {
  try {
    // Retrieves body from the front end, and creates a user with it.
    const userData = await User.create(req.body);

    // Sets session variables.
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

// Post route to handle the login
router.post("/login", async (req, res) => {
  try {
    // Tries to find a user by email.
    const userData = await User.findOne({ where: { email: req.body.email } });

    // If no data, throw err
    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    // Checks password from the userData
    const validPassword = await userData.checkPassword(req.body.password);

    // If password is wrong, throw err.
    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    // If everything is good, save session parameters.
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

// Route to handle logout.
router.post("/logout", (req, res) => {
  // If logged in, destroy the session, and end connection.
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
      console.log("session destroyed");
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
