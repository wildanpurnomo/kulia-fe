<template>
  <div>
    <Navbar />
    <v-container fill-height>
      <v-row>
        <v-col>
          <h1>{{ contentData.title }}</h1>
          <v-row align="center" class="ml-1">
            <v-avatar size="32" class="mr-3">
              <v-img
                :src="
                  contentData.creatorId
                    ? contentData.creatorId.profilePicUrl
                    : ``
                "
              ></v-img>
            </v-avatar>
            <h4>
              oleh
              {{ contentData.creatorId ? contentData.creatorId.username : `` }}
            </h4>
          </v-row>
          <div class="body-1 mt-3">{{ contentData.description }}</div>
          <div v-show="documentUrl.length > 0">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  :href="documentUrl"
                  target="_blank"
                  :color="colorTheme"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon size="32">mdi-file-pdf</v-icon>
                </v-btn>
              </template>
              <span>Buka PDF</span>
            </v-tooltip>
          </div>
          <div
            :class="{
              'carousel-md mt-3': $vuetify.breakpoint.mdAndUp,
              'mt-3': $vuetify.breakpoint.smAndDown,
            }"
          >
            <v-carousel
              hide-delimiters
              v-show="imageUrls.length > 0"
              class="mb-5"
            >
              <v-carousel-item
                v-for="(item, index) in imageUrls"
                :key="index"
                :src="item"
              ></v-carousel-item>
            </v-carousel>
          </div>
          <div class="mt-3">
            <video-player
              class="vjs-big-play-centered vjs-16-9"
              ref="videoPlayer"
              :playsinline="true"
              v-show="
                videoUrl.length > 0 ||
                (contentData.youtubeUrl ? contentData.youtubeUrl : ``).length > 0
              "
              :options="videoPlayerOptions"
            ></video-player>
          </div>
        </v-col>
      </v-row>
      <Snackbar :duration="3000" />
    </v-container>
  </div>
</template>
<script>
import { EventBus } from "@/bus";
import Navbar from "@/components/GenericNavbar.vue";
import Snackbar from "@/components/Snackbar";

export default {
  name: "PublicViewer",

  components: { Navbar, Snackbar },

  data: () => ({
    colorTheme: "#394867",
    contentData: {},
    videoPlayerOptions: {
      muted: false,
      language: "en",
      playbackRate: [0.5, 1.0, 1.5, 2.0],
      fluid: true,
      sources: [],
    },
  }),

  computed: {
    imageUrls() {
      return this.contentData.mediaUrls
        ? this.contentData.mediaUrls.filter((item) => {
            return (
              item.includes(".png") ||
              item.includes(".jpg") ||
              item.includes(".jpeg")
            );
          })
        : [];
    },
    documentUrl() {
      let filtered = this.contentData.mediaUrls
        ? this.contentData.mediaUrls.filter((item) => {
            return item.includes(".pdf");
          })
        : [];
      return filtered.length > 0 ? filtered[0] : "";
    },
    videoUrl() {
      let filtered = this.contentData.mediaUrls
        ? this.contentData.mediaUrls.filter((item) => {
            return item.includes(".mp4");
          })
        : [];
      return filtered.length > 0 ? filtered[0] : "";
    },
  },

  methods: {
    async loadContent(contentId) {
      try {
        let response = await this.$store.dispatch(
          "content/getContentById",
          contentId
        );
        if (response.status === 200) {
          this.contentData = response.data.data;
          this.setupVideoPlayer();
        }
      } catch (error) {
        EventBus.$emit("onShowSnackbar", "Gagal memuat data konten");
      }
    },
    setupVideoPlayer() {
      if (this.contentData.youtubeUrl.length > 0) {
        this.$set(
          (this.videoPlayerOptions.sources = [
            {
              type: "video/youtube",
              src: this.contentData.youtubeUrl,
            },
          ])
        );
        this.$set(this.videoPlayerOptions, "techOrder", ["youtube"]);
      } else if (this.videoUrl.length > 0) {
        this.$set(
          (this.videoPlayerOptions.sources = [
            {
              type: "video/mp4",
              src: this.videoUrl,
            },
          ])
        );
      }
    },
  },

  created() {
    this.loadContent(this.$route.params.contentId);
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Lobster+Two:wght@700&display=swap");
.font {
  font-family: Lobster Two;
  font-size: 50px;
  color: #394867;
}

.carousel-md {
  width: 500px;
}
</style>