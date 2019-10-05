const createFundingValidator = (req, res, next) => {
    //title
    req.check('title', 'Write a title').notEmpty()
    req.check('title', 'Title must be between 4 to 150 characters').isLength({
        min : 4, 
        max: 150
    });
    //body
    req.check('description', 'Write a description').notEmpty()
    req.check('description', 'Description must be between 4 to 2000 characters').isLength({
        min : 4, 
        max: 2000
    })
    //check for errors
    const errors = req.validationErrors();
    // if error show the first one as they appear
    if(errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({error : firstError});
    }
    //proceed to next middleware
    return next();
};

const userSignupValidation = (req, res, next) => {
    //name is not null and between 4 to 10 characters
    req.check('name', "Name is required").notEmpty();
    //email is not null, valid and normalized
    req.check('email', 'Email must be betqeen 3 to 32 characters')
    .matches(/.+\@.+\..+/)
    .withMessage('Email must conatain @')
    .isLength({
        min : 4,
        max : 32000
    })
    //check for password
    req.check('password', "Password required").notEmpty();
    req.check('password')
    .isLength({min : 6})
    .withMessage("Password must contain at least 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain a number")

    //check for errors
    const errors = req.validationErrors();
    // if error show the first one as they appear
    if(errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({error : firstError});
    }
    //proceed to next middleware
    return next();
}

export { createFundingValidator, userSignupValidation };