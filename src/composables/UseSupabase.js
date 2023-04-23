// UseSupabase.js
import { createClient } from "@supabase/supabase-js";
import useAuthUser from "./UseAuthUser";
import { useUserStore } from "../stores/user";
import { useCompanyStore } from "../stores/company";
import { useProductStore } from "../stores/product";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// setup client
const supabase = createClient(supabaseUrl, supabaseKey);

// setup auth state listener
supabase.auth.onAuthStateChange((event, session) => {
  // the "event" is a string indicating what trigger the state change (ie. SIGN_IN, SIGN_OUT, etc)
  // the session contains info about the current session most importanly the user dat
  const { user } = useAuthUser();

  // if the user exists in the session we're logged in
  // and we can set our user reactive ref
  user.value = session?.user || null;

  if (user.value != null){
    getProfile(session.user.id)
  }

  if(event == "SIGNED_IN"){
    getCompany(session.user.id)
    getProductList(session.user.id)
  }



});

async function getProfile(user_id) {
  const userStore = useUserStore();
  try {

    let { data, error, status } = await supabase
      .from('profiles')
      .select(`full_name`)
      .eq('id', user_id)
      .single()

    if (error && status !== 406) throw error

    if (data) {
      userStore.setUserData({"userId":user_id,"fullName":data.full_name})
    }
    
  } catch (error) {
    alert(error.message)
  }
}

async function getCompany(user_id) {
  const companyStore = useCompanyStore();
  try {

    let { data, error, status } = await supabase
      .from('companies')
      .select(`id, name, description`)
      .eq('user_id', user_id)
      .single()

    if (error && status !== 406) throw error

    if (data) {
      companyStore.setCompanyData({"companyId":data.id,
      "companyName":data.name, "companyDescription":data.description})
    }
    
  } catch (error) {
    alert(error.message)
  }
}

async function getProductList(user_id){
  const productStore = useProductStore();
  try {
    let { data, error, status } = await supabase
      .from("products")
      .select("id, name, description")
      .eq("user_id", user_id)
      .limit(10)
      .order('id',  { ascending: false });;
    if (error && status !== 406) throw error

    if (data) {
      productStore.setProductData(data)
    }
    
  } catch (error) {
    alert(error.message)
  }
}


// expose supabase client
export default function useSupabase() {
  return { supabase };
}
