"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Paperclip,
  Smile,
  Mic,
  Phone,
  MoreVertical,
  Search,
  ChevronLeft,
  Image,
  CheckCheck,
  Check,
} from "lucide-react";

interface Message {
  id: string;
  text: string;
  time: string;
  isMe: boolean;
  read: boolean;
  image?: string;
}

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  messages: Message[];
}

const conversations: Conversation[] = [
  {
    id: "1",
    name: "محمد العلي",
    avatar: "https://i.pravatar.cc/150?img=11",
    lastMessage: "هل الهاتف لا يزال متاحاً؟",
    time: "منذ 5 دقائق",
    unread: 2,
    online: true,
    messages: [
      { id: "m1", text: "مرحباً، هل لا يزال الهاتف متاحاً؟", time: "10:30", isMe: false, read: true },
      { id: "m2", text: "نعم، لا يزال متاحاً", time: "10:32", isMe: true, read: true },
      { id: "m3", text: "ممتاز، هل يمكنك إرسال صور إضافية؟", time: "10:35", isMe: false, read: true },
      { id: "m4", text: "بالطبع، سأرسلها الآن", time: "10:36", isMe: true, read: true },
      { id: "m5", text: "هل الهاتف لا يزال متاحاً؟", time: "10:40", isMe: false, read: false },
    ],
  },
  {
    id: "2",
    name: "سارة أحمد",
    avatar: "https://i.pravatar.cc/150?img=5",
    lastMessage: "شكراً لك، تم التوصيل",
    time: "منذ ساعة",
    unread: 0,
    online: true,
    messages: [
      { id: "m1", text: "مرحباً، أريد شراء الأريكة", time: "9:00", isMe: false, read: true },
      { id: "m2", text: "أهلاً، هل تريد مشاهدتها أولاً؟", time: "9:05", isMe: true, read: true },
      { id: "m3", text: "نعم، يمكنني الحضور غداً", time: "9:10", isMe: false, read: true },
      { id: "m4", text: "شكراً لك، تم التوصيل", time: "14:00", isMe: false, read: true },
    ],
  },
  {
    id: "3",
    name: "خالد الشمري",
    avatar: "https://i.pravatar.cc/150?img=12",
    lastMessage: "السعر قابل للتفاوض",
    time: "منذ 3 ساعات",
    unread: 0,
    online: false,
    messages: [
      { id: "m1", text: "كم السعر النهائي؟", time: "8:00", isMe: true, read: true },
      { id: "m2", text: "السعر قابل للتفاوض", time: "8:15", isMe: false, read: true },
    ],
  },
  {
    id: "4",
    name: "فاطمة الحربي",
    avatar: "https://i.pravatar.cc/150?img=9",
    lastMessage: "أين يمكنني الاستلام؟",
    time: "أمس",
    unread: 0,
    online: false,
    messages: [
      { id: "m1", text: "مرحباً، أريد الاستفسار عن المنتج", time: "أمس 16:00", isMe: false, read: true },
      { id: "m2", text: "أهلاً، تفضل بالسؤال", time: "أمس 16:10", isMe: true, read: true },
      { id: "m3", text: "أين يمكنني الاستلام؟", time: "أمس 16:15", isMe: false, read: true },
    ],
  },
];

export default function ChatWindow() {
  const [selectedConvo, setSelectedConvo] = useState<Conversation>(conversations[0]);
  const [newMessage, setNewMessage] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [selectedConvo.messages, scrollToBottom]);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    setNewMessage("");
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const filteredConvos = conversations.filter((c) =>
    c.name.includes(searchQuery)
  );

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        } absolute lg:relative inset-y-0 right-0 w-full sm:w-80 lg:w-96 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 z-30 transition-transform duration-300 flex flex-col`}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">المحادثات</h2>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
              <MoreVertical className="w-5 h-5 text-gray-400" />
            </button>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="بحث في المحادثات..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Conversation list */}
        <div className="flex-1 overflow-y-auto">
          {filteredConvos.map((convo) => (
            <button
              key={convo.id}
              onClick={() => {
                setSelectedConvo(convo);
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border-b border-gray-50 dark:border-gray-800/50 ${
                selectedConvo.id === convo.id
                  ? "bg-brand-50 dark:bg-brand-500/10"
                  : ""
              }`}
            >
              <div className="relative flex-shrink-0">
                <img
                  src={convo.avatar}
                  alt={convo.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                {convo.online && (
                  <div className="absolute bottom-0 left-0 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full" />
                )}
              </div>
              <div className="flex-1 min-w-0 text-right">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {convo.name}
                  </span>
                  <span className="text-xs text-gray-400">{convo.time}</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
                  {convo.lastMessage}
                </p>
              </div>
              {convo.unread > 0 && (
                <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 bg-brand-500 text-white text-[10px] font-bold rounded-full">
                  {convo.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 dark:border-gray-800">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-500 rotate-180" />
          </button>
          <div className="relative">
            <img
              src={selectedConvo.avatar}
              alt={selectedConvo.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            {selectedConvo.online && (
              <div className="absolute bottom-0 left-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              {selectedConvo.name}
            </h3>
            <p className="text-xs text-green-500">
              {selectedConvo.online ? "متصل" : "غير متصل"}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
              <Phone className="w-5 h-5 text-gray-400" />
            </button>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
              <MoreVertical className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 dark:bg-gray-800/20">
          {selectedConvo.messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.isMe ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-[75%] px-4 py-2.5 rounded-2xl ${
                  msg.isMe
                    ? "bg-brand-500 text-white rounded-br-md"
                    : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-100 dark:border-gray-700 rounded-bl-md"
                }`}
              >
                <p className="text-sm leading-relaxed">{msg.text}</p>
                <div
                  className={`flex items-center gap-1 mt-1 ${
                    msg.isMe ? "justify-start" : "justify-end"
                  }`}
                >
                  <span
                    className={`text-[10px] ${
                      msg.isMe ? "text-white/70" : "text-gray-400"
                    }`}
                  >
                    {msg.time}
                  </span>
                  {msg.isMe &&
                    (msg.read ? (
                      <CheckCheck className="w-3.5 h-3.5 text-white/70" />
                    ) : (
                      <Check className="w-3.5 h-3.5 text-white/70" />
                    ))}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Typing indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex justify-end"
              >
                <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 px-4 py-3 rounded-2xl rounded-bl-md">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="flex items-end gap-2">
            <button className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors flex-shrink-0">
              <Paperclip className="w-5 h-5 text-gray-400" />
            </button>
            <button className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors flex-shrink-0">
              <Image className="w-5 h-5 text-gray-400" />
            </button>
            <div className="flex-1 flex items-end bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-2">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="اكتب رسالة..."
                rows={1}
                className="flex-1 bg-transparent text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none resize-none max-h-24"
              />
              <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors mr-1">
                <Smile className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            {newMessage.trim() ? (
              <button
                onClick={handleSend}
                className="p-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl transition-colors flex-shrink-0"
              >
                <Send className="w-5 h-5" />
              </button>
            ) : (
              <button className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors flex-shrink-0">
                <Mic className="w-5 h-5 text-gray-400" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
