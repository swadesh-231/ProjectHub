import { Router } from "express";
import {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} from "../controller/note.controller.js";
import {
  verifyJWT,
  validateProjectPermission,
} from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validator.middleware.js";
import { noteValidator } from "../validators/index.js";
import { AvailableUserRole, UserRolesEnum } from "../constants.js";

const router = Router();

router.use(verifyJWT);

router
  .route("/:projectId")
  .get(validateProjectPermission(AvailableUserRole), getNotes)
  .post(
    validateProjectPermission([UserRolesEnum.ADMIN]),
    noteValidator(),
    validate,
    createNote
  );

router
  .route("/:projectId/n/:noteId")
  .get(validateProjectPermission(AvailableUserRole), getNoteById)
  .put(
    validateProjectPermission([UserRolesEnum.ADMIN]),
    noteValidator(),
    validate,
    updateNote
  )
  .delete(validateProjectPermission([UserRolesEnum.ADMIN]), deleteNote);

export default router;
