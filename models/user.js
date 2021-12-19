const bcrypt = require("bcrypt-nodejs");

module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define("User", {
        // Email tdak boleh kosong dan harus benar
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        // Pass tdk bole ksong
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "patient",
        }
    });

    User.associate = (models) => {
        User.belongsTo(models.patient, {
            foreignKey: {
                field: "Patient_id",
                allowNull: false
            }
        })
    }
User.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    };
    
    User.hook("beforeCreate", function(user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });
    return User;
};