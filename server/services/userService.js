const bcrypt = require('bcryptjs');
const { User } = require('../models');

const removePassword = (user) => ({
  ...JSON.parse(JSON.stringify(user)),
  password: undefined,
});

const validateNewUser = async ({ email, password, confirmPassword }) => {
  if (password !== confirmPassword)
    return { message: 'Password does not match', valid: false };
  if (parseInt(await User.where({ email }).count(), 10)) {
    return { message: 'User is already registered', valid: false };
  }
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
    firstName,
    lastName,
    password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
  }).save(null, {
    require: true,
    method: 'insert',
  });
};

const getAllUsers = async () =>
  User.fetchAll({ withRelated: ['roles'], require: true }).then((users) =>
    users.map(removePassword)
  );

const authenticateLogin = ({ email, password }) => {
  return User.where({ email })
    .fetch({ withRelated: ['permissions', 'roles'], require: true })
    .then((user) => {
      if (!bcrypt.compareSync(password, user.attributes.password))
        throw new Error('Password Does not match');
      else {
        return removePassword(user);
      }
    });
};

module.exports = { authenticateLogin, createUser, getAllUsers };
