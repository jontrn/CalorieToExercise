export const FoodDropdown = ({
  search,
  selectedFood,
  filteredFoods,
  onSelectFood,
}) => {
  if (!search || selectedFood || filteredFoods.length === 0) return null;

  return (
    <div className="w-full mt-2 rounded-lg bg-slate-300 shadow-lg max-h-60 overflow-y-auto ring-1 ring-black/20">
      {filteredFoods.map((food, key) => (
        <div
          key={key}
          className="dropdown-item p-3 hover:bg-blue-100 cursor-pointer"
          onClick={() => onSelectFood(food)}
        >
          {food.name}
        </div>
      ))}
    </div>
  );
};
