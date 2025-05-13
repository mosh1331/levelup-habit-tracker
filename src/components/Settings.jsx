import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const [taskInputs, setTaskInputs] = useState([{ name: "", baseGoal: 10 }]);
  const navigate = useNavigate();

  const handleChange = (index, key, value) => {
    const updated = [...taskInputs];
    updated[index][key] = value;
    setTaskInputs(updated);
  };

  const handleSave = () => {
    const newTasks = taskInputs.map(t => ({
      id: crypto.randomUUID(),
      name: t.name.trim(),
      baseGoal: parseInt(t.baseGoal),
      goal: parseInt(t.baseGoal),
      level: 1,
      xp: 0,
      streak: 0,
      xpPerCompletion: 10,
      history: [],
      created: new Date().toISOString()
    }));

    localStorage.setItem("habitTasks", JSON.stringify(newTasks));
    navigate("/");               // Go back to main app
    window.location.reload();    // Force reload to sync state in <App />
  };

  return (
    <div className="p-4 bg-gray-900 text-white min-h-screen">
      <h2 className="text-xl font-bold mb-4">Settings</h2>
      {taskInputs.map((task, idx) => (
        <div key={idx} className="mb-2">
          <input
            type="text"
            value={task.name}
            onChange={(e) => handleChange(idx, "name", e.target.value)}
            placeholder="Task name"
            className="bg-gray-800 p-2 mr-2"
          />
          <input
            type="number"
            value={task.baseGoal}
            onChange={(e) => handleChange(idx, "baseGoal", e.target.value)}
            className="bg-gray-800 p-2 w-24"
          />
        </div>
      ))}
      <button
        onClick={() => setTaskInputs([...taskInputs, { name: "", baseGoal: 10 }])}
        className="bg-blue-500 px-3 py-1 rounded mr-2"
      >
        + Add Task
      </button>
      <button
        onClick={handleSave}
        className="bg-green-500 px-3 py-1 rounded"
      >
        Save & Reset
      </button>
    </div>
  );
}
