import React, { useEffect, useState } from "react";
import { loadTasks, saveTasks } from "../utils/storage";
import GlobalStats from "./GlobalStats";
import TaskList from "./TaskList";

export default function Landing() {
  const [tasks, setTasks] = useState(loadTasks());

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    Notification.requestPermission();
    const notify = () => {
      if (Notification.permission === "granted") {
        new Notification("Habit Tracker", {
          body: "Don't forget to complete your habits today!",
        });
      }
    };
    notify();
    const now = new Date();
    const msTill9AM = new Date().setHours(9, 0, 0, 0) - now;
    setTimeout(() => {
      notify();
      setInterval(notify, 24 * 60 * 60 * 1000); // Daily
    }, Math.max(msTill9AM, 0));
  }, []);

  return (
    <div className="min-h-screen w-screen bg-gray-950 text-white font-sans">
      <div className="max-w-3xl w-full mx-auto p-4">
        <header className="flex justify-between items-center mb-6">
          <h1 className="w-[150px] h-[80px] font-bold tracking-tight">
            <img src="/logo.png" className="w-full h-full block" />
          </h1>
          <a href="/settings" className="text-sm text-gray-400 hover:text-[#73d093] transition">
            ⚙️ Settings
          </a>
        </header>
       
        <GlobalStats tasks={tasks} />
        <TaskList tasks={tasks} setTasks={setTasks} />
      </div>
    </div>
  );
  
}
