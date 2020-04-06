const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("config");
const sercretOrkey = config.get("secretOrKey");
module.exports = userController = {
  register: async (req, res) => {
    console.log("req.body", req.body);
    const { name, email, password, userType } = req.body;

    try {
      const searchRes = await User.findOne({ email });
      if (searchRes)
        return res.status(400).json({ msgs: "user already exists" });
      const newUser = new User({ name, email, password, userType });
      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(password, salt, async (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          try {
            const addRes = await newUser.save();
            res.status(210).json(addRes);
          } catch (error) {
            console.log(error);
            res.status(500).json(addRes);
          }
        });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msgs: error });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const searchResult = await User.findOne({ email });
      if (!searchResult)
        return res
          .status(400)
          .json({ msgs: "Check again email is invalid : Bad credential ! " });

      const isMatch = await bcrypt.compare(password, searchResult.password);
      if (!isMatch)
        return res
          .status(400)
          .json({ msgs: " check the password again : Bad credential ! " });
      const payload = {
        id: searchResult._id,
        name: searchResult.name,
        email: searchResult.email,
        userType: searchResult.userType
      };
      jwt.sign(payload, sercretOrkey, (err, token) => {
        if (err) throw err;
        res.json({ token: `Bearer ${token}` });
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msgs: error });
    }
  },
  current: (req, res) => {
    console.log("req", req);

    res.json(req.user);
  },
  getAllUser: async (req, res) => {
    try {
      const searchRes = await User.find();
      res.json(searchRes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ errors: error });
    }
  }
};
