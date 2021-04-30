const router = require('express').Router();
const { User, FullStack, BackEnd, FrontEnd } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
    try {
        const frontEndData = await FrontEnd.findAll();
        const frontEndJobs = frontEndData.map(data => data.get({ plain: true }));
        
        const backEndData = await BackEnd.findAll();
        const backEndJobs = backEndData.map(data => data.get({ plain: true }));

        const fullStackData = await FullStack.findAll();
        const fullStackJobs = fullStackData.map(data => data.get({ plain: true }));

        res.render('homepage', {
            fullStackJobs,
            backEndJobs,
            frontEndJobs,
            logged_in: req.session.logged_in
        })
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/signup', (req, res) => {
    res.render('signup');
})

module.exports = router;