import { useState, useEffect } from "react";
import api, { IMAGE_BASE_URL } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ZoomIn } from "lucide-react";

const Gallery = () => {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await api.get("/gallery");
        setImages(res.data);
      } catch (error) {
        console.error("Failed to fetch gallery");
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-orange-500/10 to-transparent"></div>
        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-orange-500/10 text-orange-400 text-xs font-bold uppercase tracking-widest mb-6 border border-orange-500/20">
            Showcasing Excellence
          </span>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Our Project <span className="text-orange-500">Gallery</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Witness the transformation of energy through our successful solar installations across the region.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          {loading ? (
            <div className="text-center py-20">Loading gallery...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
              {images.map((image, index) => {
                const src = image.imageUrl.startsWith("http") ? image.imageUrl : `${IMAGE_BASE_URL}${image.imageUrl}`;
                return (
                  <Dialog key={image._id || index}>
                    <DialogTrigger asChild>
                      <Card className="group cursor-pointer overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-2 hover:border-orange-400">
                        <div className="relative aspect-square overflow-hidden">
                          <img
                            src={src}
                            alt={image.title || `Solar Project ${index + 1}`}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = "/placeholder.svg";
                            }}
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                            <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                        </div>
                      </Card>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] p-0">
                      <div className="relative">
                        <img
                          src={src}
                          alt={image.title || `Solar Project ${index + 1}`}
                          className="w-full h-auto max-h-[90vh] object-contain"
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Gallery;