import jwt from "jsonwebtoken";

export default function GenerateToken(res, userId) {
    try {
        const token = jwt.sign({ userId }, process.env.SECRET_KEY, {
            expiresIn: "15d"
        });
        res.cookie("jwt", token, {
            maxAge: 15 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict"
        })
        return token;
    } catch (err) {
        res.status(401).json({ error: err.message })
    }
}