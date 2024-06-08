import { createTaskType } from "@/interfaces/Task";
import axios from "axios";

export const createTaskRequest = (form: createTaskType) =>
  axios.post(`/task`, form);

export const updateTaskOrderRequest = ({
  columnId,
  updatedTaskOrder,
  itemId,
  newColumnId,
}: {
  columnId: number;
  updatedTaskOrder: any[];
  itemId?: number;
  newColumnId?: number;
}) =>
  axios.put(`/task/move`, { columnId, updatedTaskOrder, itemId, newColumnId });
