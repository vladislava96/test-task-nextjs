"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import React, { CSSProperties, useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult, DraggingStyle, NotDraggingStyle } from "react-beautiful-dnd";
import SlideForm from "../slide-form/SlideForm";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ListData {
  id: string;
  content: string;
}

const getItems = (count: number) =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`
  }));

const reorder = (list: ListData[], startIndex: number, endIndex: number) => {
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

  const [items, setItems] = useState(getItems(5));

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
                    {/* <Card className="box-border p-4 w-2xl"> */}
                    <Card className="max-w-[800px]">
                      <CardHeader>
                        <CardTitle>
                          Title
                        </CardTitle>
                        <CardDescription>
                          {item.content}
                          <p>This project and the components are written in TypeScript. We recommend using TypeScript for your project as well.
                          However we provide a JavaScript version of the components as well. The JavaScript version is available via the cli.
                          To opt-out of TypeScript, you can use the tsx flag in your components.json file.</p>
                        </CardDescription>
                      </CardHeader>
                      <CardFooter className="flex justify-end gap-x-4">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline">Edit</Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>About slide</DialogTitle>
                            </DialogHeader>
                            <SlideForm/>
                          </DialogContent>
                        </Dialog>
                        <Button variant="outline">Delete</Button>
                      </CardFooter>
                    </Card>
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