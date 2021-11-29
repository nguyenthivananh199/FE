<template>
  <div>
    <v-container>
      <v-row>
        <v-col class="text-center">
          <v-card>
            <v-card-title primary-title> List Quizzes </v-card-title>
            <v-card-text class="row ma-0">
              <v-text-field
                v-model="search"
                class="col col-12 col-sm-4"
                name="point"
                label="Search"
                hint="Search.."
                append-icon="mdi-map-marker"
              ></v-text-field>
              <v-select
              v-model="level"
                :items="levels"
                class="col col-12 col-sm-3"
                name="type"
                label="Choose level"
              ></v-select>
              <v-select
              v-model="subject"
                :items="subjects"
                class="col col-12 col-sm-3"
                name="type"
                label="Choose subject"
              ></v-select>
              <v-select
                :items="viewSort"
                class="col col-12 col-sm-2"
                name="type"
                label="Sort"
              ></v-select>
              <v-list subheader two-line class="row list">
                <v-list-item
                  v-for="(item, i) in filteredList"
                  :key="i"
                  class="indigo lighten-5 pa my-1 py-1"
                >
                  <v-col class="col col-11 col-sm-3" align="start">
                    <p>{{ item.name }}</p>
                    <subtitle-1>10/10/2021</subtitle-1>
                    <!-- <v-subheader inset>Folders</v-subheader> -->
                  </v-col>
                  <v-col class="col col-sm-2 hidden-sm-and-down" align="start">
                    <v-row class="ma-1">
                      <div v-for="(item, i) in index" :key="i" class="">
                        <v-avatar
                          class="row"
                          color="primary"
                          size="36"
                        ></v-avatar>
                      </div>
                    </v-row>

                    <subtitle-1 class="row">123 views</subtitle-1>
                  </v-col>
                  <v-col
                    class="col col-4 col-sm-2 hidden-sm-and-down"
                    align="start"
                  >
                    <p>Level</p>
                    <subtitle-1>{{item.level}}</subtitle-1>
                    <!-- <v-subheader inset>Folders</v-subheader> -->
                  </v-col>
                  <v-col
                    class="col col-4 col-sm-3 hidden-sm-and-down"
                    align="start"
                  >
                    <p>Subject</p>
                    <subtitle-1>{{item.subject}}</subtitle-1>
                    <!-- <v-subheader inset>Folders</v-subheader> -->
                  </v-col>
                  <v-col align="end" class="px-1">
                    <v-icon color="grey lighten-1">mdi-information</v-icon>
                    <v-btn :to="$route.fullPath + '/'+item.id">Detail</v-btn>
                  </v-col>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  mounted() {
    this.getQuizzList();
  },
  data() {
    return {
      list: [],
      index: 3,
      levels: ["All level", "Beginner", "Intermediate", "Advanced"],
      subjects: ["All subject", "Company Culture", "Specializes", "Soft Skill"],
      viewSort: ["From highest", "From Lowest"],
      search: "",
      level: "",
      subject: "",
    };
  },
  computed: {
    config() {
      const token = localStorage.getItem("jwt");
      return {
        headers: { Authorization: `Bearer ${token}` },
      };
    },
    filteredList() {
      return this.list.filter((item) => {
        if(this.level==='All level'){
          this.level=''
        }
        if(this.subject==='All subject'){
          this.subject=''
        }
        if (
          item.name.match(this.search) &&
          item.level.match(this.level) &&
          item.subject.match(this.subject)
        ) {
          return item;
        }
      });
    },
  },
  methods: {
    async getQuizzList() {
      await axios
        .get("http://127.0.0.1:8000/api/test/list", this.config)
        .then((result) => {
          this.list = result.data;
        });
    },
  },
};
</script>

<style>
.v-expansion-panel-content__wrap {
  max-height: 400px !important ;
  overflow-y: auto !important;
  margin-bottom: 5px;
  padding: 0 !important ;
}
.container.fill-height {
  display: block;
}
.action-btn {
  max-width: 50px;
  margin: 3px;
}
.list {
  margin-left: 3%;
  margin-right: 3%;
}
</style>
