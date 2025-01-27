const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth')
const Profile = require('../../models/profile')
const User = require('../../models/user')
const { check, validationResult } = require('express-validator');
const profile = require("../../models/profile")


//route GET api/profile/me
//@desc get current user profile
//@access private
router.get('/me', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id }).populate(
			'user',
			['name', 'avatar']
		);

		if (!profile) {
			return res
				.status(400)
				.json({ msg: 'There is no profile for this user' });
		}

		res.json(profile); // Send profile in the response
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ msg: 'Server error from profile' }); // Send JSON response for server errors
	}
});


//route GET api/profile
//@desc create or update user profile
//@access private

router.post('/', [auth, [
    check('status', 'Status is required').not().isEmpty(),
    check('skills',"Skills is required").not().isEmpty()
]],async (req, res) =>
{
    const errors = validationResult(req)
    if (!errors.isEmpty())
    {
        return res.status(400).json({
            errors:errors.array()
        })

    }

    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        linkedin
    } = req.body;


    //build profile object
    const profileFields = {}
    profileFields.user = req.user.id

    if (company) {
        profileFields.company = company;
    }
    if (website) profileFields.website = website
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;

    if (githubusername) profileFields.githubusername = githubusername;

    if (skills)
    {
         profileFields.skills = skills
				.split(',')
				.map((skill) => skill.trim());
    }

    //Build social object
    profileFields.social = {}
    if (linkedin) profileFields.social.linkedin = linkedin;

    try {
        let profile = await Profile.findOne({ user: req.user.id });
        if (profile) {
            profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true });
            return res.json(profile);
        }

        //create
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile);
    } catch (error)
    {

        console.error(error.message);
        res.status(500).send('Server error for updating profile');

    }


})




router.get('/', async (req, res) =>
{
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }

})


//route GET api/profile/user/:user_id
//@desc get profile by user id
//@access private
router.get('/user/:user_id', async (req, res) => {
	try {
		const profile = await Profile.findOne({user:req.params.user_id}).populate('user', [
			'name',
			'avatar',
        ]);

        if (!profile) {
            return res
				.status(400)
				.json({ msg: 'There is no profile for this user' });

        }
		res.json(profile);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});


//route DELETE api/profile/user/:user_id
//@desc delete profile, user, posts
//@access private
router.delete('/',auth, async (req, res) => {
    try
    {

        //@TODO  - remove users posts
        //remove profile
        await Profile.findOneAndDelete({ user: req.params.user_id });

        await User.findOneAndDelete({ _id: req.user.id });


		res.json({msg:'User deleted'});
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});

//route PUT api/profile/experience
//@desc Add profile experience
//@access private

router.put(
	'/experience',
	[
		auth,
		[
			check('title', 'title is required').not().isEmpty(),
			check('company', 'company is required').not().isEmpty(),
			check('from', 'from date is required').not().isEmpty(),
		],
	],
    async (req, res) =>
    {
        const errors = validationResult(req);

        if (!errors.isEmpty())
        {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        } = req.body

        const newExp = {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        }

        try {
            const profile = await Profile.findOne({
                user:req.user.id
            })
            profile.experiences.unshift(newExp);

            await profile.save();

            res.json(profile);
        } catch (error)
        {
            console.error(error.message);
            res.status(500).send('Server error from adding exp');

        }
    }
);

//route DELETE api/profile/experience/:exp_id
//@desc Delete profile experience
//@access private

router.delete('/experience/:exp_id', auth, async (req, res) =>
{
    try {
        const profile = await Profile.findOne({
            user: req.user.id,
        });

        const removeIndex = profile.experiences.map(item => item.id).indexOf(req.params.exp_id);

        profile.experiences.splice(removeIndex, 1);
        await profile.save()
		res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error deleting profile')
    }
})


//route Update api/profile/education
//@desc Delete profile education
//@access private
//Did not implement education, because i dont have this field in the profile model; skip 21 and 22

module.exports = router;


