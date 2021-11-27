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
    <add-course/>
  </div>
</template>

<script>
import addCourse from '../components/addCourse.vue';
export default {
  components: { addCourse },
  data() {
    return {
      list: ["item1", "item2", "item3", "item4"],
      tmpIndex: "",
    };
  },
  methods: {
    startDrag(e, item, i) {
      e.dataTransfer.dropEffect = "move";
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("index", i);
      this.tmpIndex = i;
      console.log(i);

      console.log(e.dataTransfer.getData("index"));
    },
    onDrop(e, index) {
     let x= this.list[this.tmpIndex];
     this.list.splice(this.tmpIndex, 1,this.list[index])

     this.list.splice(index, 1, x)
    },
  },
};
</script>

<style></style>
