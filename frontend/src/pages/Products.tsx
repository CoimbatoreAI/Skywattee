import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Sun,
  Battery,
  Droplet,
  Lightbulb,
  Zap,
  Grid3x3,
  ArrowRight,
} from "lucide-react";

const Products = () => {
  const products = [
    {
      icon: Grid3x3,
      title: "MW Scale / EPC Services",
      description:
        "Complete engineering, procurement, and construction services for large-scale solar power plants. From planning to commissioning, we handle everything.",
      features: ["Solar Power Park Development", "Ground Mount Systems", "Rooftop MW Installations", "Project Management"],
    },
    {
      icon: Sun,
      title: "On-Grid Solar Systems",
      description:
        "Connect to the electricity grid and enjoy net metering benefits. Reduce your electricity bills while contributing clean energy to the grid.",
      features: ["Net Metering Benefits", "Grid Synchronization", "Residential & Commercial", "Cost Effective"],
    },
    {
      icon: Battery,
      title: "Off-Grid Solar Systems",
      description:
        "Complete energy independence with battery backup. Perfect for remote locations or areas with unreliable grid power.",
      features: ["Complete Independence", "Battery Backup", "Remote Locations", "24/7 Power Supply"],
    },
    {
      icon: Zap,
      title: "Hybrid Solar Systems",
      description:
        "Best of both worlds – grid connection with battery backup. Switch seamlessly between solar, battery, and grid power.",
      features: ["Grid + Battery Backup", "Automatic Switching", "Maximum Efficiency", "Zero Power Cut"],
    },
    {
      icon: Droplet,
      title: "Solar Water Pump Systems",
      description:
        "Efficient water pumping solutions for agriculture and irrigation. Reduce operational costs and increase productivity.",
      features: ["Agriculture Irrigation", "Cost Effective", "Low Maintenance", "Eco-Friendly"],
    },
    {
      icon: Lightbulb,
      title: "Solar Street Light Systems",
      description:
        "Autonomous street lighting solutions with integrated solar panels and batteries. Perfect for roads, parks, and public spaces.",
      features: ["Auto On/Off", "Integrated Design", "Long Battery Life", "Weather Resistant"],
    },
    {
      icon: Droplet,
      title: "Solar Water Heater Systems",
      description:
        "Efficient water heating solutions for homes and commercial establishments. Reduce electricity bills and enjoy hot water throughout the year.",
      features: ["Energy Efficient", "Low Operating Cost", "All Weather Operation", "Long Lifespan"],
    },
    {
      icon: Battery,
      title: "UPS & Battery Solutions",
      description:
        "Reliable backup power solutions from 0.6 KVA to 100 KVA. Ensure uninterrupted power supply for your home or business.",
      features: ["0.6 KVA to 100 KVA", "Pure Sine Wave", "Wide Input Range", "Intelligent Charging"],
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="py-20 bg-gradient-to-r from-orange-500 via-red-500 to-green-600">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-6 drop-shadow-lg">
            Products & Solutions
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto drop-shadow">
            Comprehensive solar energy solutions for every need – from residential rooftops to
            MW-scale power plants
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {products.map((product, index) => {
              const Icon = product.icon;
              return (
                <Card
                  key={index}
                  className={`p-8 hover:shadow-solar hover:-translate-y-1 transition-all duration-300 border-t-4 ${
                    index % 4 === 0 ? 'border-orange-500' :
                    index % 4 === 1 ? 'border-red-500' :
                    index % 4 === 2 ? 'border-green-500' : 'border-green-800'
                  }`}
                >
                  <div className="flex items-start mb-6">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 shadow-lg ${
                      index % 4 === 0 ? 'bg-gradient-to-r from-orange-500 to-orange-600' :
                      index % 4 === 1 ? 'bg-gradient-to-r from-red-500 to-red-600' :
                      index % 4 === 2 ? 'bg-gradient-to-r from-green-500 to-green-600' :
                      'bg-gradient-to-r from-green-700 to-green-800'
                    }`}>
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2 text-gray-800">{product.title}</h3>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {product.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <div className={`w-1.5 h-1.5 rounded-full mr-2 ${
                          index % 4 === 0 ? 'bg-orange-500' :
                          index % 4 === 1 ? 'bg-red-500' :
                          index % 4 === 2 ? 'bg-green-500' : 'bg-green-700'
                        }`} />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              );
            })}
          </div>

          <Card className="mt-12 p-8 bg-gradient-to-r from-orange-100 via-red-100 to-green-100 text-center border-orange-200">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Need a Custom Solution?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Every project is unique. Our experts will visit your site, understand your requirements,
              and design a tailored solar solution that fits your needs and budget.
            </p>
            <Link to="/contact">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 via-red-500 to-green-700 text-white hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold"
              >
                Request Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Products;
