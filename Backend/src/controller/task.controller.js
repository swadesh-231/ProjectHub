import { Task } from "../models/task.model.js";
import { SubTask } from "../models/subtask.model.js";
import { UserRolesEnum } from "../constants.js";
import { ApiError } from "../error/ApiError.js";
import { ApiResponse } from "../error/APiResponse.js";
import { asyncHandler } from "../utils/asynchandler.js";

const getTasks = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  const tasks = await Task.find({ project: projectId }).populate(
    "assignedTo",
    "username email fullName avatar"
  );

  return res
    .status(200)
    .json(new ApiResponse(200, tasks, "Tasks fetched successfully"));
});

const getTaskById = asyncHandler(async (req, res) => {
  const { taskId } = req.params;

  const task = await Task.findById(taskId).populate(
    "assignedTo",
    "username email fullName avatar"
  );
  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  const subtasks = await SubTask.find({ task: taskId });

  return res
    .status(200)
    .json(
      new ApiResponse(200, { task, subtasks }, "Task fetched successfully")
    );
});

const createTask = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const { title, description, assignedTo, status } = req.body;

  const attachments =
    req.files?.map((file) => ({
      url: `${req.protocol}://${req.get("host")}/images/${file.filename}`,
      mimetype: file.mimetype,
      size: file.size,
    })) || [];

  const task = await Task.create({
    title,
    description,
    project: projectId,
    assignedTo: assignedTo || undefined,
    assignedBy: req.user._id,
    status,
    attachments,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, task, "Task created successfully"));
});

const updateTask = asyncHandler(async (req, res) => {
  const { taskId } = req.params;
  const { title, description, assignedTo, status } = req.body;

  const task = await Task.findById(taskId);
  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (assignedTo !== undefined) task.assignedTo = assignedTo;
  if (status !== undefined) task.status = status;

  if (req.files?.length) {
    const attachments = req.files.map((file) => ({
      url: `${req.protocol}://${req.get("host")}/images/${file.filename}`,
      mimetype: file.mimetype,
      size: file.size,
    }));
    task.attachments = [...task.attachments, ...attachments];
  }

  await task.save();

  return res
    .status(200)
    .json(new ApiResponse(200, task, "Task updated successfully"));
});

const deleteTask = asyncHandler(async (req, res) => {
  const { taskId } = req.params;

  const task = await Task.findByIdAndDelete(taskId);
  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  await SubTask.deleteMany({ task: taskId });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Task deleted successfully"));
});

const createSubTask = asyncHandler(async (req, res) => {
  const { taskId } = req.params;
  const { title } = req.body;

  const task = await Task.findById(taskId);
  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  const subtask = await SubTask.create({
    title,
    task: taskId,
    createdBy: req.user._id,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, subtask, "Subtask created successfully"));
});

const updateSubTask = asyncHandler(async (req, res) => {
  const { projectId, subTaskId } = req.params;
  const { title, isCompleted } = req.body;

  const subtask = await SubTask.findById(subTaskId);
  if (!subtask) {
    throw new ApiError(404, "Subtask not found");
  }

  // Members may only toggle completion; title edits require admin/project_admin.
  if (title !== undefined) {
    if (req.member.role === UserRolesEnum.MEMBER) {
      throw new ApiError(403, "Members cannot edit subtask details");
    }
    subtask.title = title;
  }

  if (isCompleted !== undefined) {
    subtask.isCompleted = isCompleted;
  }

  await subtask.save();

  return res
    .status(200)
    .json(new ApiResponse(200, subtask, "Subtask updated successfully"));
});

const deleteSubTask = asyncHandler(async (req, res) => {
  const { subTaskId } = req.params;

  const subtask = await SubTask.findByIdAndDelete(subTaskId);
  if (!subtask) {
    throw new ApiError(404, "Subtask not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Subtask deleted successfully"));
});

export {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  createSubTask,
  updateSubTask,
  deleteSubTask,
};
