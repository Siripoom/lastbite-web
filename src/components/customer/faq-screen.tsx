"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { ArrowRightIcon, MinusIcon, PlusIcon } from "@/components/ui/icons";

const CUSTOMER_FAQS: { q: string; a: string }[] = [
  {
    q: "ต้องจ่ายเงินก่อนหรือไม่?",
    a: "ลูกค้าจะต้องชำระเงินผ่านแอปก่อนทำการรับสินค้า เพื่อยืนยันคำสั่งซื้อและสิทธิ์ในการรับสินค้า",
  },
  {
    q: "สินค้าเป็นของใกล้หมดอายุใช่ไหม?",
    a: 'สินค้าในแอบป์เป็นอาหารคุณภาพดีที่อยู่ในช่วงใกล้เวลาจำหน่ายหรือใกล้หมดอายุ ซึ่งยังสามารถบริโภคได้ตามปกติ โดยร้านค้าจะระบุ "ควรบริโภคก่อน" ไว้อย่างชัดเจน',
  },
  {
    q: "สามารถเลือกเมนูได้ไหม?",
    a: "บางรายการอาจเป็นแบบสุ่ม (Surprise Bag) ซึ่งลูกค้าไม่สามารถเลือกเมนูได้ล่วงหน้า แต่จะได้รับสินค้าในมูลค่าที่คุ้มค่า",
  },
  {
    q: "ต้องไปรับภายในกี่โมง?",
    a: "ลูกค้าจะต้องเข้ารับสินค้าภายในช่วงเวลาที่ร้านค้ากำหนด หากเกินเวลาที่กำหนด ระบบจะถือว่าสละสิทธิ์โดยไม่สามารถคืนเงินได้",
  },
  {
    q: "ถ้าไปรับไม่ทันจะทำยังไง?",
    a: "ขออภัย ระบบไม่สามารถคืนเงินได้ ในกรณีที่ลูกค้าไม่มารับสินค้าภายในเวลาที่กำหนด กรุณาตรวจสอบเวลาให้เรียบร้อยก่อนสั่งซื้อ",
  },
  {
    q: "ขอคืนเงินได้ในกรณีไหน?",
    a: "ลูกค้าสามารถขอคืนเงินได้ในกรณี: ร้านค้าไม่สามารถจัดเตรียมสินค้าได้, ได้รับสินค้าไม่ครบ หรือมีปัญหาขัดเจน โดยต้องแจ้งปัญหาพร้อมหลักฐานภายในเวลาที่กำหนด",
  },
  {
    q: "ได้ของไม่ตรงหรือมีปัญหาต้องทำยังไง?",
    a: "กรุณาถ่ายภาพสินค้าและแจ้งรายละเอียดผ่าน LINE Official หรืออีเมล Support ของเรา เพื่อให้ทีมงานตรวจสอบและดำเนินการโดยเร็ว",
  },
  {
    q: "ติดต่อทีมงานได้ทางไหน?",
    a: "สามารถติดต่อทีมงานได้ผ่าน: LINE Official, Email: support.lastbite@gmail.com ทีมงานจะตอบกลับภายในเวลาทำการ",
  },
  {
    q: "หากพบปัญหาการใช้งานแอปต้องทำยังไง?",
    a: "หากพบปัญหาด้านระบบ เช่น แอปค้าง ชำระเงินไม่สำเร็จ หรือข้อมูลไม่แสดงผล กรุณาแจ้งปัญหาผ่านช่องทาง Support พร้อมรายละเอียด เพื่อให้ทีมพัฒนาระบบตรวจสอบและแก้ไข",
  },
];

export function CustomerFaqScreen() {
  const [open, setOpen] = useState<Set<number>>(new Set());

  function toggle(index: number) {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <Link
        href="/app/settings"
        className="inline-flex items-center gap-1 text-sm text-[#5D5F5F] transition hover:text-[#1C1B1B]"
      >
        <ArrowRightIcon size={16} className="rotate-180" />
        ตั้งค่า
      </Link>

      <div>
        <h1 className="text-3xl font-extrabold">คำถามที่พบบ่อย</h1>
        <p className="mt-1 text-sm text-[#5D5F5F]">รวมคำถามและคำตอบสำหรับลูกค้า</p>
      </div>

      <Card className="divide-y divide-black/[0.06] overflow-hidden p-0">
        {CUSTOMER_FAQS.map((faq, index) => (
          <div key={index}>
            <button
              onClick={() => toggle(index)}
              className="flex w-full items-center justify-between gap-4 p-5 text-left"
            >
              <span className="font-semibold">{faq.q}</span>
              {open.has(index) ? (
                <MinusIcon size={18} className="shrink-0 text-[#A27000]" />
              ) : (
                <PlusIcon size={18} className="shrink-0 text-[#5D5F5F]" />
              )}
            </button>
            {open.has(index) && (
              <div className="px-5 pb-5 text-sm leading-7 text-[#5D5F5F]">{faq.a}</div>
            )}
          </div>
        ))}
      </Card>
    </div>
  );
}
