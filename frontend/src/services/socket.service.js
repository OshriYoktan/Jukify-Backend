import io from 'socket.io-client'

//HADAR'S  ::::***************************** 
// DO NOT DELETE!

// export const SOCKET_EMIT_USER_WATCH = 'user-watch';
// export const SOCKET_EVENT_USER_CONNECTED = 'user-connect';
// export const SOCKET_EVENT_SONG_IS_PLAYING = 'song-in-station-is-playing';
// export const SOCKET_EVENT_LIKE_PLAYLIST = 'Like-playlist';
// export const SOCKET_EVENT_SONG_HAS_ADDED = 'song-has-added';
// export const SOCKET_EVENT_SONG_HAS_REMOVED = 'song-has-remove';
// export const SOCKET_EVENT_NEW_MSG = 'new-msg';
// export const SOCKET_EVENT_IS_TYPING = 'is-typing';

// ***************************************
const baseUrl = (process.env.NODE_ENV === 'production') ? '' : '//localhost:3030'
export const socketService = createSocketService()
// export const socketService = createDummySocketService()

window.socketService = socketService


function createSocketService() {
  var socket
  const socketService = {
    // socket is lazily created
    setup() {
      socket = io(baseUrl)
    },
    on(eventName, cb) {
      if (!socket) socketService.setup();
      console.log(eventName);
      socket.on(eventName, cb)
    },
    off(eventName, cb = null) {
      if (!socket) socketService.setup();
      if (!cb) socket.removeAllListeners(eventName)
      else socket.off(eventName, cb)
    },
    emit(eventName, data) {
      if (!socket) socketService.setup();
      socket.emit(eventName, data)
    },
    terminate() {
      socket = null
    }
  }
  return socketService
}

// eslint-disable-next-line
function createDummySocketService() {
  var listenersMap = {}
  const socketService = {
    listenersMap,
    setup() {
      listenersMap = {}
    },
    terminate() {
      this.setup()
    },
    on(eventName, cb) {
      listenersMap[eventName] = [...(listenersMap[eventName]) || [], cb]
    },
    off(eventName, cb) {
      if (!listenersMap[eventName]) return
      if (!cb) delete listenersMap[eventName]
      else listenersMap[eventName] = listenersMap[eventName].filter(l => l !== cb)
    },
    emit(eventName, data) {
      if (!listenersMap[eventName]) return
      listenersMap[eventName].forEach(listener => {
        listener(data)
      })
    },
    debugMsg() {
      this.emit('chat newMsg', { from: 'Someone', txt: 'Aha it worked!' })
    },
  }
  return socketService
}


// Basic Tests
// function cb(x) {console.log(x)}
// socketService.on('baba', cb)
// socketService.emit('baba', 'DATA')
// socketService.off('baba', cb)


