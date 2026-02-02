export const ExerciseCard = ({ exercise, totalCalories }) => {
  const caloriesPerMinute = exercise.calories_per_hour / 60;

  const minutes =
    totalCalories && caloriesPerMinute
      ? Math.ceil(totalCalories / caloriesPerMinute)
      : 0;

  return (
    <div
      className="
      bg-slate-400 rounded-lg shadow-md
      p-8 flex flex-col items-center justify-center
      transition-all duration-200 ease-out
      hover:-translate-y-1 hover:shadow-lg
    "
    >
      <h3 className="font-bold text-lg text-center text-slate-900 mb-2">
        {exercise.name}
      </h3>

      {totalCalories > 0 && (
        <>
          <p className="text-slate-900 mt-2 text-2xl font-extrabold">
            {minutes >= 60
              ? `${Math.floor(minutes / 60)} hr${
                  Math.floor(minutes / 60) > 1 ? "s" : ""
                }${minutes % 60 ? ` ${minutes % 60} min` : ""}`
              : `${minutes} min`}
          </p>

          <p className="text-sm text-slate-800 mt-1 font-medium">
            ~{exercise.calories_per_hour} cal/hr
          </p>
        </>
      )}
    </div>
  );
};
