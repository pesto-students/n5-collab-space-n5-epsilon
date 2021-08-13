// export async function getProjects(db) {
//   return db.collection("projects").find().toArray();
// }
import Projects from "../models/projects";
import Users from "../models/users";
import TaskLists from "../models/taskLists";
import Task from "../models/tasks";
import Roles from "../models/roles";
import Comments from "../models/comments";
import Contributions from "../models/contributions";
import { model, Types } from "mongoose";

export async function getProjectsInfo(userId) {
  try {
    const allProject = await Contributions.aggregate([
      {
        $match: {
          userId: Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "projects",
          localField: "projectId",
          foreignField: "_id",
          as: "projectLookups",
        },
      },
      {
        $unwind: {
          path: "$projectLookups",
        },
      },
      {
        $lookup: {
          from: "roles",
          localField: "roleId",
          foreignField: "_id",
          as: "roleLookups",
        },
      },
      {
        $unwind: {
          path: "$roleLookups",
        },
      },
      {
        $project: {
          _id: 0,
          projectId: 1,
          projectName: "$projectLookups.projectName",
          description: "$projectLookups.description",
          role: "$roleLookups.name",
        },
      },
    ]);
    return allProject;
  } catch (error) {
    console.log(error);
  }
}

export async function getProject(
  projectId,
  userId,
  projection = "",
  populate = ""
) {
  const ProjectArray = await Projects.aggregate([
    {
      $match: {
        _id: Types.ObjectId(projectId),
      },
    },
    {
      $lookup: {
        from: "tasklists",
        let: {
          projectId: "$_id",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$$projectId", "$projectId"],
              },
            },
          },
        ],
        as: "taskListLookups",
      },
    },
    {
      $unwind: {
        path: "$taskListLookups",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "tasks",
        let: {
          taskListId: "$taskListLookups._id",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$$taskListId", "$taskListId"],
              },
            },
          },
        ],
        as: "taskLookups",
      },
    },
    {
      $unwind: {
        path: "$taskLookups",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $group: {
        _id: "$taskListLookups._id",
        tasks: {
          $addToSet: "$taskLookups",
        },
        projectName: {
          $first: "$projectName",
        },
        description: {
          $first: "$description",
        },
        id: {
          $first: "$_id",
        },
        taskListName: {
          $first: "$taskListLookups.taskListName",
        },
      },
    },
    {
      $group: {
        _id: "$id",
        taskLists: {
          $addToSet: {
            _id: "$_id",
            taskListName: "$taskListName",
            task: "$tasks",
          },
        },
        projectName: {
          $first: "$projectName",
        },
        description: {
          $first: "$description",
        },
        id: {
          $first: "$id",
        },
      },
    },
    {
      $addFields: {
        taskLists: {
          $filter: {
            input: "$taskLists",
            cond: { $ifNull: ["$$this._id", false] },
          },
        },
      },
    },
    {
      $project: {
        id: 0,
      },
    },
  ]);
  const Project = ProjectArray[0];
  const userRoleArray = await Contributions.find(
    { projectId, userId },
    "roleId"
  )
    .populate("roleId")
    .exec();
  console.log("userRoleArray", userRoleArray);
  const userRole = userRoleArray[0];
  Project.roleInfo = userRole.roleId;

  return Project;
}
export async function insertProject(project, userId) {
  const newProject = new Projects(project);
  const savedNewProject = await newProject.save();
  const adminRoleArray = await Roles.find({ name: "Admin" });
  const adminRole = adminRoleArray[0];
  const newContribution = new Contributions({
    projectId: Types.ObjectId(savedNewProject._id),
    userId: Types.ObjectId(userId),
    roleId: Types.ObjectId(adminRole._id),
  });
  await newContribution.save();
  const response = {
    projectId: savedNewProject.projectId,
    description: savedNewProject.description,
    role: adminRole.name,
  };
  return response;
}

export async function deleteProject(projectId) {
  console.log("Delete projectId", projectId);
  const foundProjectInfo = await Projects.findOneAndDelete({ _id: projectId });
  await Contributions.findOneAndDelete({
    projectId: projectId,
  });
  return foundProjectInfo;
}

export async function updateProject(projectInfo) {
  const foundProjectInfo = await Projects.findOneAndUpdate(
    { _id: projectId },
    projectInfo,
    { upsert: true }
  );
  return foundProjectInfo;
}
