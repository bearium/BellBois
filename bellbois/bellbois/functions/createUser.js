const sqlDate = require('../services/dateService');
const query = require("../services/SQLService");
const {hashPassword, hashAPIKey} = require("../services/hashingService");
const uuidv4 = require("uuid/v4");

/**
 * Create a User
 * @param {string} email
 * @param {string} password
 * @returns {object.http}
 */
module.exports = async function createUser(email, password, context) {
  // Get the current date and format in MYSQL date format
  var currentDate = sqlDate();
  console.log(currentDate);

  // Hash the values
  var passwordHash = hashPassword(password);
  var apiKey = hashAPIKey(email, passwordHash, currentDate);

  const id = uuidv4();

  var result = await query("INSERT INTO Users (ID, username, passwordHash, email, APIKey, purchaseDate, dateCreated) VALUES (?, ?, ?, ?, ?, ?, ?)", [
    id,
    email,
    passwordHash,
    email,
    apiKey,
    null,
    currentDate
  ]);

  return {
    statusCode: 200,
    headers: {
      headers: {
        "Set-Cookie": `APIKey=${user.APIKey}; SameSite=Lax`,
        "Content-Type": "application/json",
      },
    },
    body: JSON.stringify({
      ID: id,
      username: email,
      email: email,
      purchaseDate: null,
      dateCreated: currentDate
    })
  };
};