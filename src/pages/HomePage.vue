<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const handleClick = async () => {
  try {
    router.push({ name: "Editor" });
  } catch (error) {
    alert(error.message);
  }
};
</script>

<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card
      class="my-card text-white card-with-margin"
      style="background: var(--q-primary)"
      @click="handleClick"
    >
      <q-card-section class="text-center">
        <div class="text-h6">Facebook Ad Generator</div>
        <div class="text-white q-gutter-md card-with-margin">
          <q-icon
            v-for="size in ['xl']"
            :key="size"
            :size="size"
            name="facebook"
          />
        </div>
        <div class="text-subtitle2">
          Generate Facebook ads for your company products <br />with your
          company keywords
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<style scoped>
.card-with-margin {
  padding: 24px 0; /* Adjust the margin as needed */
}
</style>
