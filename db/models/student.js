'use strict';

const Sequelize = require('sequelize');
const db = require('../db');

const Student = db.define('student', {
	firstName: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	},
	lastName: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			isEmail: true,
			notEmpty: true,
			len: [ 1, 255 ]
		}
	}
});

Student.beforeCreate((studentInstance, optionsObject) => {
	studentInstance.firstName =
		studentInstance.firstName.slice(0, 1).toUpperCase() + studentInstance.firstName.slice(1);
	studentInstance.lastName = studentInstance.lastName.slice(0, 1).toUpperCase() + studentInstance.lastName.slice(1);
});

module.exports = Student;
