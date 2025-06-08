"use client";

import { useState } from "react";
import EthSearchBar from "@/components/eth-search-bar";
import Image from "next/image";
import { EthSearchResp } from "@/lib/janus/crypto/search-eth";

export default function Home() {
  const [selected, setSelected] = useState<
    EthSearchResp["coins"][number] | null
  >(null);

  return (
    <div className="grid min-h-screen place-items-center p-8 sm:p-20 gap-8">
      <EthSearchBar onSelect={setSelected} />

      {selected && (
        <div className="flex flex-col items-center gap-4 mt-8">
          <Image
            src={selected.large}
            alt={selected.name}
            width={64}
            height={64}
            className="rounded-full"
          />
          <h2 className="text-xl font-bold">{selected.name}</h2>
          <p className="text-gray-500">{selected.symbol.toUpperCase()}</p>
        </div>
      )}
    </div>
  );
}
