const express = require("express");
const router = express.Router();


//route GET api/post
//@desc 
//@access public
router.post("/",(req,res)=>res.send("Post route"));

module.exports = router;


