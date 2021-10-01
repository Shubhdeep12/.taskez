//to clear out the cookie for logging out.
exports.logoutUser = async (req, res, next) => {
  res.clearCookie("token");
  res.status(200).send({ success: true });
};
