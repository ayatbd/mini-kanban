"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/store/hooks";
import { shareBoardWithUser } from "@/store/slices/boardSlice";
import { UserPlus } from "lucide-react";
import { useState } from "react";

export const ShareBoardModal = ({ boardId }: { boardId: string }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const dispatch = useAppDispatch();

  const handleShare = async () => {
    if (!email) return;
    setLoading(true);
    setMessage(null);

    const result = await dispatch(shareBoardWithUser({ boardId, email }));

    if (shareBoardWithUser.fulfilled.match(result)) {
      setMessage({ type: "success", text: "Board shared successfully!" });
      setEmail("");
    } else {
      setMessage({
        type: "error",
        text: (result.payload as string) || "Failed to share",
      });
    }
    setLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline" size="sm" className="gap-2">
          <UserPlus size={16} /> Share
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Board</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <p className="text-sm text-gray-500">
            Enter the email of the user you want to invite to this board.
          </p>
          <div className="flex gap-2">
            <Input
              placeholder="user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button onClick={handleShare} disabled={loading}>
              {loading ? "Adding..." : "Invite"}
            </Button>
          </div>
          {message && (
            <p
              className={`text-sm ${message.type === "success" ? "text-green-600" : "text-red-600"}`}
            >
              {message.text}
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
