import { createContext, useState, useMemo, useContext } from "react";

const FoodContext = createContext();

export const FoodProvider = ({ children }) => {
  const [selectedFood, setSelectedFood] = useState(null);
  const [servings, setServings] = useState(1);
  const [selectedMeasure, setSelectedMeasure] = useState(null);
  const [caloriesPerServing, setCaloriesPerServing] = useState(0);

  const totalCalories = useMemo(() => {
    return caloriesPerServing * servings;
  }, [caloriesPerServing, servings]);

  const selectFood = (food) => {
    setSelectedFood(food);

    if (!food?.foodMeasures?.length) {
      setSelectedMeasure(null);
      setCaloriesPerServing(0);
      setServings(1);
      return;
    }

    // Prefer 100g if it exists
    const hundredGramMeasure =
      food.foodMeasures.find(
        (m) =>
          m.disseminationText === "100 g" || m.disseminationText === "100g",
      ) || food.foodMeasures[0];

    setSelectedMeasure(hundredGramMeasure);
    setCaloriesPerServing(hundredGramMeasure.calories);
    setServings(1);
  };

  const changeMeasure = (measure) => {
    setSelectedMeasure(measure);
    setServings(1);
    setCaloriesPerServing(measure.calories);
  };

  const clearFood = () => {
    setSelectedFood(null);
    setSelectedMeasure(null);
    setCaloriesPerServing(0);
    setServings(1);
  };

  return (
    <FoodContext.Provider
      value={{
        selectedFood,
        servings,
        totalCalories,
        selectedMeasure,
        caloriesPerServing,

        // actions
        selectFood,
        changeMeasure,
        setServings,
        clearFood,
      }}
    >
      {children}
    </FoodContext.Provider>
  );
};

export const useFood = () => useContext(FoodContext);
