<template>
  <div id="app">
    <header>
      <h1>Currency Converter</h1>
    </header>
    <main>
      <Converter />
    </main>
    <footer>
      <p>&copy; 2024 Currency Converter</p>
    </footer>
  </div>
</template>

<script setup>
import Converter from './components/Converter.vue';
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  border-radius: 5px;
  font-family: Arial, sans-serif;
  background-color: #bdbdbd;
  color: #333;
}

header {
  background-color: #4a90e2;
  padding: 20px;
  text-align: center;
  border-radius: 5px;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

header h1 {
  margin: 0;
  font-size: 1.5rem;
}

main {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

footer {
  background-color: #4a90e2;
  color: white;
  text-align: center;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
}

footer p {
  margin: 0;
}
</style>
