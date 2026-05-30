"use client";

import { FormEvent, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { WalletIcon } from "@/components/ui/icons";
import { formatCurrency } from "@/lib/utils";
import { useMerchantStore } from "@/store/merchant";
import type { WithdrawalStatus } from "@/types";

const commissionRate = 0.15;

const statusLabel: Record<WithdrawalStatus, string> = {
  pending: "รอดำเนินการ",
  approved: "อนุมัติแล้ว",
  rejected: "ไม่อนุมัติ",
};

export function MerchantWithdrawScreen() {
  const { orders, withdrawalRequests, createWithdrawalRequest } = useMerchantStore();
  const [amount, setAmount] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  const summary = useMemo(() => {
    const grossSales = orders.reduce((sum, order) => sum + order.totalPrice, 0);
    const commission = Math.round(grossSales * commissionRate);
    const pendingAmount = withdrawalRequests
      .filter((request) => request.status === "pending")
      .reduce((sum, request) => sum + request.amount, 0);
    const availableAmount = Math.max(grossSales - commission - pendingAmount, 0);

    return { grossSales, commission, pendingAmount, availableAmount };
  }, [orders, withdrawalRequests]);

  const requestedAmount = Number(amount);
  const canSubmit =
    requestedAmount > 0 &&
    requestedAmount <= summary.availableAmount &&
    bankName.trim() &&
    accountNumber.trim() &&
    accountName.trim();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!requestedAmount || requestedAmount <= 0) {
      setError("กรุณาระบุจำนวนเงินที่ต้องการถอน");
      return;
    }

    if (requestedAmount > summary.availableAmount) {
      setError("จำนวนเงินที่ขอถอนมากกว่ายอดที่ถอนได้");
      return;
    }

    if (!bankName.trim() || !accountNumber.trim() || !accountName.trim()) {
      setError("กรุณากรอกข้อมูลบัญชีให้ครบถ้วน");
      return;
    }

    createWithdrawalRequest({
      amount: requestedAmount,
      bankName: bankName.trim(),
      accountNumber: accountNumber.trim(),
      accountName: accountName.trim(),
      note: note.trim(),
    });

    setAmount("");
    setBankName("");
    setAccountNumber("");
    setAccountName("");
    setNote("");
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-3xl font-black">ถอนเงิน</h1>
        <p className="mt-1 text-sm text-[#5D5F5F]">สร้างคำขอถอนเงินเพื่อให้แอดมินตรวจสอบและดำเนินการตามรอบโอน</p>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "ยอดขายรวม", value: formatCurrency(summary.grossSales) },
          { label: "ค่าคอมมิชชั่น 15%", value: formatCurrency(summary.commission) },
          { label: "รอดำเนินการ", value: formatCurrency(summary.pendingAmount) },
          { label: "ยอดที่ถอนได้", value: formatCurrency(summary.availableAmount) },
        ].map((item, index) => (
          <Card key={item.label} variant={index === 3 ? "soft" : "default"} className="p-5">
            <WalletIcon className="h-5 w-5 text-[#A27000]" />
            <p className="mt-4 text-2xl font-black">{item.value}</p>
            <p className="mt-1 text-sm text-[#5D5F5F]">{item.label}</p>
          </Card>
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
        <Card className="p-5">
          <div>
            <h2 className="text-xl font-black">สร้างคำขอถอนเงิน</h2>
            <p className="mt-1 text-sm text-[#5D5F5F]">ข้อมูลบัญชีนี้จะถูกแนบไปกับคำขอให้แอดมินตรวจสอบ</p>
          </div>

          <form className="mt-5 grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
            <label className="space-y-2 text-sm md:col-span-2">
              <span className="font-semibold">จำนวนเงินที่ต้องการถอน</span>
              <Input
                type="number"
                min="1"
                max={summary.availableAmount}
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                placeholder="0"
              />
            </label>
            <label className="space-y-2 text-sm">
              <span className="font-semibold">ธนาคาร</span>
              <Input value={bankName} onChange={(event) => setBankName(event.target.value)} placeholder="เช่น กสิกรไทย" />
            </label>
            <label className="space-y-2 text-sm">
              <span className="font-semibold">เลขบัญชี</span>
              <Input value={accountNumber} onChange={(event) => setAccountNumber(event.target.value)} placeholder="000-0-00000-0" />
            </label>
            <label className="space-y-2 text-sm md:col-span-2">
              <span className="font-semibold">ชื่อบัญชี</span>
              <Input value={accountName} onChange={(event) => setAccountName(event.target.value)} placeholder="ชื่อบัญชีรับเงิน" />
            </label>
            <label className="space-y-2 text-sm md:col-span-2">
              <span className="font-semibold">หมายเหตุ</span>
              <textarea
                value={note}
                onChange={(event) => setNote(event.target.value)}
                className="min-h-24 w-full rounded-2xl border border-black/8 bg-white/88 px-4 py-3 text-sm shadow-[0_10px_20px_rgba(28,27,27,0.04)] outline-none transition placeholder:text-[#5D5F5F]/70 focus:border-[#E0B800] focus:bg-white focus:ring-4 focus:ring-[#FFD600]/20"
                placeholder="รายละเอียดเพิ่มเติมสำหรับแอดมิน"
              />
            </label>

            {error ? <p className="text-sm font-semibold text-red-600 md:col-span-2">{error}</p> : null}

            <div className="flex flex-wrap items-center gap-3 md:col-span-2">
              <Button type="submit" disabled={!canSubmit}>
                ส่งคำขอถอนเงิน
              </Button>
              <p className="text-sm text-[#5D5F5F]">ถอนได้สูงสุด {formatCurrency(summary.availableAmount)}</p>
            </div>
          </form>
        </Card>

        <Card variant="soft" className="p-5">
          <h2 className="text-xl font-black">หมายเหตุ</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-[#5D5F5F]">
            <li>การกดถอนเงินเป็นเพียงการแจ้งความประสงค์ ระบบจะไม่โอนเงินทันที</li>
            <li>ยอดเงินจะถูกคำนวณและโอนตามรอบที่กำหนด หลังหักค่าคอมมิชชั่นเรียบร้อย</li>
            <li>ระยะเวลาเงินเข้าขึ้นอยู่กับธนาคารปลายทาง</li>
          </ul>
        </Card>
      </section>

      <Card className="p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-black">ประวัติคำขอถอนเงิน</h2>
            <p className="mt-1 text-sm text-[#5D5F5F]">รายการล่าสุดที่ส่งให้แอดมินตรวจสอบ</p>
          </div>
        </div>
        <div className="mt-4 space-y-3">
          {withdrawalRequests.length ? (
            withdrawalRequests.map((request) => (
              <div key={request.id} className="grid gap-3 rounded-[1.35rem] bg-white/75 p-4 md:grid-cols-[1fr_auto] md:items-center">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-black">{request.id}</p>
                    <Badge variant="warning">{statusLabel[request.status]}</Badge>
                  </div>
                  <p className="mt-2 text-sm text-[#5D5F5F]">
                    {request.bankName} · {request.accountNumber} · {request.accountName}
                  </p>
                  {request.note ? <p className="mt-1 text-sm text-[#5D5F5F]">หมายเหตุ: {request.note}</p> : null}
                </div>
                <div className="text-left md:text-right">
                  <p className="text-lg font-black">{formatCurrency(request.amount)}</p>
                  <p className="text-xs text-[#5D5F5F]">{new Date(request.createdAt).toLocaleString("th-TH")}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-[1.35rem] bg-black/[0.03] p-5 text-sm text-[#5D5F5F]">
              ยังไม่มีคำขอถอนเงิน
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
