<template>
  <v-container fill-height>
    <v-row align="center">
      <v-col cols="12">
        <div
          class="text-center text-md-h3 text-lg-h3 text-xl-h3 text-sm-h5 text-h5 font-weight-light black--text"
        >
          Saya Ikuti
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { EventBus } from "@/bus";

export default {
  name: "MyFollowing",

  components: {},

  data: () => ({
    //
  }),
  created() {
    EventBus.$emit("onPageChange", "Saya Ikuti");
  },
};
</script>