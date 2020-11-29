<template>
  <v-container fill-height color="pink">
    <v-row>
      <v-col cols="12">
        <v-row justify="center">
          <v-card class="pa-8 rounded-lg" width="500">
            <v-row justify="center">
              <div class="mb-16 text-h3 blue-grey--text text--darken-3">
                Login
              </div>
            </v-row>
            <v-form ref="loginForm">
              <v-text-field
                v-model="user.username"
                label="Username"
                type="text"
                append-icon="mdi-account"
                required
              ></v-text-field>
              <v-text-field
                v-model="user.password"
                label="Password"
                :append-icon="isPasswordShown ? 'mdi-eye' : 'mdi-eye-off'"
                :type="isPasswordShown ? 'text' : 'password'"
                required
                @click:append="isPasswordShown = !isPasswordShown"
              ></v-text-field>
              <div class="text-center mb-8">
                <v-btn
                  width="100%"
                  type="submit"
                  class="primary"
                  :disabled="isFormLoading"
                  :loading="isFormLoading"
                  @click.prevent="login"
                  >Login</v-btn
                >
              </div>
              <div class="text-center">
                <router-link :to="{ name: 'Register' }">Register</router-link>
              </div>
              <div class="red--text mt-8" :hidden="errorMessage.length === 0">
                {{ errorMessage }}
              </div>
            </v-form>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
    <Snackbar :duration="3000" />
  </v-container>
</template>
<script>
import Snackbar from "@/components/Snackbar";
import { EventBus } from "@/bus";
import formInputMixin from "@/mixins/form.mixin";
import errorMixin from "@/mixins/error.mixin";
import UserModel from "@/models/user.model";

export default {
  name: "Login",
  components: { Snackbar },
  data: () => ({
    user: new UserModel(),
    isPasswordShown: false,
    errorMessage: "",
  }),
  methods: {
    async login() {
      this.isFormLoading = true;
      try {
        let response = await this.$store.dispatch("auth/login", this.user);
        if (response.status === 200) {
          this.errorMessage = "";
          this.$router.push({ name: "Home" });
        }
      } catch (error) {
        this.isFormLoading = false;
        this.errorMessage = this.getErrorMessage(error);
      }
    },
  },
  mounted() {
    let params = this.$route.params;
    if (params.snackbarMessage) {
      EventBus.$emit("onShowSnackbar", params.snackbarMessage);
    }
  },
  mixins: [formInputMixin, errorMixin],
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Lobster+Two:wght@700&display=swap");
.font {
  font-family: Lobster Two;
  font-size: 40px;
}
</style>