import { Droppable, Draggable } from "@hello-pangea/dnd";
import React from "react";

interface Iprops {
  itemsOrder: any;
  id: any;
  ITEMS: any;
}

const Column: React.FC<Iprops> = ({ itemsOrder, id, ITEMS }) => {
  return (
    <Droppable droppableId={id}>
      {(provided: any) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="flex flex-col w-full h-fit gap-2"
        >
          {itemsOrder.map((item_id: any, index: any) => {
            const item = ITEMS[item_id];

            return (
              <Draggable draggableId={item.id} index={index} key={item.id}>
                {(provided) => (
                  <div
                    className="flex flex-col bg-[#6A6DCD] hover:bg-[#575aa8]  rounded-lg p-6"
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
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Column;
