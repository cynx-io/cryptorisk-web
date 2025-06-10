import EthSearchBar from "@/components/EthSearchBar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative min-h-screen p-8 sm:p-20">
      <div className="grid place-items-center gap-8 relative z-10">
        <EthSearchBar />
      </div>
    </div>
  );
}
