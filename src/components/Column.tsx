import { useDroppable } from "@dnd-kit/core";
import useTaskStore, { ITask } from "../data/useTaskStore";
import Task from "./Task";
import { Reorder } from "motion/react";
import { useEffect, useState } from "react";
// import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

interface IColumnProps {
  className: string;
  title: string;
}

const Column = ({ className, title }: IColumnProps) => {
  const { tasks } = useTaskStore();
  const filterTasks = tasks.filter((task: ITask) => task.status === title);

  const [items, setItems] = useState<ITask[]>(filterTasks);

  const { isOver, setNodeRef } = useDroppable({
    id: title,
  });
  const moveIndex = (arr: typeof items, from: number, to: number) => {
    const currentItem = arr!.find((el) => el.id === from);
    arr!.splice(from, 1);
    arr!.splice(to, 0, currentItem!);
  };
  useEffect(() => {
    const filterTasks = tasks.filter((task: ITask) => task.status === title);

    setItems(filterTasks);
  }, [tasks]);

  return (
    <div className={` text-white ${className} `}>
      <h2 className=" text-2xl font-bold text-blue-500 ">{title}</h2>
      {/* <SortableContext 
      items={items}
      strategy={verticalListSortingStrategy}> */}
      <Reorder.Group
        axis="y"
        values={items!}
        onReorder={setItems}
        ref={setNodeRef}
        className={` min-h-full
            border-2 mt-3   border-blue-400  ${
              isOver ? "border-green-500" : ""
            }   rounded-md p-3`}
      >
        {items!?.map((todoTask) => (
          <Reorder.Item key={todoTask.id} value={todoTask}>
            <Task todoTask={todoTask}  />
          </Reorder.Item> 
        ))}
      </Reorder.Group>
      {/* </SortableContext> */}
    </div>
  );
};

export default Column;
