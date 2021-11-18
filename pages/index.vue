<template>
  <v-container>
    <h1>Upload file and open</h1>
    <v-text-field v-model="name" placeholder="name..."></v-text-field>
    <v-text-field
      v-model="description"
      placeholder="description..."
    ></v-text-field>
    <input
      type="file"
      class="custom-file-input"
      id="customFile"
      ref="file"
      @change="handleFileObject()"
    />
    <v-btn @click="uploadFile()">submit</v-btn>
    <v-btn @click="downloadFile()">download</v-btn>
    <!-- <img src="./home/vananh/Desktop/tmp.png"> -->
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      name: "",
      file: null,
      description: "",
      courseId: 1,
      list: [],
    };
  },
  mounted() {
    this.getListUser();
    this.$echo.channel("chat1").listen("PostCreated", (e) => {
      console.log(e);
    });
  },
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
  methods: {
    handleFileObject() {
      this.file = this.$refs.file.files[0];
      console.log(this.file);
    },
    async uploadFile() {
      const fd = new FormData();
      fd.append("file", this.file, this.file.name);
      fd.append("name",this.name);
      await axios
        .post("http://127.0.0.1:8000/api/document/create", fd, this.config)
        .then((rs) => {
          console.log(rs);
        });
    },
    async getListUser() {
      await axios
        .get("http://127.0.0.1:8000/api/users", this.config)
        .then((result) => {
          this.list = result;
        });
    },
    async downloadFile() {
      await axios
        .get("http://127.0.0.1:8000/api/document/download", {
          responseType: "arraybuffer",
        })
        //     .then((response) => {
        //       let blob = new Blob([response.data],
        // //       {
        // //    document" type: "application/vnd.openxmlformats-officedocument.wordprocessingml.
        // // }
        // )
        //   let link = document.createElement('a')
        //   link.href = window.URL.createObjectURL(blob)
        //   link.download = 'demo.docx'
        //   link.click()
        //     });
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "pp.pptx");
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        });
    },
  },
};
</script>

<style></style>
