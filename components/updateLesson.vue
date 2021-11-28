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
            <v-card-title primary-title> Update Lesson</v-card-title>
            <!-- <a   ></a> -->

            <video id="video-preview" width="800" controls />
            <!-- <video v-else width="800" controls>
              <source
                :src="'http://127.0.0.1:8000/api/document/lessons/'+lessonId"
                type="video/mp4"
              />
              Your browser does not support HTML video.
            </video> -->
            <!-- <input type="file" accept="video/*" @change="handleFileUpload( $event )"/> -->
            <p>{{ this.file.name }}</p>
            <!-- <p v-else>fresrfgr</p> -->
            <label for="upload-photo">Choose New Video From Browse...</label>
            <input
              type="file"
              accept="video/*"
              @change="handleFileUpload($event)"
              id="upload-photo"
            />

            <v-card-text class="row ma-0">
              <v-text-field
                v-model="name"
                class="col col-12 col-sm-6"
                name="name"
                label="Lesson title"
                hint="please fill name"
              ></v-text-field>

              <!-- <input
                class="col col-12 col-sm-6"
                type="file"
                id="customFile"
                ref="file"
                @change="handleFileObject()"
              /> -->
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
              <v-btn color="success" @click="updateLesson()"> Submit </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import swal from "sweetalert2";
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
    this.getLesson();
  },
  data() {
    return {
      c: "1",
      videoLink: "",
      file: "",
      name: "",
      summary: "",
      lessonId: this.$route.params.idLesson,
    };
  },
  methods: {
    handleFileUpload(event) {
      this.file = event.target.files[0];
      // console.log('file 0 ne')
      // console.log(this.file)
      this.previewVideo();
    },
    previewVideo() {
      let video = document.getElementById("video-preview");
      let reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.addEventListener("load", function () {
        video.src = reader.result;
      });
    },
    async getLesson() {
      console.log(this.lessonId);
      await axios
        .get(
          `http://127.0.0.1:8000/api/lesson/detail/${this.lessonId}`,
          this.config
        )
        .then(async (rs) => {
          console.log(rs);
          this.name = rs.data.title;
          this.summary = rs.data.summary;

          //   await  axios
          // .get(`http://127.0.0.1:8000/api/document/video`,  this.config)
          // .then((rs) => {
          //     console.log(rs)
          //     this.video1=rs.data
          // })
        });
    },
    handleFileObject() {
      this.file = this.$refs.file.files[0];
      console.log(this.file);
      console.log(this.$route);
    },
    async updateLesson() {
      const fd = new FormData();
      debugger;
      fd.append("title", this.name);
      fd.append("summary", this.summary);
       fd.append("file", this.file, this.file.name);
      if (this.file != "") {
       

      } else {
      console.log("okiii");

      }

      console.log(fd);
      // fd.append("name",this.name);
      await axios
        .post(
          `http://127.0.0.1:8000/api/lesson/update/${this.lessonId}`,
          fd,
          this.config
        )
        .then(async (rs) => {
          console.log(rs);
          await this.getLesson().then(() => {
            swal.fire("Test!", "Hello test message", "success");
          });
        });
    },
  },
};
</script>

<style>
#upload-photo {
  opacity: 0;
  position: absolute;
  z-index: -1;
}
</style>
