import { ArrowRight } from "lucide-react";
import { useRef, useState } from "react";

const EmailInput = () => {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (input.trim()) {
          window.location.href = `mailto:nileshkamble54321@gmail.com?subject=Hello&body=${encodeURIComponent(
            input.trim()
          )}`;
          setInput("");
        }
      }}
      className="relative w-full max-w-lg"
    >
      <div className="mx-auto flex items-center rounded-full border border-neutral-200 bg-white/30 py-2.5 pr-2 pl-6 backdrop-blur-lg transition-all hover:border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-neutral-600">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Email"
          className="w-full border-none bg-transparent text-base text-neutral-800 placeholder:text-neutral-500 focus:outline-none dark:text-neutral-200 dark:placeholder:text-neutral-500"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          aria-label="Submit Query"
          className="flex items-center justify-center rounded-full bg-[#0171E3] p-2.5 text-white transition-colors hover:bg-blue-600 disabled:opacity-70 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
};

export default EmailInput;