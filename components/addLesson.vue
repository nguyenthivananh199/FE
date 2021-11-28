<template>
  <div>
    <v-btn
      class="ma-2"
      text
      icon
      color="blue lighten-2"
      @click="$router.go(-1)"
    >
      <v-icon>mdi-thumb-up</v-icon>
    </v-btn>

    <h1>This is a test page for admin</h1>
    <v-container>
      <v-row>
        <v-col class="text-center">
          <v-card>
            <v-card-title primary-title> Add Lesson</v-card-title>
            <!-- <v-container v-for="i in 1" :key="i" >
              <input
                type="file"
                :id="'file'"
                ref='file1'
                @change="handleFileObject($event)"
              />
            </v-container> -->

            <v-card-text class="row ma-0">
              <v-text-field
                v-model="name"
                class="col col-12 col-sm-6"
                name="name"
                label="Lesson title"
                hint="please fill name"
              ></v-text-field>
              <!-- <v-text-field
                class="col col-12 col-sm-6"
                type="file"
                id="customFile"
                ref="file"
                @change="handleFileObject()"
              > -->
              <!-- </v-text-field> -->
              <input
              class="col col-12 col-sm-6"
      type="file"
      id="customFile"
      ref="file"
      @change="handleFileObject()"
    />
              <v-divider class="col col-12" />
              <v-textarea
                v-model="summary"
                outlined
                class="col col-12"
                name="questionText"
                label="Description"
                hint="Description"
              ></v-textarea>
              <v-divider class="col col-12" />
            </v-card-text>

            <v-card-actions>
              <v-btn color="success" @click="addQuestion()"> Cancel</v-btn>
              <v-btn color="success" @click="addCourse()"> Submit </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  computed: {
    // show/hide dialog
    config() {
      const token = localStorage.getItem("jwt");
      return {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type":
            "multipart/form-data; charset=utf-8; boundary=" +
            Math.random().toString().substr(2),
        },
      };
    },
  },
 
  data() {
    return {
      file: null,
      name: "",
      summary:''
    };
  },
  methods: {
    
   
    handleFileObject() {
      this.file = this.$refs.file.files[0];
      console.log(this.file);
      console.log(this.$route)
    },
    async addCourse() {
      const fd = new FormData();
      fd.append("courseId", this.$route.params.id);
      fd.append("title", this.name);
      fd.append("summary", this.summary);
      fd.append("file", this.file, this.file.name);
    
      // for(let i=0;i< this.tmpLessons.length;i++){
      //    fd.append("title"+i,this.tmpLessons[i].title);
      //    fd.append("summary"+i,this.tmpLessons[i].summary);
      //    fd.append("file"+i, this.tmpLessons[i].video , this.tmpLessons[i].video.name);
      // }

      console.log(fd);
      // fd.append("name",this.name);
      await axios
        .post("http://127.0.0.1:8000/api/lesson/create", fd, this.config)
        .then((rs) => {
          console.log(rs);
        });
      // await axios
      //   .post("http://127.0.0.1:8000/api/course/create",{
      //     fd
      //   }, this.config)
      //   .then((rs) => {
      //     console.log(rs);
      //   });
    },
  },
};
</script>

<style></style>
