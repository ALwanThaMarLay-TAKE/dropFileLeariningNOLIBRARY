import { create } from "zustand";

export interface ITask {
  id: number;
  task: string;
  status: StatusType;
}
export type StatusType = "TODO" | "PROGRESS" | "DONE";

interface Store {
  tasks: ITask[];
  setStatus: (id: number, status: StatusType) => void;
  setTasksPosi: (newTaskArr: ITask[]) => void;
  deletTask: (id: number) => void;
  addTask: (task: ITask) => void;
  updateTask: (id: number, newTask: string) => void;
}

const useTaskStore = create<Store>((set) => ({
  tasks: [
    {
      id: 1,
      task: "Learn TypeScript",
      status: "TODO", // Options: "TODO", "PROGRESS", "DONE"
    },
    {
      id: 2,
      task: "Build a Todo App",
      status: "PROGRESS",
    },
    {
      id: 3,
      task: "Implement Drag-and-Drop",
      status: "DONE",
    },
  ],
  setStatus: (id, status) =>
    set((state) => ({
      tasks: state.tasks.map((el) =>
        el.id === id ? { ...el, status: status } : el
      ),
    })),
  setTasksPosi: (newTaskArr) =>
    set((state) => ({
      tasks: newTaskArr,
    })),
    updateTask: (id, newTask) =>
    set((state) => ({
      tasks: state.tasks.map((el) =>
        el.id === id ? { ...el, task: newTask } : el
      ),
    })),
  deletTask: (id: number) =>
    set((state) => ({
      tasks: state.tasks.filter((el) => el.id !== id),
    })),
  addTask: (task: ITask) => set((state) => ({ tasks: [...state.tasks, task] })),
}));
export default useTaskStore;
