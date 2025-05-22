import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import FlowchartVisualization from "./FlowchartVisualization";

interface HeroSectionProps {
  onStartPlanning?: () => void;
}

const HeroSection = ({
  onStartPlanning = () => console.log("เริ่มวางแผนแล้ว"),
}: HeroSectionProps) => {
  return (
    <section className="relative w-full min-h-[900px] bg-gradient-to-b from-gogo-light2 to-gogo-light1 flex flex-col items-center justify-center px-4 md:px-8 lg:px-16 py-20">
      {/* พื้นหลังตกแต่ง */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-gogo-blue opacity-10 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-gogo-green opacity-10 blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-7xl z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* ด้านซ้าย - ข้อความ */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gogo-dark leading-tight mb-6">
              เปลี่ยนแค่ไอเดีย <br />
              <span className="text-gogo-blue">เป็นแผนภาพการเดินทางสุดเจ๋ง!</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-700 mb-6 max-w-2xl mx-auto lg:mx-0">
              Gogo ใช้ AI เพื่อสร้างแผนการเดินทางในรูปแบบ Flowchart
              ที่ปรับแต่ง ลาก และจัดรูปแบบได้ตามที่คุณต้องการ
            </p>

            <div className="flex justify-center lg:justify-start">
              <Button
                size="lg"
                onClick={onStartPlanning}
                className="text-base px-8 py-6 bg-gogo-blue hover:bg-gogo-blue/90"
              >
                เริ่มวางแผนเลย
              </Button>
            </div>
          </motion.div>

          
        </div>
      </div>

      {/* จุดลายด้านล่าง */}
      <div className="absolute bottom-0 left-0 right-0 h-20 opacity-10">
        <div className="grid grid-cols-12 gap-4 h-full">
          {Array(12)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-gogo-blue"></div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
