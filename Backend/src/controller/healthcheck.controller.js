import { ApiResponse } from "../error/APiResponse.js";
import { asyncHandler } from "../utils/asynchandler.js";

// const healthCheck = async (req, res) => {
//   try {
//     // const user = await getUserFromDB();
//     res
//       .status(200)
//       .json(new ApiResponse(200, { message: "Server is running" }));
//   } catch (error) {
//     // next(err);
//   }
// };

const healthCheck = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, { message: "Server is running" }));
});
export { healthCheck };