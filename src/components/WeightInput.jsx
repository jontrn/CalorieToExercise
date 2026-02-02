// components/WeightInput.jsx
export const WeightInput = ({ value, onChange }) => {
  return (
    <div className="mt-4 flex items-center gap-4">
      <label className="text-sm font-medium text-slate-300">Weight (lb)</label>

      <input
        type="number"
        min="50"
        max="500"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="
          w-24 p-2 text-center text-lg font-bold
          bg-slate-400 text-slate-900
          border border-gray-900
          rounded-lg shadow-md
          focus:outline-none focus:ring-2 focus:ring-black/30
        "
        placeholder="lbs"
      />
    </div>
  );
};
