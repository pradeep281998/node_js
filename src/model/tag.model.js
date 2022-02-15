module.exports = (sequelize, DataTypes) => {
    const Tag = sequelize.define("tag", {
      name: {
        type: DataTypes.ENUM,
        values: ['gmat', 'verbal', 'cat'],
        validate: { 
          len: [0,15],
          is: /^[a-z0-9\-]/
        }
      },
    },
    { timestamps: false });
  
    return Tag;
  };