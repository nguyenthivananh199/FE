<template>
  <div>
    <v-container>
      <v-row>
        <v-col class="text-center">
          <v-card>
            <v-card-title primary-title
              >{{ test.name }} 
            </v-card-title>
            <span v-if="submited==false"> [ {{ m }}:{{ s }} ]</span>
            <span v-else> {{100*score/test.questions.length}} % complete</span>
            <p class="pa-4" align="start">
              {{ test.description }}
            </p>
            <v-card-text class=" ma-0">
              <v-list subheader two-line class="row list">
                <v-list-item
                  v-for="(item, i) in test.questions"
                  :key="i"
                  class="indigo lighten-5 pa my-1 py-1"
                >
                  <v-col align="left">
                    <h3>{{ i + 1 }}) {{ item.question }}</h3>
                    <v-radio-group v-model="userAns[i]" :disabled="submited">
                      <v-radio
                        :label="item.ans1"
                        :value="item.ans1"
                      ></v-radio>
                       <v-radio
                        :label="item.ans2"
                        :value="item.ans2"
                      ></v-radio>
                       <v-radio
                        :label="item.ans3"
                        :value="item.ans3"
                      ></v-radio>
                       <v-radio
                        :label="item.ans4"
                        :value="item.ans4"
                      ></v-radio>
                    </v-radio-group>
                    <p v-if="userAns[i]==item.correctAns && submited==true">
                      Correct Answer
                    </p>
                    <p v-if="userAns[i]!=item.correctAns && submited==true">
                      Wrong Answer, correct answer is : {{item.correctAns}}
                    </p>
                    <p v-if=" submited==true">Explaination : {{item.explaination}}</p>

                  </v-col>
                </v-list-item>
              </v-list>
              <v-btn v-if="this.submited==false" @click="submitQuizz()">Submit</v-btn>
            </v-card-text>
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
  mounted() {
    this.getQuizz();
  },
  data() {
    return {
      test: [],
      countDown: 10,
      m: "",
      s: "",
      userAns:[],
      submited:false,
      score:0,
      timeOut:'',
    };
  },
  computed: {
    config() {
      const token = localStorage.getItem("jwt");
      return {
        headers: { Authorization: `Bearer ${token}` },
      };
    },
  },
  created() {
     this.countDownTimer()
  },
  beforeDestroy(){
    clearTimeout(this.timeOut);
   
  },
  methods: {
    countDownTimer() {
      if (this.countDown > 0) {
        this.timeOut=setTimeout(() => {
          this.calculation();
          this.countDown -= 1;

          this.countDownTimer();
        }, 1000);
      } else {
        if (this.countDown === 0) {
          this.calculation();
          if(this.submited===false){
          swal.fire("Test!", "Hello test message", "success");
          this.submited=true;
          this.submitQuizz()}
        }
      }
    },
    calculation() {
      if (Math.floor(this.countDown / 60) > 0) {
        this.m = Math.floor(this.countDown / 60);
      } else {
        this.m = 0;
      }

      const tmp = this.countDown - 60 * this.m;

      this.s = tmp;
    },
    async getQuizz() {
      await axios
        .get(`http://127.0.0.1:8000/api/test/6`, this.config)
        .then((result) => {
          this.test = result.data.test;
          console.log(this.test);
        });
    },
     async submitQuizz(){
       console.log(this.userAns)
       // get score
       for(let i=0; i< this.test.questions.length; i++){
         console.log(this.test.questions[i].correctAns)
         console.log(this.userAns[i])
         if( this.test.questions[i].correctAns == this.userAns[i]){
           this.score++;
         }
       }
       console.log(this.score);
       this.submited=true
       await axios
        .post("http://127.0.0.1:8000/api/test/save_history",{
          user_id:'13',
          test_id:'6',
          score: 100* this.score/ this.test.questions.length,
        }, this.config)
        .then((rs) => {
          console.log(rs);
        });
       // check correct and wrong ans


    }
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
