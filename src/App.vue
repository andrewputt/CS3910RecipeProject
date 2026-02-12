<template>
  <div id="app">
    
    <!-- HERO SECTION -->
    <header class="hero">
      <div class="overlay">
        <h1>🍳 Discover Delicious Recipes</h1>
        <p>Search thousands of recipes instantly</p>

        <div class="search-bar">
          <input 
            v-model="searchQuery"
            @keyup.enter="searchRecipes"
            placeholder="Search for pasta, chicken, vegan..."
          />
          <button @click="searchRecipes">Search</button>
        </div>
      </div>
    </header>

    <!-- LOADING -->
    <div v-if="loading" class="loader">Loading recipes...</div>

    <!-- RECIPE GRID -->
    <main class="recipe-container">
      <transition-group name="fade" tag="div" class="recipe-grid">
        <div 
          v-for="recipe in recipes"
          :key="recipe.id"
          class="recipe-card"
          @click="getRecipeDetails(recipe.id)"
        >
          <img :src="recipe.image" :alt="recipe.title" />
          <div class="card-content">
            <h3>{{ recipe.title }}</h3>
          </div>
        </div>
      </transition-group>
    </main>

    <!-- MODAL -->
    <div v-if="selectedRecipe" class="modal" @click.self="selectedRecipe = null">
      <div class="modal-content">
        <button class="close-btn" @click="selectedRecipe = null">✖</button>
        <img :src="selectedRecipe.image" />
        <h2>{{ selectedRecipe.title }}</h2>
        <p><strong>Ready in:</strong> {{ selectedRecipe.readyInMinutes }} mins</p>
        <p><strong>Servings:</strong> {{ selectedRecipe.servings }}</p>
        <div v-html="selectedRecipe.summary"></div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      recipes: [],
      selectedRecipe: null,
      loading: false
    }
  },
  mounted() {
    this.fetchPopularRecipes();
  },
  methods: {
    async fetchPopularRecipes() {
      this.loading = true;
      const response = await fetch(
        `https://api.spoonacular.com/recipes/random?number=12&apiKey=${import.meta.env.VITE_SPOONACULAR_API_KEY}`
      );
      const data = await response.json();
      this.recipes = data.recipes;
      this.loading = false;
    },

    async searchRecipes() {
      if (!this.searchQuery) return;
      this.loading = true;

      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${this.searchQuery}&number=12&apiKey=${import.meta.env.VITE_SPOONACULAR_API_KEY}`
      );
      const data = await response.json();
      this.recipes = data.results;
      this.loading = false;
    },

    async getRecipeDetails(id) {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${import.meta.env.VITE_SPOONACULAR_API_KEY}`
      );
      const data = await response.json();
      this.selectedRecipe = data;
    }
  }
}
</script>

<style>
body {
  margin: 0;
  font-family: 'Poppins', sans-serif;
  background: #f4f4f4;
}

/* HERO */
.hero {
  background: url("https://images.unsplash.com/photo-1490645935967-10de6ba17061") center/cover no-repeat;
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
}

.overlay {
  background: rgba(0,0,0,0.6);
  padding: 40px;
  width: 100%;
}

.search-bar {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.search-bar input {
  padding: 12px;
  width: 300px;
  border-radius: 25px;
  border: none;
}

.search-bar button {
  padding: 12px 20px;
  border-radius: 25px;
  border: none;
  background: #ff7043;
  color: white;
  cursor: pointer;
  transition: 0.3s;
}

.search-bar button:hover {
  background: #ff5722;
}

/* GRID */
.recipe-container {
  padding: 40px;
}

.recipe-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
}

.recipe-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.recipe-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 35px rgba(0,0,0,0.2);
}

.recipe-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-content {
  padding: 15px;
}

/* MODAL */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  padding: 30px;
  border-radius: 15px;
  position: relative;
}

.modal-content img {
  width: 100%;
  border-radius: 10px;
}

.close-btn {
  position: absolute;
  right: 15px;
  top: 15px;
  border: none;
  background: none;
  font-size: 18px;
  cursor: pointer;
}

/* LOADER */
.loader {
  text-align: center;
  font-size: 20px;
  margin-top: 30px;
}

/* ANIMATION */
.fade-enter-active, .fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
</style>
