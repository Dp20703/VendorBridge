import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    /* ─────────────────────────────────────
         Profile
      ───────────────────────────────────── */

    profileImage: {
      url: {
        type: String,
        default: "",
      },

      publicId: {
        type: String,
        default: "",
      },

      uploadedAt: {
        type: Date,
        default: null,
      },
    },

    fullName: {
      firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
      },

      lastName: {
        type: String,
        trim: true,
      },
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, "Please enter valid email"],
    },

    password: {
      type: String,
      minlength: 6,
      select: false,
    },

    phone: {
      type: String,
      trim: true,
      match: [/^[0-9]{10}$/, "Phone number must be 10 digits"],
    },

    role: {
      type: String,
      enum: ["ADMIN", "PROCUREMENT", "MANAGER", "VENDOR"],
      default: "PROCUREMENT",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.index({
  role: 1,
  email: 1,
});

/* ─────────────────────────────────────────────
   Hash Password
───────────────────────────────────────────── */

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  if (!this.password) return;

  this.password = await bcrypt.hash(this.password, 10);
});

/* ─────────────────────────────────────────────
   Generate JWT
───────────────────────────────────────────── */

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      id: this._id.toString(),
      role: this.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    },
  );
};

/* ─────────────────────────────────────────────
   Compare Password
───────────────────────────────────────────── */

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
