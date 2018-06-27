module.exports.handleErrors = controllerFunc => async (req, res, next) => {
  try {
    await controllerFunc(req, res, next);
  } catch (err) {
    next(err);
  }
};
