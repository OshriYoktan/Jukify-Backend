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
    async signUp() {
      try {
        if (
          this.userSignup.fullname === "" ||
          this.userSignup.username === "" ||
          this.userSignup.password === ""
        )
          throw error;
        await this.$store.dispatch({ type: "signUp", user: this.userSignup });
        this.$message({ type: "success", message: "congrads, you'r in" });
        this.userSignup = {
          fullname: "",
          username: "",
          password: "",
        };
      } catch {
        this.$message.error({
          message:
            "Oops, could'nt sign up, please check if  your details are currect.",
        });
      }
    },
    async login() {
      try {
        if (
          this.userSignin.username === "" ||
          this.userSignin.password === ""
        )
          throw error;
        await this.$store.dispatch({ type: "login", user: this.userSignin });
        this.$message({ type: "success", message: "logged in seccesfully" });
        this.userSignin = {
          username: "",
          password: "",
        };
      } catch {
        this.$message.error({
          type: "error",
          message: "Oops, could'nt log in, please try again later.",
        });
      }
    },
    async logout() {
      try {
        await this.$store.dispatch({ type: "logout" });
        this.$message({
          type: "success",
          message: "logged out seccesfully",
        });
      } catch {
        this.$message.error({
          type: "error",
          message: "Oops, could'nt log out, please try again later.",
        });
      }
    },
  },
};
</script>