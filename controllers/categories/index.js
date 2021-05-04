const router = require('express').Router();
const backEndRoutes = require('./backEndRoutes');
const frontEndRoutes = require('./frontEndRoutes');
const fullStackRoutes = require('./fullStackRoutes');
const MiniSearch = require('minisearch')

router.use('/backend', backEndRoutes);
router.use('/frontend', frontEndRoutes);
router.use('fullstack', fullStackRoutes);
//search function (new tech)
router.use('/minisearch', async

(req,res)=>{ 
  const searchTerm = req.body.searchTerm 
    const documents = await 
   
    let miniSearch = new MiniSearch({
      storeFields: ['title', 'category'] 
    })
     
    miniSearch.addAll(documents)
    let results = miniSearch.search()
    // gets the request and comment it back
    res.json(results)
})
module.exports = router;