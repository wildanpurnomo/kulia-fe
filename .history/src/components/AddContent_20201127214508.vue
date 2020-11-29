<template>
<v-container>
  <v-tooltip>
    <v-fab-transition>
      <v-btn
        fab
        medium
        dark
        bottom
        right
        fixed
        :color="colorTheme"
        :to="{ name: 'Login' }"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <span>Add Content</span>
    </v-fab-transition>
    </v-tooltip>
</v-container>
</template>

<script>

export default {
    name: "Content",
    data: () => ({
       colorTheme: "#4F4F68"
    }) 
}
</script>