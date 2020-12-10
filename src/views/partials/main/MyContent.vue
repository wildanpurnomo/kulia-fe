<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col cols="12" md="8">
        <v-text-field
          v-model="searchQuery"
          outlined
          dense
          label="Cari judul konten"
          append-icon="mdi-magnify"
          rounded
        ></v-text-field>
      </v-col>
      <v-col
        cols="11"
        md="8"
        class="mb-3 px-5 py-1 white rounded-lg d-flex align-center"
        v-for="(item, index) in personalContentList"
        :key="index"
      >
        <v-row>
          <v-col>
            <div class="text-md-h6 text-sm-h6">{{ item.title }}</div>
            <span class="text-caption">Dibagikan {{ item.sharedBy.length }} kali</span>
          </v-col>

          <v-col cols="4" md="2" class="pr-6 d-flex align-center">
            <v-row>
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    :color="colorTheme"
                    fab
                    depressed
                    small
                    dark
                    v-bind="attrs"
                    v-on="on"
                    :to="{ name: 'EditContent', params: { contentId: item._id } }"
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </template>
                <span>Edit Konten</span>
              </v-tooltip>

              <v-spacer></v-spacer>
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    class="red--text text--accent-2"
                    fab
                    small
                    outlined
                    v-bind="attrs"
                    v-on="on"
                    @click="displayDeleteConfirmationDialog(item.title, item._id)"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </template>
                <span>Hapus Konten</span>
              </v-tooltip>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-dialog v-model="isDeleteDialogShown" max-width="500" persistent>
      <v-card>
        <v-card-title class="text-md-h6 text-sm-subtitle">Konfirmasi penghapusan</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-5">{{
          `Apakah anda yakin ingin menghapus konten dengan judul ${toBeDeleted.title}?`
        }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :color="colorTheme"
            text
            @click="isDeleteDialogShown = !isDeleteDialogShown"
          >Batal</v-btn
          >
          <v-btn
            :color="colorTheme"
            text
            @click="deleteContent"
          >Ya</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div>
      <AddContent />
    </div>
  </v-container>
</template>

<script>
import AddContent from "@/components/Add.vue";
import { EventBus } from "@/bus";

export default {
  name: "MyContent",

  components: {
    AddContent,
  },

  data: () => ({
    colorTheme: "#394867",
    searchQuery: "",
    isDeleteDialogShown: false,
    toBeDeleted: {
      id: "",
      title: "",
      colorTheme: "#79a3b1",
    },
  }),
  computed: {
    personalContentList() {
      let stored = this.$store.getters["content/personalContentList"];
      return stored.filter((item) => {
        return item.title.toLowerCase().match(this.searchQuery.toLowerCase());
      });
    },
  },
  methods: {
    async getPersonalContent() {
      try {
        await this.$store.dispatch("content/getPersonalContent");
      } catch (error) {
        EventBus.$emit("onShowSnackbar", "Gagal mengambil data konten");
      }
    },
    displayDeleteConfirmationDialog(title, contentId) {
      this.toBeDeleted.title = title;
      this.toBeDeleted.id = contentId;
      this.isDeleteDialogShown = true;
    },
    async deleteContent() {
      try {
        let response = await this.$store.dispatch(
          "content/deleteContent",
          this.toBeDeleted.id
        );
        if (response.status === 200) {
          this.isDeleteDialogShown = false;
          EventBus.$emit("onShowSnackbar", "Berhasil menghapus konten");
        }
      } catch (error) {
        EventBus.$emit("onShowSnackbar", "Gagal menghapus konten");
      }
    },
  },
  created() {
    if (this.personalContentList.length === 0) {
      this.getPersonalContent();
    }
    EventBus.$emit("onPageChange", "Konten Saya");
  },
};
</script>