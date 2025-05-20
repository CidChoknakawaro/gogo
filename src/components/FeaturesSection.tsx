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
    title: "Feature Title",
    description:
      "Feature description goes here explaining the benefit to users.",
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
        className={`pt-6 flex flex-col items-start gap-3 ${isExpanded ? "pb-6" : ""}`}
      >
        <div className="p-2 rounded-full bg-gogo-blue/10">{icon}</div>
        <h3 className="text-xl font-semibold text-gogo-dark">{title}</h3>
        <p className={`text-gray-600 ${isExpanded ? "" : "line-clamp-2"}`}>
          {description}
        </p>
        {!isExpanded && (
          <button className="text-gogo-blue text-sm font-medium mt-2 hover:underline">
            Learn more
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
    title: "Benefit Title",
    description: "Description of this benefit and why it matters.",
  },
) => {
  return (
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
};

const FeaturesSection = () => {
  return (
    <section className="py-20 px-4 md:px-8 bg-gogo-light1">
      <div className="max-w-7xl mx-auto">
        {/* Key Features */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gogo-dark">
            Key Features
          </h2>
          <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto mb-12">
            Everything you need to plan your perfect trip with ease and
            flexibility
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={<Zap className="h-6 w-6 text-gogo-blue" />}
              title="AI-Generated Trip Flow"
              description="Get a day-by-day itinerary created by AI based on your preferences and travel style. Our advanced algorithms analyze thousands of travel options to create the perfect personalized plan for you."
              image="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&q=80"
            />
            <FeatureCard
              icon={<Edit3 className="h-6 w-6 text-gogo-blue" />}
              title="Editable Flowchart"
              description="Drag, drop, and modify your itinerary with our intuitive flowchart interface. Easily visualize your entire trip and make changes on the fly with our interactive editor."
              image="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=600&q=80"
            />
            <FeatureCard
              icon={<MessageSquare className="h-6 w-6 text-gogo-blue" />}
              title="Natural Language Input"
              description="Describe your trip in your own words and watch Gogo transform it into a plan. No need to fill out complicated forms - just tell us what you want in plain English."
              image="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80"
            />
            <FeatureCard
              icon={<Sliders className="h-6 w-6 text-gogo-blue" />}
              title="Smart Preferences"
              description="Quick buttons for travel style, budget, and pace to fine-tune your experience. Set your preferences once and let our system remember them for all your future trips."
              image="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80"
            />
            <FeatureCard
              icon={<MessageSquare className="h-6 w-6 text-gogo-blue" />}
              title="Revision Prompts"
              description='Simply type "make it more peaceful" or "add a food stop" to refine your plan. Our AI understands natural language instructions and can adjust your itinerary accordingly.'
              image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80"
            />
            <FeatureCard
              icon={<Download className="h-6 w-6 text-gogo-blue" />}
              title="Export Options"
              description="Save your trip as PDF or export directly to your calendar for easy access. Share your plans with friends and family or keep them for your personal reference."
              image="https://images.unsplash.com/photo-1423784346385-c1d4dac9893a?w=600&q=80"
            />
            <FeatureCard
              icon={<Save className="h-6 w-6 text-gogo-blue" />}
              title="Save & Revisit"
              description="Store your trips in your account and come back to modify them anytime. Your travel plans are securely saved in the cloud for easy access from any device."
              image="https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600&q=80"
            />
            <FeatureCard
              icon={<Calendar className="h-6 w-6 text-gogo-blue" />}
              title="Flexible Scheduling"
              description="Adjust timing and duration of activities to create your perfect day. Our minute-by-minute scheduling ensures you make the most of your travel time without feeling rushed."
              image="https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=600&q=80"
            />
          </div>
        </motion.div>

        <Separator className="my-16" />

        {/* Why Gogo */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gogo-dark">
              Why Gogo
            </h2>
            <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto mb-16">
              A new approach to trip planning that puts you in control
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            <WhyGogoItem
              title="Flexible Input, Unlimited Imagination"
              description="Most fields are open text, so you can express your needs without limits. Gogo understands vague, detailed, or emotional input."
            />
            <WhyGogoItem
              title="Smart Planning with a Human Touch"
              description="Gogo suggests the best order and timing — but you're always in control. Edit anything at any time."
            />
            <WhyGogoItem
              title="Visual Flow, Not Rigid Lists"
              description="Instead of boring text blocks, your trip is displayed as a visual, connected flowchart that reflects the real feel of your journey."
            />
          </div>
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-gogo-blue/5 rounded-2xl p-8 md:p-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gogo-dark">
            Ready to flow your next adventure?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="text-base px-8 bg-gogo-blue hover:bg-gogo-blue/90"
            >
              Plan a Trip Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base px-8 border-gogo-blue text-gogo-blue hover:bg-gogo-blue/10"
            >
              Preview a Sample Trip
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
