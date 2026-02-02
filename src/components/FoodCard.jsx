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
    <div className="mt-6 transition-all duration-200 ease-out">
      <div className="mt-6 p-6 bg-slate-400/80 text-slate-100 rounded-lg shadow-md w-md max-w-3xl text-center">
        <h2 className="text-2xl font-bold break-words mb-2 text-slate-900">
          {food.name}
        </h2>

        {/* Portion Size Dropdown */}
        {food.foodMeasures?.length > 0 && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-900 mb-1">
              Portion Size
            </label>
            <select
              className="font-bold w-full mt-2 rounded-lg bg-slate-400 shadow-lg max-h-60 overflow-y-auto ring-1 ring-black/20 text-slate-900"
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
        )}

        <p className="block text-sm font-medium text-slate-900 mb-2">
          {caloriesPerServing} cal per serving
        </p>

        <div className="flex items-center justify-center gap-3 mb-2">
          <label className="font-medium text-lg text-slate-900">
            Servings:
          </label>
          <input
            type="number"
            min="0"
            value={servings}
            onChange={(e) => setServings(Number(e.target.value))}
            className="w-20 p-2 border border-gray-900 rounded-lg text-lg text-center text-slate-900 font-bold"
          />
        </div>

        <p className="font-semibold text-slate-900 text-xl">
          Total: {totalCalories} cal
        </p>
      </div>
    </div>
  );
};
