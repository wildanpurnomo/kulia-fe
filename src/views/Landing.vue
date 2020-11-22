<template>
  <v-container fill-height>
    <v-row align="center">
      <v-col cols="12">
        <div
          class="text-center text-md-h3 text-lg-h3 text-xl-h3 text-sm-h5 text-h5 font-weight-light black--text"
        >
          Selamat Datang di Web
        </div>
      </v-col>
      <v-col cols="6">
        <div class="text-end">
          <v-btn color="primary" text :to="{ name: 'Login' }">Login</v-btn>
        </div>
      </v-col>
      <v-col cols="6">
        <v-btn color="primary" text :to="{ name: 'Register' }">Daftar</v-btn>
      </v-col>
    </v-row>
  </v-container>
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