<template>
  <!-- <div
    class="drop-zone"
    
   
  >
    <div
      v-for="(item, index) in list"
      :key="index"
      draggable="true"
      @dragstart="startDrag($event, item, index)"
      @drop="onDrop($event, index)"
       @dragenter.prevent
    @dragover.prevent
    >
      <h1>{{ item }}</h1>
    </div>
  </div> -->
  <div>
    <div v-if="addCourseForm">
      <add-course v-on:messagesen="addCourseForm = false" />
    </div>
    <div v-else>
      <div v-if="updateCourseForm">
        <course-detail v-on:showDetail="updateCourseForm = false" />
      </div>
      <div v-else>
        <list-course v-on:messagesent="addCourse()" />
      </div>
    </div>
    <!-- <add-course/> -->
  </div>
</template>

<script>
import addCourse from "../components/addCourse.vue";
import CourseDetail from '../components/courseDetail.vue';
import ListCourse from "../components/listCourse.vue";
export default {
  components: { addCourse, ListCourse, CourseDetail },
  data() {
    return {
      addCourseForm: false,
      list: ["item1", "item2", "item3", "item4"],
      tmpIndex: "",
    };
  },
  methods: {
    addCourse() {
      this.addCourseForm = true;
    },
    startDrag(e, item, i) {
      e.dataTransfer.dropEffect = "move";
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("index", i);
      this.tmpIndex = i;
      console.log(i);

      console.log(e.dataTransfer.getData("index"));
    },
    onDrop(e, index) {
      let x = this.list[this.tmpIndex];
      this.list.splice(this.tmpIndex, 1, this.list[index]);

      this.list.splice(index, 1, x);
    },
  },
};
</script>

<style></style>
