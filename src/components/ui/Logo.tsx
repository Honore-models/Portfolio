import Image from "next/image";

export default function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <span
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ filter: "brightness(1.4) drop-shadow(0 0 6px rgba(34,211,238,0.5))" }}
    >
      <Image
        src="/logo.png"
        alt="Honore NH logo"
        fill
        className="object-contain object-left-top"
        unoptimized
        priority
      />
    </span>
  );
}
