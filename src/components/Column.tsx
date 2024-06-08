"use client";

import { createTaskRequest } from "@/api/controller/TaskController";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import TaskForm from "./TaskForm";
import { Button } from "./ui/button";

const defaultTask = {
  title: "",
  description: "",
  status: "",
  color: "",
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
  description: z.string(),
  status: z.string(),
  color: z.string(),
});

export type TaskFormSchemaType = z.infer<typeof formSchema>;
interface Iprops {
  itemsOrder: any;
  id: any;
  ITEMS: any;
  boardId: number;
  onTaskCreated: () => void;
}

const Column: React.FC<Iprops> = ({
  itemsOrder,
  id,
  ITEMS,
  onTaskCreated,
  boardId,
}) => {
  const [newTask, setNewTask] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultTask,
  });

  const createTask = useMutation({
    mutationFn: createTaskRequest,
    onSuccess: () => {
      toast.success("Task was created successfully!");
      setNewTask(false);
      form.reset();
      onTaskCreated();
    },
  });

  const handleTask = () => {
    setNewTask(false);
    form.reset();
  };

  const onTaskSubmit = async (values: z.infer<typeof formSchema>) => {
    createTask.mutate({ ...values, columnId: id, boardId });
  };

  return (
    <Droppable droppableId={`column-${id}`}>
      {(provided: any) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="flex flex-col w-full h-fit gap-2"
        >
          {ITEMS &&
            itemsOrder.map((item_id: any, index: any) => {
              const item = ITEMS[item_id];
              const bgcolor = item.color;

              return (
                <Draggable
                  draggableId={`item-${item_id}`}
                  index={index}
                  key={item.id}
                >
                  {(provided) => (
                    <div
                      className={`flex flex-col ${bgcolor}  rounded-lg p-6`}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                    >
                      <h4 className=" text-base font-bold "> {item.title} </h4>
                      <p className="text-sm text-left">{item.description}</p>
                      {item.status && (
                        <div className="px-1 border border-white w-fit ">
                          <span className="text-sm"> {item.status} </span>
                        </div>
                      )}
                    </div>
                  )}
                </Draggable>
              );
            })}
          {(!newTask && (
            <Button variant="secondary" onClick={() => setNewTask(true)}>
              + Create Task
            </Button>
          )) || (
            <TaskForm
              form={form}
              onSubmit={onTaskSubmit}
              onCancel={handleTask}
            />
          )}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Column;
