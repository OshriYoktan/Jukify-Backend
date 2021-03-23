<template>
  <div class="chat-room-container" v-if="currStation">
    <h1>{{ currStation.name }}</h1>
    <ul v-if="currStation.msgs.length" id="messages">
      <li v-for="(msg, idx) in msgs" :key="idx">
        {{ msg.from }}: {{ msg.txt }}
      </li>
    </ul>
    <form id="form" @submit.prevent="sendMsg">
      <input id="input" v-model="msg.txt" autocomplete="off" />
      <button>Send</button>
    </form>
  </div>
</template>
<script>
import io from "socket.io";
import { socketService } from "../services/socket.service";
export default {
  props: ["currStation"],
  data() {
    return {
      socket: io(),
      msg: {
        from: "me",
        txt: "",
      },
    };
  },
  methods: {
    async addMsg(msg) {
      try {
        msg.from = this.$store.state.userStore.user;
        const addMsg = { msg, stationId: this.currStation._id };
        await this.$store.dispatch({
          type: "addStationMsg",
          addMsg,
        });
      } catch {}
    },
    sendMsg() {
      socketService.emit("chat newMsg", this.msg);
      this.msg = { from: "Me", txt: "" };
    },
    changeTopic(id) {
      socketService.emit("chat topic", id);
    },
  },
  computed: {
    msgs() {
      return this.currStation.msgs;
    },
  },
  created() {
    // this.currStation.msgs;
    console.log("this.addMsg:", this.addMsg);
    socketService.on("chat addMsg", this.addMsg());
    setTimeout(() => {
      this.changeTopic(this.currStation._id);
    }, 700);
  },
  destroyed() {
    socketService.off("chat addMsg", this.addMsg);
    socketService.terminate();
  },
};
</script>
<style>
#form {
  background: rgba(0, 0, 0, 0.15);
  padding: 0.25rem;
  bottom: 0;
  display: flex;

  height: 3rem;
  box-sizing: border-box;
  backdrop-filter: blur(10px);
}
#input {
  border: none;
  padding: 0 1rem;
  flex-grow: 1;
  border-radius: 2rem;
  margin: 0.25rem;
}
#input:focus {
  outline: none;
}
#form > button {
  background: #333;
  border: none;
  padding: 0 1rem;
  margin: 0.25rem;
  border-radius: 3px;
  outline: none;
  color: #fff;
}
#messages {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
#messages > li {
  padding: 0.5rem 1rem;
}
#messages > li:nth-child(odd) {
  background: #efefef;
}
.chat-room-container {
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: space-between;
}
</style>