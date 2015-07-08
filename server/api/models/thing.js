module.exports = function(sequelize, DataTypes){
  var Thing = sequelize.define('Thing', {
    name: DataTypes.STRING,
    info: DataTypes.STRING,
    done: DataTypes.BOOLEAN
  });

  return Thing;
}
