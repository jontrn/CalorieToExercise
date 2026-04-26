export const FoodSearch = ({ value, onChange }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search for a food..."
      className="
        w-full rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-3
        text-base text-white placeholder:text-slate-500
        outline-none transition focus:border-amber-300/70
        focus:ring-2 focus:ring-amber-300/25
      "
    />
  );
};
