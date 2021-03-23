<template>
  <section>
    <div class="sign-up" v-if="!$store.state.userStore.user">
      <form @submit.prevent="signUp">
        <input
          type="text"
          v-model="userSignup.fullname"
          placeholder="Enter Full Name:"
        />
        <input
          type="text"
          v-model="userSignup.username"
          placeholder="Enter UserName"
        />
        <input
          type="password"
          v-model="userSignup.password"
          placeholder="Enter Password"
        />
        <button>Sign-Up</button>
      </form>
    </div>

    <div class="login" v-if="!$store.state.userStore.user">
      <form @submit.prevent="login">
        <input
          type="text"
          v-model="userSignin.username"
          placeholder="Enter UserName"
        />
        <input
          type="password"
          v-model="userSignin.password"
          placeholder="Enter Password"
        />
        <button>login</button>
      </form>
      <!-- <button v-if="$store.getters.getUser" @click="logout">logout</button> -->
    </div>
    <div v-if="$store.getters.getUser">{{ $store.getters.getUser }}</div>
    <div v-else>{{ $store.getters.getMsgToUser }}</div>
    <button v-if="$store.state.userStore.user" @click="logout">logout</button>
  </section>
</template>

<script>
export default {
  name: "user-profile",
  data() {
    return {
      userSignup: {
        fullname: "",
        username: "",
        password: "",
      },
      userSignin: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    signUp() {
      this.$store.dispatch({ type: "signUp", user: this.userSignup });
    },
    async login() {
      this.$store.dispatch({ type: "login", user: this.userSignin });
    },
    async logout() {
      this.$store.dispatch({ type: "logout" });
      // this.$store.commit({ type: "logout" });
    },
  },
};
</script>