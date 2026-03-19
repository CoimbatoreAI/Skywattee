import { useState, useEffect } from "react";
import api, { IMAGE_BASE_URL } from "@/lib/api";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

const OfferPopup = () => {
    const [offers, setOffers] = useState<any[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const res = await api.get("/offers");
                if (res.data.length > 0) {
                    setOffers(res.data);
                    // Check if already shown in this session
                    const hasShown = sessionStorage.getItem("skywatt_offer_shown");
                    if (!hasShown) {
                        setIsOpen(true);
                        sessionStorage.setItem("skywatt_offer_shown", "true");
                    }
                }
            } catch (error) {
                console.error("Failed to fetch offers");
            }
        };
        fetchOffers();
    }, []);

    if (offers.length === 0) return null;

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="max-w-lg p-0 overflow-hidden bg-transparent border-none shadow-none sm:rounded-3xl">
                <div className="relative bg-white rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.2)] mx-4 border border-white/20">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-6 right-6 z-20 bg-slate-100/90 hover:bg-orange-100 text-slate-500 hover:text-orange-600 rounded-full h-10 w-10 transition-all duration-200 shadow-sm"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setIsOpen(false);
                        }}
                    >
                        <X className="w-5 h-5" />
                    </Button>

                    <div className="relative z-10 p-6 sm:p-8">
                        <div className="text-center mb-6">
                            <span className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-[10px] font-bold uppercase tracking-wider mb-2">
                                Special Promotion
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 leading-tight">
                                Exclusive Offers <span className="text-orange-600">for You</span>
                            </h2>
                            <div className="w-12 h-1 bg-orange-500 mx-auto mt-3 rounded-full"></div>
                        </div>

                        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
                            {offers.map((offer) => (
                                <div
                                    key={offer._id}
                                    className="group relative flex flex-col sm:flex-row bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 hover:border-orange-200 transition-all duration-300 hover:shadow-md"
                                >
                                    <div className="w-full sm:w-28 h-32 sm:h-auto overflow-hidden">
                                        <img
                                            src={offer.imageUrl.startsWith("http") ? offer.imageUrl : `${IMAGE_BASE_URL}${offer.imageUrl}`}
                                            alt={offer.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="p-4 flex-1 flex flex-col justify-center">
                                        <h3 className="font-bold text-slate-800 text-base mb-1 group-hover:text-orange-600 transition-colors">
                                            {offer.title}
                                        </h3>
                                        {offer.description && (
                                            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                                                {offer.description}
                                            </p>
                                        )}
                                        {offer.link && (
                                            <a
                                                href={offer.link}
                                                className="inline-flex items-center mt-2 text-orange-600 font-bold text-[10px] uppercase tracking-wide hover:gap-1 transition-all"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Claim Offer <span className="ml-1">→</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8">
                            <Button
                                onClick={() => setIsOpen(false)}
                                className="w-full bg-slate-900 hover:bg-orange-600 text-white font-bold py-6 rounded-2xl shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                            >
                                Continue to Site
                            </Button>
                            <p className="text-[10px] text-slate-400 text-center mt-4">
                                * Limited time offers. Terms and conditions apply.
                            </p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default OfferPopup;
