import React, { useRef, useEffect, useState } from "react";
import Calendar from "react-calendar";
import dayjs from "dayjs";
import "react-calendar/dist/Calendar.css";
import {
    CalendarDaysIcon,
    ChevronDownIcon,
    ChevronUpIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon, TrophyIcon } from "@heroicons/react/24/solid";

export default function TaskCard({ task, tasks, setTasks }) {
    const [showCalendar, setShowCalendar] = useState(false);
    const contentRef = useRef(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (showCalendar && contentRef.current) {
            setHeight(contentRef.current.scrollHeight);
        } else {
            setHeight(0);
        }
    }, [showCalendar]);

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
        <div className="bg-gray-800 !w-full rounded-xl shadow-md p-4 border border-gray-700 flex flex-col justify-between">
            <div>
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-semibold text-white">{task.name}</h3>
                    <span className="text-sm text-gray-400">Lvl {task.level}</span>
                </div>

                <p className="text-sm text-gray-300 mb-1">Goal: {task.goal}</p>

                <div className="w-full h-3 bg-gray-700 rounded-full mb-2">
                    <div
                        className="h-3 rounded-full bg-[#73d093] transition-all"
                        style={{ width: `${xpPercent}%` }}
                    ></div>
                </div>


                <button
                    onClick={() => setShowCalendar(prev => !prev)}
                    className="flex items-center gap-1 text-sm text-[#73d093] hover:underline mb-2"
                >
                    <CalendarDaysIcon className="w-5 h-5 text-[#73d093] " />
                    {showCalendar ? (
                        <ChevronUpIcon className="w-4 h-4" />
                    ) : (
                        <ChevronDownIcon className="w-4 h-4" />
                    )}
                </button>

                <div
                    className="transition-all duration-500 ease-in-out overflow-hidden"
                    style={{ maxHeight: `${height}px` }}
                >
                    <div ref={contentRef}>
                        <Calendar
                            className="rounded-md text-sm"
                            tileClassName={({ date }) =>
                                task.history.includes(dayjs(date).format("YYYY-MM-DD"))
                                    ? "!bg-[#73d093] text-white rounded-md"
                                    : "text-black rounded-md"
                            }
                        />
                    </div>
                </div>
            </div>

            {task.history.includes(dayjs().format("YYYY-MM-DD")) ? (
                <button
                    disabled
                    className="mt-4 py-2 w-full rounded-full  font-semibold bg-gradient-to-r from-[#73d093]  to-[#97e192] shadow-md flex items-center justify-center gap-2 cursor-not-allowed border border-yellow-400"
                >
                    <TrophyIcon className="w-5 h-5 text-[#1a1a1a]" />
                    Completed!
                </button>
            ) : (
                <button
                    onClick={handleComplete}
                    className="mt-4 py-2 w-full rounded-full text-white font-semibold bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95 border border-teal-700"
                >
                    <CheckCircleIcon className="w-5 h-5" />
                    Mark Complete
                </button>
            )}
        </div>
    );
}
