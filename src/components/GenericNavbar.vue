<template>
  <nav>
    <v-toolbar :color="colorTheme" dark>
      <v-toolbar-title class="font1" @click="$router.push({ name: `Landing` })"
        >Wappita</v-toolbar-title
      >
    </v-toolbar>
  </nav>
</template>
<script>
export default {
  name: "GenericNavbar",
  computed: {},
  data: () => ({
    colorTheme: "#394867",
  }),
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Lobster+Two:wght@700&display=swap");
.font1 {
  font-family: Lobster Two;
  font-size: 25px;
  color: white;
  cursor: pointer;
}
</style>