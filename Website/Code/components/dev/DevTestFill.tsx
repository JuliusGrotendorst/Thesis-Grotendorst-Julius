"use client";

import { useState } from "react";
import { useFormStore } from "@/lib/store/formStore";
import { TEST_CASE_REGISTRY } from "@/lib/testCases/registry";

const SORTED = [...TEST_CASE_REGISTRY].sort((a, b) =>
  Number(a.id.replace(/\D/g, "")) - Number(b.id.replace(/\D/g, ""))
);

export default function DevTestFill() {
  const [selectedId, setSelectedId] = useState(SORTED[0]?.id ?? "");
  const [loading, setLoading] = useState(false);
  const loadTestCase = useFormStore((s) => s.loadTestCase);
  const reset = useFormStore((s) => s.reset);

  async function handleLoad() {
    if (!selectedId) return;
    setLoading(true);
    try {
      const res = await fetch(`/test-payloads/${selectedId}.json`);
      if (!res.ok) throw new Error(`${res.status}`);
      const data = await res.json();
      loadTestCase(data.state);
    } catch (err) {
      console.error("[DevTestFill]", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white border border-neutral-200 rounded-lg shadow-lg p-3 text-xs w-96">
      <div className="flex items-center gap-2 mb-2">
        <span className="font-semibold text-neutral-400 uppercase tracking-widest text-[10px]">
          DEV · Testfall laden
        </span>
      </div>

      <select
        value={selectedId}
        onChange={(e) => setSelectedId(e.target.value)}
        className="w-full border border-neutral-200 rounded px-2 py-1 text-xs mb-2"
      >
        {SORTED.map((tc) => (
          <option key={tc.id} value={tc.id}>
            {tc.id} · {tc.beschreibung.split(" – ")[0].split(" (")[0]}
          </option>
        ))}
      </select>

      <div className="flex gap-2">
        <button
          onClick={handleLoad}
          disabled={loading}
          className="flex-[2] bg-brand-accent text-white rounded px-3 py-1.5 font-medium text-xs disabled:opacity-50"
        >
          {loading ? "Laden …" : "Testfall laden"}
        </button>
        <button
          onClick={reset}
          className="flex-1 bg-neutral-100 text-neutral-700 rounded px-3 py-1.5 font-medium text-xs hover:bg-neutral-200"
        >
          Leeren
        </button>
      </div>
    </div>
  );
}
