"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { ArrowRightIcon, MinusIcon, PlusIcon } from "@/components/ui/icons";

const MERCHANT_FAQS: { category: string; items: { q: string; a: string }[] }[] = [
  {
    category: "ออเดอร์ / การใช้งาน",
    items: [
      {
        q: "เมื่อลูกค้าสั่งซื้อแล้ว ร้านค้าต้องทำยังไงต่อ?",
        a: 'เมื่อมีคำสั่งซื้อเข้ามา ร้านค้าจะต้องอัปเดตสถานะตามลำดับ ได้แก่ "กำลังเตรียม" → "พร้อมแล้ว" → "รับเรียบร้อย" เพื่อให้ลูกค้าทราบสถานะสินค้า',
      },
      {
        q: "ถ้าลูกค้าไม่มารับสินค้าต้องทำยังไง?",
        a: "หากลูกค้าไม่มารับสินค้าภายในเวลาที่กำหนด จะถือว่าสละสิทธิ์ ร้านค้าไม่จำเป็นต้องคืนเงิน และสามารถจัดการสินค้าต่อได้ตามความเหมาะสม",
      },
      {
        q: "หากสินค้าไม่พอหรือหมด ต้องทำยังไง?",
        a: "กรุณาแจ้งทีมงานผ่านช่องทาง Support โดยเร็วที่สุด เพื่อให้ระบบดำเนินการแจ้งลูกค้าและพิจารณาคืนเงินตามขั้นตอน",
      },
    ],
  },
  {
    category: "การเงิน / การโอนเงิน",
    items: [
      {
        q: "ร้านค้าจะได้รับเงินเมื่อไหร่?",
        a: "ระบบจะโอนเงินตามรอบที่กำหนด (เช่น สัปดาห์ละ 2 ครั้ง) โดยยอดเงินจะถูกรวมและโอนหลังหักค่าคอมมิชชั่นเรียบร้อย",
      },
      {
        q: "กดถอนเงินแล้วได้เงินทันทีไหม?",
        a: "การกดถอนเงินเป็นการแจ้งความประสงค์ เงินจะถูกโอนตามรอบของระบบ ไม่ได้โอนทันทีหลังจากกดถอน",
      },
      {
        q: "ยอดเงินในระบบไม่ตรง ต้องทำยังไง?",
        a: "กรุณาตรวจสอบรายการคำสั่งซื้อในระบบก่อน หากยังพบความผิดปกติ กรุณาติดต่อทีมงานพร้อมรายละเอียด เพื่อให้ตรวจสอบเพิ่มเติม",
      },
    ],
  },
  {
    category: "ปัญหา / การร้องเรียน",
    items: [
      {
        q: "ลูกค้าร้องเรียนเรื่องสินค้า ร้านค้าต้องทำยังไง?",
        a: "ทีมงานจะเป็นผู้ตรวจสอบและประสานงาน โดยอาจมีการขอข้อมูลหรือหลักฐานเพิ่มเติมจากร้านค้า กรุณาให้ความร่วมมือเพื่อให้การดำเนินการเป็นไปอย่างรวดเร็ว",
      },
      {
        q: "ร้านค้าต้องคืนเงินให้ลูกค้าเองไหม?",
        a: "ไม่จำเป็น ระบบและทีมงานจะเป็นผู้พิจารณาและดำเนินการคืนเงินตามเงื่อนไขของแพลตฟอร์ม",
      },
    ],
  },
  {
    category: "ปัญหาระบบ",
    items: [
      {
        q: "หากพบปัญหาในแอป เช่น ระบบค้าง หรือกดไม่ได้ ต้องทำยังไง?",
        a: "กรุณาแจ้งปัญหาผ่าน LINE Official หรืออีเมล Support พร้อมรายละเอียด เพื่อให้ทีมพัฒนาตรวจสอบและแก้ไขโดยเร็ว",
      },
    ],
  },
];

export function MerchantFaqScreen() {
  const [open, setOpen] = useState<Set<string>>(new Set());

  function toggle(key: string) {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }

  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <Link
        href="/merchant/settings"
        className="inline-flex items-center gap-1 text-sm text-[#5D5F5F] transition hover:text-[#1C1B1B]"
      >
        <ArrowRightIcon size={16} className="rotate-180" />
        ตั้งค่าร้าน
      </Link>

      <div>
        <h1 className="text-3xl font-black">คำถามที่พบบ่อย</h1>
        <p className="mt-1 text-sm text-[#5D5F5F]">รวมคำถามและคำตอบสำหรับร้านค้า</p>
      </div>

      {MERCHANT_FAQS.map((group, ci) => (
        <div key={ci} className="space-y-2">
          <h2 className="px-1 text-sm font-bold text-[#A27000]">{group.category}</h2>
          <Card className="divide-y divide-black/[0.06] overflow-hidden p-0">
            {group.items.map((faq, ii) => {
              const key = `${ci}-${ii}`;
              return (
                <div key={key}>
                  <button
                    onClick={() => toggle(key)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left"
                  >
                    <span className="font-semibold">{faq.q}</span>
                    {open.has(key) ? (
                      <MinusIcon size={18} className="shrink-0 text-[#A27000]" />
                    ) : (
                      <PlusIcon size={18} className="shrink-0 text-[#5D5F5F]" />
                    )}
                  </button>
                  {open.has(key) && (
                    <div className="px-5 pb-5 text-sm leading-7 text-[#5D5F5F]">{faq.a}</div>
                  )}
                </div>
              );
            })}
          </Card>
        </div>
      ))}
    </div>
  );
}
