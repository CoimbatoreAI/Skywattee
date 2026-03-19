import { Card } from "@/components/ui/card";
import { Target, Eye, Award, CheckCircle2 } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Award,
      title: "Quality First",
      description: "We only work with top-tier solar brands – no local manufacturers.",
    },
    {
      icon: CheckCircle2,
      title: "Customer Satisfaction",
      description: "250+ satisfied customers across Tamil Nadu, Kerala, and Karnataka.",
    },
    {
      icon: Target,
      title: "Expertise",
      description: "13+ years of experience in solar energy solutions and EPC projects.",
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="py-20 bg-gradient-solar">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-foreground mb-6">About Skywatt Electric Energy</h1>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            India's leading I&C and EPC solar energy solutions company, operating since 2011
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 mb-12 shadow-elegant">
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Established in 2011, Skywatt Electric Energy has been at the forefront of India's
                  solar energy revolution. We provide complete solar solutions including
                  ground-mounted systems, rooftop solar PV, and solar water heating for residential,
                  commercial, and industrial clients.
                </p>
                <p>
                  Starting operations in October 2022, we have successfully served over 250 satisfied
                  customers across Tamil Nadu, Kerala, and Karnataka. We specialize in on-grid,
                  off-grid, and hybrid solar systems, offering free site inspections and detailed
                  product guidance.
                </p>
                <p>
                  What sets us apart is our commitment to quality – we only work with top-tier solar
                  brands and never compromise on standards. Every installation is backed by our
                  expertise and dedication to customer satisfaction.
                </p>
              </div>
            </Card>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="p-8 border-l-4 border-primary hover:shadow-solar transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-solar w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                    <Target className="h-6 w-6 text-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold">Our Mission</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  To empower homes and businesses with clean, reliable, and efficient solar energy
                  solutions, ensuring long-term savings and sustainability for a greener future.
                </p>
              </Card>

              <Card className="p-8 border-l-4 border-secondary hover:shadow-eco transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-eco w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                    <Eye className="h-6 w-6 text-secondary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold">Our Vision</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  To be India's most trusted solar energy solutions provider, leading the transition
                  to renewable energy across residential, commercial, and industrial sectors.
                </p>
              </Card>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-8 text-center">Our Core Values</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {values.map((value, index) => {
                  const Icon = value.icon;
                  return (
                    <Card
                      key={index}
                      className="p-6 text-center hover:shadow-elegant hover:-translate-y-1 transition-all duration-300"
                    >
                      <Icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                      <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                      <p className="text-muted-foreground text-sm">{value.description}</p>
                    </Card>
                  );
                })}
              </div>
            </div>

            <Card className="p-8 bg-muted">
              <h2 className="text-3xl font-bold mb-6">Why Choose Us?</h2>
              <ul className="space-y-3">
                {[
                  "Free site inspection and detailed consultation",
                  "Only top-tier solar brands – no local manufacturers",
                  "Complete EPC services for MW scale projects",
                  "On-grid, off-grid, and hybrid system expertise",
                  "Client reference visits available",
                  "Annual maintenance contracts (AMC)",
                  "Experienced in residential, commercial, and industrial installations",
                  "Serving Tamil Nadu, Kerala, and Karnataka",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 text-secondary mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
