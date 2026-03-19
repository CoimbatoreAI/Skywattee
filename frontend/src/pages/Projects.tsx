import { useState, useEffect } from "react";
import api, { IMAGE_BASE_URL } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Home, Factory, CheckCircle2, Download, Loader2 } from "lucide-react";
import commercialSolar from "@/assets/commercial-solar.jpg";
import residentialSolar from "@/assets/residential-solar.jpg";

const Projects = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get("/projects");
        setProjects(res.data);
      } catch (error) {
        console.error("Failed to fetch projects");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const projectCategories = [
    "Rooftop Installations (RCC & Sheet Roofs)",
    "Solar Power Park EPC",
    "Solar Water Pump Installations",
    "Solar Water Heating Systems",
    "Solar Street Light Projects",
    "UPS & Battery Backup Installations",
  ];

  const achievements = [
    { label: "Total Projects Completed", value: "250+" },
    { label: "MW Capacity Installed", value: "50+" },
    { label: "States Served", value: "3" },
    { label: "Years of Excellence", value: "13+" },
  ];

  return (
    <div className="min-h-screen">
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-orange-500/10 to-transparent"></div>
        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-orange-500/10 text-orange-400 text-xs font-bold uppercase tracking-widest mb-6 border border-orange-500/20">
            Our Track Record
          </span>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Successful <span className="text-orange-500">Solar Projects</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Leading the renewable energy transition across South India with end-to-end solar solutions.
          </p>
        </div>
      </section>

      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {achievements.map((achievement, index) => (
              <Card
                key={index}
                className="p-6 text-center hover:shadow-elegant hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-4xl font-bold text-primary mb-2">{achievement.value}</div>
                <div className="text-sm text-muted-foreground">{achievement.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
            <h2 className="text-4xl font-bold">Project Portfolio</h2>
            {loading && <Loader2 className="w-6 h-6 animate-spin text-orange-600" />}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {projects.map((project) => {
              const src = project.imageUrl.startsWith("http") ? project.imageUrl : `${IMAGE_BASE_URL}${project.imageUrl}`;
              return (
                <Card
                  key={project._id}
                  className="overflow-hidden group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border-none shadow-lg bg-white"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={src}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                    <Badge className="absolute top-4 right-4 bg-orange-500 hover:bg-orange-600 text-white border-0 shadow-lg px-3 py-1 text-xs font-bold uppercase tracking-wider">
                      {project.category}
                    </Badge>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-orange-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed mb-4">
                      {project.description}
                    </p>
                    <div className="w-10 h-1 bg-orange-500 rounded-full group-hover:w-20 transition-all duration-500"></div>
                  </div>
                </Card>
              );
            })}
          </div>

          <Card className="p-8 mb-12">
            <h2 className="text-3xl font-bold mb-6">Project Categories</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {projectCategories.map((category, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-secondary mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{category}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-8 bg-gradient-solar text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Want to See Our Work?
            </h2>
            <p className="text-foreground/80 mb-6 max-w-2xl mx-auto">
              We offer client reference visits so you can see our installations firsthand and speak
              with satisfied customers. Contact us to schedule a visit.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://wa.me/919843771446" target="_blank" rel="noopener noreferrer">
                <Badge className="text-base px-6 py-2 bg-foreground text-background hover:bg-foreground/90 cursor-pointer">
                  WhatsApp: +91 98437 71446
                </Badge>
              </a>
              <a href="tel:+919952459839">
                <Badge className="text-base px-6 py-2 bg-foreground text-background hover:bg-foreground/90 cursor-pointer">
                  Call: +91 99524 59839
                </Badge>
              </a>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Projects;
