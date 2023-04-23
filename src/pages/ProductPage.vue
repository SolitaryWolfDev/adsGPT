<script setup>
import { ref, onMounted } from "vue";
import useSupabase from "../composables/UseSupabase";
import { useUserStore } from "../stores/user";
import { useCompanyStore } from "../stores/company";
import { useProductStore } from "../stores/product";

const { supabase } = useSupabase();
const productStore = useProductStore();
const userStore = useUserStore();
const companyStore = useCompanyStore();

const productName = ref("");
const productDescription = ref("");
const productList = ref([]);
const companyId = companyStore.companyId;
const visibleColumns = ref(["name", "description", "action"]);

///
const prompt = ref(false);
const id = ref();
const name = ref("");
const description = ref("");
///
const updates = {};
const pagination = { rowsPerPage: 10 };

// function definitions
async function insertProduct() {
  updates.user_id = userStore.userId;
  updates.name = productName.value;
  updates.description = productDescription.value;
  updates.created_at = new Date();

  if (companyId != "") {
    updates.company_id = companyId;
  }

  try {
    let { data, error } = await supabase
      .from("products")
      .insert(updates)
      .select();
    if (data != null) {
      alert("successfully inserted product");

      const update = {
        id: data[0].id,
        name: data[0].name,
        description: data[0].description,
      };

      productList.value.push(update);
      productStore.setProductData(productList.value);
    }
  } catch (error) {
    alert(error.message);
  }
}

async function updateProduct() {
  updates.user_id = userStore.userId;
  updates.name = name.value;
  updates.description = description.value;
  updates.id = id.value;
  updates.updated_at = new Date();

  if (companyId != "") {
    updates.company_id = companyId;
  }

  try {
    let { data, error, status } = await supabase
      .from("products")
      .update(updates)
      .eq("id", id.value)
      .select();
    if (status == 200) {
      // update the local storage
      alert(status);
      for (let i = 0; i < productList.value.length; i++) {
        if (productList.value[i].id == id.value) {
          productList.value[i].name = name.value;
          productList.value[i].description = description.value;
        }
      }
      productStore.setProductData(productList.value);
    }
  } catch (error) {
    alert(error.message);
  }
}

async function deleteProduct(productId) {
  try {
    let { error, status } = await supabase
      .from("products")
      .delete()
      .eq("id", productId);

    if (status == 204) {
      productList.value = productList.value.filter(
        (item) => item.id !== productId
      );
      productStore.setProductData(productList.value);
    }
  } catch (error) {
    alert(error.message);
  }
}

async function fetchProductList() {
  try {
    let { data, error } = await supabase
      .from("products")
      .select("id, name, description")
      .eq("user_id", userStore.userId)
      .limit(10);
    if (data != null) {
      alert("successfully retrieved products");
    }
  } catch (error) {
    alert(error.message);
  }
}

function editProduct(row) {
  prompt.value = true;
  name.value = row.name;
  description.value = row.description;
  id.value = row.id;
}

function onReset() {
  companyName.value = null;
  companyDescription.value = null;
}

onMounted(() => {
  productList.value = productStore.product;
});

const column = [
  {
    name: "id",
    required: true,
    label: "ID",
    align: "left",
    field: (row) => row.id,
    required: false,
  },
  {
    name: "name",
    align: "left",
    label: "Name",
    field: "name",
    sortable: true,
  },
  {
    name: "description",
    align: "left",
    label: "Description",
    field: "description",
    wrap: true,
  },
  { name: "action", align: "center", label: "Action", field: "action" },
];
</script>

<template>
  <div style="max-width: 800px; margin: auto; text-align: center">
    <div class="q-pa-xl">
      <q-form @submit="insertProduct()" @reset="onReset" class="q-gutter-md">
        <q-input
          filled
          v-model="productName"
          label="Product Name *"
          hint="Official name of the product"
        />

        <q-input
          filled
          v-model="productDescription"
          type="textarea"
          rows="10"
          label="Product Description *"
          hint="Industries, uses, characteristics etc..."
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

    <div class="q-pa-xl">
      <q-table
        dense
        title="Products"
        :rows="productList"
        :columns="column"
        :visible-columns="visibleColumns"
        :pagination="pagination"
        row-key="id"
      >
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <q-btn
              color="positive"
              icon-right="edit"
              no-caps
              flat
              dense
              @click="editProduct(props.row)"
            />
            <q-btn
              color="negative"
              icon-right="delete"
              no-caps
              flat
              dense
              @click="deleteProduct(props.row.id)"
            />
          </q-td>
        </template>
      </q-table>
    </div>
    <!---->
    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 500px">
        <q-card-section>
          <q-btn
            round
            flat
            dense
            icon="close"
            class="float-right"
            color="grey-8"
            v-close-popup
          ></q-btn>
          <div class="text-h6">Update Item</div>
        </q-card-section>

        <q-separator inset></q-separator>

        <q-card-section class="q-pt-none">
          <q-form class="q-gutter-md">
            <q-list>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Name</q-item-label>
                  <q-input dense outlined v-model="name" />
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Description</q-item-label>
                  <q-input
                    dense
                    outlined
                    type="textarea"
                    rows="10"
                    v-model="description"
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </q-form>
        </q-card-section>

        <q-card-section>
          <q-card-actions align="right">
            <q-btn
              flat
              label="Cancel"
              color="primary"
              dense
              v-close-popup
            ></q-btn>
            <q-btn
              flat
              label="OK"
              color="primary"
              dense
              v-close-popup
              @click="updateProduct()"
            ></q-btn>
          </q-card-actions>
        </q-card-section>
      </q-card>
    </q-dialog>
    <!---->
  </div>
</template>

