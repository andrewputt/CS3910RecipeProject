import { createApp } from "vue";
import App from "./App.vue";

createApp(App).mount("#app");

document.getElementById("search-button").addEventListener("click", () => {
  const searchBar = document.getElementById("search-bar");
  const searchTerm = searchBar.value.trim();

  if (searchTerm) {
    getRecipes(searchTerm);
  } else {
    alert("Please enter a search term.");
  }
});
