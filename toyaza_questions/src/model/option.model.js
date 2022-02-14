module.exports = (sequelize, DataTypes) => {
  const Option = sequelize.define("option", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING
    },
    valid: {
      type: DataTypes.BOOLEAN
    },
    explanation: {
        type: DataTypes.STRING
      },
      /* questionId: {
        type:DataTypes.UUID,
          allowNull: false,
            references: {
          model: 'question',
            key: 'id'
        } 
      }*/
  },
  { timestamps: false });

  return Option;
};