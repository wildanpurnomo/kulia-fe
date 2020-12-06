<template>
  <div>
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

    <v-card-text>
      <div>
        {{ contentData.title }}
      </div>
      <div>{{ contentData.description }}</div>
    </v-card-text>

    <v-card-actions v-show="contentData.creatorId._id !== userData._id">
      <v-row justify="end" :class="{ 'mr-1': $vuetify.breakpoint.mdAndUp }">
        <v-btn text color="primary" @click="isShareToSocialDialogShown = true">
          <v-icon>mdi-share-variant</v-icon>
          <span class="hidden-sm-and-down">Medsos</span></v-btn
        >
        <v-btn text color="primary" @click="isShareToHomeDialogShown = true">
          <v-icon>mdi-share-circle</v-icon>
          <span class="hidden-sm-and-down">Beranda</span></v-btn
        >
      </v-row>
    </v-card-actions>
    <v-dialog v-model="isShareToHomeDialogShown" max-width="500">
      <v-card>
        <v-card-title
          ><span class="headline">Bagikan ke Beranda</span></v-card-title
        >
        <div class="ml-5 mr-5">
          <v-textarea
            v-model="shareContentRequestObject.caption"
            auto-grow
            outlined
            label="Tulis caption"
          ></v-textarea>
        </div>
        <v-divider></v-divider>
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

        <v-card-text>
          <div>
            {{ contentData.title }}
          </div>
          <div>{{ contentData.description }}</div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            :loading="isLoadingOnShare"
            @click="shareContent"
            >Bagikan</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="isShareToSocialDialogShown" max-width="500">
      <v-card>
        <v-card-title
          ><span class="headline">Bagikan ke Sosmed</span></v-card-title
        >
        <v-card-text>
          <v-row>
            <v-col align="center">
              <ShareNetwork
                v-for="(item, index) in socialList"
                :key="index"
                :network="item.network"
                :url="`https://capstone-similarity-check.et.r.appspot.com/public_view/${contentData._id}`"
                :title="`Author ini membagikan konten kerennya di aplikasi Wappita. Kunjungi pranala berikut untuk melihat!`"
                :description="`Author ini membagikan konten kerennya di aplikasi Wappita. Kunjungi pranala berikut untuk melihat!`"
              >
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" text v-bind="attrs" v-on="on">
                      <v-icon size="32">{{ item.icon }}</v-icon>
                    </v-btn>
                  </template>
                  <span>{{ item.network }}</span>
                </v-tooltip>
              </ShareNetwork>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
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
  }),
  computed: {
    userData() {
      return this.$store.getters["auth/userData"];
    },
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
      dummyTextArea.textContent = `Author ini membagikan konten kerennya di aplikasi Wappita. Kunjungi pranala berikut untuk melihat! https://capstone-similarity-check.et.r.appspot.com/public_view/${this.contentData._id}`;
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