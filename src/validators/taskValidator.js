const {body}=require("express-validator")

const taskValidated=[
     body("title")
     .trim()
     .notEmpty()
     .withMessage("title field is required")
     .bail()
     .isLength({max:100})
     .withMessage("title must be within 100 character"),

 body("description")
     .optional()
     .trim()
     .isLength({ max: 1000 })
     .withMessage("Description must be within 1000 characters"),

    body("status")
     .optional()
      .trim()
      .isIn(["pending", "in-progress", "completed"])
      .withMessage("Invalid status"),

      body("priority")
       .optional()
    .trim()
    .isIn(["low", "medium", "high"])
    .withMessage("Invalid priority"),

      body("dueDate")
        .optional()
       .isISO8601()
        .withMessage("Due date must be a valid date"),

]

module.exports=taskValidated;