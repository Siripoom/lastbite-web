"use client";

import { useState } from "react";
import { seedFirestore } from "@/lib/seed";
import { Button } from "@/components/ui/button";

export default function SeedPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSeed() {
    setStatus("loading");
    try {
      await seedFirestore();
      setStatus("done");
    } catch (e) {
      setErrorMsg(String(e));
      setStatus("error");
    }
  }

  return (
    <div className="grid min-h-screen place-items-center p-8">
      <div className="space-y-4 text-center">
        <h1 className="text-2xl font-bold">Seed Firestore</h1>
        <p className="text-sm text-[#5D5F5F]">ใช้เฉพาะ development เท่านั้น — safe to re-run (idempotent)</p>
        <Button onClick={handleSeed} disabled={status === "loading"}>
          {status === "loading" ? "กำลัง seed..." : "Seed Firestore"}
        </Button>
        {status === "done" && <p className="font-semibold text-green-600">✓ Seed สำเร็จแล้ว!</p>}
        {status === "error" && <p className="text-sm text-red-600">{errorMsg}</p>}
      </div>
    </div>
  );
}
