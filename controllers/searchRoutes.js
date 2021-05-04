const router = require("express").Router();
const e = require("express");

const MiniSearch = require('minisearch');
const {
    User,
    FullStack,
    BackEnd,
    FrontEnd,

} = require("../models");
const withAuth = require("../utils/auth");



router.get("/:searchTerm", async (req, res) => {
    const searchTerm = req.params.searchTerm;
    const documents = await FrontEnd.findAll();
    const frontEndItems = documents.map((data) => data.get({ plain: true }));
    const documentsBE = await BackEnd.findAll();
    const backEndItems = documentsBE.map((data) => data.get({ plain: true }));
    const documentsFS = await FullStack.findAll();
    const fullStackItems = documentsFS.map((data) => data.get({ plain: true }));
    
    //res.status(200).send();
    let allJobs = 
    [
        ...frontEndItems, ...backEndItems, ...fullStackItems
        
    ]

    console.log(allJobs);
    
    let miniSearch = new MiniSearch({
        storeFields: ['name', 'description','date_created','location'], 
        fields: ['id','name','date_created','location'],
    });
console.log('Hello');
    miniSearch.addAll(allJobs);
    // console.log(frontEndItems);
   // miniSearch.addAll(documentsBE);
    let results = miniSearch.search(searchTerm);
    // gets the request and comment it back
    //res.json(documents);
    // console.log(results);
    
    res.render("searchResults", {
        results
      });
    // replace ^ res.render("searchResults(handelbar template", object with results)
    //res.render('searchResults{{handelbars}}, object);

    // object = []
});

module.exports = router;

//make handelbar first
