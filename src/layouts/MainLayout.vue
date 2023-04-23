<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> AdsGPT (everything is GPT nowadays) </q-toolbar-title>

        <div></div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Links </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { useQuasar } from "quasar";
import { defineComponent, ref, onMounted } from "vue";
import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: "Editor",
    caption: "main page",
    icon: "man",
    to: "/",
  },
  {
    title: "Company Information",
    caption: "company",
    icon: "code",
    to: "/company",
  },
  {
    title: "Product Information",
    caption: "product",
    icon: "chat",
    to: "/product",
  },
  {
    title: "Log out",
    icon: "logout",
    to: "/logout",
  },
  // {
  //   title: "Saved Examples",
  //   caption: "company",
  //   icon: "book",
  //   to: "/company",
  // },
  // {
  //   title: "Billings",
  //   caption: "me",
  //   icon: "school",
  //   to: "/me",
  // },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const $q = useQuasar();
    const leftDrawerOpen = ref(false);
    // newly added
    const loading = ref(true);
    const username = ref("");

    onMounted(() => {});

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
