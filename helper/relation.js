const sequelize = require("../models/index").sequelize;
const { DataTypes } = require("sequelize");
const User = require("../models/user")(sequelize, DataTypes);
const Notes = require("../models/notes")(sequelize, DataTypes);

User.hasMany(Notes, { foreignKey: "userId" });
Notes.belongsTo(User, { foreignKey: "userId" });

module.exports = {
  User,
  Notes,
};
