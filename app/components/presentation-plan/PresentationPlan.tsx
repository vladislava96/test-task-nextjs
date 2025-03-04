"use client"

import React, { CSSProperties, useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult, DraggingStyle, NotDraggingStyle } from "react-beautiful-dnd";
import PlanSlide from "../plan-slide/PlanSlide";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchSlidesAsync, selectSlides, Slide } from "@/lib/features/generation-form/generationFormSlice";


const getItems = (count: number) =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`
  }));

const reorder = (list: Slide[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging: boolean, draggableStyle?: DraggingStyle | NotDraggingStyle): CSSProperties => ({
  userSelect: "none",
  padding: grid * 2,

  ...draggableStyle
});

const getListStyle = (isDraggingOver: boolean) => ({
  background: "none",
  padding: grid
});


//-----------------------------------------------------

export default function DnD() {
  const dispatch = useAppDispatch();

  const selectItems = useAppSelector(selectSlides);

  const [items, setItems] = useState<Slide[]>([]);

  useEffect(() => {
    const promise = dispatch(fetchSlidesAsync());
    return () => promise.abort();
  }, [dispatch]);

  useEffect(() => {
    setItems(selectItems);
  }, [selectItems]);

  function onDragEnd(result: DropResult) {
    if (!result.destination) {
      return;
    }

    setItems(reorder(
      items,
      result.source.index,
      result.destination.index
    ));
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable" isDropDisabled={false} isCombineEnabled={false} ignoreContainerClipping={false} direction="vertical">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    <PlanSlide item={item}/>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}