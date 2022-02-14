module.exports = (sequelize, DataTypes) => {
    const Topic = sequelize.define("topic", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { 
          len: [0,100],
          is: /[A-Za-z0-9 ]*$/
        }
      },
      description: {
        type: DataTypes.STRING
      }
    },
    { timestamps: false });
  
    return Topic;
  };