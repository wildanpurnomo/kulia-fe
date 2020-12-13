<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <div class="text-h6 hidden-sm-and-up">
          {{ isEdit ? "Perbarui Konten" : "Tambah Konten Baru" }}
        </div>
      </v-col>

      <v-col cols="12" md="8">
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

          <div v-show="!isEdit">
            <v-file-input
              label="Unggah Gambar (opsional)"
              prepend-icon="mdi-image-multiple"
              outlined
              dense
              show-size
              accept="image/jpg, image/png, image/jpeg"
              multiple
              counter
              v-model="images"
            ></v-file-input>

            <v-file-input
              label="Unggah Berkas pdf (opsional)"
              prepend-icon="mdi-file"
              outlined
              dense
              show-size
              counter
              accept=".pdf"
              v-model="document"
            >
            </v-file-input>
            <div>Unggah Video (opsional)</div>
            <v-radio-group v-model="videoUploadMethod" row>
              <v-radio label="Unggah mp4" value="mp4"></v-radio>
              <v-radio label="Unggah link YouTube" value="youtube"></v-radio>
            </v-radio-group>

            <v-file-input
              label="Upload mp4"
              v-show="isUploadMp4"
              prepend-icon="mdi-video-outline"
              show-size
              counter
              accept="video/mp4"
              v-model="video"
            ></v-file-input>

            <v-text-field
              label="Upload link YouTube"
              outlined
              v-show="isUploadYouTube"
              v-model="youtubeUrl"
            ></v-text-field>
          </div>

          <v-row class="ma-2" style="float: right">
            <div class="mr-8">
              <v-btn
                :disabled="!isFormValid || isFormLoading"
                :loading="isFormLoading"
                type="submit"
                class="rounded-xl"
                dark
                depressed
                :color="colorTheme"
                @click.prevent="submitContent"
                >Submit</v-btn
              >
            </div>

            <div>
              <v-btn
                class="red--text text--accent-2 rounded-xl"
                outlined
                :to="{ name: 'MyContent' }"
                >Batal</v-btn
              >
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
    colorTheme: "#394867",
    isEdit: false,
    contentData: new ContentModel(),
    youtubeUrl: "",
    videoUploadMethod: "",
    images: [],
    document: null,
    video: null,
  }),
  computed: {
    detailContent() {
      return this.$store.getters["content/detailContent"];
    },
    isUploadMp4() {
      return this.videoUploadMethod === "mp4";
    },
    isUploadYouTube() {
      return this.videoUploadMethod === "youtube";
    },
    isYouTubeUrlValid() {
      return this.youtubeUrl.match(
        /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w]+\?v=|embed\/|v\/)?)([\w]+)(\S+)?$/
      );
    },
  },
  methods: {
    async submitContent() {
      this.isFormLoading = true;
      try {
        let endpoint = this.isEdit
          ? "content/editContent"
          : "content/createContent";
        let requestObject = this.isEdit
          ? this.contentData
          : this.getRequestObjectWithMedia();
        let response = await this.$store.dispatch(endpoint, requestObject);
        if (response.status === 200) {
          this.$store.dispatch("story/getPersonalStories");
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
    getRequestObjectWithMedia() {
      let formData = new FormData();
      formData.set("title", this.contentData.title);
      formData.set("description", this.contentData.description);
      
      this.images.forEach((item) => {
        formData.append("media", item);
      });

      if (this.document !== null) {
        formData.append("media", this.document);
      }

      if (this.video !== null) {
        formData.append("media", this.video);
      }

      if (this.youtubeUrl.length > 0 && this.isYouTubeUrlValid) {
        formData.set("youtubeUrl", this.youtubeUrl);
      }

      return formData;
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
  },
  mounted() {
    EventBus.$emit("onPageChange", "Konten Saya");
    if (this.isEdit) {
      EventBus.$emit(
        "onShowSnackbar",
        "Fitur sunting masih terbatas untuk judul dan deskripsi"
      );
    }
  },
  mixins: [formInputMixin],
};
</script>