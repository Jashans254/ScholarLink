// import { useState, useRef } from "react";
// import { useUser } from "../context/UserContext";
// import axios from "axios";

// export default function VirtualAssistant() {
//   const { isAuth, user } = useUser();
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const messagesEndRef = useRef(null);

//   const handleSend = async () => {
//     if (!input.trim()) return;
    
//     const userMessage = { sender: "user", text: input };
//     setMessages((prev) => [...prev, userMessage]);
//     setInput("");

//     try {
//       setLoading(true);
//       const res = await axios.post("/api/chat", { question: input });
//       const assistantMessage = { sender: "assistant", text: res.data.answer };
//       setMessages((prev) => [...prev, assistantMessage]);
//     } catch (error) {
//       console.error(error);
//       const errorMessage = { sender: "assistant", text: "Sorry, I couldn't fetch an answer. Please try again." };
//       setMessages((prev) => [...prev, errorMessage]);
//     } finally {
//       setLoading(false);
//       scrollToBottom();
//     }
//   };

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   return (
//     <section className="mt-16 flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-6">
//       <div className="flex flex-col bg-white bg-opacity-10 p-6 rounded-lg w-full max-w-3xl h-[60vh] overflow-hidden">
//         <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
//           Virtual Assistant
//         </h1>
        
//         {/* Chat Area */}
//         <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2">
//           {messages.map((msg, index) => (
//             <div
//               key={index}
//               className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
//             >
//               <div
//                 className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl ${
//                   msg.sender === "user"
//                     ? "bg-blue-500 text-white rounded-br-none"
//                     : "bg-white text-blue-700 rounded-bl-none"
//                 }`}
//               >
//                 {msg.text}
//               </div>
//             </div>
//           ))}
//           <div ref={messagesEndRef} />
//         </div>

//         {/* Input Area */}
//         <div className="flex gap-2">
//           <input
//             type="text"
//             placeholder="Ask your question..."
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={(e) => e.key === 'Enter' && handleSend()}
//             className="flex-1 p-4 rounded-full text-black focus:outline-none"
//           />
//           <button
//             onClick={handleSend}
//             disabled={loading}
//             className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-full hover:bg-gray-100 transition disabled:opacity-50"
//           >
//             {loading ? "..." : "Send"}
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }
import { useState, useRef } from "react";
import { useUser } from "../context/UserContext";
import axios from "axios";
import { Copy } from "lucide-react"; // install lucide-react icons if you haven't yet
import { motion } from "framer-motion"; // install framer-motion for animations

export default function VirtualAssistant() {
  const { isAuth, user } = useUser();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      setLoading(true);
      const res = await axios.post("/api/chat", { question: input });
      const assistantMessage = { sender: "assistant", text: res.data.answer };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage = { sender: "assistant", text: "Sorry, I couldn't fetch an answer. Please try again." };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
      scrollToBottom();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!open && (
          <button
            onClick={() => setOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition transform hover:scale-110"
          >
            💬
          </button>
        )}
      </div>

      {/* Chat Window */}
      {open && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="fixed bottom-6 right-6 w-80 md:w-96 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50"
        >
          {/* Header */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Assistant</h2>
            <button
              onClick={() => setOpen(false)}
              className="text-white hover:text-gray-200 text-xl"
            >
              ✖
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className="relative">
                  <div className={`max-w-xs md:max-w-sm px-4 py-2 rounded-2xl text-sm ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-gray-200 text-blue-700 rounded-bl-none"
                  }`}>
                    {msg.text}
                  </div>
                  {/* Copy Button */}
                  <button 
                    onClick={() => handleCopy(msg.text)}
                    className="absolute -top-2 -right-8 text-gray-400 hover:text-gray-600"
                  >
                    <Copy size={16} />
                  </button>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-2 border-t bg-white flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything..."
              className="flex-1 p-2 rounded-full bg-gray-100 focus:outline-none text-sm"
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition disabled:opacity-50"
            >
              {loading ? "..." : "➤"}
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
}
