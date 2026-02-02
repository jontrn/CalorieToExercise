// components/ExerciseSearch.jsx
export const ExerciseSearch = ({ value, onChange, onSubmit, loading }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center gap-3 mt-6 w-full max-w-md"
    >
      {/* Info tooltip */}
      <div className="relative group">
        <span className="cursor-pointer text-slate-400 hover:text-slate-200">
          🛈
        </span>

        <div
          className="
          absolute right-0 bottom-full mb-2 w-72
          rounded-lg bg-slate-800 text-slate-100
          text-sm p-3 shadow-lg
          opacity-0 group-hover:opacity-100
          transition-opacity pointer-events-none z-10
        "
        >
          <p className="font-semibold mb-1 text-slate-100">
            Exercise names can be finicky
          </p>
          <p className="mb-2 text-slate-300">
            Try specifying intensity or speed.
          </p>
          <p className="text-slate-300">
            <strong className="text-slate-100">Examples:</strong>
            <br />
            Walking → Walking 2.5 mph
            <br />
            Running → Running, 10 mph
          </p>
        </div>
      </div>

      {/* Exercise input */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter exercise (e.g. walking)"
        className="
          flex-1 px-3 py-2 rounded-lg
          bg-slate-400 text-slate-900 font-bold
          border border-gray-900
          shadow-md
          focus:outline-none focus:ring-2 focus:ring-black/30
        "
      />

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="
          px-5 py-2 rounded-lg font-medium
          bg-slate-600 text-slate-100
          hover:bg-slate-500
          active:bg-slate-700
          disabled:bg-slate-700/50 disabled:cursor-not-allowed
          transition
        "
      >
        {loading ? "Searching..." : "Search"}
      </button>
    </form>
  );
};
