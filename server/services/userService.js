const crypto = require('crypto');
const { User, AuthToken } = require('../models');

const getHashedPassword = (password) => {
  const sha256 = crypto.createHash('sha256');
  const hash = sha256.update(password).digest('base64');
  return hash;
};
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
    password: getHashedPassword(password),
  }).save(null, {
    require: true,
    method: 'insert',
  });
};

const generateAuthToken = () => crypto.randomBytes(30).toString('hex');

const authenticateLogin = ({ email, password }) => {
  const hashedPassword = getHashedPassword(password);
  return User.where({ email, password: hashedPassword })
    .fetch({
      require: true,
    })
    .then((user) => {
      return generateAuthToken();
    });
};

const authenticateToken = async (authToken) => {
  const user = await AuthToken.where({ token: authToken })
    .fetch({
      require: true,
      withRelated: ['user'],
    })
    .then((model) => model.user);
  return user;
};

exports.authenticateLogin = authenticateLogin;
exports.createUser = createUser;
exports.authenticateToken = authenticateToken;
