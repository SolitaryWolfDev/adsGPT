<script setup>
import { useQuasar } from "quasar";
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useContentStore } from "../stores/content";
import { useCompanyStore } from "../stores/company";
import { useProductStore } from "../stores/product";
import { useUserStore } from "../stores/user";
import useSupabase from "./../composables/UseSupabase";

const contentStore = useContentStore();
const companyStore = useCompanyStore();
const productStore = useProductStore();
const companyName = ref(companyStore.companyName);
const companyDescription = ref(companyStore.companyDescription);
const productName = ref(null);
const productDescription = ref(null);
const tone = ref(null);
const copies = ref(null);
const userStore = useUserStore();

const productNameOptions = ref([]);
const toneOptions = ["Professional", "Happy", "Witty", "Fun", "Intelligent"];

const { supabase } = useSupabase();

// copied
const $q = useQuasar();
let timer;

onBeforeUnmount(() => {
  if (timer !== void 0) {
    clearTimeout(timer);
    $q.loading.hide();
  }
});

function showMultipleGroups() {
  const first = $q.loading.show({
    group: "first",
    message: "This is first group",
    spinnerColor: "amber",
    messageColor: "amber",
  });

  // hiding in 2s
  timer = setTimeout(() => {
    const second = $q.loading.show({
      group: "second",
      message: "This is second group",
    });

    timer = setTimeout(() => {
      // we hide second one (only); but we will still have the first one active
      second();

      // we update 'first' group message (just highlighting how it can be done);
      // note that updating here is not required to show the remaining 'first' group
      first({
        message: "We hid the second group and updated the first group message",
      });

      timer = setTimeout(() => {
        // we hide all that may be showing
        $q.loading.hide();
        timer = void 0;
      }, 2000);
    }, 2000);
  }, 1500);
}

//

async function onSubmit() {
  try {
    // soemthing here

    $q.loading.show({
      message: "Please wait while we generate some amazing content",
      spinnerColor: "orange",
      messageColor: "orange",
      messageSize: 150,
    });

    const { data, error } = await supabase.functions.invoke("smart-facebook", {
      body: {
        information: {
          companyName: companyName.value,
          companyDescription: companyDescription.value,
          productName: productName.value,
          productDescription: productDescription.value,
          tone: tone.value,
          copies: copies.value,
        },
      },
    });

    $q.loading.hide();

    const output = data["data"];

    contentStore.setContentByUser(output);

    const informationJson = {
      companyName: companyName.value,
      companyDescription: companyDescription.value,
      productName: companyName.value,
      productDescription: companyName.value,
      tone: tone.value,
      copies: copies.value,
    };

    const jsonString = JSON.stringify(informationJson);

    try {
      const updates = {
        user_id: userStore.userId,
        input: jsonString,
        output: output,
        created_at: new Date(),
        error: false,
      };

      let { data, error } = await supabase.from("prompts").insert(updates);
    } catch (error) {
      alert(error.message);
    }
    // here catch error from backend
  } catch (error) {
    try {
      const updates = {
        user_id: userStore.userId,
        input: jsonString,
        output: "error",
        created_at: new Date(),
        error: true,
      };

      let { data, error } = await supabase.from("prompts").insert(updates);
    } catch (error) {
      alert(error.message);
    }
  }
}

function onReset() {
  companyName.value = null;
  companyDescription.value = null;
  productName.value = null;
  productDescription.value = null;
  tone.value = null;
  copies.value = null;
}

function productAutoFill() {
  for (let i = 0; i < productStore.product.length; i++) {
    if (productName.value == productStore.product[i].name) {
      productDescription.value = productStore.product[i].description;
    }
  }
}

onMounted(() => {
  for (let i = 0; i < productStore.product.length; i++) {
    productNameOptions.value.push(productStore.product[i].name);
  }
});
</script>

<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        filled
        v-model="companyName"
        label="Company name *"
        hint="Please use your company's name"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-input
        filled
        v-model="companyDescription"
        type="textarea"
        rows="5"
        label="Company description *"
        hint="Industry, specializations, products"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-select
        filled
        v-model="productName"
        :options="productNameOptions"
        label="Product Name *"
        @update:model-value="productAutoFill()"
        hint="Are you promoting/selling a product?"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-input
        filled
        v-model="productDescription"
        type="textarea"
        rows="5"
        label="Product Description *"
        hint="Write something about the product"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-select
        filled
        v-model="tone"
        :options="toneOptions"
        label="Tone *"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please choose a tone']"
      />

      <q-input
        filled
        type="number"
        v-model="copies"
        label="How many copies do you want to generate? *"
        lazy-rules
        :rules="[
          (val) =>
            (val !== null && val !== '') ||
            'Please type a number between 1 and 3',
          (val) => (val > 0 && val < 4) || 'Maximum 3',
        ]"
      />

      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </div>
</template>
