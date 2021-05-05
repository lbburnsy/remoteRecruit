// Declare required components
const router = require("express").Router();
const MiniSearch = require("minisearch");
const { User, FullStack, BackEnd, FrontEnd } = require("../models");
const withAuth = require("../utils/auth");

// Get route that paramaterizes the search term.
router.get("/:searchTerm", withAuth, async (req, res) => {
  // Search Term passed in from link.
  const searchTerm = req.params.searchTerm;
  // Gets all front end data, then returns the plain version.
  const frontEndData = await FrontEnd.findAll();
  const frontEndItems = frontEndData.map((data) => data.get({ plain: true }));
  // Gets all back end data, then returns the plain version.
  const backEndData = await BackEnd.findAll();
  const backEndItems = backEndData.map((data) => data.get({ plain: true }));
  // Gets all full stack data, then returns the plain version.
  const fullStackData = await FullStack.findAll();
  const fullStackItems = fullStackData.map((data) => data.get({ plain: true }));

  // Spreads in all jobs into one central array.
  let allJobs = [...frontEndItems, ...backEndItems, ...fullStackItems];

  // Declare minisearch
  let miniSearch = new MiniSearch({
    storeFields: [
      "name",
      "description",
      "date_created",
      "location",
      "category",
    ],
    fields: ["id", "name", "date_created", "location", "category"],
  });

  // Adds the all jobs array.
  miniSearch.addAll(allJobs);

  let results = miniSearch.search(searchTerm);

  // Renders the searchResults page with the results
  res.render("searchResults", {
    results,
    role: req.session.role,
  });
});

module.exports = router;
