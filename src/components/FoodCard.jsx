import { useFood } from "../contexts/FoodContext";

export const FoodCard = ({ food }) => {
  const {
    servings,
    setServings,
    totalCalories,
    selectedMeasure,
    caloriesPerServing,
    changeMeasure,
  } = useFood();

  return (
    <div className="rounded-[28px] border border-white/10 bg-white/6 p-6 shadow-2xl shadow-slate-950/35 backdrop-blur transition-all duration-200 ease-out md:p-7">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-200/80">
        Selected Food
      </p>
      <div className="mt-3 flex items-start justify-between gap-4">
        <h2 className="text-3xl font-semibold text-white">
          {food.name}
        </h2>
        <div className="rounded-2xl border border-emerald-400/20 bg-emerald-300/10 px-3 py-2 text-right">
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-100/70">
            Total
          </p>
          <p className="text-2xl font-semibold text-emerald-200">
            {totalCalories} cal
          </p>
        </div>
      </div>

      {food.foodMeasures?.length > 0 ? (
        <div className="mt-6 grid gap-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">
              Portion Size
            </label>
            <select
              className="w-full rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-3 font-medium text-white outline-none transition focus:border-amber-300/70 focus:ring-2 focus:ring-amber-300/25"
              value={selectedMeasure?.disseminationText || ""}
              onChange={(e) => {
                const measure = food.foodMeasures.find(
                  (m) => m.disseminationText === e.target.value,
                );
                changeMeasure(measure);
              }}
            >
              {food.foodMeasures.map((measure, idx) => (
                <option key={idx} value={measure.disseminationText}>
                  {measure.disseminationText}
                </option>
              ))}
            </select>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-950/45 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Per serving
            </p>
            <p className="mt-1 text-2xl font-semibold text-white">
              {caloriesPerServing} cal
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-white/12 bg-slate-950/35 px-4 py-5 text-sm text-slate-300">
          This result does not include serving size data.
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <label className="text-sm font-medium uppercase tracking-[0.18em] text-slate-300">
          Servings:
        </label>
        <input
          type="number"
          min="0"
          value={servings}
          onChange={(e) => setServings(Number(e.target.value))}
          className="w-24 rounded-2xl border border-white/10 bg-slate-950/55 px-3 py-2 text-center text-lg font-semibold text-white outline-none transition focus:border-amber-300/70 focus:ring-2 focus:ring-amber-300/25"
        />
      </div>
    </div>
  );
};
