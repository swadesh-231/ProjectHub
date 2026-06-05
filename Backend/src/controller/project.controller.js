import { Project } from "../models/project.model.js";
import { ProjectMember } from "../models/projectmember.model.js";
import { User } from "../models/user.model.js";
import { UserRolesEnum } from "../constants.js";
import { ApiError } from "../error/ApiError.js";
import { ApiResponse } from "../error/APiResponse.js";
import { asyncHandler } from "../utils/asynchandler.js";

// List all projects the logged-in user is a member of, with member count.
const getProjects = asyncHandler(async (req, res) => {
  const memberships = await ProjectMember.find({ user: req.user._id }).select(
    "project role"
  );

  const projectIds = memberships.map((m) => m.project);

  const projects = await Project.find({ _id: { $in: projectIds } }).lean();

  const data = await Promise.all(
    projects.map(async (project) => {
      const memberCount = await ProjectMember.countDocuments({
        project: project._id,
      });
      const membership = memberships.find(
        (m) => m.project.toString() === project._id.toString()
      );
      return { ...project, memberCount, role: membership?.role };
    })
  );

  return res
    .status(200)
    .json(new ApiResponse(200, data, "Projects fetched successfully"));
});

const getProjectById = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  const project = await Project.findById(projectId);
  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, project, "Project fetched successfully"));
});

const createProject = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  const project = await Project.create({
    name,
    description,
    createdBy: req.user._id,
  });

  // Creator is automatically added as an admin member.
  await ProjectMember.create({
    user: req.user._id,
    project: project._id,
    role: UserRolesEnum.ADMIN,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, project, "Project created successfully"));
});

const updateProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const { name, description } = req.body;

  const project = await Project.findByIdAndUpdate(
    projectId,
    { $set: { name, description } },
    { new: true }
  );

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, project, "Project updated successfully"));
});

const deleteProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  const project = await Project.findByIdAndDelete(projectId);
  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  await ProjectMember.deleteMany({ project: projectId });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Project deleted successfully"));
});

const getProjectMembers = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  const members = await ProjectMember.find({ project: projectId }).populate(
    "user",
    "username email fullName avatar"
  );

  return res
    .status(200)
    .json(new ApiResponse(200, members, "Project members fetched"));
});

const addMemberToProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const { email, role } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User with this email does not exist");
  }

  const existing = await ProjectMember.findOne({
    project: projectId,
    user: user._id,
  });
  if (existing) {
    throw new ApiError(409, "User is already a member of this project");
  }

  const member = await ProjectMember.create({
    user: user._id,
    project: projectId,
    role,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, member, "Member added successfully"));
});

const updateMemberRole = asyncHandler(async (req, res) => {
  const { projectId, userId } = req.params;
  const { role } = req.body;

  const member = await ProjectMember.findOneAndUpdate(
    { project: projectId, user: userId },
    { $set: { role } },
    { new: true }
  );

  if (!member) {
    throw new ApiError(404, "Member not found in this project");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, member, "Member role updated successfully"));
});

const deleteMember = asyncHandler(async (req, res) => {
  const { projectId, userId } = req.params;

  const member = await ProjectMember.findOneAndDelete({
    project: projectId,
    user: userId,
  });

  if (!member) {
    throw new ApiError(404, "Member not found in this project");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Member removed successfully"));
});

export {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getProjectMembers,
  addMemberToProject,
  updateMemberRole,
  deleteMember,
};
