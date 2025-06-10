"use client";

import { useEffect, useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ethSearch, EthSearchResp } from "@/lib/janus/crypto/ethSearch";
import { debounce } from "lodash";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function EthSearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<EthSearchResp["coins"]>([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onSelect = (coinId: string) => {
    console.debug("Selected coin ID:", coinId);
    router.push(`/risk/${coinId}`);
    return;
  };

  useEffect(() => {
    const handler = debounce(async (query: string) => {
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
    }, 300);

    handler(query);

    return () => handler.cancel(); // cancel debounce on unmount or query change
  }, [query]);

  return (
    <Command className="w-full p-3 rounded-2xl border shadow-xl">
      <CommandInput
        value={query}
        onValueChange={setQuery}
        placeholder="Search for a coin..."
        className="text-sm"
      />

      {loading && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        </div>
      )}
      <CommandList>
        {loading ? (
          <div className="py-6 text-center">
            <Loader2 className="mx-auto h-6 w-6 animate-spin text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">
              Searching coins...
            </p>
          </div>
        ) : (
          <>
            {results.map((coin) => (
              <CommandItem
                key={coin.id}
                value={coin.name}
                onSelect={() => {
                  onSelect(coin.id);
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
          </>
        )}
        {!loading && results.length === 0 && query.length > 0 && (
          <CommandItem disabled>No coins found</CommandItem>
        )}
      </CommandList>
    </Command>
  );
}
