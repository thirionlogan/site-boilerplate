const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { User, AuthToken } = require('../models');

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

const generateAuthToken = () => crypto.randomBytes(30).toString('hex');

const authenticateLogin = ({ email, password }) => {
  return User.where({ email })
    .fetch({ require: true })
    .then((model) => model.attributes.password)
    .then((hash) => bcrypt.compareSync(password, hash))
    .then((passwordMatch) => {
      if (!passwordMatch) throw new Error('Password Does not match');
      return generateAuthToken();
    });
};

const authenticateToken = (authToken) => {
  return AuthToken.where({ token: authToken })
    .fetch({
      require: true,
      withRelated: ['user'],
    })
    .then((model) => model.attributes.user);
};

exports.authenticateLogin = authenticateLogin;
exports.createUser = createUser;
exports.authenticateToken = authenticateToken;
