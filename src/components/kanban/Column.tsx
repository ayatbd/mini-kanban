"use client";
import { Droppable } from "@hello-pangea/dnd";
import { AddTask } from "./AddTask";
import { TaskCard } from "./TaskCard";

export const Column = ({
  column,
  tasks,
  boardId,
}: {
  column: any;
  tasks: any[];
  boardId: string;
}) => {
  return (
    <div className="w-80 bg-gray-100 rounded-lg flex flex-col max-h-full">
      <div className="p-4 capitalize font-bold text-gray-700 flex justify-between items-center">
        {column.name}
        <span className="bg-gray-200 px-2 py-0.5 rounded text-xs">
          {tasks.length}
        </span>
      </div>

      <Droppable droppableId={column._id}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="p-2 flex-1 overflow-y-auto min-h-[150px]"
          >
            {tasks
              .sort((a, b) => a.order - b.order)
              .map((task, index) => (
                <TaskCard key={task._id} task={task} index={index} />
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <div className="p-2">
        <AddTask columnId={column._id} boardId={boardId} />
      </div>
    </div>
  );
};
