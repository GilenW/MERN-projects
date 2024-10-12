const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/profile');
const User = require('../../models/user');
const { check, validationResult } = require('express-validator');
const Post = require('../../models/post');

//route POST api/posts
//@desc     create a post
//@access private
router.post(
	'/',
	[auth, [check('text', 'Text is required').not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const user = await User.findById(req.user.id).select('-password');
			const newPost = {
				text: req.body.text,
				name: user.name,
				avatar: user.avartar,
				user: req.user.id,
            };

            post = new Post(newPost);
            await post.save();
            res.json(post);
		} catch (error) {
			console.error(error.message);
			res.status(500).send('Server error from create post');
		}
	}
);



module.exports = router;


