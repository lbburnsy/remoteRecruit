const router = require('express').Router();
// Need models object to be de-structured here.
// withAuth middleware here?

router.get('/', (req, res) => {
    try {
        res.render('homepage')
    } catch (err) {
        res.status(500).json(err);
    }
})