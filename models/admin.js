const bcrypt = require("bcrypt-nodejs");

module.exports = function(sequelize, DataTypes) {
    const Admin = sequelize.define("Admin", {
        // Email tidak boleh kosong, dan harus email yang benar sebelum dibuat
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        // Kata sandi tidak boleh kosong
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "admin",
        }
    });
    Admin.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    };
    Admin.hook("beforeCreate", function(admin) {
        admin.password = bcrypt.hashSync(admin.password, bcrypt.genSaltSync(10), null);
    });
    return Admin;
};