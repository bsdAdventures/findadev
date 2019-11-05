const Validator = require('validator');
const { isEmpty } = require('../functions');


module.exports = function validate_login (data) {
	let errors = {};


	//check data to see if they are empty
	//if it is empty...if statements below get called


	data.email = !isEmpty(data.email) ? data.email : '';
	data.password = !isEmpty(data.password) ? data.password : '';




	if (Validator.isEmpty(data.email)) {
		errors.email = 'Email field is required';
	}

	if (!Validator.isEmail(data.email)) {
		errors.email = 'Email is invalid';
	}

	if (Validator.isEmpty(data.password)) {
		errors.password = 'Password field is required';
	}



	return {
		errors,
		isValid: isEmpty(errors)
	};
};
