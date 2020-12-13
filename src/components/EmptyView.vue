<template>
      <v-col class="pa-1">
        <v-card-title class="font pt-1">Oops ...! <br></v-card-title >
        <v-card-text class="text--disabled text-body-1 font-weight-medium mb-10">
            {{ emptyMessage }}
            <router-link :to="{ name: 'MyFollowing' }"><br>Temukan dan ikuti Author lainnya</router-link>
        </v-card-text>
        <v-img class="mx-10" src="@/assets/image2.png" max-width="500"></v-img>
      </v-col>
</template>

<script>
import { EventBus } from "@/bus";

export default {
  data: () => ({
    emptyMessage: '',
  }),
  mounted() {
    EventBus.$on("emptyViewMessage", (emptyMessage) => {
      this.emptyMessage = emptyMessage;
    });
  },
};
</script>

<style scope>
@import url("https://fonts.googleapis.com/css2?family=Lobster+Two:wght@700&display=swap");
.font {
  font-family: Lobster Two;
  font-size: 30px;
  color: #394867cb
}
</style>