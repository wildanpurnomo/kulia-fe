<template>
  <g-signin-button
    :params="googleAuthParams"
    @success="onAuthSuccess"
    @error="onAuthError"
  >
    Masuk dengan Google
  </g-signin-button>
</template>
<script>
import { EventBus } from "@/bus";
import errorMixin from "@/mixins/error.mixin";

export default {
  name: "GoogleAuth",
  data: () => ({
    googleAuthParams: {
      client_id: process.env.VUE_APP_GOOGLEAPIS_CLIENT_ID,
    },
  }),
  methods: {
    async onAuthSuccess(googleProfile) {
      try {
        let userData = {
          username: googleProfile.wt.Ad,
          email: googleProfile.wt.cu,
          profilePicUrl: googleProfile.wt.SJ,
        };
        let response = await this.$store.dispatch("auth/withGoogle", userData);
        if (response.status === 200) {
          this.$router.push({ name: "Home" });
        } else {
          EventBus.$emit("onShowSnackbar", "Username atau email telah digunakan");
        }
      } catch (error) {
        EventBus.$emit("onShowSnackbar", this.getErrorMessage(error));
        console.log(error);
      }
    },
    onAuthError(error) {
      if (process.env.NODE_ENV === "development") {
        console.log(error);
      }
    },
  },
  mixins: [errorMixin],
};
</script>
<style scoped>
.g-signin-button {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
  cursor: pointer;
}
</style>