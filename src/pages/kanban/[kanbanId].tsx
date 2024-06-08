"use client";

import {
  getKanbanBoardQuery,
  updateColumnOrderRequest,
} from "@/api/controller/BoardController";
import { updateTaskOrderRequest } from "@/api/controller/TaskController";
import Column from "@/components/Column";
import KanbanHeader from "@/components/KanbanHeader";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const KanbanPage = () => {
  const router = useRouter();
  const { kanbanId } = router.query;

  // Show a loading state if kanbanId is not yet available
  if (!kanbanId) {
    return <div>Loading...</div>;
  }
  const {
    data: kanbanList,
    isFetched,
    refetch,
  } = getKanbanBoardQuery(Number(kanbanId));

  const [columnsOrder, setColumnsOrder] = useState<any>();
  const [kanbanData, setKanbanData] = useState<any>({});
  const [items, setItems] = useState<any>({});

  const updateColumnsOrder = useMutation({
    mutationFn: updateColumnOrderRequest,
    onSuccess: () => {
      console.log("Columns Order was updated succesfully");
    },
  });

  const updateTaskOrder = useMutation({
    mutationFn: updateTaskOrderRequest,
    onSuccess: () => {
      console.log("Task Order was updated succesfully");
    },
  });
  // Handle drag-and-drop events
  const handleDragDrop = (results: any) => {
    const { source, destination, type } = results;
    // Return if there's no valid destination
    if (!destination) {
      return;
    }
    // Return if the source and destination are the same
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const sourceIndex = source.index;
    const destinationIndex = destination.index;

    // Handling column reordering
    if (type === "COLUMN") {
      // Reorder columns based on the drag-and-drop action
      const reorderedColumns = [...columnsOrder];
      const [removedItem] = reorderedColumns.splice(sourceIndex, 1);
      reorderedColumns.splice(destinationIndex, 0, removedItem);

      setColumnsOrder(reorderedColumns);

      const numberedOrder = reorderedColumns.map((or) =>
        Number(or.substring(7))
      );
      {
        kanbanList?.foundBoard?.id &&
          updateColumnsOrder.mutateAsync({
            boardDataId: kanbanList?.foundBoard?.id,
            updatedColumnOrders: numberedOrder,
          });
      }

      return;
    } else {
      // Handling task reordering within the same column
      if (source.droppableId === destination.droppableId) {
        const source_col_id = source.droppableId;

        const new_items_id_collection = [
          ...kanbanData[source_col_id].itemsOrder,
        ];

        const [deleted_item_id] = new_items_id_collection.splice(
          sourceIndex,
          1
        );

        new_items_id_collection.splice(destinationIndex, 0, deleted_item_id);

        const new_data: any = { ...kanbanData };
        new_data[source_col_id].itemsOrder = new_items_id_collection;

        setKanbanData(new_data);
        // Reorder tasks within the same column
        updateTaskOrder.mutateAsync({
          columnId: Number(source_col_id.substring(7)),
          updatedTaskOrder: new_items_id_collection.map((it: any) =>
            Number(it.substring(5))
          ),
        });
      } else {
        // Handling task transfer between different columns

        const source_col_id = source.droppableId,
          dest_col_id = destination.droppableId;

        // Update tasks order in both source and destination columns
        const new_source_items_id_collc = [
          ...kanbanData[source_col_id].itemsOrder,
        ];
        const new_dest_items_id_collc = [...kanbanData[dest_col_id].itemsOrder];
        const [deleted_item_id] = new_source_items_id_collc.splice(
          sourceIndex,
          1
        );

        new_dest_items_id_collc.splice(destinationIndex, 0, deleted_item_id);
        const new_data = { ...kanbanData };
        new_data[source_col_id].itemsOrder = new_source_items_id_collc;
        new_data[dest_col_id].itemsOrder = new_dest_items_id_collc;

        setKanbanData(new_data);

        // Update task order in the source column
        updateTaskOrder.mutateAsync({
          columnId: Number(source_col_id.substring(7)),
          updatedTaskOrder: new_source_items_id_collc.map((it: any) =>
            Number(it.substring(5))
          ),
        });
        // Update task order in the destination column and task's new column assignment
        updateTaskOrder.mutateAsync({
          columnId: Number(dest_col_id.substring(7)),
          updatedTaskOrder: new_dest_items_id_collc.map((it: any) =>
            Number(it.substring(5))
          ),
          itemId: items[deleted_item_id].id,
          newColumnId: Number(dest_col_id.substring(7)),
        });
      }
    }
  };

  useEffect(() => {
    if (isFetched && kanbanList) {
      const { columns, foundBoard } = kanbanList;

      const data: any = {};
      const colOrder: any = [];
      const itemsData: any = {};

      columns.forEach((column: any) => {
        data[`column-${column.id}`] = {
          ...column,
          itemsOrder: column.itemsOrder?.map((it: any) => `item-${it}`) || [],
        };

        column.Items.forEach((item: any) => {
          itemsData[`item-${item.order}`] = item;
        });
      });

      foundBoard.columnsOrder.forEach((col: any) =>
        colOrder.push(`column-${col}`)
      );

      setKanbanData(data);
      setColumnsOrder(colOrder);
      setItems(itemsData);
    }
  }, [kanbanList, isFetched]);
  return (
    <div className="flex flex-col">
      {kanbanList?.foundBoard?.title && (
        <KanbanHeader title={kanbanList?.foundBoard?.title} />
      )}

      <DragDropContext onDragEnd={handleDragDrop}>
        <Droppable droppableId="ROOT" type="COLUMN" direction="horizontal">
          {(provided) => (
            <div
              className="flex min-h-screen w-fit flex-wrap justify-center items-start gap-4 p-4"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {columnsOrder?.map((colId: any, index: number) => {
                const columnData = kanbanData[colId];
                return (
                  <Draggable
                    draggableId={`column-${columnData.id}`}
                    key={columnData.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className="flex flex-col bg-[#262626] h-fit p-6 gap-4 w-[335px] rounded-2xl"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                      >
                        <div
                          {...provided.dragHandleProps}
                          className="flex items-center justify-between w-full "
                        >
                          <h3 className="text-2xl tracking-wide font-bold">
                            {" "}
                            {columnData.title}{" "}
                          </h3>
                        </div>

                        <Column
                          {...columnData}
                          ITEMS={items}
                          boardId={kanbanList?.foundBoard.id}
                          onTaskCreated={refetch}
                        />
                      </div>
                    )}
                  </Draggable>
                );
              })}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default KanbanPage;
