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
        from: "Guest",
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
      try {
        socketService.emit("chat newMsg", this.msg);
        this.msg = { from: "Guest", txt: "" };
      } catch (err) {
        console.log("err:", err);
      }
    },
    changeTopic(id) {
      socketService.emit("chat topic", id);
    },
  },
  computed: {
    msgs() {
      return this.$store.state.stationStore.currStation.msgs;
    },
  },
  created() {
    socketService.on("chat addMsg", this.addMsg);
    this.changeTopic(this.currStation._id);
  },
  destroyed() {
    socketService.off("chat addMsg", this.addMsg);
    socketService.terminate();
  },
};
</script>