//const { Json } = require("sequelize/types/lib/utils");

module.exports = {
    format_date: (date) => {
        // Format date as MM/DD/YYYY
        return date.toLocaleDateString();
      },

      format_categories: (categories) => {
        const Categoriesobj = JSON.parse(categories);
        // Format date as MM/DD/YYYY
       return Categoriesobj.map((element, index) => (index === Categoriesobj.length - 1) ? ` ${element}` : ` ${element}`);
      // return Categoriesobj.map((element, index) => `<li> ${element} </li>` );
      

      },

      capitalize_first: (category) => {
        if (category == 'fullstack') {
          return 'FullStack'
        } else if (category == 'frontend') {
          return 'FrontEnd'
        } else {
          return 'BackEnd'
        }
      }
}