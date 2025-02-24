"use client"; 

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 

export default function HomePage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [tasks, setTasks] = useState<{ id: number; text: string; completed: boolean }[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [time, setTime] = useState(25 * 60); // Default: 25-minute Pomodoro
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      router.replace("/login"); 
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  if (!isAuthenticated) return null;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-80 bg-gradient-to-r from-purple-400 to-pink-500 text-white flex flex-col">
        <div className="p-4 bg-purple-600 flex items-center justify-center">
          <h1 className="text-3xl font-extrabold">PREPPAL</h1>
        </div>
        <nav className="flex-1 mt-6">
          <ul className="space-y-2">
            <li>
              <button onClick={() => router.push("/home")} className="p-3 w-full text-left hover:bg-purple-600 transition">
                🏠 Home
              </button>
            </li>
            <li>
              <button onClick={() => router.push("/matching")} className="p-3 w-full text-left hover:bg-purple-600 transition">
                💡 Matching
              </button>
            </li>
            <li>
              <button onClick={() => router.push("/study-rooms")} className="p-3 w-full text-left hover:bg-purple-600 transition">
                📖 Study Rooms
              </button>
            </li>
            <li>
              <button onClick={() => router.push("/community")} className="p-3 w-full text-left hover:bg-purple-600 transition">
                🤝 Community
              </button>
            </li>
            <li>
              <button onClick={() => router.push("/resources")} className="p-3 w-full text-left hover:bg-purple-600 transition">
                📚 Resources
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="w-full p-4 bg-white shadow-md flex justify-between items-center">
          <h2 className="text-2xl font-bold text-purple-800">Welcome to PrepPal</h2>
          <div className="relative">
            <img
              src="/profile-pic.jpeg"
              alt="Profile Icon"
              className="w-14 h-14 rounded-full cursor-pointer border-4 border-purple-400"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-xl z-50">
                <button onClick={() => router.push("/profile")} className="w-full text-left px-4 py-3 hover:bg-purple-50">
                  View Profile
                </button>
                <button
                  onClick={() => {
                    localStorage.removeItem("access_token");
                    router.replace("/login");
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-purple-50"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center text-center relative">
          {/* Pomodoro Timer */}
          <div className="w-full max-w-lg p-6 bg-white bg-opacity-90 rounded-lg shadow-xl">
            <h2 className="text-xl font-semibold text-purple-800 mb-4">Pomodoro Timer</h2>
            <div className="text-4xl font-bold">{formatTime(time)}</div>
            <div className="mt-4 space-x-2">
              <button onClick={() => setIsRunning(!isRunning)} className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                {isRunning ? "Pause" : "Start"}
              </button>
              <button onClick={() => setTime(25 * 60)} className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition">
                Reset
              </button>
            </div>
          </div>

          {/* Task Manager */}
          <div className="w-full max-w-lg p-6 bg-white bg-opacity-90 rounded-lg shadow-xl mt-8">
            <h2 className="text-xl font-semibold text-purple-800 mb-4">Task Manager</h2>
            <div className="mb-4">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add a new task"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={() => {
                  if (newTask.trim()) {
                    setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
                    setNewTask("");
                  }
                }}
                className="mt-2 w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              >
                Add Task
              </button>
            </div>
            <ul className="space-y-3">
              {tasks.map((task) => (
                <li key={task.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() =>
                      setTasks(tasks.map((t) => (t.id === task.id ? { ...t, completed: !t.completed } : t)))
                    }
                    className="form-checkbox h-6 w-6 text-purple-600"
                  />
                  <span className={`flex-1 ${task.completed ? "line-through text-gray-500" : ""}`}>{task.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </main>

        <footer className="w-full p-4 text-center bg-gray-200">© 2024 Preppal</footer>
      </div>
    </div>
  );
}
