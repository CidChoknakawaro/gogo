// src/pages/TripPlanningPage.tsx

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface Variation {
  id: number;
  label: string;
  description: string;
}

export default function TripPlanningPage() {
  // ─── Basic Details 
  const navigate = useNavigate();
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [destinations, setDestinations] = useState<string[]>([]);
  const [regions, setRegions] = useState("");
  const [numDays, setNumDays] = useState<number | "">("");
  const handleStartDashboard = () => {
    navigate("/dashboard");
  };

  // ─── Style & Preferences ────────────────────────
  const [purpose, setPurpose] = useState("");
  const [experience, setExperience] = useState("");
  const [pace, setPace] = useState("");
  const [tourMode, setTourMode] = useState("");

  // ─── Travel Logistics ───────────────────────────
  const [transportMode, setTransportMode] = useState("");

  // ─── Travel Group ───────────────────────────────
  const [groupType, setGroupType] = useState("");
  const [groupCount, setGroupCount] = useState<number | "">("");
  const [hasKidsElders, setHasKidsElders] = useState("");

  // ─── Variations ────────────────────────────────
  const variations: Variation[] = [
    { id: 1, label: "แบบที่ 1", description: "แผนเน้นกิจกรรมสำคัญและชมสถานที่เด่น" },
    { id: 2, label: "แบบที่ 2", description: "แผนสบายๆ เน้นพักผ่อนและจังหวะชิลล์" },
    { id: 3, label: "แบบที่ 3", description: "แผนเข้มข้น เต็มวัน ไม่มีวันว่าง" },
  ];
  const [selectedVar, setSelectedVar] = useState<number>(1);

  const inputClass =
    "border border-gray-300 focus:border-gogo-blue focus:ring focus:ring-gogo-blue/20 rounded px-3 py-2 w-full bg-white";
  const labelClass = "block text-base font-semibold text-gogo-dark mb-1";

  const handleGenerate = () => {
    alert("กำลังสร้างแผนทริปของคุณ…");
  };

  const previewImages: Record<number,string> = {
  1: "dashboard.png",
  2: "dashboard.png",
  3: "dashboard.png",
};


  return (
    <div className="min-h-screen bg-gradient-to-b from-gogo-light2 to-gogo-light1">
      {/* HEADER */}
      <header className="bg-gogo-blue py-3">
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* Left: logo */}
        <div className="bg-white p-3 rounded-lg shadow-lg">
          <img
            src="/gogo_logo_new.png"
            alt="Gogo Logo"
            className="h-10 w-200"
          />
        </div>
      </div>
    </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-3 gap-6">
          {/* LEFT: form */}
          <div className="col-span-2 bg-white rounded-xl shadow-xl p-8">
            {/* ... your existing form sections ... */}
            {/* ปุ่ม “แผนทริป” */}
            <div className="grid grid-cols-2 gap-6">
              <section className="p-4 bg-gogo-light1 rounded-lg">
                <h2 className="text-2xl font-bold text-gogo-blue mb-4">
                  คำถามหลัก
                </h2>
                <div className="space-y-5">
                  {/* 1 */}
                  <div>
                    <label className={labelClass}>1. คุณว่างช่วงไหน</label>
                    <div className="flex gap-3 mt-1">
                      <input
                        type="date"
                        value={dateFrom}
                        onChange={(e) => setDateFrom(e.target.value)}
                        className={'${inputClass} flex-1'}
                      />
                      <input
                        type="date"
                        value={dateTo}
                        onChange={(e) => setDateTo(e.target.value)}
                        className={'${inputClass} flex-1'}
                      />
                    </div>
                  </div>
                  {/* 2 */}
                  <div>
                    <label className={labelClass}>
                      2. คุณวางแผนว่าจะผ่านที่ไหนบ้าง (ไม่บังคับ)
                    </label>
                    <input
                      type="text"
                      placeholder="กรอกและกด Enter เพื่อเพิ่ม"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && e.currentTarget.value.trim()) {
                          setDestinations([
                            ...destinations,
                            e.currentTarget.value.trim(),
                          ]);
                          e.currentTarget.value = "";
                        }
                      }}
                      className={inputClass}
                    />
                    <div className="flex flex-wrap gap-2 mt-2">
                      {destinations.map((loc, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-gogo-blue/20 text-gogo-dark rounded-full text-sm flex items-center"
                        >
                          {loc}
                          <button
                            className="ml-2 text-gogo-blue"
                            onClick={() =>
                              setDestinations(
                                destinations.filter((_, idx) => idx !== i)
                              )
                            }
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                  {/* 3 */}
                  <div>
                    <label className={labelClass}>
                      3. เมืองหรือภูมิภาคที่คุณจะไปมีที่ไหนบ้าง (ไม่บังคับ)
                    </label>
                    <input
                      type="text"
                      value={regions}
                      onChange={(e) => setRegions(e.target.value)}
                      placeholder="เช่น Tokyo, Kyoto, Osaka"
                      className={inputClass}
                    />
                  </div>
                  {/* 4 */}
                  <div>
                    <label className={labelClass}>
                      4. คุณจะไปทริปกี่วัน (ไม่บังคับ)
                    </label>
                    <input
                      type="number"
                      min={1}
                      placeholder="เช่น 5"
                      value={numDays}
                      onChange={(e) =>
                        setNumDays(Number(e.target.value) || "")
                      }
                      className={inputClass}
                    />
                  </div>
                </div>
              </section>

              {/* สไตล์และความชอบ */}
              <section className="p-4 bg-gogo-light2 rounded-lg">
                <h2 className="text-2xl font-bold text-gogo-blue mb-4">
    สไตล์และความชอบ
  </h2>
                <div className="space-y-5">
                  <div>
                    <label className={labelClass}>
                      1. จุดประสงค์ของทริปนี้คืออะไร (ไม่บังคับ)
                    </label>
                    <input
                      type="text"
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value)}
                      placeholder="ตัวอย่าง: ท่องเที่ยว, ฮันนีมูน..."
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>
                      2. คุณต้องการประสบการณ์แบบไหน (ไม่บังคับ)
                    </label>
                    <input
                      type="text"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      placeholder="ตัวอย่าง: อาหาร, ช้อปปิ้ง..."
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>
                      3. จังหวะของทริปคุณเป็นแบบไหน
                    </label>
                    <select
                      value={pace}
                      onChange={(e) => setPace(e.target.value)}
                      className={inputClass}
                    >
                      <option value="">ยังไม่แน่ใจ</option>
                      <option value="Relaxed">ชิลล์</option>
                      <option value="Balanced">สมดุล</option>
                      <option value="Fast">เร่งรีบ</option>
                    </select>
                  </div>
                  <div>
                  </div>
                </div>
              </section>
            </div>

            {/* การเดินทาง & กลุ่มการเดินทาง */}
            <div className="grid grid-cols-2 gap-6 mt-6">
              <section className="p-4 bg-gogo-light3 rounded-lg">
                <h2 className="text-2xl font-bold text-gogo-blue mb-4">
                  การเดินทาง
                </h2>
                <label className={labelClass}>
                  1. คุณจะใช้ขนส่งสาธารณะหรือเช่ารถ (ไม่บังคับ)
                </label>
                <select
                  value={transportMode}
                  onChange={(e) => setTransportMode(e.target.value)}
                  className={inputClass}
                >
                  <option value="">ยังไม่แน่ใจ</option>
                  <option value="Public">ขนส่งสาธารณะ</option>
                  <option value="Rental">รถเช่า</option>
                  <option value="Both">ทั้งสองแบบ</option>
                </select>
              </section>

              <section className="p-4 bg-gogo-light4 rounded-lg">
                <h2 className="text-2xl font-bold text-gogo-blue mb-4">
                  กลุ่มการเดินทาง
                </h2>
                <div className="space-y-5">
                  <div>
                    <label className={labelClass}>
                      1. คุณเดินทางคนเดียวหรือกับผู้อื่น
                    </label>
                    <select
                      value={groupType}
                      onChange={(e) => setGroupType(e.target.value)}
                      className={inputClass}
                    >
                      <option value="">เลือก…</option>
                      <option value="Solo">คนเดียว</option>
                      <option value="Partner">คู่</option>
                      <option value="Friends">เพื่อน</option>
                      <option value="Family">ครอบครัว</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>
                      2. มีกี่คนร่วมเดินทางไปด้วย (ไม่บังคับ)
                    </label>
                    <input
                      type="number"
                      min={1}
                      placeholder="เช่น 3"
                      value={groupCount}
                      onChange={(e) =>
                        setGroupCount(Number(e.target.value) || "")
                      }
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>
                      3. มีเด็กหรือผู้สูงอายุร่วมเดินทางด้วยหรือไม่ (ไม่บังคับ
                    </label>
                    <select
                      value={hasKidsElders}
                      onChange={(e) => setHasKidsElders(e.target.value)}
                      className={inputClass}
                    >
                      <option value="">เลือก…</option>
                      <option value="Children">เด็ก</option>
                      <option value="Seniors">ผู้สูงอายุ</option>
                      <option value="None">ไม่มี</option>
                      <option value="NotSure">ยังไม่แน่ใจ</option>
                    </select>
                  </div>
                </div>
              </section>
            </div>
            <div className="mt-8 flex justify-end">
              <Button
                onClick={handleStartDashboard}
                className="bg-gogo-green hover:bg-gogo-green/90 text-white text-2xl px-10 py-3 rounded-xl shadow-lg"
              >แพลนทริป
              </Button>
            </div>
          </div>

          {/* RIGHT: preview panel */}
          <aside className="bg-white rounded-xl shadow-xl p-6 flex flex-col">
            <h3 className="text-2xl font-bold text-gogo-blue mb-4">
              เลือกทริปของคุณ
            </h3>

            {/* Variations selector */}
            <div className="mb-4">
              <label className="block text-base font-semibold text-gogo-dark mb-2">
                เลือกแบบแผน
              </label>
              <select
                value={selectedVar}
                onChange={(e) => setSelectedVar(Number(e.target.value))}
                className="border border-gray-300 rounded px-3 py-2 w-full"
              >
                {variations.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.label}
                  </option>
                ))}
              </select>
              <p className="mt-2 text-sm text-gray-600">
                {variations.find((v) => v.id === selectedVar)?.description}
              </p>
            </div>

            {/* Large preview box */}
            <div className="flex-1 mb-4 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
            <img
                src={previewImages[selectedVar]}
                alt={`ตัวอย่างแบบ ${selectedVar}`}
                className="w-full h-full object-cover"
            />
</div>

            {/* Action buttons */}
            <div className="flex gap-3 mb-4">
              <Button
                variant="outline"
                className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                ดู
              </Button>
              <Button className="flex-1 bg-gogo-blue hover:bg-gogo-blue/90 text-white">
                คำแนะนำใหม่
              </Button>
            </div>

            {/* Collapsible checklist */}
<details className="mt-auto border-t pt-4">
  <summary className="cursor-pointer text-lg font-semibold text-gogo-dark">
    ดูคำตอบเพิ่มเติม
  </summary>
  <div className="mt-3 space-y-4 max-h-48 overflow-y-auto">
    {/* คำถามหลัก */}
    <div>
  <h4 className="font-bold text-gogo-blue mb-1">คำถามหลัก</h4>
  <ul className="list-disc list-inside text-gogo-dark space-y-1">
    <li>คุณว่างช่วงไหน: <strong>10/03/2025</strong></li>
    <li>คุณวางแผนว่าจะผ่านที่ไหนบ้าง: <strong>พระบรมมหาราชวัง, วัดโพธิ์</strong></li>
    <li>เมืองหรือภูมิภาคที่จะไป: <strong>กรุงเทพฯ</strong></li>
    <li>ไปทริปกี่วัน: <strong>1 วัน</strong></li>
  </ul>
</div>

{/* สไตล์และความชอบ */}
<div>
  <h4 className="font-bold text-gogo-blue mb-1">สไตล์และความชอบ</h4>
  <ul className="list-disc list-inside text-gogo-dark space-y-1">
    <li>จุดประสงค์: <strong>พักผ่อน & ชมเมือง</strong></li>
    <li>ประสบการณ์: <strong>อาหารท้องถิ่น, ช้อปปิ้ง</strong></li>
    <li>จังหวะทริป: <strong>สมดุล</strong></li>
    <li>ทัวร์: <strong>เที่ยวเอง</strong></li>
  </ul>
</div>

{/* การเดินทาง */}
<div>
  <h4 className="font-bold text-gogo-blue mb-1">การเดินทาง</h4>
  <ul className="list-disc list-inside text-gogo-dark space-y-1">
    <li>ขนส่ง: <strong>BTS / MRT</strong></li>
  </ul>
</div>

{/* กลุ่มการเดินทาง */}
<div>
  <h4 className="font-bold text-gogo-blue mb-1">กลุ่มการเดินทาง</h4>
  <ul className="list-disc list-inside text-gogo-dark space-y-1">
    <li>คุณเดินทาง: <strong>คนเดียว</strong></li>
    <li>จำนวนคน: <strong>1 คน</strong></li>
    <li>มีเด็กหรือผู้สูงอายุ: <strong>ไม่มี</strong></li>
  </ul>
</div>
  </div>
</details>

          </aside>
        </div>
      </main>
    </div>
  );
}
