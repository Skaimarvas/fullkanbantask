import {
  boardDataGetType,
  boardListGetType,
  createBoardType,
} from "@/interfaces/Board";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getKanbanBoardQuery = (id: number) =>
  useQuery({
    queryKey: ["kanbanBoard", id],
    queryFn: () => getKanbanBoardRequest(id),
  });

export const getKanbanBoardRequest = (id: number): Promise<boardDataGetType> =>
  axios.get(`/kanban/${id}`).then((res) => res.data);

export const getKanbanBoardListQuery = () =>
  useQuery({
    queryKey: ["kanbanBoardList"],
    queryFn: () => getKanbanBoardListRequest(),
  });

export const getKanbanBoardListRequest = (): Promise<boardListGetType[]> =>
  axios.get(`/kanbanlist`).then((res) => res.data);

export const createKanbanBoardRequest = (form: createBoardType) =>
  axios.post(`/kanban`, form);

export const updateColumnOrderRequest = ({
  boardDataId,
  updatedColumnOrders,
}: {
  boardDataId: number;
  updatedColumnOrders: any[];
}) => axios.put(`/kanban`, { boardDataId, updatedColumnOrders });
