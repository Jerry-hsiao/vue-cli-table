<template>
  <nav>
    <h1 class="logo">Equip List</h1>
    <nav id="nav">
      <ul class="nav-links">
        <li class="links">
          <router-link :to="{ name: 'List' }">List</router-link>
          <router-link :to="{ name: 'Management' }">Management</router-link>
        </li>
      </ul>
    </nav>
  </nav>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style scoped>
#nav {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
  position: sticky;
  top: 0;
  background-color: white;
  border-bottom: 1px solid grey;
  z-index: 1;
  height: 20px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  padding: 0 10px;
  text-decoration: none;
}

#nav a.vue-shcool-actives-class {
  color: #42b983;
}
.nav-links {
  display: flex;
}
.links {
  list-style: none;
  padding-right: 20px;
  font-size: 20px;
}
.links:hover {
  text-decoration: underline;
}
.logo {
  font-size: 40px;
  color: purple;
  font-weight: bold;
  display: block;
}</style
>>
