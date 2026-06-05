import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ProjectMember } from "../models/projectmember.model.js";
import { ApiError } from "../error/ApiError.js";
import { asyncHandler } from "../utils/asynchandler.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "Unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
    );

    if (!user) {
      throw new ApiError(401, "Invalid access token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});

// Checks that the logged-in user belongs to the project in req.params.projectId
// and that their role is one of the allowed roles for the route.
export const validateProjectPermission = (roles = []) =>
  asyncHandler(async (req, res, next) => {
    const { projectId } = req.params;

    if (!projectId) {
      throw new ApiError(400, "Invalid project id");
    }

    const member = await ProjectMember.findOne({
      project: projectId,
      user: req.user._id,
    });

    if (!member) {
      throw new ApiError(403, "You are not a member of this project");
    }

    if (!roles.includes(member.role)) {
      throw new ApiError(
        403,
        "You do not have permission to perform this action"
      );
    }

    req.member = member;
    next();
  });
