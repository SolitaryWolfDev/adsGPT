<script setup>
import useAuthUser from "../composables/UseAuthUser";
import { ref } from "vue";

// use necessary composables
const { sendPasswordRestEmail } = useAuthUser();

// keep up with email
const email = ref("");

// keep up with form data
const form = ref({
  email: "",
});

// function to call on submit of the form
// triggers sending the reset email to the user
const handlePasswordReset = async () => {
  await sendPasswordRestEmail(email.value);
  alert(`Password reset email sent to: ${email.value}`);
};
</script>
<template>
  <div class="login-container">
    <h5 class="text-center">Forget Password</h5>
    <form @submit.prevent="handlePasswordReset()">
      <label for="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        v-model="form.email"
        required
      />

      <button type="submit">Send reset email</button>
    </form>
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
