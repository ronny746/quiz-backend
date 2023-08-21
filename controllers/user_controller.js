const User = require("../models/user");
var jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

const secret_key = 'Rana'; 
exports.signup = async (req, res, next) => {
  console.log('hit user sign up');

  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
      password: hashedPassword,
    });

    //save user and respond
    const user = await newUser.save();
    const token = jwt.sign({ userId: user._id }, secret_key); // Replace 'secret_key' with your own secret key
    res.status(200).json({ status: true, user: user, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: false, err })
  }
}

exports.login = async (req, res, next) => {
  console.log('hit user login ');
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("user not found");

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    !validPassword && res.status(400).json("wrong password")
    const token = jwt.sign({ userId: user._id }, secret_key);
    res.status(200).json({ status: true, user: user, token });
  } catch (err) {
    res.status(500).json({ status: false, err })
  }

}


exports.getuserProfile = async (req, res, next) => {

  try {
    const userId = req.user.userId;
    console.log(userId);
    // Retrieve user profile based on the userId
    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json("User not found");
    } else {
      return res.status(200).json({ status: true, profile: user });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    // Delete the user by their ID
    const result = await User.findByIdAndDelete(userId);

    if (!result) {
      return res.status(404).json("User not found");
    } else {
      return res.status(204).json("User Delete Successfully!"); // Successful deletion, no content to return
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const userId = req.user.userId; // Get user ID from the authenticated user
    const updatedData = req.body;    // Updated data from the request body

    // Find the user by ID and update their data
    // Using { new: true } to return the updated user document
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });

    if (!updatedUser) {
      // User not found, return a 404 response
      return res.status(404).json({ message: "User not found" });
    }

    // User successfully updated, return the updated user data
    return res.status(200).json(updatedUser);
  } catch (error) {
    // Handle errors by sending a 500 response with the error message
    return res.status(500).json({ message: "Error updating user", error: error.message });
  }
};


exports.getAllUser = async (req, res, next) => {
  let users;
  try {
    users = (await User.find());
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(404).json({ message: "No Users Found" });
  }
  return res.status(200).json({ status: true, users });
}
