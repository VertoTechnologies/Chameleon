import dbConnect from "../../../middleware/mongodb";
import LanguageRank from "../../../models/rank";
import User from '../../../models/user';

export default async function getRank(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { userId, language } = req.query;

  if (!userId || !language) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    await dbConnect();

    const user = await User.findOne({ userId: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const rank = await LanguageRank.findOne({ userId: user._id, language });

    if (!rank) {
      return res.status(404).json({ message: "Language rank not found" });
    }

    res.status(200).json(rank);
  } catch (error) {
    console.error("Error fetching language rank", error);
    res.status(500).json({ message: "Error fetching language rank" });
  }
}
