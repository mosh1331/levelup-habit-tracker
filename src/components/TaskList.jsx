import React from "react";
import TaskCard from "./TaskCard";

export default function TaskList({ tasks, setTasks }) {
    return (
      <div className="grid w-full gap-4 sm:grid-cols-2">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} tasks={tasks} setTasks={setTasks} />
        ))}
      </div>
    );
  }
  