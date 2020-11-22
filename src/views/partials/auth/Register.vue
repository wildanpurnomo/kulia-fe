<template>
  <v-container fill-height>
    <v-row>
      <v-col cols="12">
        <v-row justify="center">
          <v-card class="pa-8" width="500">
            <v-row justify="center">
              <div
                class="mb-16 text-h3 font-weight-light blue--text text--lighten-2"
              >
                Register
              </div>
            </v-row>
            <v-form ref="registerForm">
              <v-text-field
                label="Username"
                type="text"
                required
              ></v-text-field>
              <v-text-field
                label="Email"
                type="email"
                required
              ></v-text-field>
              <v-text-field
                label="Password"
                :append-icon="isPasswordShown ? 'mdi-eye' : 'mdi-eye-off'"
                :type="isPasswordShown ? 'text' : 'password'"
                @click:append="isPasswordShown = !isPasswordShown"
                required
              ></v-text-field>
              <v-text-field
                v-model="passwordConfirmation"
                label="Konfirmasi Password"
                :append-icon="isPasswordShown ? 'mdi-eye' : 'mdi-eye-off'"
                :type="isPasswordShown ? 'text' : 'password'"
                @click:append="isPasswordShown = !isPasswordShown"
                required
              ></v-text-field>
              <div class="text-center mb-8">
                <v-btn
                  type="submit"
                  class="primary"
                  width="100%"
                  >Register</v-btn
                >
              </div>
              <div class="text-center">
                <router-link :to="{ name: 'Login' }"
                  >Kembali ke login</router-link
                >
              </div>
              <div class="h6 red--text" :hidden="errorMessage.length === 0">
                {{ errorMessage }}
              </div>
            </v-form>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "Register",
  data: () => ({
    errorMessage: "",
    passwordConfirmation: "",
    isPasswordShown: false,
  }),
  methods: {
  },
};
</script>