module.exports = (sequelize, DataTypes) => {
    const Course = sequelize.define("course", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { 
          len: [3,6],
          is: /[A-Z0-9]$/
        }
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { 
          len: [0,100],
          is: /[A-Za-z0-9 ]$/
        }
      },
      description: {
        type: DataTypes.STRING
      },
    },
    { timestamps: false });
  
    return Course;
  };