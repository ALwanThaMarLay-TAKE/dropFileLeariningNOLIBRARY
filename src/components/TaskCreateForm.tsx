import React, { FormEvent, useRef } from "react";
import useTaskStore from "../data/useTaskStore";

const TaskCreateForm = () => {
  const { addTask, tasks } = useTaskStore();
  const ref = useRef<HTMLInputElement | null>(null);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(ref.current!.value)
    if ((ref.current!.value === "")) return;

   
    addTask({
      id: tasks.length + 1,
      task: ref.current!.value,
      status: "TODO",
    });
    ref.current!.value = "";
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="mb-3 flex items-stretch justify-center w-full "
    >
      <input
        ref={ref}
        className=" focus:outline-none  rounded-e-none border w-[60%] rounded py-2 px-1  border-violet-500 "
        type="text"
      />
      <button className=" bg-violet-600 p-2 rounded-s-none rounded-e">
        Add
      </button>
    </form>
  );
};

export default TaskCreateForm;
