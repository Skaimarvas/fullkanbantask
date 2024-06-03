import { getListQuery } from "@/api/controller/ListController";
import Column from "@/components/Column";
import {
  DragDropContext,
  Draggable,
  Droppable,
  resetServerContext,
} from "@hello-pangea/dnd";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export async function getServerSideProps(context: any) {
  resetServerContext();
  return {
    props: {},
  };
}

export default function Home() {
  const { data: kanbanList, isLoading, isFetched } = getListQuery();

  const [columnsOrder, setColumnsOrder] = useState<any>();
  const [data, setData] = useState<any>();
  const [items, setItems] = useState<any>();

  const handleDragDrop = (results: any) => {
    const { source, destination, type } = results;

    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const sourceIndex = source.index;
    const destinationIndex = destination.index;

    if (type === "COLUMN") {
      const reorderedColumns = [...columnsOrder];
      const [removedItem] = reorderedColumns.splice(sourceIndex, 1);
      reorderedColumns.splice(destinationIndex, 0, removedItem);

      setColumnsOrder(reorderedColumns);

      return;
    } else {
      if (source.droppableId === destination.droppableId) {
        const source_col_id = source.droppableId;
        const new_items_id_collection = [...data[source_col_id].itemsOrder];
        const [deleted_item_id] = new_items_id_collection.splice(
          sourceIndex,
          1
        );
        new_items_id_collection.splice(destinationIndex, 0, deleted_item_id);
        const new_data: any = { ...data };
        new_data[source_col_id].itemsOrder = new_items_id_collection;
        setData(new_data);
      } else {
        const source_col_id = source.droppableId,
          dest_col_id = destination.droppableId;

        const new_source_items_id_collc = [...data[source_col_id].itemsOrder];
        const new_dest_items_id_collc = [...data[dest_col_id].itemsOrder];
        const [deleted_item_id] = new_source_items_id_collc.splice(
          sourceIndex,
          1
        );

        new_dest_items_id_collc.splice(destinationIndex, 0, deleted_item_id);
        const new_data = { ...data };
        new_data[source_col_id].itemsOrder = new_source_items_id_collc;
        new_data[dest_col_id].itemsOrder = new_dest_items_id_collc;

        setData(new_data);
      }
    }
  };

  console.log("Data", kanbanList);

  useEffect(() => {
    if (isFetched) {
      setColumnsOrder(kanbanList?.order);
      setData(kanbanList?.column);
      setItems(kanbanList?.items);
    }
  }, [data, isFetched]);

  return (
    <main
      className={`flex min-h-screen w-fit flex-row  justify-start items-start gap-4 p-4 ${inter.className}`}
    >
      {" "}
      <DragDropContext onDragEnd={handleDragDrop}>
        <Droppable droppableId="ROOT" type="COLUMN" direction="horizontal">
          {(provided) => (
            <div
              className="flex min-h-screen w-fit flex-row  justify-start items-start gap-4 p-4"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {columnsOrder?.map((colId: any, index: number) => {
                const columnData = data[colId];
                return (
                  <Draggable
                    draggableId={columnData.id}
                    key={columnData.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className="flex flex-col bg-[#262626] h-fit p-6 gap-4 w-[400px] rounded-2xl"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                      >
                        <div
                          {...provided.dragHandleProps}
                          className="flex items-center justify-between w-fit "
                        >
                          <h3 className="text-2xl tracking-wide font-bold">
                            {" "}
                            {columnData.title}{" "}
                          </h3>
                        </div>

                        {/* Render items within the column */}
                        <Column {...columnData} ITEMS={items} />
                        <button className="p-6 w-full border border-white">
                          <span>+ Create</span>
                        </button>
                      </div>
                    )}
                  </Draggable>
                );
              })}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </main>
  );
}
