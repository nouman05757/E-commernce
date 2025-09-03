import { userDummyData } from "@/assets/assets";
import { User } from "@clerk/nextjs/dist/types/server";
import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";
const userSchema = new mongoose.Schema({
    id: { type: String, required: true },
    email: { type: String, required: true , unique: true},
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    Cartitems: { type: object, default: {} },

},  {minimize: false});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User
