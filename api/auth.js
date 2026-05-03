import jwt from "jsonwebtoken";

export function verifyToken(req) {
    const auth = req.headers.authorization;
    if (!auth) return null;

    try {
        return jwt.verify(auth.split(" ")[1], process.env.JWT_SECRET);
    } catch {
        return null;
    }
}
