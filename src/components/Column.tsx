import { DragOverlay, useDroppable } from "@dnd-kit/core";
import useTaskStore, { ITask } from "../data/useTaskStore";
import Task from "./Task";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

interface IColumnProps {
  className: string;
  title: string;
}

const Column = ({ className, title }: IColumnProps) => {
  const { tasks } = useTaskStore();
  const items = tasks.filter((task: ITask) => task.status === title)
  
  const { isOver, setNodeRef } = useDroppable({
    id: title,
  });

  return (
    <div className={` text-white ${className} `}>
      <h2 className=" text-2xl font-bold text-blue-500 ">{title}</h2>
      {/* <SortableContext 
      items={items}
      strategy={verticalListSortingStrategy}> */}
      <ul
        ref={setNodeRef}
        className={` min-h-full
            border-2 mt-3   border-blue-400  ${
          isOver ? "border-green-500" : ""
        }   rounded-md p-3`}
      >
        {items.map((todoTask) => (
            <Task key={todoTask.id} todoTask={todoTask} />
          ))}
      </ul>
      {/* </SortableContext> */}
    </div>
  );
};

export default Column;
