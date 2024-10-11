const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth')
const Profile = require('../../models/profile')
const User = require('../../models/user')

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



module.exports = router;


