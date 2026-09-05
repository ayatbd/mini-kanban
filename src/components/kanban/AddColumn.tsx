"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/store/hooks";
import { addColumn } from "@/store/slices/boardSlice";
import { Plus, X } from "lucide-react";
import { useState } from "react";

export const AddColumn = ({ boardId }: { boardId: string }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const dispatch = useAppDispatch();

  const handleAdd = async () => {
    if (!name.trim()) return;
    await dispatch(addColumn({ name, boardId }));
    setName("");
    setIsEditing(false);
  };

  return (
    <div
      className={`w-80 shrink-0 rounded-lg transition-all ${isEditing ? "bg-gray-100 p-3" : ""}`}
    >
      {isEditing ? (
        <div className="space-y-3">
          <Input
            autoFocus
            placeholder="Column name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          />
          <div className="flex items-center gap-2">
            <Button onClick={handleAdd}>Add Column</Button>
            <Button variant="ghost" onClick={() => setIsEditing(false)}>
              <X size={20} />
            </Button>
          </div>
        </div>
      ) : (
        <Button
          variant="secondary"
          className="w-full justify-start bg-gray-200/50 hover:bg-gray-200"
          onClick={() => setIsEditing(true)}
        >
          <Plus size={20} className="mr-2" /> Add another list
        </Button>
      )}
    </div>
  );
};
