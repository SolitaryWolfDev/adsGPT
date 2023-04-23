<template>
  <h1>sup, insert your headline here</h1>
  <div class="q-pa-md" style="max-width: 300px">
    <q-input v-model="text" filled type="textarea" />
  </div>
  <q-btn color="primary" @click="sendContent" label="Submit" />
</template>

<script setup>
import { ref } from "vue";
const text = ref("");

async function sendContent() {
  try {
    console.log(text.value);
    //if (error) throw error;
  } catch (error) {
    alert(error.message);
  }
}
</script>