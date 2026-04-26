export const ExerciseCard = ({ exercise, totalCalories }) => {
  const caloriesPerMinute = exercise.calories_per_hour / 60;

  const minutes =
    totalCalories && caloriesPerMinute
      ? Math.ceil(totalCalories / caloriesPerMinute)
      : 0;

  return (
    <div
      className="
      rounded-[24px] border border-white/10 bg-white/6 p-6
      flex min-h-[190px] flex-col justify-between
      shadow-xl shadow-slate-950/30 transition-all duration-200 ease-out
      hover:-translate-y-1 hover:border-amber-300/30
    "
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
          Activity
        </p>
        <h3 className="mt-2 text-xl font-semibold text-white">
          {exercise.name}
        </h3>
      </div>

      {totalCalories > 0 && (
        <div className="mt-6">
          <p className="text-4xl font-semibold tracking-tight text-amber-200">
            {minutes >= 60
              ? `${Math.floor(minutes / 60)} hr${
                  Math.floor(minutes / 60) > 1 ? "s" : ""
                }${minutes % 60 ? ` ${minutes % 60} min` : ""}`
              : `${minutes} min`}
          </p>

          <p className="mt-2 text-sm font-medium text-slate-300">
            ~{exercise.calories_per_hour} cal/hr
          </p>
        </div>
      )}
    </div>
  );
};
