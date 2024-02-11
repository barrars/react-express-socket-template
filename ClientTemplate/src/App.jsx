import { useEffect } from "react";
import { useSocket } from "./context/SocketContext";

export default function App() {
  const { emitEvent, addSocketOnEvent, isConnected } = useSocket();
  useEffect(() => {
    if (isConnected) {
      const chatMessageEvent = addSocketOnEvent("chatMessage", (message) => {
        console.log(message);
      });
      const fileEvent = addSocketOnEvent("file", (file) => {
        console.log(file);
      })
      const doneEvent = addSocketOnEvent("done", (message) => {
        console.log(message);
      })

      // Cleanup listener when component unmounts or if isConnected changes
      return () => {
        chatMessageEvent()
        fileEvent()
        doneEvent()
      }
    }
  }, [isConnected, addSocketOnEvent]);
  const sendMessage = () => {
    emitEvent("sendChatMessage", "Hello World!");
  };
  return (
    <>
      <h1 className="text-3xl font-bold underline ">Hello world!!!</h1>
      {/* input element that takes a file and sends it to localhost:3000 */}
      <button onClick={sendMessage}>Send Message</button>
      <input
        type="file"
        onChange={(event) => {
          const file = event.target.files[0];
          const formData = new FormData();
          formData.append("file", file);
          fetch("http://localhost:3000/upload", {
            method: "POST",
            body: formData,
          })

        }}
      />
    </>
  );
}
