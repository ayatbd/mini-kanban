"use client";
import { AddColumn } from "@/components/kanban/AddColumn";
import { Column } from "@/components/kanban/Column";
import { ShareBoardModal } from "@/components/kanban/ShareBoardModal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchBoardDetails, moveTask } from "@/store/slices/boardSlice";
import { DragDropContext } from "@hello-pangea/dnd";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function BoardDetailPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { currentBoard, columns, tasks } = useAppSelector(
    (state) => state.boards,
  );

  useEffect(() => {
    if (id) dispatch(fetchBoardDetails(id as string));
  }, [id, dispatch]);

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    // Dispatch the move to backend
    dispatch(
      moveTask({
        taskId: draggableId,
        destinationColumnId: destination.droppableId,
        destinationIndex: destination.index,
      }),
    ).then(() => {
      // Refresh data to ensure order is correct across all clients
      dispatch(fetchBoardDetails(id as string));
    });
  };

  if (!currentBoard) return <div className="p-8">Loading Board...</div>;

  return (
    <div className="h-screen flex flex-col bg-white">
      <header className="p-4 border-b flex justify-between items-center bg-white shadow-sm">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold">{currentBoard.name}</h1>
          <div className="h-6 w-[1px] bg-gray-300" />
          <span className="text-sm text-gray-500">
            {columns.length} columns
          </span>
        </div>

        <div className="flex items-center gap-3">
          <ShareBoardModal boardId={id as string} />
          {/* Other header buttons could go here */}
        </div>
      </header>

      <main className="flex-1 overflow-x-auto p-6 bg-slate-50">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex gap-6 h-full items-start">
            {columns.map((column: any) => (
              <Column
                key={column._id}
                column={column}
                tasks={tasks.filter((t) => t.columnId === column._id)}
                boardId={id as string}
              />
            ))}

            <AddColumn boardId={id as string} />
          </div>
        </DragDropContext>
      </main>
    </div>
  );
}
