import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ArrowRight,
  Edit3,
  Calendar,
  Download,
  Save,
  MessageSquare,
  Sliders,
  Zap,
} from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  image?: string;
}

const FeatureCard = (
  { icon, title, description, image }: FeatureCardProps = {
    icon: <Zap className="h-6 w-6 text-gogo-blue" />,
    title: "ชื่อฟีเจอร์",
    description: "คำอธิบายฟีเจอร์โดยย่อ",
    image: undefined,
  },
) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <Card
      className="h-full bg-white overflow-hidden group hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {image && (
        <div className="w-full h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
      )}
      <CardContent
        className={`pt-6 flex flex-col items-start gap-3 ${
          isExpanded ? "pb-6" : "pb-4"
        }`}
      >
        <div className="p-2 rounded-full bg-gogo-blue/10">{icon}</div>
        <h3 className="text-xl font-semibold text-gogo-dark">{title}</h3>
        <p className={`text-gray-600 ${isExpanded ? "" : "line-clamp-2"}`}>
          {description}
        </p>
        {!isExpanded && (
          <button className="text-gogo-blue text-sm font-medium mt-2 hover:underline">
            อ่านเพิ่มเติม
          </button>
        )}
      </CardContent>
    </Card>
  );
};

interface WhyGogoItemProps {
  title: string;
  description: string;
}

const WhyGogoItem = (
  { title, description }: WhyGogoItemProps = {
    title: "ชื่อข้อดี",
    description: "คำอธิบายเกี่ยวกับข้อดีข้อนี้",
  },
) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="flex flex-col gap-2"
  >
    <h3 className="text-xl font-semibold">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </motion.div>
);

const FeaturesSection = () => {
  return (
    <section className="py-24 px-4 md:px-8 bg-gogo-light1">
      <div className="max-w-7xl mx-auto flex flex-col gap-24">
        {/* ฟีเจอร์หลัก */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gogo-dark">
              ฟีเจอร์เด่นของเรา
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              ทุกสิ่งที่คุณต้องการเพื่อวางแผนทริปในฝันได้อย่างยืดหยุ่นและง่ายดาย
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Zap className="h-6 w-6 text-gogo-blue" />}
              title="แผนเดินทางด้วย AI"
              description="รับแผนเที่ยวรายวันที่สร้างโดย AI ตามสไตล์และความชอบของคุณ วิเคราะห์ตัวเลือกนับพันเพื่อให้ได้แผนที่เหมาะกับคุณที่สุด"
              image="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&q=80"
            />
            <FeatureCard
              icon={<Edit3 className="h-6 w-6 text-gogo-blue" />}
              title="แผนภาพลากวางได้"
              description="ลากและจัดเรียงแผนเที่ยวได้ด้วยอินเทอร์เฟซ Flowchart ที่เข้าใจง่าย เห็นภาพรวมทั้งทริปและปรับเปลี่ยนได้ทันที"
              image="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=600&q=80"
            />
            <FeatureCard
              icon={<MessageSquare className="h-6 w-6 text-gogo-blue" />}
              title="พิมพ์บอกด้วยภาษาคุณ"
              description="เพียงบอกเราด้วยคำพูดของคุณ Gogo จะแปลงสิ่งนั้นเป็นแผนเที่ยว โดยไม่ต้องกรอกแบบฟอร์มใด ๆ"
              image="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80"
            />
            <FeatureCard
              icon={<Sliders className="h-6 w-6 text-gogo-blue" />}
              title="ตั้งค่าความชอบอัจฉริยะ"
              description="เลือกสไตล์การเที่ยว งบประมาณ และความเร็วของทริปได้ในคลิกเดียว ระบบจะจดจำความชอบของคุณอัตโนมัติ"
              image="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80"
            />
            <FeatureCard
              icon={<MessageSquare className="h-6 w-6 text-gogo-blue" />}
              title="แก้ไขด้วยคำสั่งง่ายๆ"
              description='เช่น "ขอเงียบสงบกว่านี้" หรือ "เพิ่มร้านอาหาร" ระบบเข้าใจและปรับแผนให้อัตโนมัติด้วยภาษาแบบคนพูด'
              image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80"
            />
            <FeatureCard
              icon={<Download className="h-6 w-6 text-gogo-blue" />}
              title="ส่งออกได้หลากหลาย"
              description="บันทึกเป็น PDF หรือเพิ่มเข้าในปฏิทิน แชร์แผนเที่ยวให้เพื่อนหรือเก็บไว้ดูภายหลัง"
              image="https://images.unsplash.com/photo-1423784346385-c1d4dac9893a?w=600&q=80"
            />
            <FeatureCard
              icon={<Save className="h-6 w-6 text-gogo-blue" />}
              title="บันทึกแผนไว้แก้ทีหลัง"
              description="เก็บแผนทริปไว้ในบัญชีของคุณ กลับมาแก้ไขเมื่อไรก็ได้ เข้าถึงได้จากทุกอุปกรณ์"
              image="https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600&q=80"
            />
            <FeatureCard
              icon={<Calendar className="h-6 w-6 text-gogo-blue" />}
              title="จัดเวลายืดหยุ่น"
              description="ปรับเวลาและช่วงกิจกรรมให้ตรงกับไลฟ์สไตล์ของคุณ ไม่เร่งรีบแต่คุ้มค่าสำหรับทุกวันในทริป"
              image="https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=600&q=80"
            />
          </div>
        </motion.div>

        {/* Separator */}
        <Separator className="my-8" />

        {/* ตารางราคา */}
        <div className="w-full max-w-5xl mx-auto bg-white shadow-md rounded-xl p-10 border border-gray-200 space-y-10">
          <h2 className="text-2xl font-bold text-center text-gogo-dark">
            แพ็กเกจการใช้งาน
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* FREE */}
<div className="plan bg-white rounded-lg shadow p-6">
  <h2 className="text-xl font-bold mb-2">Free</h2>
  <p className="text-gray-600 mb-4">เริ่มต้นง่าย ไม่เสียค่าใช้จ่าย</p>

  <ul className="space-y-2 mb-6">
    <li>วางแผนได้สูงสุด 1 ทริป</li>
    <li>AI prompts 5 ครั้งต่อเดือน</li>
    <li>บันทึกอัตโนมัติ</li>
  </ul>

  <button className="w-full py-2 bg-gogo-blue text-white rounded">
    เลือกแพ็กเกจ Free
  </button>
</div>

{/* PRO */}
<div className="plan bg-white rounded-lg shadow p-6">
  <h2 className="text-xl font-bold mb-2">Pro</h2>
  <p className="text-gray-600 mb-4">เหมาะสำหรับนักเดินทาง</p>

  <ul className="space-y-2 mb-6">
    <li>วางแผนได้ไม่จำกัดจำนวนทริป</li>
    <li>AI prompts 100 ครั้งต่อเดือน</li>
    <li>Export PDF</li>
  </ul>

  <button className="w-full py-2 bg-gogo-blue text-white rounded">
    เลือกแพ็กเกจ Pro
  </button>
</div>

{/* ENTERPRISE */}
<div className="plan bg-white rounded-lg shadow p-6">
  <h2 className="text-xl font-bold mb-2">Enterprise</h2>
  <p className="text-gray-600 mb-4">สำหรับธุรกิจทัวร์และผู้ดูแลกลุ่ม</p>

  <ul className="space-y-2 mb-6">
    <li>วางแผนได้ไม่จำกัดจำนวนทริป</li>
    <li>AI prompts ไม่จำกัด</li>
    <li>Customize โมเดลได้</li>
  </ul>

  <button className="w-full py-2 border border-gray-300 rounded">
    ติดต่อฝ่ายงาน
  </button>
</div>
          </div>
        </div>

        {/* Separator */}
        <Separator className="my-8" />

        {/* ทำไมต้อง Gogo */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gogo-dark">
              ทำไมต้องใช้ Gogo?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              วิธีวางแผนเที่ยวแนวใหม่ ที่ให้คุณควบคุมทุกอย่างได้ด้วยตัวเอง
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <WhyGogoItem
              title="พิมพ์อะไรก็เข้าใจ"
              description="ใส่ข้อมูลทริปในสไตล์ของคุณ จะละเอียดหรือคลุมเครือก็ได้ Gogo เข้าใจทุกคำที่คุณต้องการจะสื่อ"
            />
            <WhyGogoItem
              title="ระบบแนะนำอัจฉริยะแต่คุณมีสิทธิ์ตัดสินใจ"
              description="เราช่วยจัดเรียงและเวลาให้เหมาะ แต่คุณสามารถแก้ไขได้ตลอดเวลา"
            />
            <WhyGogoItem
              title="แผนที่เห็นภาพจริง"
              description="ไม่ใช่แค่รายการสิ่งที่ต้องทำ แต่เป็นภาพการเดินทางที่ไหลต่อเนื่อง เห็นชัดว่าทริปคุณจะเป็นอย่างไร"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
