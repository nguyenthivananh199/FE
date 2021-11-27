<template>
  <div v-if="room != ''">
    <v-app-bar color="rgba(0,0,0,0)" flat>
      <v-badge bordered bottom color="green" dot offset-x="11" offset-y="13">
        <v-avatar class="mt-n7" size="40" elevation="10">
          <img src="https://cdn.vuetifyjs.com/images/lists/1.jpg" />
        </v-avatar>
      </v-badge>
      <v-toolbar-title class="title pl-0 ml-2 mt-n4">
        {{ name }}
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-avatar class="mt-n5 mr-2" size="30" elevation="10">
        <img src="https://cdn.vuetifyjs.com/images/lists/5.jpg" />
      </v-avatar>
      <v-divider vertical inset class="mt-n1"></v-divider>
      <v-btn color="black" icon class="mt-n5">
        <v-icon>mdi-cog</v-icon>
      </v-btn>
    </v-app-bar>
    <div>
      <div
        style="max-height: 350px; overflow-y: auto !important"
        class=""
        id="ct"
        ref="messageDisplay"
      >
        <div v-for="(mess, index) in room" :key="index">
          <v-row v-if="mess.user.id==user.id">
            <v-col class="col-10 col-sm-11">
              <v-card color="blue" dark>
                <v-list-item three-line>
                  <v-list-item-content>
                    <div class="">
                      {{ mess.message }}
                    </div>
                    <v-list-item-subtitle
                      >16 mins ago
                      <span class="ml-16"
                        >Seen 1:03PM</span
                      ></v-list-item-subtitle
                    >
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-col>
            <v-col class="col-2 col-sm-1 pl-0 nee">
              <v-tooltip left>
                <template v-slot:activator="{ on, attrs }">
                  <v-badge
                    bordered
                    bottom
                    color="green"
                    dot
                    offset-x="10"
                    offset-y="10"
                   
                  >
                    <v-avatar class="" size="30" elevation="10"  v-bind="attrs"
                    v-on="on">
                      <img src="https://cdn.vuetifyjs.com/images/lists/5.jpg" />
                    </v-avatar>
                  </v-badge>
                </template>
               <span>Me</span>
              </v-tooltip>
            </v-col>
          </v-row>
          <v-row v-else>
            <v-col class="col-2 col-sm-1 pl-0">
              <v-tooltip right>
                <template v-slot:activator="{ on, attrs }">
              <v-badge
                bordered
                bottom
                color="green"
                dot
                offset-x="10"
                offset-y="10"
              >
                <v-avatar class="" size="30" elevation="10" v-bind="attrs"
                    v-on="on">
                  <img src="https://cdn.vuetifyjs.com/images/lists/5.jpg" />
                </v-avatar>
              </v-badge>
              </template>
                <span>{{mess.user.name}}</span>
              </v-tooltip>
            </v-col>
            <v-col class="col-10 col-sm-11">
              <v-card color="white" light>
                <v-list-item three-line>
                  <v-list-item-content>
                    <div class="">
                      {{ mess.message }}
                    </div>
                    <v-list-item-subtitle
                      >16 mins ago
                      <span class="ml-16"
                        >Seen 1:03PM</span
                      ></v-list-item-subtitle
                    >
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-col>
          </v-row>
          
        </div>
      </div>
    </div>
    <v-row color="rgba(0,0,0,0)">
      <v-text-field
        class="col-10 col-sm-11"
        v-model="newMessage"
        append-icon="mdi-emoticon"
        outlined
        clear-icon="mdi-close-circle"
        clearable
        label="Message"
        type="text"
      ></v-text-field>
      <div class="col-2 col-sm-1" align="start" justify="start">
        <v-icon @click="sendMess()">mdi-send</v-icon>
      </div>
    </v-row>
  </div>
</template>

<script>
import {mapGetters, mapState, mapActions } from 'vuex'
import axios from "axios";
export default {
  props: ["room", "name"],
  data() {
    return {
      newMessage: "",
      kt: 0,
    };
  },
  updated() {
    this.scollToBottom();
  },
  computed: {
    ...mapState('auth', ['user']),
    room1() {
      this.scollToBottom();
      return this.room;
    },
    config() {
      const token = localStorage.getItem("jwt");
      return {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    },
  },
  mounted() {
    this.$echo.channel("chat1").listen("PostCreated", (e) => {
      console.log(e);
      this.$emit("messagesent");
      this.scollToBottom();
    });
  },
  methods: {
    scollToBottom() {
      var objDiv = document.getElementById("ct");
      if (objDiv) {
        objDiv.scrollTop = objDiv.scrollHeight;
      }
    },
    async sendMess() {
      await axios
        .post(
          `http://127.0.0.1:8000/api/chat/roomm/${this.room[0].chat_room_id}/message`,
          {
            message: this.newMessage,
          },
          this.config
        )
        .then((result) => {
          console.log("response ne");
          console.log(result);
          this.$emit("messagesent");
          this.scollToBottom();
        });
    },
  },
};
</script>

<style>
.nee {
  text-align: right;
  /* padding-left: 3px !important; */
}
.row {
  margin: 0 !important;
}
</style>
