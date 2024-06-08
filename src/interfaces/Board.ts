import { taskGetType } from "./Task";

export type boardListGetType = {
  id: number;
  title: string;
  columnsOrder: number[];
};

export type boardGetType = {
  id: number;
  title: string;
  itemsOrder?: number[];
  order: number;
  boardId: number;
  items?: taskGetType[];
};

export type foundBoardType = {
  id: number;
  columnsOrder: number[];
  title: string;
};

export type boardDataGetType = {
  columns: boardGetType[];
  foundBoard: foundBoardType;
};
export type createBoardType = {
  title: string;
};
