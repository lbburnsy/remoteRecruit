const MiniSearch = require('minisearch');
const router = require("express").Router();
const {
    User,
    FullStack,
    BackEnd,
    FrontEnd,
    Employer
} = require("../../models");
const withAuth = require("../../utils/auth");



router.get("/", async (req, res) => {
    const searchTerm = req.body.searchTerm;
    const documents = await Employer.findAll();

    let miniSearch = new MiniSearch({
        storeFields: ['title', 'category']
    });

    miniSearch.addAll(documents);
    let results = miniSearch.search(searchTerm);
    // gets the request and comment it back
    res.json(results)
});

module.exports = router;