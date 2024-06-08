export type createTaskType = {
  title: string;
  description?: string;
  status?: string;
  color?: string;
  columnId: number;
  boardId: number;
};

export type taskGetType = {
  boardId: number;
  color: string;
  columnId: number;
  description?: string;
  id: number;
  order: number;
  status?: string;
  title: string;
};
