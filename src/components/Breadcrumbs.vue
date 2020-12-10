<template>
  <div class="pl-13 hidden-sm-and-down">
    <v-breadcrumbs large>
      <!-- <v-breadcrumbs-item
        :items="items"
        :href="items.path"
        :disabled="items.disabled"
        >{{ items.meta.value }}</v-breadcrumbs-item
      >
    </v-breadcrumbs> -->
    <v-breadcrumbs-item
        :items="items"
        >{{ items.meta.value }}</v-breadcrumbs-item
      >
    </v-breadcrumbs>
    <v-divider></v-divider>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
    };
  },
  watch: {
    $route() {
      this.getRoute();
    },
  },
  methods: {
    getRoute() {
      this.items = this.$route;
    },
  },
  created() {
    this.getRoute();
  },
};
</script>