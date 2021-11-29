<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      :exact="true"
    >
      <v-list>
        <v-list-item to="/home">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>

          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
         <v-list-item to="/chat">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>

          <v-list-item-title>Chat</v-list-item-title>
        </v-list-item>

        <v-list-group prepend-icon="mdi-account-circle">
          <template v-slot:activator>
            <v-list-item-title>Course Management</v-list-item-title>
          </template>
          <v-list-item
            style="padding-left: 20px"
            v-for="(item, i) in course"
            :key="i"
            :to="item.to"
            :exact="true"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list-group>
        <v-list-group prepend-icon="mdi-account-circle">
          <template v-slot:activator>
            <v-list-item-title>Quizz Management</v-list-item-title>
          </template>

          <v-list-item
            style="padding-left: 20px"
            v-for="(item, i) in quizz"
            :key="i"
            :to="item.to"
            :exact="true"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>

            <!-- <v-list-item-icon>
                <v-icon v-text="icon"></v-icon>
              </v-list-item-icon> -->
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-divider class="mx-2 pa-0" vertical />

      <v-divider class="mx-2 pa-0" vertical />
      <v-btn
        small
        icon
        class="ma-0 pa-0"
        style="font-size: 10px"
        @click.prevent.stop="$vuetify.theme.dark = !$vuetify.theme.dark"
        ><v-icon>{{
          `mdi-moon-${$vuetify.theme.dark ? "waning-crescent" : "new"}`
        }}</v-icon></v-btn
      >
    </v-app-bar>
    <v-main style="overflow: hidden">
      <v-container fill-height style="overflow: auto">
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app class="text-center">
      <span> m3Noa - All rights reserved. </span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
   middleware({ store, redirect }) {
      // If the user is not authenticated
      if (!store.getters['auth/isAuthenticated']) {
        return redirect('/')
      }
    },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: true,
      miniVariant: false,
      right: true,
      rightDrawer: false,
     
      course: [
        {
          icon: "mdi-plus-minus",
          title: "List Courses",
          to: "/courses",
        },
        {
          icon: "mdi-plus-minus",
          title: "Add Course",
          to: "/courses/add",
        },
      ],
      quizz: [
        {
          icon: "mdi-apps",
          title: "List Quizz",
          to: "/quizz",
        },
        {
          icon: "mdi-plus-minus",
          title: "Add Quizz",
          to: "/quizz/add",
        },
      ],
      items: [
        {
          icon: "mdi-plus-minus",
          title: " quizz detail",
          to: "/quizzDetail",
        },
        {
          icon: "mdi-plus-minus",
          title: " quizz update",
          to: "/updateQuizz",
        },
        {
          icon: "mdi-plus-minus",
          title: " chat",
          to: "/chat",
        },
      ],
      title: "Smart Kiddy Quizzes",
      langEn: true,
    };
  },
};
</script>
<style lang="scss">
.fixed-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
