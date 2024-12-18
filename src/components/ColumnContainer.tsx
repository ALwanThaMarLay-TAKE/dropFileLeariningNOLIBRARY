import React from "react";
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

  const getTaskId = (id: number) => {
    return tasks.findIndex((el) => el.id === id);
  };
  const handleDragEnd = (e: DragEndEvent) => {
    const { over, active } = e;

    if (over!.id == active.id || !over) return;
    console.log(over, active);
    const statusColumn = over?.id as StatusType | number;
    const TaskId = active.id as number;
    if (typeof over!.id === "number") {
      const oldIndex = getTaskId(active.id as number);
      const newIndex = getTaskId(over!.id);
      const newPosiArray = arrayMove(tasks, oldIndex, newIndex);
      setTasksPosi(newPosiArray);
    }else{

      setStatus(TaskId , statusColumn as StatusType)
    }
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
