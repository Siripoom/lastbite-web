import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRightIcon,
  Clock3Icon,
  DownloadIcon,
  LeafIcon,
  MapPinIcon,
  PlayIcon,
  SparklesIcon,
  StoreIcon,
  WalletIcon,
} from "@/components/ui/icons";

const featureCards = [
  {
    title: "ประหยัดเงิน",
    description: "ซื้ออาหารคุณภาพดีในราคาส่วนลดสูงสุด 70% อิ่มอร่อยได้ในราคาสบายกระเป๋า",
    icon: WalletIcon,
    accent: "bg-[#FFF1B8] text-[#8C5F06]",
  },
  {
    title: "รักษ์โลก",
    description: "ช่วยลดปริมาณขยะอาหารจากร้านโปรดของคุณ ทุกคำที่กินช่วยโลกให้ดีขึ้นได้",
    icon: LeafIcon,
    accent: "bg-[#DFFFF5] text-[#0D6B52]",
  },
  {
    title: "รวดเร็ว",
    description: "ค้นหาและจองดีลได้ง่ายในไม่กี่วินาที ระบบแจ้งเตือนดีลเด็ดรอบตัวคุณทันที",
    icon: Clock3Icon,
    accent: "bg-[#E5F7FF] text-[#0A6280]",
  },
];

export default function LandingPage() {
  return (
    <div className="page-shell min-h-screen text-[#1C1B1B]">
      <header className="page-layer sticky top-0 z-50 px-4 pt-3 lg:px-8">
        <div className="soft-panel mx-auto flex h-20 max-w-7xl items-center justify-between rounded-[1.6rem] px-5 lg:px-7">
          <Link href="/" className="flex items-center">
            <img src="/lastbite-logo.png" alt="LastBite" className="h-12 w-auto" />
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-semibold text-[#5D5F5F] md:flex">
            <a className="transition-colors hover:text-[#705D00]" href="#features">Features</a>
            <a className="transition-colors hover:text-[#705D00]" href="#how-it-works">How it Works</a>
            <a className="transition-colors hover:text-[#705D00]" href="#download">Download</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline">
              <Link href="/merchant">สำหรับร้านค้า</Link>
            </Button>
            <Button asChild>
              <Link href="/app"><DownloadIcon className="h-4 w-4" />เปิด PWA</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="page-layer">
        <section className="px-6 pb-20 pt-12 lg:px-8 lg:pb-28 lg:pt-16">
          <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(440px,0.9fr)]">
            <div className="max-w-2xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#E7DDBD] bg-white/85 px-4 py-2 text-sm font-semibold text-[#705D00] shadow-[0_10px_24px_rgba(160,112,0,0.06)]">
                <SparklesIcon className="h-4 w-4" />
                <span>ช่วยโลก ลดขยะอาหาร และได้ดีลอร่อยทุกวัน</span>
              </div>
              <h1 className="font-display text-5xl font-black leading-none text-[#1C1B1B] sm:text-6xl lg:text-7xl">
                อร่อยคำสุดท้าย
                <span className="mt-3 block w-fit rounded-[1.4rem] bg-[#1C1B1B] px-5 py-3 text-[#FFD600] shadow-[0_18px_34px_rgba(28,27,27,0.16)]">
                  ในราคาสุดพิเศษ
                </span>
              </h1>
              <p className="mt-8 max-w-xl text-lg leading-8 text-[#5D5F5F]">
                ค้นหาดีลอาหารรอบตัวคุณจากร้านดัง คาเฟ่โปรด และเบเกอรี่ใกล้บ้านในแอปเดียว
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button asChild size="lg">
                  <Link href="/app"><DownloadIcon className="h-5 w-5" />เข้าใช้งานเลย</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/login">เข้าสู่ระบบ <ArrowRightIcon className="h-5 w-5" /></Link>
                </Button>
                <Button asChild variant="dark" size="lg">
                  <Link href="/merchant">เข้าหน้าร้านค้า</Link>
                </Button>
              </div>
              <div className="mt-12 flex flex-wrap items-center gap-3 text-sm text-[#5D5F5F]">
                <span className="flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 shadow-[0_8px_18px_rgba(28,27,27,0.04)]"><StoreIcon className="h-4 w-4 text-[#705D00]" />พาร์ทเนอร์กว่า 500 ร้าน</span>
                <span className="flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 shadow-[0_8px_18px_rgba(28,27,27,0.04)]"><MapPinIcon className="h-4 w-4 text-[#705D00]" />ค้นหาดีลใกล้ตัวได้ทันที</span>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -bottom-6 left-6 right-6 top-10 rounded-[2rem] bg-[#1C1B1B] opacity-10 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2.1rem] border border-white/65 bg-white/86 p-3 shadow-[0_34px_90px_rgba(28,27,27,0.14)] backdrop-blur">
                <img
                  src="https://picsum.photos/seed/lastbite-hero/900/1100"
                  alt="LastBite app preview with food deals"
                  className="h-full w-full rounded-[1.5rem] object-cover"
                />
                <div className="absolute inset-x-6 bottom-6 rounded-[1.4rem] bg-white/84 p-4 shadow-[0_20px_40px_rgba(28,27,27,0.08)] backdrop-blur">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#A27000]">Today Picks</p>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <div>
                      <p className="font-bold">Lucky Bag เบเกอรี่รวม</p>
                      <p className="text-sm text-[#5D5F5F]">รับ 18:00 - 19:30</p>
                    </div>
                    <span className="rounded-full bg-[#FFF4C8] px-3 py-1 text-sm font-bold text-[#6A5000]">-60%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="bg-[#F6F3F2] px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase text-[#A27000]">Why LastBite</p>
              <h2 className="font-display mt-4 text-4xl font-extrabold text-[#1C1B1B] sm:text-5xl">ทำไมต้อง LastBite?</h2>
            </div>
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {featureCards.map((feature) => (
                <article key={feature.title} className="rounded-[1.8rem] border border-black/6 bg-white/88 p-8 shadow-[0_18px_40px_rgba(28,27,27,0.06)] backdrop-blur">
                  <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${feature.accent}`}>
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <h3 className="mt-8 text-2xl font-bold">{feature.title}</h3>
                  <p className="mt-4 leading-7 text-[#5D5F5F]">{feature.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-7xl rounded-[2rem] bg-[linear-gradient(180deg,#2B2929_0%,#1C1B1B_100%)] px-8 py-10 text-white shadow-[0_28px_70px_rgba(28,27,27,0.14)]">
            <p className="text-sm font-semibold uppercase text-[#FFE170]">How It Works</p>
            <h2 className="font-display mt-4 text-4xl font-extrabold sm:text-5xl">ดีลอาหารดี ๆ เริ่มได้ในไม่กี่แตะ</h2>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {[
                ["1", "เลือกดีล", "เปิดแอป เลือกร้าน และจองเซ็ตอาหารที่ต้องการ"],
                ["2", "จ่ายง่าย", "เช็กเอาต์รวดเร็ว พร้อมส่วนลดที่เห็นชัดเจน"],
                ["3", "รับกลับบ้าน", "ไปรับตามเวลาที่ร้านกำหนด แล้วอิ่มคุ้มทันที"],
              ].map(([step, title, description]) => (
                <div key={step} className="rounded-[1.5rem] bg-white/8 p-5 backdrop-blur">
                  <div className="font-display text-3xl font-black text-[#FFD600]">{step}</div>
                  <p className="mt-4 text-lg font-semibold">{title}</p>
                  <p className="mt-2 text-sm leading-6 text-white/72">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="download" className="px-6 pb-20 lg:px-8">
          <div className="mx-auto max-w-7xl rounded-[2rem] bg-[linear-gradient(180deg,#FFE36A_0%,#FFD600_100%)] px-8 py-10 shadow-[0_26px_56px_rgba(255,214,0,0.18)]">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase text-[#705D00]">Ready To Start</p>
                <h2 className="font-display mt-4 text-4xl font-extrabold text-[#221B00]">พร้อมจะเริ่มต้นมื้ออร่อยหรือยัง?</h2>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild variant="dark" size="lg"><Link href="/app"><DownloadIcon className="h-5 w-5" />เปิด PWA</Link></Button>
                <Button asChild variant="dark" size="lg"><Link href="/register"><PlayIcon className="h-5 w-5" />สมัครสมาชิก</Link></Button>
                <Button asChild variant="outline" size="lg"><Link href="/merchant">จัดการร้านค้า</Link></Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
