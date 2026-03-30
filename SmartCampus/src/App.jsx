import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">

      <div className="bg-white/10 backdrop-blur-lg p-10 rounded-2xl shadow-2xl text-center border border-white/20">

        <h1 className="text-4xl font-bold text-green-400 mb-4">
          Tailwind CSS Working Test 🚀
        </h1>

        <p className="text-gray-200 mb-6">
          If you see colors, spacing, and styles → Tailwind is working ✅
        </p>

        <button
          onClick={() => setCount(count + 1)}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-700 transition rounded-xl text-white font-semibold shadow-lg"
        >
          Click Me ({count})
        </button>

        <div className="mt-6 text-sm text-gray-300">
          Counter shows state is working too 👍
        </div>

      </div>
    </div>
  );
}

export default App;