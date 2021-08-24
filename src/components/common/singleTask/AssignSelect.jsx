import React, { useState } from "react";
import { useRef } from "react";
import dynamic from "next/dynamic";
const SelectSearch = dynamic(() => import("react-select-search"), {
  ssr: false,
});
import CustomSelect from "../customSelect/CustomSelect";
import { toast } from "react-toastify";
import { assignTaskTo } from "../../../redux/actions/taskActions";
import { useDispatch } from "react-redux";
function AssignSelect({ taskId, assignedTo, allCollaborators }) {
  const dispatch = useDispatch();
  console.log("value", assignedTo);
  const searchInput = useRef();
  console.log("allCollaborators", allCollaborators);
  const collaboratorOptions = allCollaborators.map((user) => {
    return {
      _id: user.userId._id,
      name: user.userId.name,
      value: user.userId.email,
    };
  });
  const assignedToCollaborators = {
    _id: assignedTo._id,
    name: assignedTo.name,
    value: assignedTo.email,
  };
  const [value, setValue] = useState(assignedToCollaborators);
  const assignCollaboratorsHandler = (option) => {
    const selectedUserId = option._id;
    if (value._id === selectedUserId) {
      toast.info("Task Already Assigned to " + option.name);
    } else {
      setValue(option);
      toast.success("Task Assigned to " + option.name);
      const reassignTaskInfo = {
        taskId: taskId,
        assignedTo: selectedUserId,
      };
      dispatch(assignTaskTo(reassignTaskInfo));
    }
  };
  return (
    <div className="assigned-box">
      <span>Assigned to:</span>
      {collaboratorOptions.length > 0 && (
        <CustomSelect
          prompt="Assign To"
          options={collaboratorOptions}
          value={value}
          onChange={assignCollaboratorsHandler}
          label="name"
        />
      )}
    </div>
  );
}

export default AssignSelect;
