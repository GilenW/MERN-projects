const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
	},
	company: {
		type: String,
	},
	website: {
		type: String,
	},
	location: {
		type: String,
	},
	status: {
		type: String,
		required: true,
	},
	skills: {
		type: [String],
		required: true,
	},
	bio: {
		type: String,
	},
	githubusername: {
		type: String,
	},
	experiences: [
		{
			title: {
				type: String,
			},
			company: {
				type: String,
			},
			location: {
				type: String,
			},
			from: {
				type: String,
			},
			to: {
				type: String,
			},
			current: {
				type: Boolean,
				default: false,
			},
			description: {
				type: String,
			},
		},
	],
	social: {
		linkedin: {
			type: String,
		}
	},
	date: {
		type: Date,
		default:Date.now
	}
});

module.exports = Profile = mongoose.model('profile', ProfileSchema)
