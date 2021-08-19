import Projects from "../models/projects";
import Users from "../models/users";
import TaskLists from "../models/taskLists";
import Task from "../models/tasks";
import Contributions from "../models/contributions";
import TasksOrder from "../models/tasksOrder";
import Comments from "../models/comments";
import { model, Types } from "mongoose";

export async function getAllInvitedUser(userInfo) {
  const { userId } = userInfo;
  const task = await Contributions.aggregate([
    {
      $group: {
        _id: "$projectId",
        users: {
          $push: {
            userId: "$userId",
            roleId: "$roleId",
          },
        },
      },
    },
    {
      $match: {
        users: {
          $elemMatch: {
            $and: [
              { userId: Types.ObjectId(userId) },
              { roleId: Types.ObjectId("6116adfa723a11f42539b0e2") },
            ],
          },
        },
      },
    },
    {
      $project: {
        _id: 1,
        users: {
          $filter: {
            input: "$users",
            as: "users",
            cond: {
              $and: [
                {
                  $ne: ["$$users.userId", Types.ObjectId(userId)],
                },
              ],
            },
          },
        },
      },
    },
    { $match: { "users.0": { $exists: true } } },
    {
      $lookup: {
        from: "users",
        localField: "users.userId",
        foreignField: "_id",
        as: "users",
      },
    },
  ]);
  return task;
}
