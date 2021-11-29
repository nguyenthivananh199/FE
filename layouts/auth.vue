<template>
  <v-app dark class="auth">
    <v-app-bar :clipped-left="clipped" fixed app elevation="0">
      <v-icon class="pr-4">mdi-home</v-icon>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <!-- <v-divider class="mx-2 pa-0" vertical /> -->
      <v-btn
        small
        icon
        elevation="2"
        class="px-4 mr-4"
        style="font-size: 10px"
        @click.prevent.stop="
          langEn = !langEn;
          switchLang();
        "
      >
      </v-btn>
      <!-- <v-divider class="mx-2 pa-0" vertical /> -->
      <v-btn
        small
        icon
        elevation="2"
        class="ma-0 pa-0"
        style="font-size: 10px"
        @click.prevent.stop="$vuetify.theme.dark = !$vuetify.theme.dark"
      >
        <v-icon>
          {{ `mdi-moon-${$vuetify.theme.dark ? "waning-crescent" : "new"}` }}
        </v-icon>
      </v-btn>
    </v-app-bar>
    <v-main style="overflow: hidden">
      <v-container fill-height style="overflow: auto">
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app class="text-center">
      <span>
        <!-- {{$t('app.z-copyright')}} &copy;{{ new Date().getFullYear() }} m3Noa - All rights reserved. -->
      </span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "Auth",
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: true,
      title: "title",
      langEn: true,
    };
  },

  methods: {},
};
</script>
<style lang="scss">
.v-card__title {
  display: inline-block;
}
.v-footer {
  display: block;
}
.auth .v-footer,
.auth .v-app-bar.v-toolbar.v-sheet {
  background-color: transparent !important;
}
</style>
