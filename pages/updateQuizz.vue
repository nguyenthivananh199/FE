<template>
  <div>
    <!-- <h1>This is a test page for admin</h1> -->
    <v-container>
      <v-row>
        <v-col class="text-center">
          <v-card>
            <v-card-title primary-title> Update quizz </v-card-title>
            <v-card-text class="row ma-0">
              <v-text-field
                v-model="name"
                class="col col-12"
                name="name"
                label="Quizz name"
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
              <v-text-field
                v-model="time"
                class="col col-12 col-sm-4"
                name="name"
                label="Time"
                hint="minutes"
                type="number"
              ></v-text-field>
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
              <v-divider class="col col-12" />
            </v-card-text>
            <v-container v-for="(item, i) in tmpQuestion" :key="i">
              <v-btn @click="decreaseQuesstion(i)"> decrease</v-btn>

              <v-card-text class="row ma-0">
                <!-- <v-select
                id="subject"
                v-model="subject"
                :items="subjects"
                class="col col-12 col-sm-6"
                name="subject"
                :label="grtg"
                :hint="gtg"
              ></v-select> -->
                <v-text-field
                  v-model="tmpQuestion[i].question"
                  class="col col-12 col-sm-6"
                  name="point"
                  label="Question"
                  hint="please fill question"
                ></v-text-field>
                <v-select
                  v-model="tmpQuestion[i].type"
                  :items="types"
                  class="col col-12 col-sm-6"
                  name="type"
                  label="Choose subject"
                  hint="Choose subject"
                ></v-select>
                <div v-if="tmpQuestion[i].type == 'Selection'">
                  <v-text-field
                    v-model="tmpQuestion[i].answers[0]"
                    class="col col-12 col-sm-6"
                    name="point"
                    label="Answer 1"
                    hint="please fill answer"
                  ></v-text-field>
                  <v-text-field
                    v-model="tmpQuestion[i].answers[1]"
                    class="col col-12 col-sm-6"
                    name="point"
                    label="Answer 1"
                    hint="please fill answer"
                  ></v-text-field>
                  <v-text-field
                    v-model="tmpQuestion[i].answers[2]"
                    class="col col-12 col-sm-6"
                    name="point"
                    label="Answer 1"
                    hint="please fill answer"
                  ></v-text-field>
                  <v-text-field
                    v-model="tmpQuestion[i].answers[3]"
                    class="col col-12 col-sm-6"
                    name="point"
                    label="Answer 1"
                    hint="please fill answer"
                  ></v-text-field>
                  <v-select
                    v-model="tmpQuestion[i].correct"
                    :items="tmpQuestion[i].answers"
                    class="col col-12 col-sm-6"
                    name="type"
                    label="Choose subject"
                    hint="Choose subject"
                  ></v-select>
                </div>
                <v-text-field
                  v-model="tmpQuestion[i].explaination"
                  class="col col-12 col-sm-6"
                  name="point"
                  label="Explaination"
                  hint="Explaination"
                ></v-text-field>
              </v-card-text>
            </v-container>
            <v-card-actions>
              <v-btn color="success" @click="addQuestion()">
                Add question</v-btn
              >
              <v-btn color="success" @click="updateQuizz()"> Submit </v-btn>
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
    config() {
      const token = localStorage.getItem("jwt");
      return {
        headers: { Authorization: `Bearer ${token}` },
      };
    },
  },
 async mounted() {
    await this.getQuizz();

  },
  data() {
    return {
      time: "",
      index: 0,
      tmpQuestion: [],
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
    async getQuizz() {
      await axios
        .get(`http://127.0.0.1:8000/api/test/6`, this.config)
        .then((result) => {
          const test = result.data.test;
          console.log('test')
          console.log(test);
            this.name=test.name
            this.level=test.level
             this.time=test.time
             this.description=test.description
            this.subject=test.subject
            console.log('tmp')
            console.log(this.tmpQuestion)
            for(let i=0;i<test.questions.length;i++){
                console.log(this.tmpQuestion[i]);
                this.tmpQuestion.push({
                question: test.questions[i].question,
                type: test.questions[i].type,
                answers: [],
              questionId:test.questions[i].id,
                correct: test.questions[i].correctAns,
                explaination: test.questions[i].explaination,
            });

            this.tmpQuestion[this.tmpQuestion.length-1].answers.push(test.questions[i].ans1)
            this.tmpQuestion[this.tmpQuestion.length-1].answers.push(test.questions[i].ans2)
            this.tmpQuestion[this.tmpQuestion.length-1].answers.push(test.questions[i].ans3)
            this.tmpQuestion[this.tmpQuestion.length-1].answers.push(test.questions[i].ans4)
                
            }
            
        });
    },
    addQuestion() {
      this.tmpQuestion.push({
        question: "",
        type: "",
        answers: [],
        correct: "",
        explaination: "",
        questionId:-1,
      });
      console.log(this.tmpQuestion);
    },
    decreaseQuesstion(i) {
      this.tmpQuestion.splice(i, 1);
    },
    async updateQuizz() {
      console.log(this.name);
      console.log(this.tmpQuestion);
      await axios
        .post(
          "http://127.0.0.1:8000/api/test/update/6",
          {
            name: this.name,
            level: this.level,
            time: this.time,
            description: this.description,
            subject: this.subject,
            questions: this.tmpQuestion,
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
