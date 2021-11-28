<template>
  <div>
    <h1>This is a test page for admin</h1>
    <v-container>
      <v-row>
        <v-col class="text-center">
          <v-card>
            <v-card-title primary-title> Course Detail </v-card-title>

            <v-tabs v-model="tab" align-with-title>
              <v-tabs-slider color="yellow"></v-tabs-slider>

              <v-tab>Genaral infor</v-tab>
              <v-tab>Lessons</v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
              <v-tab-item>
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
                    id="questionText"
                    v-model="description"
                    outlined
                    class="col col-12"
                    name="questionText"
                    label="Description"
                    hint="Description"
                  ></v-textarea>
                  <v-btn @click="updateCourse()"> Update </v-btn>
                  <v-divider class="col col-12" />
                </v-card-text>
              </v-tab-item>
              <v-tab-item>
                <v-container>
                  
                  <v-btn :to="$route.fullPath + '/addLesson'">Add Lesson</v-btn>

                  <v-card-text class="row ma-0">
                    <v-list subheader two-line class="row list">
                      <v-list-item
                        v-for="(item, index) in tmpLessons"
                        :key="index"
                        class="indigo lighten-5 pa my-1 py-1"
                        draggable="true"
                        @dragstart="startDrag($event, item, index)"
                        @drop="onDrop($event, index)"
                        @dragenter.prevent
                        @dragover.prevent
                      >
                        <v-col  class="col col-11 col-sm-3" align="start">
                          <p>{{ item.title }}</p>
                          <subtitle-1>10/10/2021</subtitle-1>
                          <!-- <v-subheader inset>Folders</v-subheader> -->
                        </v-col>
                        <v-col
                          class="col col-sm-2 hidden-sm-and-down"
                          align="start"
                        >
                          <v-row class="ma-1">
                            <div v-for="(item, i) in 3" :key="i" class="">
                              <v-avatar
                                class="row"
                                color="primary"
                                size="36"
                              ></v-avatar>
                            </div>
                          </v-row>

                          <subtitle-1 class="row">123 views</subtitle-1>
                        </v-col>
                        <v-col align="end" class="px-1">
                          <!-- <v-icon @click="confirmDelete(item.id)"
                            >mdi-information</v-icon
                          > -->
                          <v-btn @click="confirmDelete(item.id)"> Delete</v-btn>
                          <v-btn :to="$route.fullPath + '/update/'+ item.id">Detail</v-btn>
                        </v-col>
                        <v-col> </v-col>
                      </v-list-item>
                    </v-list>
                  </v-card-text>
                </v-container>
              </v-tab-item>
            </v-tabs-items>
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
    config() {
      const token = localStorage.getItem("jwt");
      return {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    },
  },
  async mounted() {
    await this.getCourse();
  },
  data() {
    return {
      tmpIndex: "",
      tab: null,
      idCourse: this.$route.params.id,
      time: "",
      index: 0,
      tmpLessons: [],
      name: "",
      subject: "",
      level: "",
      description: "",
      subjects: ["Company Culture", "Specializes", "Soft Skill"],
      levels: ["All level", "Beginner", "Intermediate", "Advanced"],
      types: ["Selection"],
    };
  },

  methods: {
    async confirmDelete(id) {
      swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        })
        .then(async (result) => {
          if (result.value) {
            await axios
              .delete(
                `http://127.0.0.1:8000/api/lesson/delete/${id}`,
                this.config
              )
              .then((result) => {
                console.log(result);
                this.getCourse();
              });
          }
        });
    },
    startDrag(e, item, i) {
      console.log("start");
      e.dataTransfer.dropEffect = "move";
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("index", i);
      this.tmpIndex = i;
    },
    async onDrop(e, index) {
      let x = this.tmpLessons[this.tmpIndex];
      this.tmpLessons.splice(this.tmpIndex, 1, this.tmpLessons[index]);

      this.tmpLessons.splice(index, 1, x);
      for (let i = 0; i < this.tmpLessons.length; i++) {
        if (this.tmpLessons[i].lessonIndex != i) {
          this.tmpLessons[i].lessonIndex = i;
          await axios
            .post(
              `http://127.0.0.1:8000/api/lesson/update/${this.tmpLessons[i].id}`,
              { lessonIndex: this.tmpLessons[i].lessonIndex },
              this.config
            )
            .then((response) => {
              console.log(response);
            });
        }
      }
      console.log(this.tmpLessons);
    },
    async getCourse() {
      console.log(this.$route.params.id);
      await axios
        .get(`http://127.0.0.1:8000/api/course/${this.idCourse}`, this.config)
        .then((result) => {
          const course = result.data.course;
          this.tmpLessons = result.data.lessons;
          //   console.log(test);
          this.name = course.courseName;
          this.level = course.courseLevel;
          this.description = course.courseDescription;
          this.subject = course.courseSubject;
          this.tmpLessons = this.tmpLessons.sort((a, b) => {
            return a.lessonIndex - b.lessonIndex;
          });
        });
    },
    addQuestion() {
      this.tmpQuestion.push({
        question: "",
        type: "",
        answers: [],
        correct: "",
        explaination: "",
        questionId: -1,
      });
      console.log(this.tmpQuestion);
    },
    decreaseQuesstion(i) {
      this.tmpQuestion.splice(i, 1);
    },
    updateLesson(idLesson){

    },
    async updateCourse() {
      await axios
        .post(
          `http://127.0.0.1:8000/api/course/update/${this.idCourse}`,
          {
            courseName: this.name,
            courseLevel: this.level,
            courseDescription: this.description,
            courseSubject: this.subject,
          },
          this.config
        )
        .then((result) => {
          console.log("response ne");
          console.log(result);
        });
    },
  },
};
</script>

<style></style>
