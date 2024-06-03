import Column from "@/components/Column";
import {
  INITIAL_COLUMN_ORDER,
  INITIAL_COL_DATA,
  ITEMS,
} from "@/mock/kanbanlists";
import {
  DragDropContext,
  Draggable,
  Droppable,
  resetServerContext,
} from "@hello-pangea/dnd";
import axios from "axios";
import { error } from "console";
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
  const [columnsOrder, setColumnsOrder] = useState(INITIAL_COLUMN_ORDER);
  const [data, setData] = useState<any>(INITIAL_COL_DATA);

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

  useEffect(() => {
    axios
      .get("http://localhost:3001/list")
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  }, []);

  return (
    <main
      className={`flex min-h-screen w-fit flex-row  justify-start items-start gap-4 p-4 ${inter.className}`}
    >
      {/* <div className="flex flex-col bg-[#262626] h-fit p-6 gap-4 w-[400px] rounded-2xl">
        <h3 className="text-2xl tracking-wide font-bold">Backlog</h3>
        {kanbanlist &&
          kanbanlist.backLog.map((back) => (
            <button className="flex flex-col bg-[#6A6DCD] hover:bg-[#575aa8]  rounded-lg p-6 gap-2">
              <h4 className=" text-base font-bold "> {back.title} </h4>
              <p className="text-sm text-left">{back.description}</p>
              {back.status && (
                <div className="px-1 border border-white w-fit ">
                  <span className="text-sm"> {back.status} </span>
                </div>
              )}
            </button>
          ))}
        <button className="p-6 w-full border border-white">
          <span>+ Create</span>
        </button>
      </div>
      <div className="flex flex-col bg-[#262626] h-fit p-6 gap-4 w-[400px] rounded-2xl">
        <h3 className="text-2xl tracking-wide font-bold">To do</h3>
        {kanbanlist &&
          kanbanlist.toDo.map((to) => (
            <button className="flex flex-col bg-[#6A6DCD] hover:bg-[#575aa8] rounded-lg p-6 gap-2">
              <h4 className=" text-base font-bold "> {to.title} </h4>
              <p className="text-sm text-left">{to.description}</p>
              {to.status && (
                <div className="px-1 border border-white w-fit ">
                  <span className="text-sm"> {to.status} </span>
                </div>
              )}
            </button>
          ))}
        <button className="p-6 w-full border border-white">
          <span>+ Create</span>
        </button>
      </div>
      <div className="flex flex-col bg-[#262626] h-fit p-6 gap-4 w-[400px] rounded-2xl">
        <h3 className="text-2xl tracking-wide font-bold">In progress</h3>
        {kanbanlist &&
          kanbanlist.inProgress.map((prog) => (
            <button className="flex flex-col bg-[#6A6DCD] hover:bg-[#575aa8] rounded-lg p-6 gap-2">
              <h4 className=" text-base font-bold "> {prog.title} </h4>
              <p className="text-sm text-left">{prog.description}</p>
              {prog.status && (
                <div className="px-1 border border-white w-fit ">
                  <span className="text-sm"> {prog.status} </span>
                </div>
              )}
            </button>
          ))}
        <button className="p-6 w-full border border-white">
          <span>+ Create</span>
        </button>
      </div>
      <div className="flex flex-col bg-[#262626] h-fit p-6 gap-4 w-[400px] rounded-2xl">
        <h3 className="text-2xl tracking-wide font-bold">Designed</h3>
        {kanbanlist &&
          kanbanlist.designed.map((design) => (
            <button className="flex flex-col bg-[#6A6DCD] hover:bg-[#575aa8] rounded-lg p-6 gap-2">
              <h4 className=" text-base font-bold "> {design.title} </h4>
              <p className="text-sm text-left">{design.description}</p>
              {design.status && (
                <div className="px-1 border border-white w-fit ">
                  <span className="text-sm"> {design.status} </span>
                </div>
              )}
            </button>
          ))}
        <button className="p-6 w-full border border-white">
          <span>+ Create</span>
        </button>
      </div>

      <button className="p-6 border border-white">
        <span className="text-3xl">+</span>
      </button> */}
      <DragDropContext onDragEnd={handleDragDrop}>
        <Droppable droppableId="ROOT" type="COLUMN" direction="horizontal">
          {(provided) => (
            <div
              className="flex min-h-screen w-fit flex-row  justify-start items-start gap-4 p-4"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {columnsOrder.map((colId, index) => {
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
                        <Column {...columnData} ITEMS={ITEMS} />
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
