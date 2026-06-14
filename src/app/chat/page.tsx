"use client";

import { useState, useEffect, type ReactNode } from "react";
import { useChat } from "@ai-sdk/react";
import { Copy, Check, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";
import { UserProfile } from "@/components/auth/user-profile";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth-client";
import type { Components } from "react-markdown";

const H1: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = (props) => (
  <h1 className="mt-2 mb-3 text-2xl font-bold" {...props} />
);
const H2: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = (props) => (
  <h2 className="mt-2 mb-2 text-xl font-semibold" {...props} />
);
const H3: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = (props) => (
  <h3 className="mt-2 mb-2 text-lg font-semibold" {...props} />
);
const Paragraph: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = (
  props
) => <p className="mb-3 leading-7 text-sm" {...props} />;
const UL: React.FC<React.HTMLAttributes<HTMLUListElement>> = (props) => (
  <ul className="mb-3 ml-5 list-disc space-y-1 text-sm" {...props} />
);
const OL: React.FC<React.OlHTMLAttributes<HTMLOListElement>> = (props) => (
  <ol className="mb-3 ml-5 list-decimal space-y-1 text-sm" {...props} />
);
const LI: React.FC<React.LiHTMLAttributes<HTMLLIElement>> = (props) => (
  <li className="leading-6" {...props} />
);
const Anchor: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement>> = (
  props
) => (
  <a
    className="underline underline-offset-2 text-primary hover:opacity-90"
    target="_blank"
    rel="noreferrer noopener"
    {...props}
  />
);
const Blockquote: React.FC<React.BlockquoteHTMLAttributes<HTMLElement>> = (
  props
) => (
  <blockquote
    className="mb-3 border-l-2 border-white/[0.08] pl-3 text-white/50"
    {...props}
  />
);
const Code: Components["code"] = ({ children, className, ...props }) => {
  const match = /language-(\w+)/.exec(className || "");
  const isInline = !match;

  if (isInline) {
    return (
      <code className="rounded bg-white/[0.04] px-1 py-0.5 text-xs" {...props}>
        {children}
      </code>
    );
  }
  return (
    <pre className="mb-3 w-full overflow-x-auto rounded-md bg-white/[0.04] p-3">
      <code className="text-xs leading-5" {...props}>
        {children}
      </code>
    </pre>
  );
};
const HR: React.FC<React.HTMLAttributes<HTMLHRElement>> = (props) => (
  <hr className="my-4 border-white/[0.08]" {...props} />
);
const Table: React.FC<React.TableHTMLAttributes<HTMLTableElement>> = (
  props
) => (
  <div className="mb-3 overflow-x-auto">
    <table className="w-full border-collapse text-sm" {...props} />
  </div>
);
const TH: React.FC<React.ThHTMLAttributes<HTMLTableCellElement>> = (props) => (
  <th
    className="border border-white/[0.08] bg-white/[0.04] px-2 py-1 text-left"
    {...props}
  />
);
const TD: React.FC<React.TdHTMLAttributes<HTMLTableCellElement>> = (props) => (
  <td className="border border-white/[0.08] px-2 py-1" {...props} />
);

const markdownComponents: Components = {
  h1: H1,
  h2: H2,
  h3: H3,
  p: Paragraph,
  ul: UL,
  ol: OL,
  li: LI,
  a: Anchor,
  blockquote: Blockquote,
  code: Code,
  hr: HR,
  table: Table,
  th: TH,
  td: TD,
};

type TextPart = { type?: string; text?: string };
type MaybePartsMessage = {
  display?: ReactNode;
  parts?: TextPart[];
  content?: TextPart[];
};

function getMessageText(message: MaybePartsMessage): string {
  const parts = Array.isArray(message.parts)
    ? message.parts
    : Array.isArray(message.content)
    ? message.content
    : [];
  return parts
    .filter((p) => p?.type === "text" && p.text)
    .map((p) => p.text)
    .join("\n");
}

function renderMessageContent(message: MaybePartsMessage): ReactNode {
  if (message.display) return message.display;
  const parts = Array.isArray(message.parts)
    ? message.parts
    : Array.isArray(message.content)
    ? message.content
    : [];
  return parts.map((p, idx) =>
    p?.type === "text" && p.text ? (
      <ReactMarkdown key={idx} components={markdownComponents}>
        {p.text}
      </ReactMarkdown>
    ) : null
  );
}

function formatTimestamp(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("הועתק ללוח");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("ההעתקה נכשלה");
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="p-1 hover:bg-white/[0.06] rounded transition-colors"
      title="העתק ללוח"
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 text-green-500" />
      ) : (
        <Copy className="h-3.5 w-3.5 text-white/50" />
      )}
    </button>
  );
}

function ThinkingIndicator() {
  return (
    <div className="flex items-center gap-2 p-3 rounded-lg bg-white/[0.04] max-w-[80%]">
      <Loader2 className="h-4 w-4 animate-spin" />
      <span className="text-sm text-white/50">AI חושב...</span>
    </div>
  );
}

const STORAGE_KEY = "chat-messages";

export default function ChatPage() {
  const { data: session, isPending } = useSession();
  const { messages, sendMessage, status, error, setMessages } = useChat({
    onError: (err) => {
      toast.error(err.message || "שליחת ההודעה נכשלה");
    },
  });
  const [input, setInput] = useState("");

  // Load messages from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setMessages(parsed);
          }
        } catch {
          // Invalid JSON, ignore
        }
      }
    }
  }, [setMessages]);

  // Save messages to localStorage when they change
  useEffect(() => {
    if (typeof window !== "undefined" && messages.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  const clearMessages = () => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
    toast.success("הצ'אט נוקה");
  };

  if (isPending) {
    return <div className="container mx-auto px-4 py-12">טוען...</div>;
  }

  if (!session) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <UserProfile />
        </div>
      </div>
    );
  }

  const isStreaming = status === "streaming";

  return (
    <div className="relative overflow-hidden container mx-auto px-4 py-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.08),transparent_60%)]" />
      <div className="relative max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/[0.08] backdrop-blur-md bg-white/[0.02] rounded-xl px-4 py-3">
          <h1 className="text-2xl font-bold font-display">צ&apos;אט AI</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-white/50">
              שלום, {session.user.name}!
            </span>
            {messages.length > 0 && (
              <Button variant="ghost" size="sm" onClick={clearMessages}>
                נקה צ&apos;אט
              </Button>
            )}
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-sm text-red-400">
              Error: {error.message || "משהו השתבש"}
            </p>
          </div>
        )}

        <div className="min-h-[60vh] overflow-y-auto space-y-4 mb-4">
          {messages.length === 0 && (
            <div className="text-center text-white/50 py-12">
              התחל שיחה עם AI
            </div>
          )}
          {messages.map((message) => {
            const messageText = getMessageText(message as MaybePartsMessage);
            const createdAt = (message as { createdAt?: Date }).createdAt;
            const timestamp = createdAt
              ? formatTimestamp(new Date(createdAt))
              : null;

            return (
              <div
                key={message.id}
                className={`group p-3 rounded-lg ${
                  message.role === "user"
                    ? "bg-blue-600 text-white ml-auto max-w-[80%]"
                    : "bg-white/[0.04] max-w-[80%]"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">
                      {message.role === "user" ? "אתה" : "AI"}
                    </span>
                    {timestamp && (
                      <span className="text-xs opacity-60">{timestamp}</span>
                    )}
                  </div>
                  {message.role === "assistant" && messageText && (
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <CopyButton text={messageText} />
                    </div>
                  )}
                </div>
                <div>{renderMessageContent(message as MaybePartsMessage)}</div>
              </div>
            );
          })}
          {isStreaming && messages[messages.length - 1]?.role === "user" && (
            <ThinkingIndicator />
          )}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const text = input.trim();
            if (!text) return;
            sendMessage({ role: "user", parts: [{ type: "text", text }] });
            setInput("");
          }}
          className="flex gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="כתוב הודעה..."
            className="flex-1 p-2 border border-white/[0.08] rounded-md bg-white/[0.04] text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50"
            disabled={isStreaming}
          />
          <Button type="submit" disabled={!input.trim() || isStreaming} className="bg-gradient-to-r from-blue-600 to-blue-500 text-white">
            {isStreaming ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                שולח...
              </>
            ) : (
              "שלח"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
