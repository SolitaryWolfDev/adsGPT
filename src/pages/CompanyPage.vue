<script setup>
import { ref } from "vue";
import useSupabase from "../composables/UseSupabase";
import { useUserStore } from "../stores/user";
import { useCompanyStore } from "../stores/company";

const companyStore = useCompanyStore();
const companyName = ref(companyStore.companyName);
const companyDescription = ref(companyStore.companyDescription);
const companyId = companyStore.companyId;

async function insertOrUpdateCompany() {
  const { supabase } = useSupabase();
  const userStore = useUserStore();

  if (companyId == "") {
    try {
      const updates = {
        user_id: userStore.userId,
        name: companyName.value,
        description: companyDescription.value,
        created_at: new Date(),
      };
      let { data, error } = await supabase
        .from("companies")
        .insert(updates)
        .select();

      if (data != null) {
        alert("successfully inserted");
        // update local state
        const localUpdates = {
          companyId: data[0].id,
          companyName: data[0].name,
          companyDescription: data[0].description,
        };
        companyStore.setCompanyData(localUpdates);
      }
    } catch (error) {
      alert(error.message);
    }
  }
  // There is already a record, you are updating it
  else {
    try {
      const updates = {
        user_id: userStore.userId,
        name: companyName.value,
        description: companyDescription.value,
        updated_at: new Date(),
      };
      let { data, error } = await supabase
        .from("companies")
        .update(updates)
        .eq("id", companyId)
        .select();

      if (data != null) {
        alert("successfully updated");
        // update local state
        const localUpdates = {
          companyId: data[0].id,
          companyName: data[0].name,
          companyDescription: data[0].description,
        };
        companyStore.setCompanyData(localUpdates);
      }
    } catch (error) {
      alert(error.message);
    }
  }
}

function onReset() {
  companyName.value = null;
  companyDescription.value = null;
}
</script>

<template>
  <div style="max-width: 800px; margin: auto; text-align: center">
    <div class="q-pa-xl">
      <q-form
        @submit="insertOrUpdateCompany()"
        @reset="onReset"
        class="q-gutter-md"
      >
        <q-input
          filled
          v-model="companyName"
          label="Company Name *"
          hint="Official name of the company"
        />

        <q-input
          filled
          v-model="companyDescription"
          type="textarea"
          rows="20"
          label="Company Description *"
          hint="Industry, introduction, location etc..."
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
  </div>
</template>
