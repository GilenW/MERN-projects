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
router.get("/me", auth, async (req, res) =>
{
    try {
        const profile = await Profile.findOne({
            user:req.user.id
        }).populate('user', ['name', 'avatar'])

        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }
    } catch (error)
    {

        console.error(error.message);
        res.status(500).send('server error from profile')

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





module.exports = router;


