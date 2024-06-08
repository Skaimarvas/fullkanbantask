"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface Iprops {
  boards: any;
  selectedBoard: any;
  handleSelect: any;
}

const BoardHistorySelector: React.FC<Iprops> = ({
  boards,
  selectedBoard,
  handleSelect,
}) => (
  <Select value={selectedBoard} onValueChange={handleSelect}>
    <SelectTrigger className="w-[180px]">
      <SelectValue placeholder="Recent Visits" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Board</SelectLabel>
        {boards?.map((board: any) => (
          <SelectItem key={board.id} value={String(board.id)}>
            {board.title}
          </SelectItem>
        ))}
      </SelectGroup>
    </SelectContent>
  </Select>
);

export default BoardHistorySelector;
