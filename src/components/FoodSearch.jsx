export const FoodSearch = ({ value, onChange }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search for a food..."
      className="
  w-full p-3 rounded-lg
  bg-slate-400 text-black placeholder-slate-400
  border border-slate-700
  focus:outline-none focus:ring-2 focus:ring-red-400/60 focus:border-red-400
  transition
"
    />
  );
};
