<template>
  <div>
    <q-splitter
      v-model="splitterModel"
      :limits="[40, 40]"
      style="height: 800px"
    >
      <template v-slot:before>
        <div class="q-pa-md">
          <ParametersForm />
        </div>
      </template>

      <template v-slot:after>
        <div class="q-pa-md">
          <EditorForm />
        </div>
      </template>
    </q-splitter>
  </div>
</template>

<script>
import { ref } from "vue";
import ParametersForm from "../components/ParametersForm.vue";
import EditorForm from "../components/EditorForm.vue";

export default {
  setup() {
    return {
      splitterModel: ref(40), // start at 50%
    };
  },
  name: "EditorPage",
  components: {
    ParametersForm,
    EditorForm,
  },
};
</script>