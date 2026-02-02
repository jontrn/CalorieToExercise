import dotenv from "dotenv";
import path from "path";
import express from "express";
import fetch from "node-fetch";
import cors from "cors";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "https://calorietoexercise.vercel.app"],
  }),
);

const USDA_API_KEY = process.env.USDA_API_KEY;
const API_NINJAS_KEY = process.env.API_NINJAS_KEY;

let isFetching = false;

app.get("/foods", async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "No query provided" });
  }

  if (isFetching) {
    return res
      .status(429)
      .json({ error: "Please wait before sending another request" });
  }

  isFetching = true;

  try {
    const encodedQuery = encodeURIComponent(query);
    const encodedDataType = encodeURIComponent("Survey (FNDDS)");
    const pageSize = 20;

    const url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${USDA_API_KEY}&query=${encodedQuery}&pageSize=${pageSize}&dataType=${encodedDataType}`;

    let response;
    let attempt = 0;

    while (true) {
      attempt++;
      try {
        response = await fetch(url, {
          headers: {
            "User-Agent": "CalorieExerciseApp/1.0",
            Accept: "application/json",
          },
        });

        if (response.ok) {
          console.log(`USDA API succeeded on attempt ${attempt}`);
          break;
        } else {
          const text = await response.text();
          console.warn(
            `USDA API attempt ${attempt} failed with status ${response.status}: ${text}`,
          );
        }
      } catch (err) {
        console.warn(
          `USDA API attempt ${attempt} threw an error: ${err.message}`,
        );
      }

      await new Promise((r) => setTimeout(r, 500));
    }

    const data = await response.json();

    const foods = (data.foods || []).map((f) => {
      const energyPer100g =
        f.foodNutrients.find(
          (n) => n.nutrientName === "Energy" && n.unitName === "KCAL",
        )?.value || 0;

      let foodMeasures = (f.foodMeasures || [])
        .filter(
          (m) =>
            m.disseminationText &&
            m.disseminationText.toLowerCase() !== "quantity not specified",
        )
        .map((m) => ({
          disseminationText: m.disseminationText,
          gramWeight: m.gramWeight,
          calories: Math.round((energyPer100g / 100) * m.gramWeight),
        }));

      const has100g = foodMeasures.some((m) => m.disseminationText === "100 g");

      if (!has100g && energyPer100g > 0) {
        foodMeasures.unshift({
          disseminationText: "100 g",
          gramWeight: 100,
          calories: Math.round(energyPer100g),
        });
      }

      return {
        id: f.fdcId,
        name: f.description,
        calories: foodMeasures[0]?.calories || 0,
        foodMeasures,
      };
    });

    res.json(foods);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: err.message });
  } finally {
    isFetching = false;
  }
});

app.get("/exercise", async (req, res) => {
  const { activity, weight = 160 } = req.query;

  if (!activity) {
    return res.status(400).json({ error: "Missing activity" });
  }

  try {
    const response = await fetch(
      `https://api.api-ninjas.com/v1/caloriesburned?activity=${encodeURIComponent(
        activity,
      )}&weight=${weight}`,
      {
        headers: {
          "X-Api-Key": API_NINJAS_KEY,
        },
      },
    );

    const data = await response.json();
    res.json(Array.isArray(data) ? data : []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
