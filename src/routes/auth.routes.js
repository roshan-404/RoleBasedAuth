const controller = require("../controllers/auth.controller");
const { verifyToken } = require("../middleware/authJwt");
const verifySignUp = require("../middleware/verifySignUp");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/signup",
    [verifySignUp.checkDuplicateUsername, verifySignUp.checkRolesExisted],
    controller.signup
  );

  app.post("/signin", controller.signin);

  app.post("/refreshtoken", controller.refreshToken);

  app.post("/changePswd", [verifyToken], controller.changePswd);

  app.post("/forgetPswd", controller.forgetPswd);
};
