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
import TaskListsOrder from "../models/taskListsOrder";
import { model, Types } from "mongoose";

const convertArrayToObject = (array, key) => {
  const initialValue = {};
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: item,
    };
  }, initialValue);
};

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
  } catch (err) {
    return {};
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
        from: "tasks.order",
        localField: "taskListLookups._id",
        foreignField: "taskListsId",
        as: "string",
      },
    },
    {
      $addFields: {
        "taskListLookups.tasksOrder": "$string.tasksOrder",
      },
    },
    {
      $unwind: {
        path: "$taskListLookups.tasksOrder",
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
        tasksOrder: {
          $first: "$taskListLookups.tasksOrder",
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
            tasksOrder: "$tasksOrder",
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
            cond: {
              $ifNull: ["$$this._id", false],
            },
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
  const userRole = userRoleArray[0];
  Project.roleInfo = userRole.roleId;

  Project.taskLists = Project.taskLists.map((taskList) => {
    taskList.task = convertArrayToObject(taskList.task, "_id");
    return taskList;
  });
  Project.taskLists = convertArrayToObject(Project.taskLists, "_id");
  const taskListsOrder = await TaskListsOrder.find(
    {
      projectId: Types.ObjectId(Project._id),
    },
    "taskListsOrder"
  );
  Project.taskListsOrder = taskListsOrder[0].taskListsOrder;

  return Project;
}
export async function insertProject(project, userId) {
  try {
    const adminRoleArray = await Roles.find({ name: "Admin" });
    const adminRole = adminRoleArray[0];

    const newProject = new Projects(project);
    const savedNewProject = await newProject.save();
    const newContribution = new Contributions({
      projectId: Types.ObjectId(savedNewProject._id),
      userId: Types.ObjectId(userId),
      roleId: Types.ObjectId(adminRole._id),
    });

    const taskListsOrder = new TaskListsOrder({
      projectId: Types.ObjectId(savedNewProject._id),
      taskListsOrder: [],
    });

    await newContribution.save();
    await taskListsOrder.save();

    const response = {
      projectId: savedNewProject._id,
      projectName: savedNewProject.projectName,
      description: savedNewProject.description,
      role: adminRole.name,
    };
    return response;
  } catch (error) {
    return {};
  }
}

export async function deleteProject(projectId) {
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

export async function addUserToProject(inviteUserInfo) {
  try {
    const { projectId, userEmail } = inviteUserInfo;
    console.log("inviteUserInfo", inviteUserInfo);
    const guestRoleArray = await Roles.find({ name: "Guest" });
    const guestRole = guestRoleArray[0];
    console.log(guestRole);
    const User = await Users.findOne({ email: userEmail });
    console.log(User, guestRole, inviteUserInfo);
    if (User) {
      const newContribution = new Contributions({
        projectId: Types.ObjectId(projectId),
        userId: Types.ObjectId(User._id),
        roleId: Types.ObjectId(guestRole._id),
      });
      const savedNewContribution = await newContribution.save();
      console.log("savedNewContribution", savedNewContribution);
      return savedNewContribution;
    } else {
      return { error: "User not found" };
    }
  } catch (error) {
    console.log(error);
  }
}
export async function removeUserFoProject(removeUserInfo) {
  console.log(removeUserInfo);
  const { projectId, userId, userToBeRemovedId } = removeUserInfo;
  const allRolesArray = await Roles.find({});
  const adminRole = allRolesArray.map((role) => role.name == "Admin");
  const guestRole = allRolesArray.map((role) => role.name == "Guest");
  if (userId === userToBeRemovedId) {
    const userContribution = await Contributions.find({
      projectId: Types.ObjectId(projectId),
      userId: Types.ObjectId(userId),
    });
    if (userContribution.roleId == guestRole._id) {
      const deletedContribution = await Contributions.findOneAndDelete({
        projectId: Types.ObjectId(projectId),
        userId: Types.ObjectId(userId),
      }).exec();
      return deletedContribution;
    }
  } else {
    const ProjectOwner = await Contributions.find({
      projectId: Types.ObjectId(projectId),
      userId: Types.ObjectId(userId),
    });
    if (ProjectOwner.roleId == adminRole._id) {
      const deletedContribution = await Contributions.findOneAndDelete({
        projectId: Types.ObjectId(projectId),
        userId: Types.ObjectId(userToBeRemovedId),
      }).exec();
      return deletedContribution;
    }
    return {};
  }
}
