import { Message } from "./ChatContainer";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { User, Bot } from "lucide-react";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.sender === "user";

  return (
    <motion.div
      className={cn(
        "flex items-start gap-2 sm:gap-3",
        isUser ? "justify-end" : "justify-start"
      )}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      {/* Avatar */}
      {!isUser && (
        <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary/10 flex items-center justify-center">
          <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
        </div>
      )}

      {/* Message Bubble */}
      <div
        className={cn(
          "flex flex-col max-w-[85%] sm:max-w-[80%] md:max-w-[70%]",
          isUser ? "items-end" : "items-start"
        )}
      >
        <div
          className={cn(
            "rounded-xl sm:rounded-2xl px-3 py-2 sm:px-4 sm:py-3 shadow-sm",
            isUser
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-foreground"
          )}
        >
          <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
        </div>
        
        {/* Timestamp */}
        <span className="text-xs text-muted-foreground mt-1 px-1">
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>

      {/* Avatar for user messages */}
      {isUser && (
        <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-muted flex items-center justify-center">
          <User className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
        </div>
      )}
    </motion.div>
  );
} 