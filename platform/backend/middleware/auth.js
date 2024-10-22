//Require the jsonwebtoken and config modules
const jwt = require('jsonwebtoken')
const config = require('config')

//Export a function that takes in three parameters: req, res, and next
module.exports = function (req, res, next)
{
    //Get token from header
    const token = req.header('x-auth-token')

    //check if not token
    if (!token)
    {
        //Return a 401 status code and a json object with a message
        return res.status(401).json({ msg: "No token, authorization denied" });

    }

    try
    {
        //Verify the token using the secret key from the config file
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        //Set the user property of the request object to the decoded user
        req.user = decoded.user;
        //Call the next middleware function
        next();
    } catch (err)
    {
        //Return a 401 status code and a json object with a message
        res.status(401).json({ msg: "Token is not valid" });
    }
}



