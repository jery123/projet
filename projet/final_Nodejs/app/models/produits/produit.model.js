module.exports = (sequelize, DataTypes) => {
    const Produit = sequelize.define("produit", {
      prodId: {
          type: DataTypes.INTEGER,
          defaultValue: 1,
        //   allowNull: false,
          references: {
              model: 'farmers',
              key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
      },
        image: {
            type: DataTypes.STRING,
            // defaultValue: 1,
            // // allowNull: false,
            // references: {
            //     model: 'images',
            //     key: 'id'
            // },
            // onUpdate: 'cascade',
            // onDelete: 'cascade'
        },
        Data: {
            type: DataTypes.BLOB("long"),
          },
        nom: {
            type: DataTypes.STRING,
            defaultValue: false,
            allowNull: false
          },
      description: {
          type: DataTypes.STRING,
          allowNull: true
      },
      published: {
        type: DataTypes.BOOLEAN
        },
        quantité: {
            type: DataTypes.INTEGER
        },
        prixUnitaire: {
            type: DataTypes.INTEGER
            },
            uniteDeMesure: {
                type: DataTypes.ENUM('Kg','Litre','Cageot', 'Sacs')
                },
                   
    },
    
    {
        engine: 'MYISAM',
        charset: 'latin1'
    });
  
    return Produit;
  };