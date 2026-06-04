import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {

    fullName: {
        type:String,
        
    }
  },

  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
