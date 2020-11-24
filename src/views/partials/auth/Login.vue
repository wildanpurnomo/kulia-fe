<template>
  <v-container fill-height>
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
                label="Username"
                type="text"
                append-icon="mdi-account"
                required
              ></v-text-field>
              <v-text-field
                label="Password"
                :append-icon="isPasswordShown ? 'mdi-eye' : 'mdi-eye-off'"
                :type="isPasswordShown ? 'text' : 'password'"
                required
                @click:append="isPasswordShown = !isPasswordShown"
              ></v-text-field>
              <div class="text-center mb-8">
                <v-btn width="100%" type="submit" class="white--text red accent-2 rounded-xl">Sign In</v-btn>
              </div>
              <div class="text-center">
                didn't have an account?
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

export default {
  name: "Login",
  components: { Snackbar },
  data: () => ({
    isPasswordShown: false,
    errorMessage: "",
  }),
  methods: {
  },
  mounted() {
    EventBus.$emit("onShowSnackbar", "Hallo niece and nephew");
  }
};
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Lobster+Two:wght@700&display=swap');
.font{
  font-family: Lobster Two;
  font-size: 40px;
}
</style>