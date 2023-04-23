<script setup>
import { ref } from "vue";
import useAuthUser from "../composables/UseAuthUser";
import { useRouter } from "vue-router";

// Use necessary composables
const router = useRouter();
const { login, loginWithSocialProvider } = useAuthUser();

// keep up with form data
const form = ref({
  email: "",
  password: "",
});

const handleLogin = async (provider) => {
  try {
    provider
      ? await loginWithSocialProvider(provider)
      : await login(form.value);
    router.push({ name: "Home" });
  } catch (error) {
    alert(error.message);
  }
};
</script>

<template>
  <div class="login-container">
    <h4 class="text-center">Login Form</h4>
    <form @submit.prevent="handleLogin()">
      <label for="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        v-model="form.email"
        required
      />

      <label for="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        v-model="form.password"
        required
      />

      <button type="submit">Login</button>
    </form>
    <router-link to="/forgotPassword">Forgot Password?</router-link>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
  font-family: Arial, sans-serif;
}

.login-container {
  width: 300px;
  margin: 50px auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 0px 10px #888888;
}

.login-container h2 {
  text-align: center;
  margin-bottom: 20px;
}

.login-container label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
}

.login-container input[type="email"],
.login-container input[type="password"] {
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: none;
  background-color: #f2f2f2;
}

.login-container button[type="submit"] {
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: none;
  background-color: #027be3;
  color: #ffffff;
  font-weight: bold;
  cursor: pointer;
}

.login-container a {
  display: block;
  text-align: center;
  color: #027be3;
}
</style>
