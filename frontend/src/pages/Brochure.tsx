import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const Brochure = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-12">Our Brochure</h1>
        
        <div className="max-w-4xl mx-auto bg-card rounded-lg shadow-lg p-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-4">Download Our Brochure</h2>
              <p className="text-muted-foreground mb-6">
                Get detailed information about our products, services, and solutions in our comprehensive brochure.
                Learn how Skywatt Electric Energy can help you harness solar power efficiently.
              </p>
              <Button className="gap-2" size="lg" asChild>
                <a 
                  href="/brochure.pdf" 
                  download
                  className="inline-flex items-center"
                >
                  <Download className="h-5 w-5" />
                  Download Brochure (PDF)
                </a>
              </Button>
            </div>
            <div className="w-full md:w-1/3">
              <div className="bg-muted/50 rounded-lg aspect-[3/4] flex items-center justify-center">
                <div className="text-center p-4">
                  <div className="text-5xl mb-2">📄</div>
                  <p className="text-sm text-muted-foreground">Brochure Preview</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brochure;
