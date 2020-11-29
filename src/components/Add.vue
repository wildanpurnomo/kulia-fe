<template>
    <v-container>
        <v-tooltip left>
            <template v-slot:activator="{ on, attrs }">
            <v-btn
                fab
                large
                dark
                bottom
                right
                fixed
                v-bind="attrs"
                v-on="on"
                :color="colorTheme"
                :to="{ name: 'AddContent'}"
            >
                <v-icon>mdi-plus</v-icon>
            </v-btn>
            </template>
            <span>Tambah Konten</span>
        </v-tooltip>
    </v-container>
</template>
<script>
export default {
  name: "Add",

  components: {},

  data: () => ({
      colorTheme: "#4F4F68",
    //
  }),
};
</script>