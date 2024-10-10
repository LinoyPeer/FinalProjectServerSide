const chalk = require("chalk");

const createError = (validator, error, status = 400, message = "") => {
  const errorMessage = `${validator} says: ${error.message}, with status error: ${status} ${message}`;
  const customError = new Error(errorMessage);
  customError.status = status;
  throw customError;
};



const handleError = (res, status, message = "") => {
  console.log(chalk.redBright(message));
  return res.status(status).send(message);
};

module.exports = { createError, handleError };
