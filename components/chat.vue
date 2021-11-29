<template>
  <v-container fluid>
    <v-row>
      <v-col class="col-12 col-sm-3 border">
        <v-row>
          <v-btn> Chat with admin</v-btn>
        </v-row>
        <v-row flat color="rgba(0,0,0,0)">
          <v-toolbar-title class="title"> Chat </v-toolbar-title>

          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>fas fa-ellipsis-h</v-icon>
          </v-btn>
        </v-row>
        <v-row flat color="rgba(0,0,0,0)">
          <v-text-field
            filled
            label="Search Here"
            append-icon="mdi-magnify"
            color="grey"
          ></v-text-field>
        </v-row>

        <v-list color="red" class="col col-12 col-sm-12">
          <v-list-item-group v-model="selected" active-class="blue lighten-4">
            <template v-for="(item, index) in roomList">
              <v-list-item :key="index" @click="getChatDetail(item.id, item.name)">
                <v-badge
                  bordered
                  bottom
                  color="green"
                  dot
                  offset-x="22"
                  offset-y="26"
                >
                  <v-list-item-avatar>
                    <v-img :src="items[0].avatar"></v-img>
                  </v-list-item-avatar>
                </v-badge>
                <template>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.name"></v-list-item-title>

                    <!-- <v-list-item-subtitle
                      v-text="item.subtitle"
                    ></v-list-item-subtitle> -->
                  </v-list-item-content>
                </template>
              </v-list-item>

              <v-divider
                v-if="index < items.length - 1"
                :key="index"
              ></v-divider>
            </template>
          </v-list-item-group>
        </v-list>
      </v-col>
      <v-col cols="12" sm="6" class="border">
        <chat-detail v-on:messagesent="getChatDetail(currentRoomId,'room 1')" :room="room" :name="roomName"/>
      </v-col>
      <v-col cols="12" sm="3">
        <chat-infor />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import ChatDetail from "../components/chatDetail.vue";
import ChatInfor from "../components/chatInfor.vue";
import axios from "axios";
import {mapGetters, mapState, mapActions } from 'vuex'
export default {
  components: {
    ChatDetail,
    ChatInfor,
  },
  data: () => ({
    selected: [2],
    items: [
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        subtitle: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        title: "Ali Connors",
      },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        subtitle: `Wish I could come, but I'm out of town this weekend.`,
        title: "me, Scrott, Jennifer",
      },
    ],
    files: [
      { text: "Landing_page.zip", icon: " mdi-cloud-upload" },
      { text: "Requirements.pdf", icon: " mdi-cloud-upload" },
      { text: "Uwagi.docx", icon: " mdi-cloud-upload" },
    ],
    panel: [2],

    password: "Password",
    show: false,
    message: "Type a message here",
    marker: true,
    iconIndex: 0,
    roomList: [],
    room: [],
    roomName:'',
    currentRoomId:''
  }),
  mounted() {
    console.log(this.user)
    this.getRoomList();
  },
  computed: {
    ...mapState('auth', ['user']),
    config() {
      const token = localStorage.getItem("jwt");
      return {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    },
  },
  methods: {
    async getRoomList() {
      await axios
        .get("http://127.0.0.1:8000/api/chat/rooms", this.config)
        .then((result) => {
          // console.log(result)
          this.roomList = result.data;
        });
    },
    async getChatDetail(id,name) {
      this.currentRoomId=id;
      await axios
        .get(`http://127.0.0.1:8000/api/chat/room/${id}/messages`, this.config)
        .then((result) => {
          console.log(result);
          this.room = result.data;
          this.roomName=name;
        });
    },
  },
};
</script>
<style scoped>
.border {
  border-right: 1px solid grey;
}
.container.fill-height {
  display: none !important;
}
</style>
