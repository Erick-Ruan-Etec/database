import supabase from "../lib/supabase.js";
import { verifyToken } from "./auth.js";

export default async function handler(req, res) {
    const user = verifyToken(req);

    if (!user) {
        return res.status(401).json({ error: "Sem login" });
    }

    const { data } = await supabase
        .from("users_game")
        .select("id, username, coins")
        .eq("id", user.id)
        .single();

    res.status(200).json(data);
}
