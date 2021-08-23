import React from "react";

function FilterBox({
  taskListsName,
  taskTagNames,
  setTaskTagFilter,
  setTaskTypeFilter,
}) {
  return (
    <div className="filter-box">
      <div className="filter-wrapper">
        <p>Task Type</p>
        <select onChange={(e) => setTaskTypeFilter(e.target.value)}>
          <option value="any">Any</option>
          {taskListsName.length &&
            taskListsName.map((taskListName) => {
              return (
                <option key={taskListName} value={taskListName}>
                  {taskListName}
                </option>
              );
            })}
        </select>
      </div>

      <div className="filter-wrapper">
        <p>Tag Type</p>
        <select onChange={(e) => setTaskTagFilter(e.target.value)}>
          <option value="any">Any</option>
          {Object.keys(taskTagNames).length &&
            Object.keys(taskTagNames).map((tagName) => {
              return (
                <option key={tagName} value={tagName}>
                  {tagName}
                </option>
              );
            })}
        </select>
      </div>
    </div>
  );
}

export default FilterBox;
