import { useState, useEffect } from "react";
import { FoodCard } from "./components/FoodCard";
import { FoodSearch } from "./components/FoodSearch";
import { FoodDropdown } from "./components/FoodDropdown";
import { ExerciseCard } from "./components/ExerciseCard";
import { useFood } from "./contexts/FoodContext";
import { pingBackend, searchFoods } from "./api/usdafdc";
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
  const [backendReady, setBackendReady] = useState(false);
  const [backendWaking, setBackendWaking] = useState(false);

  const { selectedFood, totalCalories, selectFood, clearFood } = useFood();

  const isEditingSearch = search.length > 0 && !selectedFood;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const warmBackend = async () => {
      try {
        await pingBackend();
        if (!cancelled) {
          setBackendReady(true);
          setBackendWaking(false);
        }
      } catch (err) {
        if (!cancelled) {
          setBackendReady(false);
        }
      }
    };

    warmBackend();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) return setFoods([]);
    setHasSearched(true);
    setLoading(true);
    setBackendWaking(false);

    let wakeTimer;
    if (!backendReady) {
      wakeTimer = setTimeout(() => {
        setBackendWaking(true);
      }, 1200);
    }

    try {
      const results = await searchFoods(search);
      setFoods(Array.isArray(results) ? results : []);
      setBackendReady(true);
    } catch (err) {
      setFoods([]);
    } finally {
      clearTimeout(wakeTimer);
      setBackendWaking(false);
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

  useEffect(() => {
    if (!selectedFood) return;
    fetchExercises(exerciseQuery);
  }, [selectedFood]);

  const filteredFoods = foods.filter(
    (food) => selectedFood?.name !== food.name,
  );

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,_#111827_0%,_#0f172a_42%,_#020617_100%)] px-4 py-10 text-stone-100 md:px-8 md:py-14">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <section className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
          <h1 className="max-w-4xl text-5xl font-semibold leading-none tracking-tight text-white md:text-7xl">
            Calories to Exercise
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
            Search a food, pick a serving size, and see how long it would take
            to work it off with real activities.
          </p>
        </section>

        <section className="mx-auto w-full max-w-3xl rounded-[28px] border border-white/10 bg-white/6 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur md:p-6">
          <form className="flex w-full flex-col gap-3 sm:flex-row" onSubmit={handleSearch}>
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
              className="rounded-2xl bg-amber-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-amber-300 active:bg-amber-500 disabled:cursor-not-allowed disabled:bg-amber-200/60"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </form>

          {backendWaking && (
            <div className="mt-4 rounded-2xl border border-amber-300/20 bg-amber-300/10 px-4 py-3 text-sm font-medium text-amber-100">
              Waking up the server. The first search can take a little longer.
            </div>
          )}

          <FoodDropdown
            search={search}
            selectedFood={selectedFood}
            filteredFoods={filteredFoods}
            onSelectFood={(food) => {
              selectFood(food);
              setSearch(food.name);
            }}
          />
          {hasSearched &&
            !loading &&
            !selectedFood &&
            search &&
            filteredFoods.length === 0 && (
            <div className="mt-4 rounded-2xl border border-white/10 bg-slate-900/50 px-4 py-3 text-sm font-medium text-slate-300">
              No foods found
            </div>
          )}
        </section>

        {selectedFood && !isEditingSearch ? (
          <>
            <section className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
              <FoodCard food={selectedFood} />
              <div className="flex flex-col gap-4 rounded-[28px] border border-white/10 bg-white/6 p-5 shadow-2xl shadow-slate-950/35 backdrop-blur md:p-6">
                <WeightInput value={weight} onChange={setWeight} />
                <ExerciseSearch
                  value={exerciseQuery}
                  onChange={setExerciseQuery}
                  onSubmit={handleExerciseSearch}
                  loading={exerciseLoading}
                />
              </div>
            </section>

            <section className="space-y-4">
              <div className="flex flex-col gap-1">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/80">
                  Exercise Equivalent
                </p>
              </div>

              {exerciseResults.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {exerciseResults.map((ex, idx) => (
                    <ExerciseCard
                      key={idx}
                      exercise={ex}
                      totalCalories={totalCalories}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-[24px] border border-dashed border-white/14 bg-slate-950/35 px-6 py-10 text-center text-slate-300">
                  Search for an activity to compare this meal against.
                </div>
              )}
            </section>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default App;
