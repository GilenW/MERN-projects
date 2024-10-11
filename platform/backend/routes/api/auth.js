const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../../models/user')
//route GET api/auth
//@desc Test route
//@access public
//@desc Authenticate user and get token
//@access public
router.post(
	'/',
	[
		check('email', 'Please enter your email').not().isEmpty(),
		check(
			'password',
			'password is reuiqred'
		).exists({ min: 3 }),
	],
	async (req, res) => {
		const error = validationResult(req);
		if (!error.isEmpty()) {
			return res.status(400).json({ error: error.array() });
		}

		const { email, password } = req.body;

		try {
			let user = await User.findOne({
				email,
			});
			if (!user) {
				return res.status(400).json({
					errors: [
						{
							msg: 'Invalid Credentials',
						},
					],
				});
			}


            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch)
            {
                return res
                    .status(400)
                .json({errors:[{msg:'Invalid Credentials'}]});
            }

			const payload = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{ expiresIn: 360000 },
				(err, token) => {
					if (err) throw err;
					res.json({ msg: 'No error', token });
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error');
		}

		//See if user exists

		//Get users gravatar

		//Encrypt password

		//Return jsonwebtoken
	}
);


module.exports = router;


