import dbConnect from "../../../middleware/mongodb";
import User from "../../../models/user";
import bcrypt from 'bcryptjs';

function validateUpdateFields(updateData) {
  const errors = {};
  
  if (updateData.password && updateData.password.length < 6) {
    errors.password = "Password must be at least 6 characters long";
  }

  return errors;
}

export default async function resetPassword(req, res) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body;
  

  const hashedPassword = await bcrypt.hash(password, 12);

  const updateData = { password: hashedPassword };

  // Validate the input
  if (!email || !password) {
    return res.status(400).json({
      message: "Missing required fields or no data provided for update",
    });
  }

  const validationErrors = validateUpdateFields(updateData);
  if (Object.keys(validationErrors).length > 0) {
    return res.status(400).json({ message: "Validation failed", errors: validationErrors });
  }
  

  try {
    await dbConnect();

    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      updateData, // Pass the updateData here
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Error updating user profile" });
  }
}
