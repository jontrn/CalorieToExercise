import { useState, useEffect } from "react";
import { FoodCard } from "./components/FoodCard";
import { FoodSearch } from "./components/FoodSearch";
import { FoodDropdown } from "./components/FoodDropdown";
import { ExerciseCard } from "./components/ExerciseCard";
import { useFood } from "./contexts/FoodContext";
import { searchFoods } from "./api/usdafdc";
import { ExerciseSearch } from "./components/ExerciseSearch";
import { WeightInput } from "./components/WeightInput";

function App() {
  const [search, setSearch] = useState("");
  const [foods, setFoods] = useState([]);
  const [exerciseQuery, setExerciseQuery] = useState("Walking 3.0");
  const [exerciseResults, setExerciseResults] = useState([]);
  const [exerciseLoading, setExerciseLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [weight, setWeight] = useState(160);

  const { selectedFood, totalCalories, selectFood, clearFood } = useFood();

  const isEditingSearch = search.length > 0 && !selectedFood;

  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) return setFoods([]);
    setHasSearched(true);
    setLoading(true);
    try {
      const results = await searchFoods(search);
      setFoods(Array.isArray(results) ? results : []);
    } catch (err) {
      setFoods([]);
    } finally {
      setLoading(false);
    }
  };

  const handleExerciseSearch = async (e) => {
    e.preventDefault();
    fetchExercises(exerciseQuery);
  };

  const fetchExercises = async (query) => {
    if (!query) return;

    setExerciseLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/exercise?activity=${encodeURIComponent(
          query,
        )}&weight=${weight}`,
      );
      const data = await res.json();
      setExerciseResults(Array.isArray(data) ? data : []);
    } catch (err) {
      setExerciseResults([]);
    } finally {
      setExerciseLoading(false);
    }
  };

  useEffect(() => {
    setExerciseResults([]);
  }, [selectedFood]);

  const filteredFoods = foods.filter(
    (food) => selectedFood?.name !== food.name,
  );

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 flex flex-col items-center px-4 md:px-8">
        <div className="flex flex-col items-center w-full max-w-md p-4 ">
          {/*Header*/}
          <h1 className="text-4xl font-extrabold mb-8 text-center text-slate-300 tracking-tight leading-tight">
            <span className="text-red-400">Calories</span> to{" "}
            <span className="text-red-400">Exercise</span>
          </h1>

          {/* Search bar and button */}
          <form className="flex w-full mb-4" onSubmit={handleSearch}>
            <FoodSearch
              value={search}
              onChange={(value) => {
                setSearch(value);
                clearFood();
                setFoods([]);
                setHasSearched(false);
                setExerciseResults([]);
              }}
            />
            <button
              type="submit"
              disabled={loading}
              className="ml-2 px-5 py-3 rounded-lg font-medium bg-slate-600 text-slate-100 hover:bg-slate-500 active:bg-slate-700 disabled:bg-slate-700/50 disabled:cursor-not-allowed transition"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </form>

          {/*Dropdown*/}
          <FoodDropdown
            search={search}
            selectedFood={selectedFood}
            filteredFoods={filteredFoods}
            onSelectFood={(food) => {
              selectFood(food);
              setSearch(food.name);
            }}
          />
          {hasSearched && !loading && search && filteredFoods.length === 0 && (
            <div className="mt-3 text-slate-300 text-base font-medium">
              No foods found
            </div>
          )}
        </div>

        {/*Selected Food Card*/}
        {selectedFood && !isEditingSearch && <FoodCard food={selectedFood} />}

        {/* Weight Entry */}
        {selectedFood && !isEditingSearch && (
          <WeightInput value={weight} onChange={setWeight} />
        )}

        {/* Exercise search bar and submission */}
        {selectedFood && !isEditingSearch && (
          <ExerciseSearch
            value={exerciseQuery}
            onChange={setExerciseQuery}
            onSubmit={handleExerciseSearch}
            loading={exerciseLoading}
          />
        )}

        {/* Exercise cards */}
        {selectedFood && !isEditingSearch && exerciseResults.length > 0 && (
          <div className="mt-6 mx-auto grid gap-6 grid-cols-[repeat(auto-fit,minmax(280px,1fr))] max-w-5xl">
            {exerciseResults.map((ex, idx) => (
              <ExerciseCard
                key={idx}
                exercise={ex}
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
