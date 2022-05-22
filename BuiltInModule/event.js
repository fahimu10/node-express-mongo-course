// Events Module
const EventEmitter = require("events");
const emitter = new EventEmitter();

// addEventListener('click', (e) => {

// })

emitter.on("event1", () => {
  console.log("Event 1 Called");
});

emitter.on("event2", (e) => {
  console.log("Event 2 Called", e);
});

emitter.emit("event2", { name: "Simanta Paul", id: 1 });
