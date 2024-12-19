import React, { act } from "react";
import Column from "./Column";
import type { StatusType } from "../data/useTaskStore";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import useTaskStore from "../data/useTaskStore";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

const ColumnContainer = () => {
  const { setStatus, tasks, setTasksPosi } = useTaskStore();
  // const sensors = useSensors(
  //   useSensor(PointerSensor),
  //   useSensor(TouchSensor),
  //   useSensor(KeyboardSensor, {
  //     coordinateGetter: sortableKeyboardCoordinates,
  //   })
  // );

console.table(tasks)
  const handleDragEnd = (e: DragEndEvent) => {
    const { over, active } = e;
     const currentItemStatus = tasks.find(el => el.id === active.id)?.status

    if (over!.id == active.id || !over || currentItemStatus === over!.id) return;
  
    const statusColumn = over?.id as StatusType | number;
    const TaskId = active.id as number;
    setStatus(TaskId , statusColumn as StatusType)

  };
  return (
    <div className=" flex flex-grow mb-3 gap-8 items-stretch ">
      <DndContext
        onDragEnd={handleDragEnd}
        // sensors={sensors}
        // collisionDetection={closestCenter}
      >
        <Column className=" basis-1/3 " title="TODO" />
        <Column className=" basis-1/3 " title="PROGRESS" />
        <Column className=" basis-1/3 " title="DONE" />
      </DndContext>
    </div>
  );
};

export default ColumnContainer;
