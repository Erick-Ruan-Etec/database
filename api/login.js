import supabase from "../lib/supabase.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
    const { username, password } = req.body;

    const { data: user } = await supabase
        .from("users_game")
        .select("*")
        .eq("username", username)
        .single();

    if (!user) {
        return res.status(401).json({ error: "Não encontrado" });
    }

    const ok = await bcrypt.compare(password, user.password);

    if (!ok) {
        return res.status(401).json({ error: "Senha errada" });
    }

    const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
    );

    res.status(200).json({ token });
}
