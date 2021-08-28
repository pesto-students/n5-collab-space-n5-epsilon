import React from "react";
import FilterBox from "../../../src/components/projectPage/FilterBox";
import TrashCanIcon from "../iconComponents/TrashCanIcon";
import VerticalAlignIcon from "../iconComponents/VerticalAlignIcon";
import HorizontalAlignIcon from "../iconComponents/HorizontalAlignIcon";
import CircularAddIcon from "../iconComponents/CircularAddIcon";
import TaskList from "../../../src/components/projectPage/TaskList";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTask,
  moveTaskAction,
  reorderTask,
  updateTaskStatus,
} from "../../../src/redux/actions/taskActions";
import { toast } from "react-toastify";
import CompletedTaskList from "./CompletedTaskList";
export default function TaskTab({
  taskListsName,
  taskTagNames,
  projectUserNames,
  taskListsOrder,
  taskTypeFilter,
  taskAssignedFilter,
  addTaskListHandler,
  userPermission,
  layout,
  taskLists,
  taskTagFilter,
  toggle,
  setTaskTagFilter,
  setTaskTypeFilter,
  setTaskAssignedFilter,
}) {
  const router = useRouter();

  const projectPageState = useSelector((state) => state.ProjectReducer);
  const projectInfo = projectPageState.projectInfo;
  console.log("projectInfo", projectInfo);
  const dispatch = useDispatch();

  const getTaskListIdByTaskId = (taskId) => {
    const taskList = Object.keys(projectInfo.taskLists).map((taskListsId) => {
      console.log(
        taskId,
        taskListsId,
        Object.keys(projectInfo.taskLists[taskListsId].task).includes(taskId)
      );
      if (
        Object.keys(projectInfo.taskLists[taskListsId].task).includes(taskId)
      ) {
        const taskListInfo = {
          taskListsId: projectInfo.taskLists[taskListsId]._id,
          task: projectInfo.taskLists[taskListsId].task[taskId],
          taskIndex:
            projectInfo.taskLists[taskListsId].tasksOrder.indexOf(taskId),
        };
        return taskListInfo;
      }
    });
    const merged = [].concat.apply([], taskList);
    const filterTasks = merged.filter((task) => task !== undefined);
    console.log("filterTasks", filterTasks);
    return filterTasks.length > 0 ? filterTasks[0] : null;
  };

  const onDragEnd = (result) => {
    console.log(result);
    if (!result.destination) {
      return;
    }
    if (result.destination.droppableId === "delete") {
      dispatch(
        deleteTask({
          taskId: result.draggableId,
          taskListId: result.source.droppableId,
        })
      );
      toast.success(`Deleted task Successfully `);
      return;
    } else {
      if (result.destination.droppableId === "completed_task_list") {
        if (result.destination.droppableId === result.source.droppableId) {
          return;
        }
        const taskInfo = {
          taskId: result.draggableId,
          taskListId: result.source.droppableId,
          status: "completed",
        };
        dispatch(updateTaskStatus(taskInfo));
        toast.success(`task Done.... Well Done!!!`);
        return;
      } else {
        if (result.source.droppableId === "completed_task_list") {
          if (result.destination.droppableId === result.source.droppableId) {
            return;
          }
          const { taskListsId, task, taskIndex } = getTaskListIdByTaskId(
            result.draggableId
          );
          console.log(taskListsId, task, taskIndex);
          dispatch(
            updateTaskStatus({
              taskListId: taskListsId,
              taskId: task._id,
              status: "inactive",
            })
          );
          if (result.destination.droppableId == taskListsId) {
            dispatch(
              reorderTask({
                taskId: result.draggableId,
                initialIndex: taskIndex,
                finalIndex: result.destination.index,
                taskListId: result.destination.droppableId,
                tasksOrder: [
                  ...projectInfo.taskLists[result.destination.droppableId]
                    .tasksOrder,
                ],
              })
            );
          } else {
            dispatch(
              moveTaskAction({
                taskId: result.draggableId,
                sourceTaskListId: taskListsId,
                destinationTaskListId: result.destination.droppableId,
                initialIndex: taskIndex,
                finalIndex: result.destination.index,
                sourceTaskOrder: [
                  ...projectInfo.taskLists[taskListsId].tasksOrder,
                ],
                destinationTaskOrder: [
                  ...projectInfo.taskLists[result.destination.droppableId]
                    .tasksOrder,
                ],
              })
            );
          }

          return;
        } else {
          if (result.destination.droppableId === result.source.droppableId) {
            if (result.destination.index === result.source.index) {
              return;
            }
            dispatch(
              reorderTask({
                taskId: result.draggableId,
                initialIndex: result.source.index,
                finalIndex: result.destination.index,
                taskListId: result.destination.droppableId,
                tasksOrder: [
                  ...projectInfo.taskLists[result.destination.droppableId]
                    .tasksOrder,
                ],
              })
            );
          } else {
            if (result.destination.droppableId !== result.source.droppableId) {
              dispatch(
                moveTaskAction({
                  taskId: result.draggableId,
                  sourceTaskListId: result.source.droppableId,
                  destinationTaskListId: result.destination.droppableId,
                  initialIndex: result.source.index,
                  finalIndex: result.destination.index,
                  sourceTaskOrder: [
                    ...projectInfo.taskLists[result.source.droppableId]
                      .tasksOrder,
                  ],
                  destinationTaskOrder: [
                    ...projectInfo.taskLists[result.destination.droppableId]
                      .tasksOrder,
                  ],
                })
              );
            }
          }
        }
      }
    }
  };
  const deleteTaskHandler = (taskListId, taskId) => {
    dispatch(
      deleteTask({
        taskId: taskId,
        taskListId: taskListId,
      })
    );
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="top-panel-row">
          <FilterBox
            taskListsName={taskListsName}
            taskTagNames={taskTagNames}
            projectUserNames={projectUserNames}
            setTaskTagFilter={setTaskTagFilter}
            setTaskTypeFilter={setTaskTypeFilter}
            setTaskAssignedFilter={setTaskAssignedFilter}
          />
          <div className="layout-toggle">
            <Droppable droppableId="delete">
              {(provided, snapshot) => (
                <span
                  ref={provided.innerRef}
                  className={`icon trash-can`}
                  data-position="delete"
                  key={"delete"}
                >
                  <TrashCanIcon />
                </span>
              )}
            </Droppable>
            <span
              className={`icon ${layout === "vertical" ? "active" : ""}`}
              onClick={() => {
                toggle("vertical");
              }}
            >
              <VerticalAlignIcon />
            </span>
            <span
              className={`icon ${layout === "horizontal" ? "active" : ""}`}
              onClick={() => {
                toggle("horizontal");
              }}
            >
              <HorizontalAlignIcon />
            </span>
          </div>
        </div>
        <div className="taskListContainer">
          {taskListsOrder &&
            taskListsOrder.map((taskListId) => {
              return (
                <TaskList
                  key={taskListId}
                  taskListKey={taskListId}
                  taskList={taskLists[taskListId]}
                  layout={layout || "Vertical"}
                  taskTypeFilter={taskTypeFilter}
                  taskTagFilter={taskTagFilter}
                  taskAssignedFilter={taskAssignedFilter}
                  deleteTaskHandler={deleteTaskHandler}
                />
              );
            })}

          {userPermission.hasOwnProperty("taskList") &&
            userPermission.taskList.includes("Create") && (
              <button className="add-task-list" onClick={addTaskListHandler}>
                <CircularAddIcon />
                <span>Add New Task List</span>
              </button>
            )}
          <CompletedTaskList
            taskListsOrder={taskListsOrder}
            taskLists={taskLists}
            layout={layout}
            taskTypeFilter={taskTypeFilter}
            taskTagFilter={taskTagFilter}
            taskAssignedFilter={taskAssignedFilter}
            deleteTaskHandler={deleteTaskHandler}
          />
        </div>
      </DragDropContext>
    </>
  );
}
