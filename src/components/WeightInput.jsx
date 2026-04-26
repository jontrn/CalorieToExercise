export const WeightInput = ({ value, onChange }) => {
  return (
    <div className="rounded-[24px] border border-white/10 bg-slate-950/35 p-4">
      <label className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
        Body Weight
      </label>
      <div className="mt-3 flex items-center gap-3">
        <input
          type="number"
          min="50"
          max="500"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="
            w-28 rounded-2xl border border-white/10 bg-slate-950/55 px-3 py-2
            text-center text-lg font-semibold text-white outline-none transition
            focus:border-amber-300/70 focus:ring-2 focus:ring-amber-300/25
          "
          placeholder="lbs"
        />
        <span className="text-sm text-slate-300">lb</span>
      </div>
    </div>
  );
};
