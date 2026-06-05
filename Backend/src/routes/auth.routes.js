import { Router } from "express";
import {
  registerUser,
  login,
  logout,
  getCurrentUser,
  changeCurrentPassword,
  verifyEmail,
  resendEmailVerification,
  refreshAccessToken,
  forgotPasswordRequest,
  resetForgottenPassword,
} from "../controller/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validator.middleware.js";
import {
  userRegisterValidator,
  userLoginValidator,
  userChangePasswordValidator,
  userForgotPasswordValidator,
  userResetForgottenPasswordValidator,
  userResendEmailVerificationValidator,
} from "../validators/index.js";

const router = Router();

// Unsecured routes
router.route("/register").post(userRegisterValidator(), validate, registerUser);
router.route("/login").post(userLoginValidator(), validate, login);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/verify-email/:verificationToken").get(verifyEmail);
router
  .route("/forgot-password")
  .post(userForgotPasswordValidator(), validate, forgotPasswordRequest);
router
  .route("/reset-password")
  .post(
    userResetForgottenPasswordValidator(),
    validate,
    resetForgottenPassword
  );
router
  .route("/resend-email-verification")
  .post(userResendEmailVerificationValidator(), validate, resendEmailVerification);

// Secured routes
router.route("/logout").post(verifyJWT, logout);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router
  .route("/change-password")
  .post(verifyJWT, userChangePasswordValidator(), validate, changeCurrentPassword);

export default router;
