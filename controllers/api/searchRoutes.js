const MiniSearch = require('minisearch');
const router = require("express").Router();
const {
    User,
    FullStack,
    BackEnd,
    FrontEnd,

} = require("../../models");
const withAuth = require("../../utils/auth");

const searchData = [
    {
        "name": "Back End Developer",
        "description": "Full stack developer position with focus Python",
        "qualifications": "3+ years professional experience",
        "location": "USA",
        "website": "wikipedia.com",
        "category": "backend"
    },
    {
        "name": "Back End Developer",
        "description": "Full stack developer position with focus Ruby",
        "qualifications": "5+ years professional experience",
        "location": "New York",
        "website": "wikipedia.com",
        "category": "backend"
    },
    {
        "name": "Back End Developer",
        "description": "Full stack developer position with focus Python",
        "qualifications": "1+ years professional experience",
        "location": "Remote",
        "website": "wikipedia.com",
        "category": "backend"
    },
    {
        "name": "Back End Developer",
        "description": "Full stack developer position with focus Node",
        "qualifications": "2+ years professional experience",
        "location": "North America",
        "website": "wikipedia.com",
        "category": "backend"
    },
    {
        "name": "Front End Developer",
        "description": "Full stack developer position with focus Javascript",
        "qualifications": "3+ years professional experience",
        "location": "USA",
        "website": "wikipedia.com",
        "category": "frontend"
    },
    {
        "name": "Front End Developer",
        "description": "Full stack developer position with focus Javascript",
        "qualifications": "5+ years professional experience",
        "location": "New York",
        "website": "wikipedia.com",
        "category": "frontend"
    },
    {
        "name": "Front End Developer",
        "description": "Full stack developer position with focus Javascript",
        "qualifications": "1+ years professional experience",
        "location": "Remote",
        "website": "wikipedia.com",
        "category": "frontend"
    },
    {
        "name": "Front End Developer",
        "description": "Full stack developer position with focus Javascript",
        "qualifications": "2+ years professional experience",
        "location": "North America",
        "website": "wikipedia.com",
        "category": "frontend"
    },
    {
        "name": "Full Stack Developer",
        "description": "Full stack developer position with focus Node and Javascript",
        "qualifications": "3+ years professional experience",
        "location": "USA",
        "website": "wikipedia.com",
        "category": "fullstack"
    },
    {
        "name": "Full Stack Developer",
        "description": "Full stack developer position with focus Node and Javascript",
        "qualifications": "5+ years professional experience",
        "location": "New York",
        "website": "wikipedia.com",
        "category": "fullstack"
    },
    {
        "name": "Full Stack Developer",
        "description": "Full stack developer position with focus Node and Javascript",
        "qualifications": "1+ years professional experience",
        "location": "Remote",
        "website": "wikipedia.com",
        "category": "fullstack"
    },
    {
        "name": "Full Stack Developer",
        "description": "Full stack developer position with focus Node and Javascript",
        "qualifications": "2+ years professional experience",
        "location": "North America",
        "website": "wikipedia.com",
        "category": "fullstack"
    }
]

router.get("/:searchTerm", async (req, res) => {
    const searchTerm = req.params.searchTerm;
    const documents = await FrontEnd.findAll();
    
    res.status(200).send();
    
    let miniSearch = new MiniSearch({
        storeFields: ['name', 'description', 'qualifications', 'location', 'website', 'category'], 
        fields: ['name', 'description', 'qualifications', 'location', 'website', 'category']
    });

    miniSearch.addAll(searchData);;
    let results = miniSearch.search(searchTerm);
   
    res.render('searchResults', results);

   
});

module.exports = router;




