// export async function getProjects(db) {
//   return db.collection("projects").find().toArray();
// }
import Projects from "../models/projects";
import Users from "../models/users";
import TaskLists from "../models/taskLists";
import Task from "../models/tasks";
import Comments from "../models/comments";
import { model, Types } from "mongoose";

export async function getProjectsInfo(
  projection = "projectName description",
  populate = ""
) {
  const allProject = await Projects.find({}, projection)
    .lean()
    .populate(populate)
    .exec();
  return allProject;
}
export async function getProject(projectId, projection = "", populate = "") {
  const Project = await Projects.aggregate([
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
  return Project[0];
}
export async function insertProject(project) {
  project.projectOwner = Types.ObjectId(project.projectOwner);
  const newProject = new Projects(project);
  const saveNewProject = await newProject.save();
  return saveNewProject;
}

export async function deleteProject(projectId) {
  const foundProjectInfo = Projects.findOneAndDelete({ _id: projectId });
  return foundProjectInfo;
}

export async function updateProject(projectInfo) {
  const foundProjectInfo = Projects.findOneAndUpdate(
    { _id: projectId },
    projectInfo,
    { upsert: true }
  );
  return foundProjectInfo;
}
