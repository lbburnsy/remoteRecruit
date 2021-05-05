const User = require("./User");
const FullStack = require("./FullStack");
const BackEnd = require("./BackEnd");
const FrontEnd = require("./FrontEnd");

User.hasMany(FullStack, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

User.hasMany(BackEnd, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

User.hasMany(FrontEnd, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

FullStack.belongsTo(User, {
  foreignKey: "user_id",
});

FrontEnd.belongsTo(User, {
  foreignKey: "user_id",
});

BackEnd.belongsTo(User, {
  foreignKey: "user_id",
});
module.exports = { User, FullStack, BackEnd, FrontEnd };
