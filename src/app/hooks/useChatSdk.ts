import { useState, useEffect } from "react";

interface ChatSdkResult {
  text: string | null;
  loading: boolean;
  error: Error | null;
}

export function useChatSdk(prompt: string): ChatSdkResult {
  const [text, setText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!prompt) return;

    let cancelled = false;

    const fetchChat = async () => {
      try {
        setLoading(true);

        const res = await fetch("/api/chat_hugging", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt }),
        });

        let data = null;
        try {
          data = await res.json();
        } catch (jsonErr) {
          // Handle empty or invalid JSON
          if (!cancelled) setError(new Error("Invalid or empty JSON response from server."));
          return;
        }

        console.log("API Response:", data);
        if (!cancelled) {
          if (!res.ok) {
            setError(new Error(data?.error || "API error"));
            return;
          }
          const output = data.output?.[0]?.content?.[0]?.text ?? null;
          setText(output);
        }
      } catch (err) {
        if (!cancelled) setError(err as Error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchChat();

    return () => {
      cancelled = true;
    };
  }, [prompt]);

  return { text, loading, error };
}