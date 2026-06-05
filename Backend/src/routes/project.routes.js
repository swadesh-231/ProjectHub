import { Router } from "express";
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getProjectMembers,
  addMemberToProject,
  updateMemberRole,
  deleteMember,
} from "../controller/project.controller.js";
import {
  verifyJWT,
  validateProjectPermission,
} from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validator.middleware.js";
import {
  createProjectValidator,
  addMemberToProjectValidator,
  updateMemberRoleValidator,
} from "../validators/index.js";
import { AvailableUserRole, UserRolesEnum } from "../constants.js";

const router = Router();

router.use(verifyJWT);

router
  .route("/")
  .get(getProjects)
  .post(createProjectValidator(), validate, createProject);

router
  .route("/:projectId")
  .get(validateProjectPermission(AvailableUserRole), getProjectById)
  .put(
    validateProjectPermission([UserRolesEnum.ADMIN]),
    createProjectValidator(),
    validate,
    updateProject
  )
  .delete(validateProjectPermission([UserRolesEnum.ADMIN]), deleteProject);

router
  .route("/:projectId/members")
  .get(validateProjectPermission(AvailableUserRole), getProjectMembers)
  .post(
    validateProjectPermission([UserRolesEnum.ADMIN]),
    addMemberToProjectValidator(),
    validate,
    addMemberToProject
  );

router
  .route("/:projectId/members/:userId")
  .put(
    validateProjectPermission([UserRolesEnum.ADMIN]),
    updateMemberRoleValidator(),
    validate,
    updateMemberRole
  )
  .delete(validateProjectPermission([UserRolesEnum.ADMIN]), deleteMember);

export default router;
