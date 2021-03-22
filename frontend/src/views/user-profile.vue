<template>
  <section>
    <div class="sign-in">
      <form @submit.prevent="login">
        <input
          type="text"
          v-model="user.fullname"
          placeholder="Enter Full Name:"
        />
        <input
          type="text"
          v-model="user.username"
          placeholder="Enter UserName"
        />
        <input
          type="password"
          v-model="user.password"
          placeholder="Enter Password"
        />
        <button @click="getLoggedInUser">Login</button>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  name: "user-profile",
  data() {
    return {
      user: {
        fullname: "",
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      this.$store.commit({ type: "signUp", user: this.user });
    },
    getLoggedInUser() {
      const a =this.$store.getters.getUser
    },
  },
};
</script>