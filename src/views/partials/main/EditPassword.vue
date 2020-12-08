<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="8" class="pa-10 white rounded-lg">
        <v-card-title class="font blue-grey--text text--darken-3">
          Edit Password
        </v-card-title>
        <v-divider></v-divider>
        <v-form class="ma-6">
          <v-row>
            <v-col cols="3" class="d-flex align-center"> Password Lama: </v-col>
            <v-spacer></v-spacer>
            <v-col cols="9">
              <v-text-field
                v-model="user.oldPassword"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                placeholder="Password"
                required
                class="input-group--focused"
                @click:append="show1 = !show1"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3" class="d-flex align-center"> Password Baru: </v-col>
            <v-col cols="9">
              <v-text-field
                v-model="user.newPassword"
                :rules="this.passwordRules"
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show2 ? 'text' : 'password'"
                placeholder="Password Baru"
                required
                class="input-group--focused"
                @click:append="show2 = !show2"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-spacer></v-spacer>
            <v-col cols="9">
              <v-text-field
                  v-model="user.newPasswordConfirmation"
                  :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show3 ? 'text' : 'password'"
                  :rules="passwordConfirmationRules"
                  placeholder="Konfirmasi Password"
                  required
                  class="input-group--focused"
                  @click:append="show3 = !show3"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>

        <v-row class="ma-6 d-flex justify-end">
          <div class="mr-8">
            <v-btn
              type="submit"
              class="white--text blue-grey darken-3 rounded-xl"
              outlined
              width="100"
              :loading="isFormLoading"
              @click.prevent="editPassword"
            >Simpan</v-btn>
          </div>
          <div>
            <v-btn
              class="red--text text--accent-2 rounded-xl"
              outlined
              :to="{ name: 'MyProfile' }"
            >Batal</v-btn>
          </div>
        </v-row>
        <div class="red--text mt-8" :hidden="errorMessage.length === 0">
        {{ errorMessage }}
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { EventBus } from "@/bus";
import UserModel from "@/models/user.model";
import formInputMixin from "@/mixins/form.mixin";
import errorMixin from "@/mixins/error.mixin";

export default {
  name: "EditPassword",
  data: () => ({
    user: new UserModel(),
    errorMessage: "",
    newPasswordConfirmation: "",
    show1: false,
    show2: false,
    show3: false,
  }),

  computed: {
    user() {
      return this.$store.getters["auth/userData"];
    },
    passwordConfirmationRules() {
      return [
        (v) =>
          (!!v && v) === this.user.newPassword || "Masukkan password yang sama.",
      ];
    },
  },
  methods: {
    async editPassword() {
      this.isFormLoading = true;
      try {
        let response = await this.$store.dispatch("auth/editPassword", this.user);
        if (response.status === 200) {
          this.isFormLoading = false;
          this.errorMessage = "";
          this.$router.push({ name: "MyProfile" });
        }
      } catch (error) {
        this.isFormLoading = false;
        this.errorMessage = this.getErrorMessage(error);
      }
    },
  },
  created() {
    EventBus.$emit("onPageChange", "Profil");
  },

  mixins: [formInputMixin, errorMixin],
};
</script>

<style>
.font {
  font-family: "Roboto", sans-serif;
  font-size: 25px;
}
</style>
