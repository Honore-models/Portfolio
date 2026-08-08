import Image from "next/image";

export default function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <span className={`relative inline-flex shrink-0 ${className}`}>
      <Image
        src="/honore_logo2.png"
        alt="Honore NH logo"
        fill
        className="object-contain"
        unoptimized
        priority
      />
    </span>
  );
}
