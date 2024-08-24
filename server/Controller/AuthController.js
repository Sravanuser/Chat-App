import Auth from "../Model/AuthModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../Utils/GenerateToken.js";

export const SignInUser = async (req, res) => {
    try {
        const { username, email, password, gender, profilePic } = req.body;
        if (!username || !email || !password || !gender) {
            throw new Error("Enter all details");
        }
        const prevUser = await Auth.findOne({ email });
        if (prevUser) {
            throw new Error("User already exists")
        } else {
            const hashpassword = await bcrypt.hash(password, 12);
            const newUser = new Auth({
                username, email, password: hashpassword, gender, profilePic
            });
            await generateToken(res, newUser._id);
            await newUser.save();
            if (newUser) {
                res.status(201).json({ _id: newUser._id, username: newUser.username, email: newUser.email, gender: newUser.gender, profilePic: newUser.profilePic, message: "Registered successfully"})
            }
        }
    } catch (err) {
        res.status(401).json({ error: err.message })
    }
}

export const LogInUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(401).send("Enter all details");
        }
        const prevUser = await Auth.findOne({ email });
        if (!prevUser) {
            res.status(401).json({ error: "User does not exist" });
        } else {
            const matchPassword = await bcrypt.compare(password, prevUser.password);
            if (!matchPassword) {
                res.status(401).send("password does not match");
            } else {
                const token = await generateToken(res, prevUser._id);
                res.status(201).json({ _id: prevUser._id, username: prevUser.username, email: prevUser.email, gender: prevUser.gender, profilePic: prevUser.profilePic, token, message: "Login Successfull" })
            }
        }
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
}

export const LogOutUser = async (req, res) => {
    try {
        res.cookie("token", "", { maxAge: 0 });
        res.status(201).json({ message: "Logout successful" });
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
}  