<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="primary">
          <v-row>
            <v-col md="10" xs="10">
              <div class="white--text text-h5 ml-3">
                Daftar Konten Ditambahkan
              </div>
            </v-col>
            <v-col md="2" xs="2" class="text-end">
              <v-btn
                text
                dark
                dense
                style="text-transform: capitalize"
                :to="{ name: 'AddContent' }"
              >
                <v-icon>mdi-plus-thick</v-icon>
                <span class="white--text text-h6 hidden-sm-and-down"
                  >Tambah</span
                >
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="searchQuery"
          outlined
          label="Cari judul konten"
          append-icon="mdi-magnify"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        v-for="(item, index) in personalContentList"
        :key="index"
      >
        <v-row>
          <v-col cols="8">
            <div class="text-h6">{{ item.title }}</div>
            <span>Dibagikan {{ item.sharedBy.length }} kali</span>
          </v-col>
          <v-col cols="2" class="text-end">
            <v-btn text :to="{ name: 'EditContent', params: { contentId: item._id } }">
              <v-icon>mdi-pencil</v-icon>
              <span class="hidden-sm-and-down">Edit</span>
            </v-btn>
          </v-col>
          <v-col cols="2" class="text-end">
            <v-btn
              text
              @click="displayDeleteConfirmationDialog(item.title, item._id)"
            >
              <v-icon>mdi-delete</v-icon>
              <span class="hidden-sm-and-down">Hapus</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-dialog v-model="isDeleteDialogShown" max-width="500" persistent>
      <v-card>
        <v-card-title class="headline">Konfirmasi penghapusan</v-card-title>
        <v-card-text>{{
          `Anda akan menghapus ${toBeDeleted.title}`
        }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="isDeleteDialogShown = !isDeleteDialogShown"
            >Batal</v-btn
          >
          <v-btn color="blue darken-1" text @click="deleteContent">Ya</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import { EventBus } from "@/bus";

export default {
  name: "MyContent",

  components: {},

  data: () => ({
    searchQuery: "",
    isDeleteDialogShown: false,
    toBeDeleted: {
      id: "",
      title: "",
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