const dotenv = require('dotenv');
dotenv.config();

// GET Method Controller
const getUserData = (req, res) => {
  res.status(200).json({ operation_code: 1 });
};

// POST Method Controller
const processData = (req, res) => {
  const { data } = req.body;

  // Input Validation
  if (!data || !Array.isArray(data)) {
    return res.status(400).json({ is_success: false, message: 'Invalid input' });
  }

  const numbers = [];
  const alphabets = [];
  let highestLowercase = '';

  // Process Data
  data.forEach((item) => {
    if (!isNaN(item)) {
      numbers.push(item);
    } else if (typeof item === 'string') {
      alphabets.push(item);
      if (item >= 'a' && item <= 'z' && item > highestLowercase) {
        highestLowercase = item;
      }
    }
  });

  res.status(200).json({
    is_success: true,
    user_id: process.env.USER_ID,
    email: process.env.EMAIL,
    roll_number: process.env.ROLL_NUMBER,
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : [],
  });
};

module.exports = { getUserData, processData };
