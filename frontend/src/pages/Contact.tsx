import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, MapPin, Instagram, Clock, Send } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (!formData.name || !formData.phone || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // WhatsApp integration
    const whatsappMessage = `Name: ${formData.name}%0APhone: ${formData.phone}%0AMessage: ${formData.message}`;
    window.open(`https://wa.me/919843771446?text=${whatsappMessage}`, "_blank");

    toast({
      title: "Redirecting to WhatsApp",
      description: "Your message will be sent via WhatsApp",
    });

    // Reset form
    setFormData({ name: "", phone: "", message: "" });
  };

  const contactInfo = [
    // {
    //   icon: Phone,
    //   title: "Phone Numbers",
    //   details: ["+91 98437 71446", "+91 99524 59839", "0422-2254143"],
    // },
    {
      icon: MapPin,
      title: "Address",
      details: [
        "Skywatt Electric Energy",
        "967A, Semba Goundenpudur",
        "Sarkarsamkulam",
        "Coimbatore – 641107",
      ],
    },
    // {
    //   icon: Clock,
    //   title: "Business Hours",
    //   details: ["Monday - Saturday", "9:00 AM - 6:00 PM", "Sunday: By Appointment"],
    // },
  ];

  return (
    <div className="min-h-screen">
      <section className="py-20 bg-gradient-solar">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-foreground mb-6">Contact Us</h1>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            Get in touch with us for free site inspection and consultation. We're here to help you
            go solar!
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <Card
                  key={index}
                  className="p-6 hover:shadow-elegant hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="bg-gradient-solar w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{info.title}</h3>
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-muted-foreground text-sm">
                      {detail}
                    </p>
                  ))}
                </Card>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="p-8">
              <h2 className="text-3xl font-bold mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Your Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Enter your phone number"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your solar energy requirements..."
                    className="mt-2 min-h-32"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-solar text-foreground hover:shadow-solar hover:scale-105 transition-all duration-300"
                >
                  Send via WhatsApp
                  <Send className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </Card>

            <div className="space-y-6">
              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-4">Follow Us on Social Media</h2>
                <a
                  href="https://instagram.com/SWEE_SOLAR"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-3 text-lg hover:text-primary transition-colors"
                >
                  <Instagram className="h-8 w-8" />
                  <span>@SWEE_SOLAR</span>
                </a>
              </Card>

              <Card className="p-8 bg-muted">
                <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <a href="https://wa.me/919843771446" target="_blank" rel="noopener noreferrer">
                    <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                      WhatsApp Us
                    </Button>
                  </a>
                  <a href="tel:+919843771446">
                    <Button variant="outline" className="w-full">
                      Call Now
                    </Button>
                  </a>
                </div>
              </Card>

              <Card className="p-8">
                <h3 className="font-bold mb-2">GSTIN</h3>
                <p className="text-muted-foreground font-mono">33AYGPV6612F1ZE</p>
              </Card>
            </div>
          </div>

          <Card className="mt-8 p-8 text-center bg-gradient-eco">
            <h2 className="text-3xl font-bold text-secondary-foreground mb-4">
              Free Site Inspection Available
            </h2>
            <p className="text-secondary-foreground/90 max-w-2xl mx-auto">
              Our experts will visit your location, assess your energy needs, and provide detailed
              recommendations at no cost. We also offer client reference visits so you can see our
              work firsthand.
            </p>
          </Card>

          {/* Google Map Section */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-center mb-8">Our Location</h2>
            <div className="w-full h-[450px] rounded-lg overflow-hidden shadow-lg">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3914.0438843207244!2d77.01241837504783!3d11.184386688990239!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTHCsDExJzAzLjgiTiA3N8KwMDAnNTQuMCJF!5e0!3m2!1sen!2sin!4v1761887154027!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Skywatt Electric Energy Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
