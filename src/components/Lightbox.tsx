import { useEffect } from "react";

type Props = {
  src: string;
  alt?: string;
  onClose: () => void;
};

export function Lightbox({ src, alt, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      onContextMenu={(e) => e.preventDefault()}
      className="fixed inset-0 z-[100] bg-ink/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-200 cursor-zoom-out"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Stäng"
        className="absolute top-4 right-4 md:top-6 md:right-6 text-white/80 hover:text-white text-3xl font-light leading-none w-10 h-10 flex items-center justify-center"
      >
        ×
      </button>
      <img
        src={src}
        alt={alt ?? ""}
        draggable={false}
        onClick={(e) => e.stopPropagation()}
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
        className="max-w-full max-h-full object-contain select-none pointer-events-auto shadow-2xl"
        style={{ WebkitUserSelect: "none", userSelect: "none", WebkitTouchCallout: "none" }}
      />
    </div>
  );
}
