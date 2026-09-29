const {body}=require("express-validator")

const validateSignup=[
    body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required"),

    body("emailId")
    .trim()
    .notEmpty()
    .withMessage("emailId can no tbe empty")
    .bail()
    .isEmail()
    .withMessage("Enter a valid emailId")
    .normalizeEmail(),

    body("password")
    .isLength({min:6})
    .withMessage("password must be atleast 6 character"),

    body("confirmPassword")
    .custom((value,{req})=>{
        if(value!==req.body.password){
            throw new Error("password do not match")
        }
        return true;
    })
    
]

const validateLogin=[
         body("emailId")
    .trim()
    .notEmpty()
    .withMessage("emailId can not be empty")
    .bail()
    .isEmail()
    .withMessage("Enter a valid emailId")
    .normalizeEmail(),

    body("password")
    .isLength({min:6})
    .withMessage("password must be atleast 6 character"),
]

module.exports={
    validateLogin,validateSignup,
}