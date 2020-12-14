<template>
  <v-container>
    <v-row justify="center">
      <v-col class="col-md-8">
        <v-expansion-panels v-model="panel" flat class="rounded-lg">
          <!-- Edit Username -->
          <v-expansion-panel>
            <v-expansion-panel-header class="text-subtitle">
              Edit Username dan Email
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-divider></v-divider>
              <v-form class="my-4">
                <v-row class="mb-8">
                  <v-col> Nama: </v-col>
                  <v-spacer></v-spacer>
                  <v-col cols="12" md="9" class="pt-1">
                    <v-text-field
                      ref="usernameET"
                      dense
                      placeholder="Your Name"
                      v-model="userPost.username"
                    ></v-text-field>
                    <div class="text-caption text--disabled">
                      Gunakan nama yang orang-orang kenali tentang Anda: baik
                      nama lengkap ataupun nama panggilan. Hal ini untuk
                      memudahkan pengguna lain menemukan akun Anda.
                    </div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col> E-mail: </v-col>
                  <v-spacer></v-spacer>
                  <v-col cols="12" md="9" class="pt-1">
                    <v-text-field
                      dense
                      placeholder="Your E-mail"
                      v-model="userPost.email"
                    ></v-text-field>
                    <div class="text-caption text--disabled">
                      Ini merupakan informasi pribadi Anda, pengguna lain tidak
                      dapat melihat informasi ini.
                    </div>
                  </v-col>
                </v-row>
              </v-form>
              <v-row class="my-3 d-flex justify-end">
                <v-col class="d-flex justify-end col-md-4">
                  <div class="mr-8">
                    <v-btn
                      type="submit"
                      class="rounded-xl"
                      :color="colorTheme"
                      width="100"
                      dark
                      depressed
                      :loading="isFormLoading"
                      @click.prevent="editProfile"
                      >Simpan</v-btn
                    >
                  </div>
                  <div>
                    <v-btn
                      class="red--text text--accent-2 rounded-xl"
                      outlined
                      :to="{ name: 'Home' }"
                      >Batal</v-btn
                    >
                  </div>
                </v-col>
              </v-row>
              <div class="red--text my-5" :hidden="errorMessage.length === 0">
                {{ errorMessage }}
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <!-- Edit Password -->
          <v-expansion-panel>
            <v-expansion-panel-header class="text-subtitle">
              Edit Password
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-divider></v-divider>
              <v-form class="my-4">
                <v-row class="mb-8">
                  <v-col> Password Lama: </v-col>
                  <v-col cols="12" md="9" class="pt-1">
                    <v-text-field
                      dense
                      v-model="userPost.oldPassword"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show1 ? 'text' : 'password'"
                      placeholder="Password"
                      required
                      class="input-group--focused"
                      @click:append="show1 = !show1"
                    ></v-text-field>
                    <div class="text-caption text--disabled">
                      Masukkan password lama Anda.
                    </div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col> Password Baru: </v-col>
                  <v-col cols="12" md="9" class="pt-1">
                    <v-text-field
                      dense
                      v-model="userPost.newPassword"
                      :rules="this.passwordRules"
                      :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show2 ? 'text' : 'password'"
                      placeholder="Password Baru"
                      required
                      class="input-group--focused"
                      @click:append="show2 = !show2"
                    ></v-text-field>
                    <div class="text-caption text--disabled mb-10">
                      Masukkan password baru Anda dengan ketentuan minimal
                      terdiri dari: 8 karakter, satu huruf kecil dan besar,
                      serta satu digit angka.
                    </div>
                    <v-text-field
                      dense
                      v-model="userPost.newPasswordConfirmation"
                      :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show3 ? 'text' : 'password'"
                      :rules="passwordConfirmationRules"
                      placeholder="Konfirmasi Password Baru"
                      required
                      class="input-group--focused"
                      @click:append="show3 = !show3"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-form>

              <v-row class="my-3 d-flex justify-end">
                <v-col class="d-flex justify-end col-md-4">
                  <div class="mr-8">
                    <v-btn
                      type="submit"
                      class="rounded-xl"
                      :color="colorTheme"
                      dark
                      depressed
                      width="100"
                      :loading="isFormLoading"
                      @click.prevent="editPassword"
                      >Simpan</v-btn
                    >
                  </div>
                  <div>
                    <v-btn
                      class="red--text text--accent-2 rounded-xl"
                      outlined
                      :to="{ name: 'Home' }"
                      >Batal</v-btn
                    >
                  </div>
                </v-col>
              </v-row>
              <div class="red--text my-5" :hidden="errorMessage.length === 0">
                {{ errorMessage }}
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
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
  data: () => ({
    userPost: new UserModel(),
    errorMessage: "",
    colorTheme: "#394867",
    show1: false,
    show2: false,
    show3: false,
    panel: [0],
  }),

  computed: {
    user() {
      return this.$store.getters["auth/userData"];
    },
    passwordConfirmationRules() {
      return [
        (v) =>
          (!!v && v) === this.user.newPassword ||
          "Masukkan password yang sama.",
      ];
    },
  },
  methods: {
    async editProfile() {
      this.isFormLoading = true;
      try {
        let response = await this.$store.dispatch(
          "auth/editProfile",
          this.userPost
        );
        if (response.status === 200) {
          this.isFormLoading = false;
          this.errorMessage = "";
          this.$router.push({ name: "Home" });
          EventBus.$emit("onShowSnackbar", "Berhasil edit profil");
        }
      } catch (error) {
        this.isFormLoading = false;
        this.errorMessage = this.getErrorMessage(error);
      }
    },
    async editPassword() {
      this.isFormLoading = true;
      try {
        let response = await this.$store.dispatch(
          "auth/editPassword",
          this.user
        );
        if (response.status === 200) {
          this.isFormLoading = false;
          this.errorMessage = "";
          this.$router.push({ name: "Home" });
          EventBus.$emit("onShowSnackbar", "Berhasil edit password");
        }
      } catch (error) {
        this.isFormLoading = false;
        this.errorMessage = this.getErrorMessage(error);
      }
    },
  },
  mounted() {
    EventBus.$emit("onPageChange", "Profil Saya");
    EventBus.$on("onFetchProfileSuccess", () => {
      this.userPost = this.user;
    });

    if (this.user.username.length > 0) {
      this.userPost = this.user;
    }
  },
  mixins: [formInputMixin, errorMixin],
};
</script>