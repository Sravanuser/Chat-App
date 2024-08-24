import jwt from "jsonwebtoken";
import Auth from "../Model/AuthModel.js"

export default async function ProtectRoute(req, res, next) {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            throw new Error("no token");
        }
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        if (!decode) {
            throw new Error("Wrong token");
        }
        const userId = await Auth.findById(decode.userId);
        if (!userId) {
            throw new Error("no user found");
        }
        req.id = userId;
        next();
    } catch (err) {
        res.status(401).json({ error: err.message })
    }
}