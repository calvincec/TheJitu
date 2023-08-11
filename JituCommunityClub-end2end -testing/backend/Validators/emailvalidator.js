const joi = require('joi')

const registerUserval = joi.object({

    email: joi.string().pattern(new RegExp('^[a-zA-Z0-9._-]+@thejitu\.(com)$'))
})

module.exports = {
    registerUserval
}

// "email": "fname.lname@thejitu.com",