const MiniSearch = require('minisearch');
const router = require("express").Router();
const {
    User,
    FullStack,
    BackEnd,
    FrontEnd,

} = require("../../models");
const withAuth = require("../../utils/auth");



router.get("/:searchTerm", async (req, res) => {
    const searchTerm = req.params.searchTerm;
    const documents = await FrontEnd.findAll();
    
    res.status(200).send();

    let miniSearch = new MiniSearch({
        storeFields: ['title', 'category'], 
        fields: ['title', 'text'],
    });

    miniSearch.addAll(documents);
    let results = miniSearch.search(searchTerm);
    // gets the request and comment it back
    res.json(results)
    // replace ^ res.render("searchResults(handelbar template", object with results)
    //res.render('searchResults{{handelbars}}, object);

    // object = []
});

module.exports = router;

//make handelbar first


