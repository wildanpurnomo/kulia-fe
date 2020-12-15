 <template>
  <div>
    <v-list-item class="my-1">
      <v-list-item-avatar>
        <v-img
          :src="contentData.creatorId.profilePicUrl"
          alt="profilePicUrlCreator"
        ></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>{{
          contentData.creatorId.username
        }}</v-list-item-title>
        <v-list-item-subtitle>
          {{ getTimestampToRelativeTime(contentData.createdAt) }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-card-text>
      <div class="text-subtitle-1 font-weight-bold">
        {{ contentData.title }}
      </div>
      <div class="text-body-2">{{ contentData.description }}</div>
      <v-card-actions v-show="documentUrl.length > 0">
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
      </v-card-actions>
      <v-carousel hide-delimiters v-show="imageUrls.length > 0" class="mb-5">
        <v-carousel-item
          v-for="(item, index) in imageUrls"
          :key="index"
          :src="item"
        ></v-carousel-item>
      </v-carousel>
      <div mt-3>
        <video-player
          class="vjs-big-play-centered vjs-16-9"
          ref="videoPlayer"
          :playsinline="true"
          v-show="videoUrl.length > 0 || contentData.youtubeUrl.length > 0"
          :options="videoPlayerOptions"
        ></video-player>
      </div>
    </v-card-text>
    <v-card-actions v-show="contentData.creatorId._id !== userData._id">
      <v-row justify="end" :class="{ 'mr-1': $vuetify.breakpoint.mdAndUp }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              text
              v-bind="attrs"
              v-on="on"
              :color="colorTheme"
              @click="isShareToSocialDialogShown = true"
            >
              <v-icon>mdi-share-variant</v-icon>
              <!-- <span class="hidden-sm-and-down">Medsos</span> -->
            </v-btn>
          </template>
          <span>Bagikan ke Medsos</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              text
              v-bind="attrs"
              v-on="on"
              :color="colorTheme"
              @click="isShareToHomeDialogShown = true"
            >
              <v-icon>mdi-share-circle</v-icon>
              <!-- <span class="hidden-sm-and-down">Beranda</span> -->
            </v-btn>
          </template>
          <span>Bagikan ke Beranda</span>
        </v-tooltip>
      </v-row>
    </v-card-actions>
    <v-dialog v-model="isShareToHomeDialogShown" max-width="500">
      <v-card>
        <v-card-title>
          <span class="h6">Bagikan ke Beranda</span>
        </v-card-title>
        <v-divider></v-divider>
        <div class="mx-5">
          <v-textarea
            v-model="shareContentRequestObject.caption"
            auto-grow
            label="Tulis caption"
          ></v-textarea>
        </div>
        <v-card class="mx-3 mb-4 rounded-lg" outlined flat>
          <v-list-item>
            <v-list-item-avatar>
              <v-img
                :src="contentData.creatorId.profilePicUrl"
                alt="profilePicUrlCreator"
              ></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{
                contentData.creatorId.username
              }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ getTimestampToRelativeTime(contentData.createdAt) }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-card-text>
            <div>
              {{ contentData.title }}
            </div>
            <div>{{ contentData.description }}</div>
          </v-card-text>
        </v-card>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            :color="colorTheme"
            :loading="isLoadingOnShare"
            @click="shareContent"
            >Bagikan</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="isShareToSocialDialogShown" max-width="500">
      <v-card>
        <v-card-title>
          <span class="h6">Bagikan ke Sosmed</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-5">
          <v-row>
            <v-col align="center">
              <ShareNetwork
                v-for="(item, index) in socialList"
                :key="index"
                :network="item.network"
                :url="`https://abwprod-dot-capstone-similarity-check.et.r.appspot.com/public-view/${contentData._id}`"
                :title="`Author ini membagikan konten kerennya di aplikasi Wappita. Kunjungi pranala berikut untuk melihat!`"
                :description="`Author ini membagikan konten kerennya di aplikasi Wappita. Kunjungi pranala berikut untuk melihat!`"
              >
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn :color="colorTheme" text v-bind="attrs" v-on="on">
                      <v-icon size="32">{{ item.icon }}</v-icon>
                    </v-btn>
                  </template>
                  <span>{{ item.network }}</span>
                </v-tooltip>
              </ShareNetwork>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    :color="colorTheme"
                    text
                    v-bind="attrs"
                    v-on="on"
                    @click="copyToClipboard"
                  >
                    <v-icon size="32">mdi-link</v-icon>
                  </v-btn>
                </template>
                <span>Bagikan pranala</span>
              </v-tooltip>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { EventBus } from "@/bus";
import dateTimeMixin from "@/mixins/datetime.mixin";
import errorMixin from "@/mixins/error.mixin";

export default {
  name: "UserContent",
  props: {
    contentData: Object,
  },
    data: () => ({
    colorTheme: "#394867",
    isShareToHomeDialogShown: false,
    isShareToSocialDialogShown: false,
    shareContentRequestObject: {
      caption: "",
      contentId: "",
    },
    isLoadingOnShare: false,
    socialList: [
      { network: "facebook", icon: "mdi-facebook" },
      { network: "twitter", icon: "mdi-twitter" },
    ],
    videoPlayerOptions: {
      muted: false,
      language: "en",
      playbackRate: [0.5, 1.0, 1.5, 2.0],
      fluid: true,
      sources: [],
    },
  }),
  computed: {
    userData() {
      return this.$store.getters["auth/userData"];
    },
    imageUrls() {
      return this.contentData.mediaUrls.filter((item) => {
        return (
          item.includes(".png") ||
          item.includes(".jpg") ||
          item.includes(".jpeg")
        );
      });
    },
    documentUrl() {
      let filtered = this.contentData.mediaUrls.filter((item) => {
        return item.includes(".pdf");
      });
      return filtered.length > 0 ? filtered[0] : "";
    },
    videoUrl() {
      let filtered = this.contentData.mediaUrls.filter((item) => {
        return item.includes(".mp4");
      });
      return filtered.length > 0 ? filtered[0] : "";
    },
  },
  mounted() {
    this.setupVideoPlayer();
  },
  methods: {
    async shareContent() {
      try {
        this.isLoadingOnShare = true;
        this.shareContentRequestObject.contentId = this.contentData._id;
        let response = await this.$store.dispatch(
          "story/shareContent",
          this.shareContentRequestObject
        );
        if (response.status === 200) {
          this.isLoadingOnShare = false;
          this.isShareToHomeDialogShown = false;
          EventBus.$emit("onShowSnackbar", "Berhasil memposting");
        }
      } catch (error) {
        this.isLoadingOnShare = false;
        this.isShareToHomeDialogShown = false;
        let message = this.getErrorMessage(error);
        EventBus.$emit("onShowSnackbar", message);
      }
    },
    copyToClipboard() {
      let dummyTextArea = document.createElement("textarea");
      dummyTextArea.setAttribute("type", "hidden");
      dummyTextArea.textContent = `Author ini membagikan konten kerennya di aplikasi Wappita. Kunjungi pranala berikut untuk melihat! https://abwprod-dot-capstone-similarity-check.et.r.appspot.com/public-view/${this.contentData._id}`;
      document.body.appendChild(dummyTextArea);

      let selection = document.getSelection();
      let range = document.createRange();
      range.selectNode(dummyTextArea);
      selection.removeAllRanges();
      selection.addRange(range);

      document.execCommand("copy");
      EventBus.$emit("onShowSnackbar", "Pranala berhasil disalin");

      selection.removeAllRanges();
      document.body.removeChild(dummyTextArea);
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
  mixins: [dateTimeMixin, errorMixin],
};
</script>
<style scoped>
.share-network-facebook,
.share-network-twitter {
  text-decoration: none;
}
</style>