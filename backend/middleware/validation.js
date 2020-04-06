const { check, validationResult, checkSchema } = require("express-validator");
var Schema = {
  role: {
    in: "body",
    matches: {
      options: [/\b(?:administrator|entrepreneur|junior|incubator)\b/],
      errorMessage: "Invalid role"
    }
  }
};
exports.registerRules = () => [
  check("email", "you must write your email it's required !").notEmpty(),
  check("email", "please try to write a valid email").isEmail(),
  check(
    "password",
    "please make it difficult for Hackers and write a strong psw ;) "
  ).isLength({ min: 6 }),
  check(
    "userType",
    "you must choose whether you're an entrepreneur or a junior or an incubator"
  ).notEmpty()
];
exports.validator = (req, res, next) => {
  const error = validationResult(req);
  error.isEmpty() ? next() : res.status(400).json({ error: error.array() });
};
