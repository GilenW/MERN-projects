const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require("gravatar")
const User = require('../../models/user');
const bcrypt = require('bcryptjs')
//route POST api/users
//@desc Register user
//@access public
router.post(
	'/',
	[
		check('name', 'Name is required').not().isEmpty(),
		check('email', 'Please enter your email').not().isEmpty(),
		check(
			'password',
			'p[lease enter a password with 6 or more characters'
		).isLength({ min: 3 }),
	],
	async (req, res) => {
		const error = validationResult(req);
		if (!error.isEmpty()) {
			return res.status(400).json({ error: error.array() });
		}

		const { name, email, password } = req.body;

		try
		{
			let user = await User.findOne({
				email
			})
			if (user)
			{
				res.status(400).json({
					errors: [{
					msg:"User already exists"
				}]});
			}

			const avatar = gravatar.url(email, {
				s: '200',
				r: 'pg',
				d:'mm'
			})

			user = new User({
				name,
				email,
				avatar,
				password
			})

			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);
			await user.save();

			res.send('User registered');
		} catch (err)
		{
			console.error(err.message);
			res.status(500).send("Server error");
		}


		//See if user exists

		//Get users gravatar

		//Encrypt password

		//Return jsonwebtoken
	}
);

module.exports = router;
