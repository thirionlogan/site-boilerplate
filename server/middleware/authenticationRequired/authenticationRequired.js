module.exports = (req, res, next) => {
  if (!req.session?.user) res.sendStatus(401);
  next();
};
