// updateProfile.js
import dbConnect from "../../../middleware/mongodb";
import User from "../../../models/user";
import LanguageRank from "../../../models/rank";
import Chat from "../../../models/Chat";

function _calculateAge(birthday) {
  // birthday is a date
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

  if (updateData.nativeLanguages && updateData.nativeLanguages.length !== 1) {
    errors.nativeLanguages = "User must have one native language";
  }

  // if (updateData.fluentLanguagess && updateData.fluentLanguagess.length < 1) {
  //   errors.fluentLanguagess = "User must have at least one fluent language";
  // }

  // if (updateData.learningLanguagess && updateData.learningLanguagess.length < 1) {
  //   errors.learningLanguagess = "User must have at least one learning language";
  // }

  return errors;
}

export default async function updateProfile(req, res) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { userId } = req.query; // Assuming the user ID is passed as a query parameter

  // Destructure and exclude password from the request body to ensure it's not updated
  const updateData = req.body.updateData;
  console.log(updateData);

  // Validate the input
  if (!userId || Object.keys(updateData).length === 0) {
    return res.status(400).json({
      message: "Missing required fields or no data provided for update",
    });
  }

  const validationErrors = validateUpdateFields(updateData);
  if (Object.keys(validationErrors).length > 0) { 
    return res
      .status(400)
      .json({ message: "Validation failed", errors: validationErrors });
  }

  // print the updateData
  console.log(updateData);

  try {
    await dbConnect();

    // Find the user by ID and update their profile, excluding the password field
    // Find the user by userId attribute and update their profile, excluding the password field
    const updatedUser = await User.findOneAndUpdate(
      { userId: userId },
      updateData,
      {
        new: true, // Return the updated document
        runValidators: true, // Run model validators on update
        select: "-password", // Exclude the password field from the result
      }
    );

    // check if data is updated
    console.log(updatedUser);

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (updateData.fluentLanguagess) {
      for (const language of updateData.fluentLanguagess) {
        await LanguageRank.findOneAndUpdate(
          { userId: updatedUser._id, language },
          { userId: updatedUser._id, language, level: 1, type: "fluent" },
          { upsert: true, new: true }
        );
      }

      for (const language of updateData.learningLanguagess) {
        await LanguageRank.findOneAndUpdate(
          { userId: updatedUser._id, language },
          { userId: updatedUser._id, language, level: 1, type: "learning" },
          { upsert: true, new: true }
        );
      }
    }

    // If learningLanguages are updated, handle the chat groups
    if (updateData.learningLanguagess) {
      for (const language of updateData.learningLanguagess) {
        let chat = await Chat.findOne({ language }); 

        if (!chat) {
          chat = await Chat.create({
            language,
            users: [updatedUser._id],
            groupPhoto: `/assets/extras/${language}.png`, // Add group photo if provided
          });
          console.log(language + " chat create");
        } else {
          if (!chat.users.includes(updatedUser._id)) {
            chat.users.push(updatedUser._id);
            await chat.save();
          }
        }
      }
    }
    res.status(200).json(updatedUser); // Send the updated user profile information
  } catch (error) {
    console.error("Error updating user profile", error);
    res.status(500).json({ message: "Error updating user profile" });
  }
}
