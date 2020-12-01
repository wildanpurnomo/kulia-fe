<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="8">
        <div class="text-h5">
          {{ isEdit ? "Perbarui Konten" : "Tambah Konten Baru" }}
        </div>
      </v-col>
      <v-col cols="8">
        <v-form ref="contentForm" v-model="isFormValid">
          <v-text-field
            v-model="contentData.title"
            label="Judul Konten"
            outlined
          ></v-text-field>
          <v-textarea
            v-model="contentData.description"
            auto-grow
            outlined
            label="Deskripsi"
          ></v-textarea>
          <v-file-input
            label="Upload File"
            outlined
            dense
          ></v-file-input>
          <v-row class="ma-2" style="float: right">
            <div class="mr-8">
              <v-btn
                :disabled="!isFormValid || isFormLoading"
                :loading="isFormLoading"
                type="submit"
                class="white--text red accent-2 rounded-xl"
                @click.prevent="submitContent"
              >Submit</v-btn>
            </div>
            <div>
              <v-btn
                class="blue-grey--text text--darken-3 rounded-xl"
                outlined
                :to="{ name: 'MyContent' }"
              >Batal</v-btn>
            </div>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import ContentModel from "@/models/content.model";
import formInputMixin from "@/mixins/form.mixin";
import { EventBus } from "@/bus";

export default {
  data: () => ({
    isEdit: false,
    contentData: new ContentModel(),
  }),
  computed: {
    detailContent() {
      return this.$store.getters["content/detailContent"];
    },
  },
  methods: {
    async submitContent() {
      this.isFormLoading = true;
      try {
        let endpoint = this.isEdit
          ? "content/editContent"
          : "content/createContent";
        let response = await this.$store.dispatch(endpoint, this.contentData);
        if (response.status === 200) {
          this.isFormLoading = false;
          let message = this.isEdit
            ? "Berhasil perbarui konten"
            : "Berhasil menambah konten baru";
          EventBus.$emit("onShowSnackbar", message);
          this.$router.push({ name: "MyContent" });
        }
      } catch (error) {
        this.isFormLoading = false;
        EventBus.$emit("onShowSnackbar", "Gagal menambah konten baru");
      }
    },
    async getContentDetail(contentId) {
      try {
        let response = await this.$store.dispatch(
          "content/getContentById",
          contentId
        );
        if (response.status === 200) {
          this.contentData = response.data.data;
        }
      } catch (error) {
        EventBus.$emit("onShowSnackbar", "Gagal mendapatkan detail konten");
      }
    },
  },
  created() {
    let params = this.$route.params;
    if (params.contentId) {
      this.isEdit = true;
      if (this.detailContent._id !== params.contentId) {
        this.getContentDetail(params.contentId);
      } else {
        this.contentData = this.detailContent;
      }
    }
    EventBus.$emit("onPageChange", "Konten Saya");
  },
  mixins: [formInputMixin],
};
</script>