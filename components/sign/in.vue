<template>
  <div class="container-login">
    <div class="login-type">
      <Transition name="fade" mode="out-in">
        <span
          :key="signUp"
          @click="emit('update:signUp', !signUp)"
          class="login-btn"
          >{{ signUp ? "Back to login" : "Create an account" }}
        </span>
      </Transition>
    </div>
    <div class="form-item">
      <label for="email">Email</label>
      <input
        :value="email"
        required
        name="email"
        id="email"
        @input="emit('update:email', $event.target.value)"
      />
    </div>
    <div class="form-item">
      <label for="password">Password</label>
      <input
        :value="password"
        required
        name="password"
        id="password"
        :type="showPassword ? 'text' : 'password'"
        @input="emit('update:password', $event.target.value)"
      />
      <Icon
        :name="showPassword ? 'mdi:eye-off-outline' : 'mdi:eye-outline'"
        size="24px"
        @click="showPassword = !showPassword"
      />
    </div>
    <Transition name="fade" mode="out-in">
      <div v-if="signUp" class="form-item">
        <label for="name">Name</label>
        <input
          :value="name"
          required
          name="name"
          id="name"
          @input="emit('update:name', $event.target.value)"
        />
      </div>
      <div v-else>
        <p>You forgot your password ?</p>
        <span class="login-btn">Reset password</span>
      </div>
    </Transition>
    <p v-if="accountMessage.length > 0">{{ accountMessage }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  email: {
    require: true,
    type: String,
  },
  password: {
    require: true,
    type: String,
  },
  name: {
    require: false,
    type: String,
  },
  signUp: {
    type: Boolean,
    require: true,
  },
  accountMessage: {
    require: true,
    type: String,
  },
});
const emit = defineEmits();

const showPassword = ref(false);
</script>

<style lang="scss" scoped>
.container-login {
  text-align: center;
}
.login-type {
  height: 40px;
}
.login-btn {
  padding: 8px 15px;
  color: #5bc0be;
  border: 1px solid #5bc0be;
  border-radius: 5px;
  cursor: pointer;
}
input {
  width: 80%;
}
.form-item {
  display: flex;
  margin: 20px;
  align-items: center;
  & > label {
    margin-right: 10px;
    width: 20%;
    text-align: left;
  }
  & > input {
    padding: 10px;
    border: 1px solid $colorPrimary;
    border-radius: 5px;
    background-color: $colorFith;
    color: $colorPrimary;
  }
  & > svg {
    position: absolute;
    right: 15%;
  }
}
</style>
