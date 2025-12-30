const User = require("./user.schema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  return User.create({ ...data, password: hashedPassword });
};

exports.loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET
  );

  return { token, role: user.role };
};
