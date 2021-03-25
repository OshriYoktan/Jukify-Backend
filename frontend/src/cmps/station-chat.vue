<template>
  <div class="chat-room-container" v-if="currStation">
    <h2>Chat</h2>
    <ul v-if="currStation.msgs.length" id="messages">
      <li v-for="(msg, idx) in msgs" :key="idx">
        <p>{{ msg.from }}</p>
        <p>{{ msg.txt }}</p>
        <span>{{ msg.sentAt | moment("from", "now", true) }} ago</span>
      </li>
    </ul>
    <h3 v-else>Quiet here...</h3>

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
        sentAt: "",
      },
    };
  },
  methods: {
    sendMsg() {
      try {
        this.msg.sentAt = Date.now();
        if (!this.$store.state.userStore.user) this.msg.from = "guest";
        else {
          this.msg.from = this.$store.state.userStore.user.username;
          if (!this.msg.from) this.msg.from = "guest";
        }
        socketService.emit("chat newMsg", this.msg);
        this.msg = { from: "Guest", txt: "" };
      } catch (err) {
        console.log("err:", err);
      }
    },
    async addMsg(msg) {
      try {
        const addMsg = { msg, stationId: this.currStation._id };
        await this.$store.dispatch({
          type: "addStationMsg",
          addMsg,
        });
      } catch {}
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