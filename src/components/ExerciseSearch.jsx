export const ExerciseSearch = ({ value, onChange, onSubmit, loading }) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
            Activity Search
          </p>
          <h3 className="mt-1 text-lg font-semibold text-white">
            Compare this meal to an exercise
          </h3>
        </div>

        <div className="group relative">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-slate-950/55 text-sm font-bold text-slate-200">
            i
          </span>

          <div
            className="
              pointer-events-none absolute right-0 top-full z-10 mt-2 w-72
              rounded-2xl border border-white/10 bg-slate-950 p-4 text-sm
              text-slate-300 opacity-0 shadow-xl shadow-slate-950/50
              transition-opacity group-hover:opacity-100
            "
          >
            <p className="font-semibold text-white">
              Exercise names can be picky.
            </p>
            <p className="mt-2">
              Adding speed or intensity usually gives better matches.
            </p>
            <p className="mt-2 text-slate-400">
              Walking -&gt; Walking 2.5 mph
              <br />
              Running -&gt; Running, 10 mph
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter an activity"
          className="
            flex-1 rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-3
            text-white placeholder:text-slate-500 outline-none transition
            focus:border-amber-300/70 focus:ring-2 focus:ring-amber-300/25
          "
        />

        <button
          type="submit"
          disabled={loading}
          className="
            rounded-2xl bg-amber-400 px-5 py-3 font-semibold text-slate-950
            transition hover:bg-amber-300 active:bg-amber-500
            disabled:cursor-not-allowed disabled:bg-amber-200/60
          "
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>
    </form>
  );
};
