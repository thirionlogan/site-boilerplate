const bcrypt = require('bcryptjs');
const { User } = require('../models');

const validateNewUser = async ({ email, password, confirmPassword }) => {
  if (password !== confirmPassword)
    return { message: 'Password does not match', valid: false };
  if (await User.where({ email }).count())
    return { message: 'User is already registered', valid: false };
  return { message: 'User is valid', valid: true };
};

const createUser = async ({
  email,
  firstName,
  lastName,
  password,
  confirmPassword,
}) => {
  const validationResult = await validateNewUser({
    email,
    password,
    confirmPassword,
  });

  if (!validationResult.valid) throw new Error(validationResult.message);
  return new User({
    email,
    first_name: firstName,
    last_name: lastName,
    password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
  }).save(null, {
    require: true,
    method: 'insert',
  });
};

const authenticateLogin = ({ email, password }) => {
  return User.where({ email })
    .fetch({ require: true })
    .then(({ attributes }) => {
      if (!bcrypt.compareSync(password, attributes.password))
        throw new Error('Password Does not match');
      else return { ...attributes, password: undefined };
    });
};

module.exports = { authenticateLogin, createUser };
