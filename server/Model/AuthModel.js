import mongoose from "mongoose";
import validator from "validator";

const AuthSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        if(value) {
            validator.isEmail(value);
        }
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: true
    },
    profilePic: {
        type: String,
        default: "https://th.bing.com/th/id/OIP.fevkK2_UeYkVu1vl8vvSFQHaEK?rs=1&pid=ImgDetMain"
    }
})

const Auth = mongoose.model("Auth", AuthSchema);

export default Auth;