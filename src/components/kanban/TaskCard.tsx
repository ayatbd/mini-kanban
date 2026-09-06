"use client";
import { Card } from "@/components/ui/card";
import { Draggable } from "@hello-pangea/dnd";

export const TaskCard = ({ task, index }: { task: any; index: number }) => {
  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="mb-3"
        >
          <Card className="p-3 shadow-sm hover:shadow-md transition-shadow bg-white">
            <p className="text-sm font-medium capitalize">{task.title}</p>
          </Card>
        </div>
      )}
    </Draggable>
  );
};
