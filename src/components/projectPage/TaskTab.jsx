import React from "react";
import FilterBox from "../../../src/components/projectPage/FilterBox";
import TrashCanIcon from "../iconComponents/TrashCanIcon";
import VerticalAlignIcon from "../iconComponents/VerticalAlignIcon";
import HorizontalAlignIcon from "../iconComponents/HorizontalAlignIcon";
import CircularAddIcon from "../iconComponents/CircularAddIcon";
import TaskList from "../../../src/components/projectPage/TaskList";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import {
  deleteTask,
  moveTaskAction,
  reorderTask,
} from "../../../src/redux/actions/taskActions";
export default function TaskTab({
  projectInfo,
  taskListsName,
  taskTagNames,
  taskListsOrder,
  taskTypeFilter,
  taskAssignedFilter,
  addTaskListHandler,
  userPermission,
  layout,
  taskLists,
  taskTagFilter,
    toggle
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    if (result.destination.droppableId === "delete") {
      const taskName =
        projectInfo.taskLists[result.source.droppableId].task[
          result.draggableId
        ].name;
      dispatch(
        deleteTask({
          taskId: result.draggableId,
          taskListId: result.source.droppableId,
        })
      );
      toast.success(`Delete task ${taskName} Successfully `);
      return;
    }
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
            ...projectInfo.taskLists[result.destination.droppableId].tasksOrder,
          ],
        })
      );
    }
    if (result.destination.droppableId !== result.source.droppableId) {
      dispatch(
        moveTaskAction({
          taskId: result.draggableId,
          sourceTaskListId: result.source.droppableId,
          destinationTaskListId: result.destination.droppableId,
          initialIndex: result.source.index,
          finalIndex: result.destination.index,
          sourceTaskOrder: [
            ...projectInfo.taskLists[result.source.droppableId].tasksOrder,
          ],
          destinationTaskOrder: [
            ...projectInfo.taskLists[result.destination.droppableId].tasksOrder,
          ],
        })
      );
    }
  };
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="top-panel-row">
          <FilterBox
            taskListsName={taskListsName}
            taskTagNames={taskTagNames}
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
        </div>
      </DragDropContext>
    </>
  );
}
