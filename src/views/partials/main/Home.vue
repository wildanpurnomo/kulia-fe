<template>
  <v-container>
    <v-row>
      <v-col cols="4" class="hidden-sm-and-down">
        <v-card>
          <v-card-title>Wappita Poin: {{ userData.points }}</v-card-title>
          <v-card-text>
            <div class="font-weight-light">
              Bagikan lebih banyak konten untuk lebih banyak poin
            </div>
          </v-card-text>
          <v-card-action>
            <v-row align="center" justify="end" class="pr-5 pb-5">
              <v-btn text color="primary" :to="{ name: `AddContent`}">Buat Konten</v-btn>
            </v-row>
          </v-card-action>
        </v-card>
      </v-col>
      <v-col>
        <v-row v-for="(item, index) in personalStories" :key="index">
          <v-card
            width="100%"
            :class="index === personalStories.length - 1 ? `mb-0` : `mb-5`"
          >
            <v-list-item class="grow">
              <v-list-item-avatar>
                <v-img
                  :src="item.creatorId.profilePicUrl"
                  alt="profilePicUrl"
                ></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{
                  item.creatorId.username
                }}</v-list-item-title>
                <v-list-item-subtitle>
                  {{ getTimestampToRelativeTime(item.createdAt) }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-card-text>
              <div>
                {{ item.title }}
              </div>
              <div>{{ item.description }}</div>
            </v-card-text>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { EventBus } from "@/bus";
import dateTimeMixin from "@/mixins/datetime.mixin";

export default {
  name: "Home",

  components: {},

  data: () => ({}),
  computed: {
    personalStories() {
      return this.$store.getters["story/personalStories"];
    },
    userData() {
      return this.$store.getters["auth/userData"];
    },
  },
  methods: {
    async getPersonalList() {
      try {
        await this.$store.dispatch("story/getPersonalStories");
      } catch (error) {
        EventBus.$emit("onShowSnackbar", "Gagal mengambil data beranda");
      }
    },
  },
  created() {
    if (this.personalStories.length === 0) {
      this.getPersonalList();
    }
  },
  mounted() {
    EventBus.$emit("onPageChange", "Beranda");
    EventBus.$on("onFollowChange", () => {
      this.getPersonalList();
    });
  },
  mixins: [dateTimeMixin],
};
</script>