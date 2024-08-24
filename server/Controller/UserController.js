import User from "../Model/AuthModel.js";

export default async function UserController(req, res) {
    try {
        const userId = req.id;
        const users = await User.find({ _id: { $ne: userId } }).select("-password");
        if(!users){
            throw new Error("Add some users");
        }
        res.status(201).json({users});
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
}
