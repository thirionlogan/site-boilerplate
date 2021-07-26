const includesAny = (userPermissions, permittedPermissions) =>
  userPermissions.some((userPermission) =>
    permittedPermissions.includes(userPermission.name)
  );

module.exports = (...permittedPermissions) => (req, res, next) => {
  if (!includesAny(req.session?.user?.permissions, permittedPermissions))
    res.sendStatus(401);
  next();
};
