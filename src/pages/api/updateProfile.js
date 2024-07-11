// updateProfile.js
import dbConnect from "../../middleware/mongodb";
import User from "../../models/user";


function _calculateAge(birthday) { // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}


function validateUpdateFields(updateData) {
    const errors = {};
    if (updateData.email && !/^\S+@\S+\.\S+$/.test(updateData.email)) {
        errors.email = "Invalid email format";
    }
    // Add more validation rules as needed
    if (updateData.name && updateData.name.length < 3) {
        errors.name = "Username must be at least 3 characters long";
    }
    if (updateData.password && updateData.password.length < 6) {
        errors.password = "Password must be at least 6 characters long";
    }
    if (updateData.dateOfBirth) {
        const age = _calculateAge(new Date(updateData.dateOfBirth));
        if (age < 18) {
            errors.dateOfBirth = "User must be at least 18 years old";
        }
    }
    if (updateData.userDescription) {
        const wordCount = updateData.userDescription.split(/\s+/).length;
        if (wordCount > 200) {
            errors.userDescription = "Description must not exceed 200 words";
        }
    }
    if (updateData.userInterests && updateData.userInterests.length < 1) {
        errors.userInterests = "User must have at least one interest";
    }


    return errors;
}

export default async function updateProfile(req, res) {
    if (req.method !== "PATCH") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { userId } = req.query; // Assuming the user ID is passed as a query parameter

    // Destructure and exclude password from the request body to ensure it's not updated
    const { password, ...updateData } = req.body;

    // Validate the input
    if (!userId || Object.keys(updateData).length === 0) {
        return res.status(400).json({ message: "Missing required fields or no data provided for update" });
    }

    const validationErrors = validateUpdateFields(updateData);
    if (Object.keys(validationErrors).length > 0) {
        return res.status(400).json({ message: "Validation failed", errors: validationErrors });
    }

    try {
        await dbConnect();

        // Find the user by ID and update their profile, excluding the password field
        const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
            new: true, // Return the updated document
            runValidators: true, // Run model validators on update
            select: "-password", // Exclude the password field from the result
        });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(updatedUser); // Send the updated user profile information
    } catch (error) {
        console.error("Error updating user profile", error);
        res.status(500).json({ message: "Error updating user profile" });
    }
}
