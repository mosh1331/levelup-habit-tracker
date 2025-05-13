export default function GlobalStats({ tasks }) {
    const totalXP = tasks.reduce((sum, t) => sum + t.level * 100 + t.xp, 0);
    const level = Math.floor(totalXP / 300);
  
    return (
      <div className="bg-gray-800 rounded-xl p-4 mb-6 shadow-md border border-gray-700">
        <h2 className="text-lg font-semibold mb-1">Overall Progress</h2>
        <div className="text-3xl font-bold text-teal-400">Level {level}</div>
        <div className="text-sm text-gray-400">Total XP: {totalXP}</div>
      </div>
    );
  }
  