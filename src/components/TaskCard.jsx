import React from "react";
import Calendar from "react-calendar";
import dayjs from "dayjs";
import "react-calendar/dist/Calendar.css";

export default function TaskCard({ task, tasks, setTasks }) {
  const handleComplete = () => {
    const today = dayjs().format("YYYY-MM-DD");
    if (task.history.includes(today)) return;

    const xpGain = task.xpPerCompletion;
    const updatedXP = task.xp + xpGain;
    const xpToLevel = task.level * 100;

    let updatedTask = {
      ...task,
      xp: updatedXP >= xpToLevel ? updatedXP - xpToLevel : updatedXP,
      level: updatedXP >= xpToLevel ? task.level + 1 : task.level,
      history: [...task.history, today],
    };

    // Optional: auto-level based on streaks
    const last7 = [...Array(7)].map((_, i) =>
      dayjs().subtract(i, "day").format("YYYY-MM-DD")
    );
    const recentCount = updatedTask.history.filter(d => last7.includes(d)).length;

    if (recentCount >= 5) {
      updatedTask = {
        ...updatedTask,
        level: updatedTask.level + 1,
        xp: 0,
        goal: Math.round(updatedTask.goal * 1.2),
        history: [],
      };
    }

    const updatedTasks = tasks.map(t => (t.id === task.id ? updatedTask : t));
    setTasks(updatedTasks);
  };

  const xpPercent = Math.min(100, (task.xp / (task.level * 100)) * 100);

  return (
    <div className="bg-gray-800 rounded-xl shadow-md p-4 border border-gray-700 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-semibold text-white">{task.name}</h3>
          <span className="text-sm text-gray-400">Lvl {task.level}</span>
        </div>

        <p className="text-sm text-gray-300 mb-1">Goal: {task.goal}</p>

        <div className="w-full h-3 bg-gray-700 rounded-full mb-2">
          <div
            className="h-3 rounded-full bg-teal-400 transition-all"
            style={{ width: `${xpPercent}%` }}
          ></div>
        </div>

        <Calendar
          className="rounded-md text-sm"
          tileClassName={({ date }) =>
            task.history.includes(dayjs(date).format("YYYY-MM-DD"))
              ? "!bg-teal-500 text-white rounded-md"
              : "text-black rounded-md"
          }
        />
      </div>

      <button
        onClick={handleComplete}
        disabled={task.history.includes(dayjs().format("YYYY-MM-DD"))}
        className={`mt-4 py-2 w-full rounded-md text-white font-medium transition
          ${task.history.includes(dayjs().format("YYYY-MM-DD"))
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-teal-500 hover:bg-teal-400"}`}
      >
        {task.history.includes(dayjs().format("YYYY-MM-DD")) ? "Completed" : "Mark Complete"}
      </button>
    </div>
  );
}
