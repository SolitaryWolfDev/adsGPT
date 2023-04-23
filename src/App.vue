<template>
  <router-view />
</template>

<script>
import { onMounted, ref, defineComponent } from "vue";
// import AccountPage from "./pages/AccountPage.vue";
// import AuthPage from "./pages/AuthPage.vue";
// import { useSupabase } from "./composables/UseSupabase";

export default defineComponent({
  // setup() {
  //   const session = ref();

  //   onMounted(() => {
  //     useSupabase.auth.getSession().then(({ data }) => {
  //       session.value = data.session;
  //       console.log("hee");
  //     });

  //     useSupabase.auth.onAuthStateChange((_, _session) => {
  //       session.value = _session;
  //     });
  //   });

  //   return {
  //     session,
  //   };
  // },

  name: "App",
});
</script>
