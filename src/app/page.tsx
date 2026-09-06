"use client";
import { Button } from "@/components/ui/button";
import { RootState } from "@/store/store";
import { Layout } from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function Home() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  //   if (isAuthenticated) {
  //     console.log("User is authenticated, redirecting to /boards");
  //   }
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-4">
      <div className="mb-6 p-4 bg-blue-100 rounded-2xl">
        <Layout size={48} className="text-blue-600" />
      </div>
      <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl mb-4">
        Mini <span className="text-blue-600">Kanban</span>
      </h1>
      <p className="text-xl text-gray-600 max-w-2xl mb-8">
        The simplest way to manage your team's workflow. Create boards, organize
        columns, and drag tasks to completion.
      </p>
      {isAuthenticated ? (
        <Link href="/dashboard">
          <Button size="lg" className="px-8">
            Go to Dashboard
          </Button>
        </Link>
      ) : (
        <div className="flex gap-4">
          <Link href="/register">
            <Button size="lg" className="px-8">
              Get Started
            </Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="outline" className="px-8">
              Login
            </Button>
          </Link>
        </div>
      )}

      <footer className="absolute bottom-8 text-gray-400 text-sm">
        Full-Stack Engineering Challenge • 2024
      </footer>
    </div>
  );
}
