import { createApp } from "vue";
import App from "./App.vue";

createApp(App).mount("#app");

const API_KEY = "35e2bd09057c445781e93e11e8646cbd";

const getRecipes = async (query) => {
  const container = document.getElementById("recipe-container");
  container.innerHTML = "<p>Searching for recipes...</p>";

  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${API_KEY}`
    );
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      displayRecipes(data.results);
    } else {
      container.innerHTML = "<p>No results found. Try another search!</p>";
    }
  } catch (error) {
    console.error("Fetch error:", error);
    container.innerHTML = "<p>Error: Could not connect to the recipe API.</p>";
  }
};

const displayRecipes = (recipes) => {
  const container = document.getElementById("recipe-container");
  container.innerHTML = "";

  recipes.forEach((recipe) => {
    const card = document.createElement("div");
    card.className = "recipe-card";
    card.innerHTML = `
      <h3>${recipe.title}</h3>
      <img src="${recipe.image}" alt="${recipe.title}">
    `;
    container.appendChild(card);
  });
};

window.addEventListener("load", () => {
  const searchButton = document.getElementById("search-button");
  const searchBar = document.getElementById("search-bar");

  if (searchButton) {
    searchButton.addEventListener("click", () => {
      const searchTerm = searchBar.value.trim();
      if (searchTerm) {
        getRecipes(searchTerm);
      } else {
        alert("Please enter a search term.");
      }
    });
  }
});
