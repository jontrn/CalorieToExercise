import { useState, useEffect } from "react";
import { FoodCard } from "./components/FoodCard";
import { FoodSearch } from "./components/FoodSearch";
import { FoodDropdown } from "./components/FoodDropdown";
import { exercises } from "./data/exercises";
import { ExerciseCard } from "./components/ExerciseCard";
import { useFood } from "./contexts/FoodContext";
import { searchFoods } from "./api/usdafdc";
import { useDebounce } from "use-debounce";

function App() {
  const [search, setSearch] = useState("");
  const [foods, setFoods] = useState([]);
  const { selectedFood, setSelectedFood, totalCalories } = useFood();

  const [debouncedSearch] = useDebounce(search, 300);

  useEffect(() => {
    const fetchFoods = async () => {
      if (!debouncedSearch) return setFoods([]);
      const results = await searchFoods(debouncedSearch);
      console.log("API results:", results); // ✅ check structure
      setFoods(results);
    };
    fetchFoods();
  }, [debouncedSearch]);

  const filteredFoods = foods.filter((food) => {
    const matches = food.name.toLowerCase().includes(search.toLowerCase());
    const isAlreadySelected = selectedFood?.name === food.name;
    return matches && !isAlreadySelected;
  });

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center">
        <div className="flex flex-col items-center w-full max-w-md p-4">
          {/*Header*/}
          <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
            Calories to Exercise
          </h1>

          {/* Search bar */}
          <FoodSearch
            value={search}
            onChange={(value) => {
              setSearch(value);
              setSelectedFood(null);
            }}
          />

          {/*Dropdown*/}
          <FoodDropdown
            search={search}
            selectedFood={selectedFood}
            filteredFoods={filteredFoods}
            onSelectFood={(food) => {
              setSelectedFood(food);
              setSearch(food.name);
            }}
          />
        </div>

        {/*Selected Food Card*/}
        {selectedFood && <FoodCard food={selectedFood} />}

        {/*Exercise Cards*/}
        {selectedFood && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {exercises.map((exercise, key) => (
              <ExerciseCard
                key={key}
                exercise={exercise}
                totalCalories={totalCalories}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
