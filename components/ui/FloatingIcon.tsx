import Image from "next/image";

type Position = "top-left" | "middle-right" | "bottom-left";

export default function FloatingIcon({
  className,
  style,
  imageSrc,
}: {
  className?: string;
  style?: React.CSSProperties;
    imageSrc: string;
}) {

  return (
    <div
      className={`absolute pointer-events-none ${className}`}
      style={style}
    >
      <div className="animate-float">
        <Image
          src={imageSrc}
          alt="Floating Bitcoin"
          width={200}
          height={200}
        />
      </div>
    </div>
  );
}
