import { body } from "express-validator";
import { AvailableTaskStatues, AvailableUserRole } from "../constants.js";

const userRegisterValidator = () => [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is invalid"),
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLowercase()
    .withMessage("Username must be lowercase")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long"),
  body("password").trim().notEmpty().withMessage("Password is required"),
  body("fullName").optional().trim(),
];

const userLoginValidator = () => [
  body("email").optional().isEmail().withMessage("Email is invalid"),
  body("username").optional(),
  body("password").notEmpty().withMessage("Password is required"),
];

const userChangePasswordValidator = () => [
  body("oldPassword").notEmpty().withMessage("Old password is required"),
  body("newPassword").notEmpty().withMessage("New password is required"),
];

const userForgotPasswordValidator = () => [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is invalid"),
];

const userResetForgottenPasswordValidator = () => [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is invalid"),
  body("code")
    .trim()
    .notEmpty()
    .withMessage("Reset code is required")
    .isLength({ min: 6, max: 6 })
    .withMessage("Code must be 6 digits"),
  body("newPassword").notEmpty().withMessage("New password is required"),
];

const userResendEmailVerificationValidator = () => [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is invalid"),
];

const createProjectValidator = () => [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("description").optional(),
];

const addMemberToProjectValidator = () => [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is invalid"),
  body("role")
    .notEmpty()
    .withMessage("Role is required")
    .isIn(AvailableUserRole)
    .withMessage("Role is invalid"),
];

const updateMemberRoleValidator = () => [
  body("role")
    .notEmpty()
    .withMessage("Role is required")
    .isIn(AvailableUserRole)
    .withMessage("Role is invalid"),
];

const createTaskValidator = () => [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("description").optional(),
  body("assignedTo").optional(),
  body("status")
    .optional()
    .isIn(AvailableTaskStatues)
    .withMessage("Status is invalid"),
];

const updateTaskValidator = () => [
  body("title").optional().trim().notEmpty().withMessage("Title is required"),
  body("description").optional(),
  body("assignedTo").optional(),
  body("status")
    .optional()
    .isIn(AvailableTaskStatues)
    .withMessage("Status is invalid"),
];

const createSubTaskValidator = () => [
  body("title").trim().notEmpty().withMessage("Title is required"),
];

const updateSubTaskValidator = () => [
  body("title").optional().trim().notEmpty().withMessage("Title is required"),
  body("isCompleted").optional().isBoolean().withMessage("isCompleted must be a boolean"),
];

const noteValidator = () => [
  body("content").trim().notEmpty().withMessage("Content is required"),
];

export {
  userRegisterValidator,
  userLoginValidator,
  userChangePasswordValidator,
  userForgotPasswordValidator,
  userResetForgottenPasswordValidator,
  userResendEmailVerificationValidator,
  createProjectValidator,
  addMemberToProjectValidator,
  updateMemberRoleValidator,
  createTaskValidator,
  updateTaskValidator,
  createSubTaskValidator,
  updateSubTaskValidator,
  noteValidator,
};
