import { Router } from "express";
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  createSubTask,
  updateSubTask,
  deleteSubTask,
} from "../controller/task.controller.js";
import {
  verifyJWT,
  validateProjectPermission,
} from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validator.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
  createTaskValidator,
  updateTaskValidator,
  createSubTaskValidator,
  updateSubTaskValidator,
} from "../validators/index.js";
import { AvailableUserRole, UserRolesEnum } from "../constants.js";

const router = Router();

router.use(verifyJWT);

const adminRoles = [UserRolesEnum.ADMIN, UserRolesEnum.PROJECT_ADMIN];

router
  .route("/:projectId")
  .get(validateProjectPermission(AvailableUserRole), getTasks)
  .post(
    validateProjectPermission(adminRoles),
    upload.array("attachments", 10),
    createTaskValidator(),
    validate,
    createTask
  );

router
  .route("/:projectId/t/:taskId")
  .get(validateProjectPermission(AvailableUserRole), getTaskById)
  .put(
    validateProjectPermission(adminRoles),
    upload.array("attachments", 10),
    updateTaskValidator(),
    validate,
    updateTask
  )
  .delete(validateProjectPermission(adminRoles), deleteTask);

router
  .route("/:projectId/t/:taskId/subtasks")
  .post(
    validateProjectPermission(adminRoles),
    createSubTaskValidator(),
    validate,
    createSubTask
  );

router
  .route("/:projectId/st/:subTaskId")
  .put(
    validateProjectPermission(AvailableUserRole),
    updateSubTaskValidator(),
    validate,
    updateSubTask
  )
  .delete(validateProjectPermission(adminRoles), deleteSubTask);

export default router;
