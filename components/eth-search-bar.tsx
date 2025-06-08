"use client";

import { useEffect, useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ethSearch, EthSearchResp } from "@/lib/janus/crypto/search-eth";
import { debounce } from "lodash";
import Image from "next/image";

export default function EthSearchBar({
  onSelect,
}: {
  onSelect?: (coin: EthSearchResp["coins"][number]) => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<EthSearchResp["coins"]>([]);
  const [loading, setLoading] = useState(false);

  const fetchResults = useCallback(
    debounce(async (query: string) => {
      if (!query) return setResults([]);
      setLoading(true);
      try {
        const data = await ethSearch(query);
        setResults(data.coins);
      } catch (err) {
        console.error(err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300),
    [],
  );

  useEffect(() => {
    fetchResults(query);
  }, [query, fetchResults]);

  return (
    <Command className="w-full max-w-lg rounded-lg border shadow-md">
      <CommandInput
        value={query}
        onValueChange={setQuery}
        placeholder="Search for a coin..."
        className="text-sm"
      />
      <CommandList>
        {results.map((coin) => (
          <CommandItem
            key={coin.id}
            value={coin.name}
            onSelect={() => {
              if (onSelect) onSelect(coin);
              setQuery(coin.name);
              setResults([]);
            }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Image
              src={coin.thumb}
              alt={coin.name}
              width={24}
              height={24}
              className="rounded-full"
            />
            <div>
              <p className="text-sm font-medium">{coin.name}</p>
              <p className="text-xs text-muted-foreground">
                {coin.symbol.toUpperCase()}
              </p>
            </div>
          </CommandItem>
        ))}
        {!loading && results.length === 0 && query.length > 0 && (
          <CommandItem disabled>No coins found.</CommandItem>
        )}
      </CommandList>
    </Command>
  );
}
