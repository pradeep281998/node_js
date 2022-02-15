module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define("question", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    difficulty:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 10
      }

    }

  },
  { timestamps: false });

  return Question;
};