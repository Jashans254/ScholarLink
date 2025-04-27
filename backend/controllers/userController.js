import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

// @desc    Register new user
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Login user
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
// @desc    Promote a user to admin
// @route   PUT /api/users/:id/promote
// @access  Private (Admin)
export const promoteUserToAdmin = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Find user by ID
  const user = await User.findById(id);

  if (user) {
    user.isAdmin = true;
    const updatedUser = await user.save();
    res.json({ message: "User promoted to admin", user: updatedUser });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user profile (form filling)
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id); // req.user from protect middleware

    if (!user) return res.status(404).json({ message: "User not found" });

    // Update fields from request body
    user.name = req.body.name || user.name;
    user.category = req.body.category || user.category;
    user.gender = req.body.gender || user.gender;
    user.income = req.body.income || user.income;
    user.state = req.body.state || user.state;

    user.academicDetails = {
      degree: req.body.academicDetails?.degree || user.academicDetails.degree,
      year: req.body.academicDetails?.year || user.academicDetails.year,
      percentage: req.body.academicDetails?.percentage || user.academicDetails.percentage,
    };

    user.boardMarks = {
      tenth: req.body.boardMarks?.tenth || user.boardMarks?.tenth,
      twelfth: req.body.boardMarks?.twelfth || user.boardMarks?.twelfth,
    };

    user.courseType = req.body.courseType || user.courseType;
    user.institutionName = req.body.institutionName || user.institutionName;
    user.parentOccupation = req.body.parentOccupation || user.parentOccupation;
    user.specialAchievements = req.body.specialAchievements || user.specialAchievements;

    const updatedUser = await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while updating profile" });
  }
};