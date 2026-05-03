import supabase from "../lib/supabase.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
    try {
        if (req.method !== "POST") {
            return res.status(405).json({ error: "Use POST" });
        }

        const { username, password } = req.body || {};

        if (!username || !password) {
            return res
                .status(400)
                .json({ error: "Username e password obrigatórios" });
        }

        const { data: user, error } = await supabase
            .from("users_game")
            .select("*")
            .eq("username", username)
            .single();

        if (error || !user) {
            return res.status(401).json({ error: "Usuário não encontrado" });
        }

        const ok = await bcrypt.compare(password, user.password);

        if (!ok) {
            return res.status(401).json({ error: "Senha incorreta" });
        }

        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "7d" },
        );

        return res.status(200).json({ success: true, token });
    } catch (err) {
        return res.status(500).json({
            error: err.message,
        });
    }
}
