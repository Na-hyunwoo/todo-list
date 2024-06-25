import { DependencyList, useEffect } from "react";

type UseShortcutKeyProps = {
  deps: DependencyList;
  slashCallback?: () => void;
  enterCallback?: () => void;
  escapeCallback?: () => void;
};

function useShortcutKey({
  deps,
  slashCallback,
  enterCallback,
  escapeCallback,
}: UseShortcutKeyProps) {
  return useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && slashCallback) {
        e.preventDefault();
        slashCallback();
      }

      if (e.key === "Enter" && enterCallback) {
        e.preventDefault();
        enterCallback();
      }

      if (e.key === "Escape" && escapeCallback) {
        e.preventDefault();
        escapeCallback();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [...deps]);
}

export default useShortcutKey;
