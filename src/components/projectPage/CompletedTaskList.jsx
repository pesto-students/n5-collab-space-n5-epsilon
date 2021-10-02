import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import DeleteStackIcon from "../iconComponents/DeleteStackIcon";
import Task from "./Task";

function CompletedTaskList({
  taskListsOrder,
  taskLists,
  layout,
  deleteTaskHandler,
  taskTypeFilter,
  taskTagFilter,
  taskAssignedFilter,
}) {
  const projectPageState = useSelector((state) => state.ProjectReducer);
  const projectInfo = projectPageState.projectInfo;
  const getStatusStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "#4dff863d" : "",
  });
  const completedTaskListMap = {};
  const tasks = taskListsOrder.map((taskListId) => {
    console.log(
      "taskLists[taskListId].task",
      taskLists,
      taskListId,
      taskLists[taskListId]?.task,
      taskLists[taskListId]?.task.length
    );

    const completedTask = Object.keys(taskLists[taskListId]?.task).map(
      (taskKey) => {
        if (
          taskLists[taskListId]?.task[taskKey].status.toLowerCase() ===
          "completed"
        ) {
          return taskLists[taskListId]?.task[taskKey];
        }
      }
    );
    completedTaskListMap[taskListId] = completedTask.filter(
      (task) => task !== undefined
    );
    return completedTask;
  });
  const merged = [].concat.apply([], tasks);
  const filterTasks = merged.filter((task) => task !== undefined);
  console.log("task", filterTasks, completedTaskListMap);
  return (
    <React.Fragment>
      <React.Fragment>
        <Droppable droppableId={"completed_task_list"} direction={layout}>
          {(provided, snapshot) => (
            <div
              className="taskList"
              ref={provided.innerRef}
              style={getStatusStyle(snapshot.isDraggingOver)}
            >
              <div className="list-header">
                <div className="header-content">
                  <h5>Completed</h5>
                </div>
              </div>
              <div className="list-wrapper">
                {Object.keys(completedTaskListMap).map((taskListId, index) => {
                  const filterTasks = completedTaskListMap[taskListId];
                  return !!filterTasks.length ? (
                    <>
                      <h6 key={taskListId}>
                        {projectInfo.taskLists[taskListId].taskListName}
                      </h6>
                      {filterTasks.map((taskObj, index) => {
                        let tagFilter = false;
                        let listFilter = false;
                        let userFilter = false;
                        if (taskTypeFilter && taskTypeFilter !== "any") {
                          listFilter = true;
                        } else {
                          listFilter = false;
                        }
                        if (taskTagFilter && taskTagFilter !== "any") {
                          tagFilter = true;
                        } else {
                          tagFilter = false;
                        }
                        if (
                          taskAssignedFilter &&
                          taskAssignedFilter !== "any"
                        ) {
                          userFilter = true;
                        } else {
                          userFilter = false;
                        }

                        return (
                          <>
                            {taskObj &&
                              (listFilter
                                ? taskTypeFilter.toLowerCase() ===
                                  "completed".toLowerCase()
                                : true) &&
                              (tagFilter
                                ? taskObj.tags?.includes(taskTagFilter)
                                : true) &&
                              (userFilter
                                ? taskObj.assignedTo === taskAssignedFilter
                                : true) &&
                              (taskObj.status
                                ? taskObj.status == "completed"
                                : true) && (
                                <>
                                  <Task
                                    key={taskObj._id}
                                    taskListId={taskObj.taskListId}
                                    deleteTaskHandler={deleteTaskHandler}
                                    index={index}
                                    task={taskObj}
                                    taskCssClassName={"task done"}
                                  />
                                </>
                              )}
                          </>
                        );
                      })}
                    </>
                  ) : null;
                })}

                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
      </React.Fragment>
    </React.Fragment>
  );
}

export default CompletedTaskList;
