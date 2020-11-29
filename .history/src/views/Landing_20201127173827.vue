<template>
<v-main class="grey lighten-3">
  <v-container fill-height>
    <v-row align="center">
      <v-col cols="6">
        <v-img src="../assets/image.png"></v-img>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="6">
        <v-card-title class="font blue-grey--text text--darken-3">
          Wappita
        </v-card-title>
        <v-card-text class="pt-2 text-title" width="100">
          Bagikan dan temukan pengetahuan baru. Buatlah koneksi agar selalu terhubung dengan creator pendidikan yang seru.
        </v-card-text>
        <v-row class="pl-8 pt-6">
          <div class="mr-8">
            <v-btn class="white--text red accent-2 rounded-xl" outlined :to="{ name: 'Login' }">Login</v-btn>
          </div>
          <div>
            <v-btn class="blue-grey--text text--darken-3 rounded-xl" outlined :to="{ name: 'Register' }">Daftar</v-btn>
          </div>
        </v-row> 
      </v-col>
    </v-row>
  </v-container>
</v-main>
</template>
<script>
export default {
  name: "Landing",

  components: {},

  data: () => ({
    //
  }),
};
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Lobster+Two:wght@700&display=swap');
.font{
  font-family: Lobster Two;
  font-size: 50px;
}
</style>