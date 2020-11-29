<template>
  <v-container fill-height>
    <v-row>
      <v-col cols="12">
        <v-row justify="center">
          <v-card class="pa-10 rounded-lg" width="500" :color="colorTheme">
            <v-row justify="center">
              <div class="mb-16 text-h3 grey--text text--lighten-3">
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
                dark
              ></v-text-field>
              <v-text-field
                v-model="user.password"
                label="Password"
                :append-icon="isPasswordShown ? 'mdi-eye' : 'mdi-eye-off'"
                :type="isPasswordShown ? 'text' : 'password'"
                required
                dark
                @click:append="isPasswordShown = !isPasswordShown"
              ></v-text-field>
              <div class="text-center mb-8">
                <v-btn
                  width="100%"
                  type="submit"
                  class="white--text red accent-2 rounded-xl"
                  :disabled="isFormLoading"
                  :loading="isFormLoading"
                  @click.prevent="login"
                  >Login</v-btn
                >
              </div>
              <div class="text-center white--text">
                Belum memiliki akun?
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
    colorTheme: "#4F4F68",
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