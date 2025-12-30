const userService = require("./user.service");

exports.register = async (req, res) => {
  const user = await userService.registerUser(req.body);
  res.status(201).json(user);
};

exports.login = async (req, res) => {
  try {
    const result = await userService.loginUser(
      req.body.email,
      req.body.password
    );
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
