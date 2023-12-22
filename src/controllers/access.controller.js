const { CREATED, SuccessResponse } = require("../core/success.response");
const AccessService = require("../services/access.service");

class AccessController {
  // V1

  // handleRefreshToken = async (req, res, next) => {
  //     new SuccessResponse({
  //         message: 'Get token success',
  //         metadata: await AccessService.handleRefreshToken(req.body.refreshToken),
  //     }).send(res)
  // }

  // V2 fixed

  handleRefreshToken = async (req, res, next) => {
    console.log(req.body.refreshToken);
    new SuccessResponse({
      message: "Get token success",
      metadata: await AccessService.handleRefreshTokenV2({
        refreshToken: req.body.refreshToken,
        user: req.user,
        keyStore: req.keyStore,
      }),
    }).send(res);
  };

  logout = async (req, res, next) => {
    new SuccessResponse({
      message: "Logout success",
      metadata: await AccessService.logout(req.keyStore),
    }).send(res);
  };

  login = async (req, res, next) => {
    new SuccessResponse({
      message: "Success",
      metadata: await AccessService.login(req.body),
    }).send(res);
  };

  decode = async (req, res, next) => {
    new SuccessResponse({
      message: "Success",
      metadata: await AccessService.decode(req.body),
    }).send(res);
  };

  signUp = async (req, res, next) => {
    console.log(req.body);
    new CREATED({
      message: "Register OK",
      metadata: await AccessService.signUp(req.body),
    }).send(res);

    // return res.status(201).json(await AccessService.signUp(req.body))
  };
  updateVerify = async (req, res, next) => {
    console.log(req.params);
    new SuccessResponse({
      message: "getList Cart success",
      metadata: await AccessService.updateVerify(req.params),
    }).send(res);
  };
}

module.exports = new AccessController();
