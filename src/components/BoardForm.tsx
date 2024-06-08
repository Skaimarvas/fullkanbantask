"use client";

import { BoardFormSchemaType } from "@/pages";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

interface Iprops {
  form: any;
  onSubmit: (values: BoardFormSchemaType) => void;
  onCancel: () => void;
}

const BoardForm: React.FC<Iprops> = ({ form, onSubmit, onCancel }) => (
  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Board Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter a board name" {...field} />
            </FormControl>
            <FormDescription>This is your board name.</FormDescription>
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

export default BoardForm;
