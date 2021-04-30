const sequelize = require('../config/connection');
const { User, FullStack, BackEnd, FrontEnd } = require('../models');

const backEndData = require('./backEndData.json');
const frontEndData = require('./frontEndData.json');
const fullStackData = require('./fullstackData.json');
const userData = require('./userData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

     const users = await User.bulkCreate(userData, {
         individualHooks: true,
         returning: true
     });

     for (const fullStack of fullStackData) {
         await FullStack.create({
             ...fullStack,
             user_id: users[Math.floor(Math.random() * users.length)].id,
         });
     }

     for (const backEnd of backEndData) {
         await BackEnd.create({
             ...backEnd,
             user_id: users[Math.floor(Math.random() * users.length)].id,
         });
     }

     for (const frontEnd of frontEndData) {
         await FrontEnd.create({ 
             ...frontEnd,
             user_id: users[Math.floor(Math.random() * users.length)].id,
         })
     }

     process.exit(0);
};

seedDatabase();