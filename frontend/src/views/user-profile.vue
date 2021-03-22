<template>
  <section>
    <div class="sign-up" v-if="!$store.state.userStore.user">
      <form @submit.prevent="signUp">
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
        <button>Sign-Up</button>
      </form>
    </div>

    <div class="login" v-if="!$store.state.userStore.user">
      <form @submit.prevent="login">
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
        <button>login</button>
      </form>
      <!-- <button v-if="$store.getters.getUser" @click="logout">logout</button> -->
    </div>
    {{ $store.getters.getUser }}
    {{ $store.state.userStore.user }}
    <button v-if="$store.state.userStore.user" @click="logout">logout</button>
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
    signUp() {
      this.$store.commit({ type: "signUp", user: this.user });
    },
    login() {
      const user = {
        username: this.user.username,
        password: this.user.password,
      };
      this.$store.commit({ type: "login", user });
    },
    logout() {
      this.$store.commit({ type: "logout" });
    },
  },
  created() {
    console.log("oshri", this.$store.state.userStore.user);
  },
};
</script>