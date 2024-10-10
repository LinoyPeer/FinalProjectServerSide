const bcrypt = require('bcryptjs');

const generateUserPassword = (password) => bcrypt.hashSync(password, 10);

const comparePasswords = (password, cryptPassword) => bcrypt.compareSync(password, cryptPassword);

module.exports = { generateUserPassword, comparePasswords };