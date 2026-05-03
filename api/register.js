import supabase from "../lib/supabase.js";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método inválido" });
    }

    const { username, password } = req.body;

    const { data: exists } = await supabase
        .from("users_game")
        .select("*")
        .eq("username", username)
        .single();

    if (exists) {
        return res.status(400).json({ error: "Usuário existe" });
    }

    const hash = await bcrypt.hash(password, 10);

    await supabase.from("users_game").insert([{ username, password: hash }]);

    res.status(200).json({ success: true });
}
