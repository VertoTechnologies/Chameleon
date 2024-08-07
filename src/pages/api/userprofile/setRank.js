import dbConnect from "../../../middleware/mongodb";
import LanguageRank from "../../../models/rank"; // Assuming you have this model

export default async function setRank(req, res) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { userId, language, newLevel } = req.body;

  if (!userId || !language || newLevel === undefined) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    await dbConnect();

    const user = await findOne({userId: userId})
    console.log(user)
    console.log(language)

    const updatedRank = await LanguageRank.findOneAndUpdate(
      { userId: user._id, language },
      { level: newLevel },
      { upsert: true, new: true }
    );

    if (!updatedRank) {
      return res.status(404).json({ message: "Language rank not found" });
    }

    res.status(200).json(updatedRank);
  } catch (error) {
    console.error("Error updating language rank", error);
    res.status(500).json({ message: "Error updating language rank" });
  }
}
