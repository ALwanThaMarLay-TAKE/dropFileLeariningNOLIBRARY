import React, { FormEvent, useRef, useState } from "react";
import type { ITask } from "../data/useTaskStore";
import { useDraggable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import useTaskStore from "../data/useTaskStore";
import { input } from "motion/react-client";
import { Reorder } from "motion/react";
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
    
    console.log(inputRef.current!.value);
    
    updateTask(todoTask.id, inputRef.current?.value!);


    setEdit(false);
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
        transform: `translate(${transform.x}px, ${transform.y}px) `,
      }
    : undefined;
  return (
    <div
      onDoubleClick={handleEdit}
      ref={setNodeRef}
      {...attributes} 
       {...listeners}

      // {...Listeners}
      //  {...Attributes}
      style={{
        // ...style ,
        ...Style ,
      }}
      key={todoTask.id}
      className={` p-5 flex  border bg-violet-900 border-slate-200 rounded-md mb-3 ${
        transform ? "z-50" : ""
      }  `}
    >
      <form action="" onSubmit={(e) => {e.preventDefault()
      console.log("submit")
    handleEditDone()
      } }>
        <input
          onBlur={handleEditDone}
          className={` ${
            edit ? "block" : "hidden"
          }  p-2 border text-black border-blue-300`}
          type="text"
          ref={inputRef}
          
        />
        <button className="hidden"></button>
      </form>

      <span className={` ${!edit ? "block" : "hidden"}`}> {todoTask.task}</span>
      
      {/* <pre {...attributes} {...listeners} className=" ml-auto">
        :::
      </pre> */}
      
    </div>
  );
};

export default Task;
