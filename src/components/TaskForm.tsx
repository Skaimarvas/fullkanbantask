"use client";

import { Select } from "@radix-ui/react-select";
import React from "react";
import { TaskFormSchemaType } from "./Column";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";

const colors = [
  { class: "bg-[#C340A1]", label: "Pink" },
  { class: "bg-[#6A6DCD]", label: "Purple" },
  { class: "bg-[#D93535]", label: "Red" },
  { class: "bg-[#307FE2]", label: "Dark Blue (Default)" },
  { class: "bg-[#00A88B]", label: "Green" },
];

interface Iprops {
  form: any;
  onSubmit: (values: TaskFormSchemaType) => void;
  onCancel: () => void;
}

const TaskForm: React.FC<Iprops> = ({ form, onSubmit, onCancel }) => (
  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Task Name</FormLabel>
            <FormControl>
              <Input placeholder="Task Name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea placeholder="Description" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="status"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Status</FormLabel>
            <FormControl>
              <Input placeholder="Status" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="color"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Color</FormLabel>
            <FormControl>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a color" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Color</SelectLabel>
                    {colors.map((color, index) => (
                      <SelectItem
                        className={`${color.class}`}
                        key={index}
                        value={color.class}
                      >
                        {color.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex flex-row gap-2 justify-end">
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="submit" variant="secondary">
          Submit
        </Button>
      </div>
    </form>
  </Form>
);

export default TaskForm;
