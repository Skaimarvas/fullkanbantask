"use client";

import {
  createKanbanBoardRequest,
  getKanbanBoardListQuery,
} from "@/api/controller/BoardController";
import { Button } from "@/components/ui/button";

import BoardForm from "@/components/BoardForm";
import BoardSelector from "@/components/BoardSelector";
import { Separator } from "@/components/ui/separator";
import { boardListGetType } from "@/interfaces/Board";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
const inter = Inter({ subsets: ["latin"] });

const defaultBoard = {
  title: "",
};

const formSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "The board name must contain at least 2 characters.",
    })
    .max(20, {
      message: "The board name must not exceed 20 characters.",
    }),
});

export type BoardFormSchemaType = z.infer<typeof formSchema>;

export default function Home() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultBoard,
  });
  const [selectedBoard, setSelectedBoard] = useState();

  const { data, refetch, isFetched } = getKanbanBoardListQuery();
  const [boards, setBoards] = useState<boardListGetType[]>();

  const [isBoard, setIsBoard] = useState<boolean>(false);

  const createBoard = useMutation({
    mutationFn: createKanbanBoardRequest,
    onSuccess: () => {
      toast.success("Board was created successfully!");
      setIsBoard(false);
      form.reset();
      refetch();
    },
    onError: (error) => {
      console.error("Failed to create board:", error);
    },
  });

  const onBoardSubmit = (values: z.infer<typeof formSchema>) => {
    createBoard.mutate(values);
  };

  const handleSelect = (value: string) => {
    setSelectedBoard(value as any);
    if (value) {
      router.replace(`/kanban/${value}`);
    }
  };

  const handleIsBoard = () => {
    setIsBoard(false);
    form.reset();
  };

  useEffect(() => {
    if (isFetched) {
      setBoards(data);
    }
  }, [data, isFetched]);

  return (
    <main
      className={`flex min-h-screen w-full flex-col justify-center items-center gap-4 p-4 ${inter.className}`}
    >
      <BoardSelector
        boards={boards}
        selectedBoard={selectedBoard}
        handleSelect={handleSelect}
      />
      <Separator className="my-4 w-[180px]" />
      {!isBoard ? (
        <Button
          className="w-[180px]"
          variant="secondary"
          onClick={() => setIsBoard(true)}
        >
          Create New Board
        </Button>
      ) : (
        <BoardForm
          form={form}
          onSubmit={onBoardSubmit}
          onCancel={handleIsBoard}
        />
      )}
    </main>
  );
}
