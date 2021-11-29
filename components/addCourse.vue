<template>
  <div>
    <v-btn
          class="ma-2"
          text
          icon
          color="blue lighten-2"
          to="/courses"
      
        >
          <v-icon>mdi-thumb-up</v-icon>
        </v-btn>
  
    <!-- <h1>This is a test page for admin</h1> -->
    <v-container>
      <v-row>
        <v-col class="text-center">
          <v-card>
            <v-card-title primary-title> Add Course</v-card-title>
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
                class="col col-12"
                name="name"
                label="Course name"
                hint="please fill name"
              ></v-text-field>
              <v-select
                v-model="subject"
                id="type"
                :items="subjects"
                class="col col-12 col-sm-4"
                name="type"
                label="Choose subject"
                hint="Choose subject"
              ></v-select>
              <v-select
                v-model="level"
                id="type"
                :items="levels"
                class="col col-12 col-sm-4"
                name="type"
                label="Choose level"
                hint="Choose level"
              ></v-select>
              <v-divider class="col col-12" />
              <v-textarea
                v-model="description"
                outlined
                class="col col-12"
                name="questionText"
                label="Description"
                hint="Description"
              ></v-textarea>
              <v-divider class="col col-12" />
            </v-card-text>
            
            <v-card-actions>
              <v-btn color="success" @click="addQuestion()">
                Cancel</v-btn
              >
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
  mounted() {
    this.tmpLessons.push({
      title: "",
      summary: "",
      video: "",
    });
  },
  data() {
    return {
      time: "",
      status:"public",
      file: null,
      index: 0,
      tmpLessons: [],
      name: "",
      subject: "",
      level: "",
      description: "",
      subjects: ["Company Culture", "Specializes", "Soft Skill"],
      levels: ["All level", "Beginner", "Intermediate", "Advanced"],
    };
  },
  methods: {
    backToList(){
      this.$emit("messagesen");
    },
    test(i) {
      console.log("okkkkk");
      document.getElementById(i).click();
    },
    handleFileObject(e, index) {
      console.log(e.target.files[0]);
      // let ref='file'+i
      this.file = e.target.files[0];
      this.tmpLessons[index].video = this.file;

      console.log(this.tmpLessons);
    },
    addQuestion() {
      this.tmpLessons.push({
        title: "",
        summary: "",
        video: "",
      });
      console.log(this.tmpLessons);
    },
    decreaseQuesstion(i) {
      this.tmpLessons.splice(i, 1);
      console.log(this.tmpLessons);
    },
    async addCourse() {
      const fd = new FormData();
      fd.append("courseName",this.name);
      fd.append("courseLevel",this.level);
      fd.append("courseSubject",this.subject);
      fd.append("courseDescription",this.description);
      fd.append("courseStatus",this.status);
      // for(let i=0;i< this.tmpLessons.length;i++){
      //    fd.append("title"+i,this.tmpLessons[i].title);
      //    fd.append("summary"+i,this.tmpLessons[i].summary);
      //    fd.append("file"+i, this.tmpLessons[i].video , this.tmpLessons[i].video.name);
      // }
     
      console.log(fd);
      // fd.append("name",this.name);
      await axios
        .post("http://127.0.0.1:8000/api/course/create",fd, this.config)
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
