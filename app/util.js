
module.exports = {

    verifyToken: function(req, res, next) {
        // Verify Token
        // Get auth header value 
        const bearerHeader = req.headers['authorization']; 
        // Check if bearer is undefined 
        if(typeof bearerHeader !== 'undefined') 
        {
            const bearer = bearerHeader.split(' '); // Split at the space 
            const bearerToken = bearer[1];          // Get token from array 
            req.token = bearerToken;                // Set the token 
            // Next middleware 
            jwt.verify(req.token, 'secretkey', (err, authData) => {
                if(err) {
                    res.sendStatus(403); // Forbidden 
                } 
                else {
                    req.app.locals.user_id =  authData.user._id; 
                    console.log("JWT verified..."); 
                    next(); 
                }
            }); 
        }
        else 
        {
            res.sendStatus(403);     // Forbidden 
        }
        next(); 
    }
}
