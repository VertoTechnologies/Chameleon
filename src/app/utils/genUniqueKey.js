export default function generateUniqueKey() {
    let uniqueKey = Date.now().toString(36); // Base 36 timestamp
    for (let i = 0; i < 8; i++) { // Generate 8 random characters
      uniqueKey += Math.random().toString(36).charAt(2); // Append a random alphanumeric character
    }
    return uniqueKey;
  }