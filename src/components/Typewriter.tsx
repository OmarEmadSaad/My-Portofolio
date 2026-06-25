"use client";

import { useEffect, useState } from "react";

type Props = { phrases: string[]; className?: string };

// Tiny dependency-free typewriter for the hero accent line. It cycles through
// the keyword role phrases. SSR renders the first phrase in full (so the text
// is crawlable and there is no hydration mismatch); the animation only begins
// after mount.
export default function Typewriter({ phrases, className }: Props) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(phrases[0] ?? "");
  const [deleting, setDeleting] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    setStarted(true);
    setText("");
  }, []);

  useEffect(() => {
    if (!started || phrases.length === 0) return;
    const current = phrases[index % phrases.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), 1400);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % phrases.length);
    } else {
      timeout = setTimeout(
        () =>
          setText((t) =>
            deleting ? current.slice(0, t.length - 1) : current.slice(0, t.length + 1),
          ),
        deleting ? 35 : 75,
      );
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, started, index, phrases]);

  return (
    <span className={className}>
      {/* All phrases kept in the DOM for crawlers, hidden visually. */}
      <span className="sr-only">{phrases.join(", ")}</span>
      <span aria-hidden="true">{text}</span>
      <span
        aria-hidden="true"
        className="inline-block w-[2px] h-[1em] bg-current align-middle ml-1 rtl:ml-0 rtl:mr-1 animate-pulse"
      />
    </span>
  );
}
