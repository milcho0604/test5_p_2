<template>
  <nav>
    <div class="link">
    <router-link to="/product">제품</router-link> |
    </div>
  <router-view/>
</nav>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}

nav {
  padding: 30px;
  margin-left: 100px;
}
div.link{
  margin-left:250px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
  
}
</style>

