const crypto = require("node:crypto");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const sendEmail = require("../helpers/sendEmail");

async function register(req, res, next) {
  const { name, email, password } = req.body;

  try {
    const user = await User.findOne({ email }).exec();

    if (user !== null) {
      return res.status(409).send({ message: "User already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const verifyToken = crypto.randomUUID();

    await User.create({ name, email, password: passwordHash, verifyToken });

    await sendEmail({
      to: email,
      subject: `Welcome on board, ${name}`,
      html: `
        <p>To confirm your registration, please click on the link below:</p>
        <a href="http://localhost:8080/api/auth/verify/${verifyToken}">Click me</a>
      `,
      text: `
        To confirm your registration, please click on the link below:\n
        http://localhost:8080/api/auth/verify/${verifyToken}
      `,
    });

    res.status(201).send({ message: "Registration successful" });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).exec();

    if (user === null) {
      return res
        .status(401)
        .send({ message: "Email or password is incorrect" });
    }

    if (user.verified !== true) {
      return res.status(401).send({ message: "Please verify your email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch !== true) {
      return res
        .status(401)
        .send({ message: "Email or password is incorrect" });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET,
      {
        expiresIn: 3600,
      }
    );

    await User.findByIdAndUpdate(user._id, { token });

    return res.status(200).send({ token });
  } catch (error) {
    next(error);
  }
}

async function logout(req, res, next) {
  try {
    await User.findByIdAndUpdate(req.user.id, { token: null });

    // res.send({ message: "You are successfully logged out" });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

async function verify(req, res, next) {
  const { token } = req.params;

  try {
    const user = await User.findOne({ verifyToken: token }).exec();

    if (user === null) {
      return res.status(401).send({ message: "Invalid token" });
    }

    await User.findByIdAndUpdate(user._id, {
      verified: true,
      verifyToken: null,
    });

    res.send({ message: "User verified" });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  register,
  login,
  logout,
  verify,
};
