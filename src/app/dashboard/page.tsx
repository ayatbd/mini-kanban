"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createNewBoard, fetchBoards } from "@/store/slices/boardSlice";
import { Layout, PlusCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const { boards } = useAppSelector((state) => state.boards);
  const { user } = useAppSelector((state) => state.auth);
  const [newBoardName, setNewBoardName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  const handleCreateBoard = async () => {
    if (!newBoardName.trim()) return;
    await dispatch(createNewBoard(newBoardName));
    setNewBoardName("");
    setIsDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link href="/">
            <Button className="gap-2">Go to Home</Button>
          </Link>
        </div>
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Boards</h1>
            <p className="text-gray-500">Welcome back, {user?.name}</p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger>
              <Button className="gap-2">
                <PlusCircle size={20} />
                Create New Board
              </Button>
            </DialogTrigger>
            {!user ? (
              <DialogContent>
                <p className="text-red-500">
                  You must be logged in to create a new board.
                </p>
              </DialogContent>
            ) : (
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create a New Board</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <Input
                    placeholder="Board Name (e.g., Marketing Project)"
                    value={newBoardName}
                    onChange={(e) => setNewBoardName(e.target.value)}
                  />
                  <Button onClick={handleCreateBoard} className="w-full">
                    Create Board
                  </Button>
                </div>
              </DialogContent>
            )}
          </Dialog>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {boards.map((board) => (
            <Link key={board._id} href={`/board/${board._id}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-blue-500">
                <CardHeader className="flex flex-row items-center gap-4">
                  <Layout className="text-blue-500" />
                  <CardTitle>{board.name}</CardTitle>
                </CardHeader>
              </Card>
            </Link>
          ))}

          {boards.length === 0 && (
            <div className="col-span-full text-center py-20 bg-white rounded-lg border-2 border-dashed">
              <p className="text-gray-400">
                No boards found. Create your first one!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
