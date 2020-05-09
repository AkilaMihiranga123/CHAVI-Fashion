const jsonWebToken = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    try{
        //extract authorization token
        const token = req.headers["auth-token"];
        const decoded = jsonWebToken.verify(token, 'UserSecretKey');
        next();
    }catch(error){
        res.status(400).json({
            error: error
        });
    }
}
module.exports = authenticate;