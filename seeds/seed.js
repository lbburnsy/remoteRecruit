const sequelize = require('../config/connection');
const { Employer, Freelancer, FullStack, BackEnd, FrontEnd } = require('../models');

const backEndData = require('./backEndData.json');
const frontEndData = require('./frontEndData.json');
const fullStackData = require('./fullstackData.json');
const freelancerData = require('./freelancerData.json');
const employerData = require('./employerData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

     const freelancers = await Freelancer.bulkCreate(freelancerData, {
         individualHooks: true,
         returning: true,
     });

     const employers = await Employer.bulkCreate(employerData, {
         individualHooks: true,
         returning: true
     });

     for (const fullStack of fullStackData) {
         await FullStack.create({
             ...fullStack,
             employer_id: employers[Math.floor(Math.random() * employers.length)].id,
         });
     }

     for (const backEnd of backEndData) {
         await BackEnd.create({
             ...backEnd,
             employer_id: employers[Math.floor(Math.random() * employers.length)].id,
         });
     }

     for (const frontEnd of frontEndData) {
         await FrontEnd.create({ 
             ...frontEnd,
             employer_id: employers[Math.floor(Math.random() * employers.length)].id,
         })
     }

     process.exit(0);
};

seedDatabase();