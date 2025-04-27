// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   category: { type: String },
//   gender: { type: String },
//   income: { type: Number },
//   state: { type: String },
//   academicDetails: {
//     degree: String,
//     year: Number,
//     percentage: Number,
//   },
//   isAdmin: {
//     type: Boolean,
//     required: true,
//     default: false, // Default is not an admin
//   },
// }, { timestamps: true });

// const User = mongoose.model("User", userSchema);
// export default User;
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  category: { type: String }, // General/SC/ST/OBC/EWS
  gender: { type: String },
  income: { type: Number },
  state: { type: String },

  academicDetails: {
    degree: String,         // e.g., B.Tech, B.Sc
    year: Number,           // Graduation year or current year
    percentage: Number,     // Latest semester or aggregate percentage
  },

  boardMarks: {
    tenth: Number,          // 10th board percentage
    twelfth: Number,        // 12th board percentage
  },

  courseType: { type: String },         // Engineering/Medical/etc.
  institutionName: { type: String },    // Name of current institution
  parentOccupation: { type: String },   // e.g., Defence, Farmer, etc.
  specialAchievements: [String],        // e.g., ['NTSE Scholar', 'JEE Rank < 5000']

  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
