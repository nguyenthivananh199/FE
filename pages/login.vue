<template>
  <v-container>
      <p>{{user}}</p>
  </v-container>
</template>

<script>
import {mapGetters, mapState, mapActions } from 'vuex'
export default {
    async mounted(){
         if (localStorage) {
            const token = localStorage.getItem("jwt")
            if(token) {
                    await this.getUserData({data: null, token: localStorage.getItem('jwt')});  
            }
        }
    },
    computed: {
        ...mapState('auth', ['user']),
    },

    methods:{
        ...mapActions('auth', ['getUserData']),
    }

}
</script>

<style>

</style>