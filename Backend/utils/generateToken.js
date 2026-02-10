const jwt = require('jsonwebtoken');


//it is better to use minimun requird data to encript and it can cause security issues
const generateToken = (id) => {
        return jwt.sign({ id }, process.env.TOKEN_ACCESS, { expiresIn: "30d" });
}

module.exports = generateToken;