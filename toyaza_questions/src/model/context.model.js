module.exports = (sequelize, DataTypes) => {
    const Context = sequelize.define("context", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { len: [0,100] }
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING
      },
    },
    { timestamps: false });
  
    return Context;
  };