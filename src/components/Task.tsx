import React, { FormEvent, useRef, useState } from "react";
import type { ITask } from "../data/useTaskStore";
import { useDraggable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import useTaskStore from "../data/useTaskStore";
type TaskProps = {
  todoTask: ITask;
};
const Task = ({ todoTask }: TaskProps) => {
  const [edit, setEdit] = useState<boolean>(false);
  const { updateTask } = useTaskStore();

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: todoTask.id,
  });
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleEdit = () => {
    setEdit(true);
    console.log("start edit");
  };
  const handleEditDone = () => {
    console.log(inputRef.current?.value);
    console.log("done");
    // updateTask(todoTask.id , inputRef.current!.value )
  };
  const handleChange = (e: FormEvent) => {
    e.preventDefault();
   console.log(inputRef.current)
  };

  //? this is for sortAbleItems
  //   const {
  //     attributes : Attributes,
  //     listeners : Listeners,
  // setNodeRef,
  //     transform : Transform,
  //     transition

  //   } = useSortable({id: todoTask.id});
  // const style = Transform ? {
  //   transform: `translate3d(${Transform.x}px, ${Transform.y}px, 0)` ,
  //   transition
  // } : undefined;
  const Style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;
  return (
    <li
      onDoubleClick={handleEdit}
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      // {...Listeners}
      //  {...Attributes}
      style={{
        // ...style ,
        ...Style,
      }}
      key={todoTask.id}
      className={` p-5 border bg-violet-900 border-slate-200 rounded-md mb-3 ${
        transform ? "z-10" : ""
      }  `}
    >
      <form action="" onSubmit={handleEditDone}>
        <input
          onBlur={handleEditDone}
          className={` ${
            edit ? "block" : "hidden"
          }  p-2 border text-black border-blue-300`}
          type="text"
          onChange={handleChange}
        />
        <button className="hidden"></button>
      </form>

      <span className={` ${!edit ? "block" : "hidden"}`}> {todoTask.task}</span>
    </li>
  );
};

export default Task;
