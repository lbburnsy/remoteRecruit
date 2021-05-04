const documents = [ ]
   
  let miniSearch = new MiniSearch({
    fields: ['title', 'text'], 
    storeFields: ['title', 'category'] 
  })
   
  miniSearch.addAll(documents)
  let results = miniSearch.search()