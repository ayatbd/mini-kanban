"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/store/hooks";
import { addTask } from "@/store/slices/boardSlice";
import { Plus, X } from "lucide-react";
import { useState } from "react";

export const AddTask = ({
  columnId,
  boardId,
}: {
  columnId: string;
  boardId: string;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const dispatch = useAppDispatch();

  const handleAdd = async () => {
    if (!title.trim()) return;
    await dispatch(addTask({ title, columnId, boardId }));
    setTitle("");
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <Button
        variant="ghost"
        className="w-full justify-start text-gray-500 hover:text-gray-900 px-2"
        onClick={() => setIsEditing(true)}
      >
        <Plus size={16} className="mr-2" /> Add a card
      </Button>
    );
  }

  return (
    <div className="p-2 space-y-2">
      <Input
        autoFocus
        placeholder="Enter task title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
      />
      <div className="flex items-center gap-2">
        <Button size="sm" onClick={handleAdd}>
          Add Card
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setIsEditing(false)}>
          <X size={18} />
        </Button>
      </div>
    </div>
  );
};
