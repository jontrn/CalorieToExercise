export const FoodDropdown = ({
  search,
  selectedFood,
  filteredFoods,
  onSelectFood,
}) => {
  if (!search || selectedFood || filteredFoods.length === 0) return null;

  return (
    <div className="mt-3 max-h-72 w-full overflow-y-auto rounded-[22px] border border-white/10 bg-slate-950/90 p-2 shadow-2xl shadow-slate-950/40">
      {filteredFoods.map((food, key) => (
        <div
          key={key}
          className="cursor-pointer rounded-2xl px-4 py-3 text-sm font-medium text-slate-100 transition hover:bg-white/8"
          onClick={() => onSelectFood(food)}
        >
          {food.name}
        </div>
      ))}
    </div>
  );
};
