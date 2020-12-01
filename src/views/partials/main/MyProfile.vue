<template>
  <v-container fill-height>
    <v-row justify="center">
      <v-col cols="8" class="pa-10 grey lighten-3 rounded-lg">
        <v-card-title class="font blue-grey--text text--darken-3 mb-2">
          Profil Saya
        </v-card-title>
        <v-divider class="mb-6"></v-divider>
        <v-row class="ml-2">
          <v-col cols="3" class="mt-5"> Nama: </v-col>
          <v-col cols="9">
            <v-text-field placeholder="Your Name" filled></v-text-field>
          </v-col>
        </v-row>
        <v-row class="ml-2">
          <v-col cols="3" class="mt-5"> E-mail: </v-col>
          <v-spacer></v-spacer>
          <v-col cols="9">
            <v-text-field placeholder="Your E-mail" filled></v-text-field>
          </v-col>
        </v-row>
        <v-row class="ml-2">
          <v-col cols="3" class="mt-5"> Password: </v-col>
          <v-spacer></v-spacer>
          <v-col cols="9">
            <v-text-field
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              :rules="[rules.required]"
              placeholder="Password"
              filled
              class="input-group--focused"
              @click:append="show1 = !show1"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="ml-2">
          <v-col cols="3" class="mt-5"> Edit Password: </v-col>
          <v-col cols="9">
            <v-text-field
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.min]"
              :type="show2 ? 'text' : 'password'"
              hint="At least 8 characters"
              placeholder="New Password"
              filled
              class="input-group--focused"
              @click:append="show2 = !show2"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="ml-2">
          <v-col cols="3" class="mt-5"> </v-col>
          <v-col cols="9">
            <v-text-field
              :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show3 ? 'text' : 'password'"
              hint="At least 8 characters"
              placeholder="Confirm Password"
              filled
              class="input-group--focused"
              @click:append="show3 = !show3"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="ma-2" style="float: right">
          <div class="mr-8">
            <v-btn
              class="white--text red accent-2 rounded-xl"
              outlined
              width="100"
              >Simpan</v-btn>
          </div>
          <div>
            <v-btn
              class="blue-grey--text text--darken-3 rounded-xl"
              outlined
              :to="{ name: 'Home' }"
              >Batal</v-btn>
          </div>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { EventBus } from "@/bus";

export default {
  data() {
    return {
      show1: false,
      show2: false,
      show3: false,
      password: "Password",
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
      },
    };
  },
  created() {
    EventBus.$emit("onPageChange", "Profil");
  },
};
</script>

<style>
.font {
  font-family: "Roboto", sans-serif;
  font-size: 30px;
}
</style>
