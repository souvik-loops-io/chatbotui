
'use client'
import { useState, useRef, useEffect } from "react";

import { OpenRouter } from '@openrouter/sdk';

const openRouter = new OpenRouter({
  apiKey: '',
});



const CONTACTS = [
  { id: 1, name: "Alice Chen", role: "Design Lead", initials: "AC", color: "#E6F1FB", textColor: "#0C447C", lastMsg: "Sounds great, let's do it!", time: "2m", unread: 2 },
  { id: 2, name: "Marcus Webb", role: "Engineering", initials: "MW", color: "#E1F5EE", textColor: "#085041", lastMsg: "Can you review the PR?", time: "14m", unread: 0 },
  { id: 3, name: "Sofia Park", role: "Product", initials: "SP", color: "#FBEAF0", textColor: "#72243E", lastMsg: "Meeting moved to 3pm", time: "1h", unread: 1 },
  { id: 4, name: "Dev Team", role: "Group · 6 members", initials: "DT", color: "#FAEEDA", textColor: "#633806", lastMsg: "James: Deploy looks good", time: "3h", unread: 0 },
  { id: 5, name: "Raj Patel", role: "Marketing", initials: "RP", color: "#EEEDFE", textColor: "#3C3489", lastMsg: "Thanks for the update!", time: "1d", unread: 0 },
];

const INITIAL_MESSAGES = [
  { id: 1, from: "them", text: "Hey! Did you get a chance to look at the new mockups I sent over?", time: "10:22 AM" },
  { id: 2, from: "me", text: "Just opened them — they look fantastic. The color palette is really on point.", time: "10:24 AM" },
  { id: 3, from: "them", text: "Thanks! I was going back and forth on whether to go more muted but I think the current direction feels fresher.", time: "10:25 AM" },
  { id: 4, from: "me", text: "Agreed. The spacing on the card components is also much better. One small thing — the icon on the nav bar feels a bit large on mobile.", time: "10:27 AM" },
  { id: 5, from: "them", text: "Good catch, I'll fix that. Should have an updated version by EOD.", time: "10:28 AM" },
  { id: 6, from: "them", text: "Sounds great, let's do it!", time: "10:29 AM" },
];

function Avatar({ initials, color, textColor, size = 36 }: { initials: string, color: string, textColor: string, size?: number }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: color, color: textColor,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontWeight: 500, fontSize: size * 0.35, flexShrink: 0,
      border: "0.5px solid rgba(0,0,0,0.06)"
    }}>{initials}</div>
  );
}

export default function ChatApp() {
  const [active, setActive] = useState(CONTACTS[0]);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const endRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const fetchDta = async () => {
      const completion = await openRouter.chat.send({
        chatGenerationParams: {
          model: "nvidia/nemotron-3-super-120b-a12b:free",
          stream: false,
          messages: [
            {
              role: "user",
              content: "What is the meaning of life?",
            },
          ],
        },
      });
      console.log('Console LOG',completion.choices[0].message.content);
    };
    fetchDta();
  }, []);


  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = () => {
    const txt = input.trim();
    if (!txt) return;
    setMessages(m => [...m, { id: Date.now(), from: "me", text: txt, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);
    setInput("");
    setTimeout(() => {
      setMessages(m => [...m, { id: Date.now() + 1, from: "them", text: "Got it! I'll follow up shortly.", time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);
    }, 900);
  };

  const filtered = CONTACTS.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ display: "flex", height: "580px", background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-lg)", overflow: "hidden", fontFamily: "var(--font-sans)" }}>

      {/* Sidebar */}
      <div style={{ width: 260, borderRight: "0.5px solid var(--color-border-tertiary)", display: "flex", flexDirection: "column", background: "var(--color-background-secondary)", flexShrink: 0 }}>
        <div style={{ padding: "16px 14px 12px", borderBottom: "0.5px solid var(--color-border-tertiary)" }}>
          <p style={{ margin: "0 0 10px", fontWeight: 500, fontSize: 15, color: "var(--color-text-primary)" }}>Messages</p>
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search..."
            style={{ width: "100%", boxSizing: "border-box", fontSize: 13, padding: "7px 10px", borderRadius: "var(--border-radius-md)", border: "0.5px solid var(--color-border-secondary)", background: "var(--color-background-primary)", color: "var(--color-text-primary)", outline: "none" }}
          />
        </div>
        <div style={{ flex: 1, overflowY: "auto" }}>
          {filtered.map(c => (
            <div key={c.id} onClick={() => setActive(c)} style={{
              display: "flex", alignItems: "center", gap: 10, padding: "10px 14px",
              cursor: "pointer", borderBottom: "0.5px solid var(--color-border-tertiary)",
              background: active.id === c.id ? "var(--color-background-primary)" : "transparent",
              transition: "background 0.1s"
            }}>
              <div style={{ position: "relative" }}>
                <Avatar initials={c.initials} color={c.color} textColor={c.textColor} size={38} />
                {c.unread > 0 && <div style={{ position: "absolute", top: -2, right: -2, width: 16, height: 16, borderRadius: "50%", background: "#378ADD", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#fff", fontWeight: 500 }}>{c.unread}</div>}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-primary)" }}>{c.name}</span>
                  <span style={{ fontSize: 11, color: "var(--color-text-tertiary)" }}>{c.time}</span>
                </div>
                <p style={{ margin: 0, fontSize: 12, color: "var(--color-text-secondary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.lastMsg}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Header */}
        <div style={{ padding: "12px 18px", borderBottom: "0.5px solid var(--color-border-tertiary)", display: "flex", alignItems: "center", gap: 12, background: "var(--color-background-primary)" }}>
          <Avatar initials={active.initials} color={active.color} textColor={active.textColor} size={36} />
          <div>
            <p style={{ margin: 0, fontWeight: 500, fontSize: 14, color: "var(--color-text-primary)" }}>{active.name}</p>
            <p style={{ margin: 0, fontSize: 12, color: "var(--color-text-secondary)" }}>{active.role}</p>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
            {["video", "phone", "more"].map(icon => (
              <button key={icon} style={{ border: "0.5px solid var(--color-border-secondary)", background: "transparent", borderRadius: "var(--border-radius-md)", padding: "6px 10px", cursor: "pointer", fontSize: 13, color: "var(--color-text-secondary)" }}>
                {icon === "video" ? "⬛" : icon === "phone" ? "⬛" : "•••"}
              </button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: "auto", padding: "18px 18px 8px", display: "flex", flexDirection: "column", gap: 4 }}>
          {messages.map((msg, i) => {
            const isMe = msg.from === "me";
            const showAvatar = !isMe && (i === 0 || messages[i - 1].from === "me");
            return (
              <div key={msg.id} style={{ display: "flex", flexDirection: isMe ? "row-reverse" : "row", alignItems: "flex-end", gap: 8, marginBottom: 2 }}>
                {!isMe && (
                  <div style={{ width: 28, flexShrink: 0 }}>
                    {showAvatar && <Avatar initials={active.initials} color={active.color} textColor={active.textColor} size={28} />}
                  </div>
                )}
                <div style={{ maxWidth: "68%" }}>
                  <div style={{
                    padding: "9px 13px", borderRadius: 14,
                    borderBottomRightRadius: isMe ? 4 : 14,
                    borderBottomLeftRadius: isMe ? 14 : 4,
                    background: isMe ? "#378ADD" : "var(--color-background-secondary)",
                    color: isMe ? "#fff" : "var(--color-text-primary)",
                    fontSize: 14, lineHeight: 1.5,
                    border: isMe ? "none" : "0.5px solid var(--color-border-tertiary)"
                  }}>{msg.text}</div>
                  <p style={{ margin: "3px 4px 0", fontSize: 11, color: "var(--color-text-tertiary)", textAlign: isMe ? "right" : "left" }}>{msg.time}</p>
                </div>
              </div>
            );
          })}
          <div ref={endRef} />
        </div>

        {/* Input */}
        <div style={{ padding: "12px 14px", borderTop: "0.5px solid var(--color-border-tertiary)", display: "flex", gap: 8, background: "var(--color-background-primary)", alignItems: "center" }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && send()}
            placeholder={`Message ${active.name}...`}
            style={{ flex: 1, fontSize: 14, padding: "9px 13px", borderRadius: 20, border: "0.5px solid var(--color-border-secondary)", background: "var(--color-background-secondary)", color: "var(--color-text-primary)", outline: "none" }}
          />
          <button onClick={send} style={{
            width: 36, height: 36, borderRadius: "50%", border: "none",
            background: input.trim() ? "#378ADD" : "var(--color-background-secondary)",
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background 0.15s", flexShrink: 0
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 8L14 2L10 8L14 14L2 8Z" fill={input.trim() ? "#fff" : "var(--color-text-tertiary)"} />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}