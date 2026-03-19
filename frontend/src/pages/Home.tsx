import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Users, Zap, Award, ArrowRight, Sun, Leaf, Battery } from "lucide-react";
import heroImage from "@/assets/hero-solar.jpg";
import OfferPopup from "@/components/OfferPopup";

const Home = () => {
  const stats = [
    { icon: Award, label: "Years in Business", value: "13+" },
    { icon: Users, label: "Satisfied Customers", value: "250+" },
    { icon: Zap, label: "MW Installed", value: "50+" },
    { icon: Shield, label: "Quality Assurance", value: "100%" },
  ];

  const services = [
    {
      icon: Sun,
      title: "On-Grid Solar Systems",
      description: "Connect to the grid and save on electricity bills with net metering benefits.",
    },
    {
      icon: Battery,
      title: "Off-Grid & Hybrid Systems",
      description: "Complete energy independence with battery backup solutions for uninterrupted power.",
    },
    {
      icon: Leaf,
      title: "EPC Services",
      description: "End-to-end engineering, procurement, and construction for MW scale solar projects.",
    },
  ];

  return (
    <>
      <OfferPopup />
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Solar panels installation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/40" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-background animate-in fade-in slide-in-from-bottom-4 duration-1000">
              Powering a Greener Tomorrow
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-background/90 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
              Leading solar energy solutions since 2011. Clean, reliable, and efficient energy for
              homes and businesses.
            </p>
            <div className="flex flex-wrap gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
              <Link to="/contact">
                <Button
                  size="lg"
                  className="bg-gradient-solar text-foreground hover:shadow-solar hover:scale-105 transition-all duration-300"
                >
                  Book Free Site Inspection
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a href="https://wa.me/919843771446" target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-background/10 text-background border-background hover:bg-background hover:text-foreground transition-all duration-300"
                >
                  WhatsApp Us
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card
                  key={index}
                  className="p-6 text-center hover:shadow-elegant hover:-translate-y-1 transition-all duration-300"
                >
                  <Icon className="h-10 w-10 mx-auto mb-3 text-primary" />
                  <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Choose Skywatt Electric Energy?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience excellence in solar energy solutions with India's trusted partner
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card
                  key={index}
                  className="p-8 hover:shadow-solar hover:-translate-y-2 transition-all duration-300 border-t-4 border-primary"
                >
                  <div className="bg-gradient-solar w-14 h-14 rounded-xl flex items-center justify-center mb-4 shadow-solar">
                    <Icon className="h-7 w-7 text-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-solar">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Ready to Go Solar?
          </h2>
          <p className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
            Get a free site inspection and detailed consultation from our experts
          </p>
          <Link to="/contact">
            <Button
              size="lg"
              className="bg-foreground text-background hover:bg-foreground/90 hover:shadow-elegant hover:scale-105 transition-all duration-300"
            >
              Contact Us Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
