import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api, { IMAGE_BASE_URL } from "@/lib/api";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Edit, LogOut, Image as ImageIcon, Briefcase, Tag, Power, PowerOff, Loader2, Users } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

const AdminDashboard = () => {
    const [gallery, setGallery] = useState<any[]>([]);
    const [careers, setCareers] = useState<any[]>([]);
    const [offers, setOffers] = useState<any[]>([]);
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Dialog states
    const [isGalleryDialogOpen, setIsGalleryDialogOpen] = useState(false);
    const [isCareerDialogOpen, setIsCareerDialogOpen] = useState(false);
    const [isOfferDialogOpen, setIsOfferDialogOpen] = useState(false);
    const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);

    // Form states
    const [galleryFile, setGalleryFile] = useState<File | null>(null);
    const [careerForm, setCareerForm] = useState({ id: "", title: "", postings: 0 });
    const [offerForm, setOfferForm] = useState({ id: "", title: "", description: "", link: "", active: true, order: 0 });
    const [offerFile, setOfferFile] = useState<File | null>(null);
    const [projectForm, setProjectForm] = useState({ id: "", title: "", description: "", category: "Residential", order: 0 });
    const [projectFile, setProjectFile] = useState<File | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [galleryRes, careersRes, offersRes, projectsRes] = await Promise.all([
                api.get("/gallery"),
                api.get("/careers"),
                api.get("/offers/all"),
                api.get("/projects"),
            ]);
            setGallery(galleryRes.data);
            setCareers(careersRes.data);
            setOffers(offersRes.data);
            setProjects(projectsRes.data);
        } catch (error) {
            toast.error("Failed to load dashboard data");
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem("skywatt_admin_token");
        navigate("/admin/login");
    };

    // Gallery Actions
    const handleAddGallery = async () => {
        if (!galleryFile) return toast.error("Please select an image");
        const formData = new FormData();
        formData.append("image", galleryFile);
        try {
            await api.post("/gallery", formData);
            toast.success("Image added to gallery");
            setIsGalleryDialogOpen(false);
            setGalleryFile(null);
            fetchData();
        } catch (error) {
            toast.error("Failed to upload image");
        }
    };

    const deleteGallery = async (id: string) => {
        try {
            await api.delete(`/gallery/${id}`);
            fetchData();
            toast.success("Image deleted");
        } catch (error) {
            toast.error("Delete failed");
        }
    };

    // Project Actions
    const handleSaveProject = async () => {
        const formData = new FormData();
        Object.entries(projectForm).forEach(([key, value]) => {
            formData.append(key, value as any);
        });
        if (projectFile) formData.append("image", projectFile);

        try {
            if (projectForm.id) {
                await api.put(`/projects/${projectForm.id}`, formData);
            } else {
                await api.post("/projects", formData);
            }
            setIsProjectDialogOpen(false);
            setProjectForm({ id: "", title: "", description: "", category: "Residential", order: 0 });
            setProjectFile(null);
            fetchData();
            toast.success("Project saved");
        } catch (error) {
            toast.error("Failed to save project");
        }
    };

    const deleteProject = async (id: string) => {
        try {
            await api.delete(`/projects/${id}`);
            fetchData();
            toast.success("Project removed");
        } catch (error) {
            toast.error("Delete failed");
        }
    };

    // Career Actions
    const handleSaveCareer = async () => {
        try {
            if (careerForm.id) {
                await api.put(`/careers/${careerForm.id}`, careerForm);
            } else {
                await api.post("/careers", careerForm);
            }
            setIsCareerDialogOpen(false);
            setCareerForm({ id: "", title: "", postings: 0 });
            fetchData();
            toast.success("Career saved");
        } catch (error) {
            toast.error("Failed to save career");
        }
    };

    const deleteCareer = async (id: string) => {
        try {
            await api.delete(`/careers/${id}`);
            fetchData();
            toast.success("Career removed");
        } catch (error) {
            toast.error("Delete failed");
        }
    };

    // Offer Actions
    const handleSaveOffer = async () => {
        const formData = new FormData();
        Object.entries(offerForm).forEach(([key, value]) => {
            formData.append(key, value as any);
        });
        if (offerFile) formData.append("image", offerFile);

        try {
            if (offerForm.id) {
                await api.put(`/offers/${offerForm.id}`, formData);
            } else {
                await api.post("/offers", formData);
            }
            setIsOfferDialogOpen(false);
            setOfferForm({ id: "", title: "", description: "", link: "", active: true, order: 0 });
            setOfferFile(null);
            fetchData();
            toast.success("Offer saved");
        } catch (error) {
            toast.error("Failed to save offer");
        }
    };

    const deleteOffer = async (id: string) => {
        try {
            await api.delete(`/offers/${id}`);
            fetchData();
            toast.success("Offer removed");
        } catch (error) {
            toast.error("Delete failed");
        }
    };

    const toggleOfferStatus = async (offer: any) => {
        try {
            await api.put(`/offers/${offer._id}`, { ...offer, active: !offer.active });
            fetchData();
        } catch (error) {
            toast.error("Toggle failed");
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <nav className="bg-white border-b sticky top-0 z-10">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="bg-orange-500 p-1.5 rounded-lg">
                            <ImageIcon className="text-white w-5 h-5" />
                        </div>
                        <h1 className="text-xl font-bold text-slate-800">Skywatt Admin</h1>
                    </div>
                    <Button variant="ghost" onClick={logout} className="text-slate-600 hover:text-red-500 hover:bg-red-50">
                        <LogOut className="w-4 h-4 mr-2" /> Logout
                    </Button>
                </div>
            </nav>

            <main className="container mx-auto px-4 py-8">
                <Tabs defaultValue="gallery" className="space-y-6">
                    <TabsList className="grid grid-cols-4 w-fit bg-white border h-12 p-1">
                        <TabsTrigger value="gallery" className="px-6 data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                            <ImageIcon className="w-4 h-4 mr-2" /> Gallery
                        </TabsTrigger>
                        <TabsTrigger value="projects" className="px-6 data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                            <Briefcase className="w-4 h-4 mr-2" /> Projects
                        </TabsTrigger>
                        <TabsTrigger value="careers" className="px-6 data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                            <Users className="w-4 h-4 mr-2" /> Careers
                        </TabsTrigger>
                        <TabsTrigger value="offers" className="px-6 data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                            <Tag className="w-4 h-4 mr-2" /> Popups
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="gallery">
                        <Card className="border-none shadow-lg">
                            <CardHeader className="flex flex-row items-center justify-between border-b bg-white/50 backdrop-blur pb-6 px-6">
                                <div>
                                    <CardTitle className="text-2xl">Photo Gallery</CardTitle>
                                    <CardDescription>Manage all solar project images</CardDescription>
                                </div>
                                <Dialog open={isGalleryDialogOpen} onOpenChange={setIsGalleryDialogOpen}>
                                    <DialogTrigger asChild>
                                        <Button className="bg-orange-600 hover:bg-orange-700">
                                            <Plus className="w-4 h-4 mr-2" /> Add Image
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Add Gallery Image</DialogTitle>
                                        </DialogHeader>
                                        <div className="space-y-4 py-4">
                                            <div className="space-y-2">
                                                <Label>Select Image</Label>
                                                <Input type="file" onChange={(e) => setGalleryFile(e.target.files?.[0] || null)} accept="image/*" />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button onClick={handleAddGallery} className="bg-orange-600 hover:bg-orange-700">Upload Image</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                    {gallery.map((img) => (
                                        <div key={img._id} className="relative group rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all aspect-square">
                                            <img
                                                src={img.imageUrl.startsWith("http") ? img.imageUrl : `${IMAGE_BASE_URL}${img.imageUrl}`}
                                                alt={img.title}
                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                                                <Button variant="destructive" size="icon" className="rounded-full w-10 h-10" onClick={() => deleteGallery(img._id)}>
                                                    <Trash2 className="w-5 h-5" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="projects">
                        <Card className="border-none shadow-lg">
                            <CardHeader className="flex flex-row items-center justify-between border-b bg-white/50 backdrop-blur pb-6 px-6">
                                <div>
                                    <CardTitle className="text-2xl">Project Portfolio</CardTitle>
                                    <CardDescription>Manage project case studies and installations</CardDescription>
                                </div>
                                <Button className="bg-orange-600 hover:bg-orange-700" onClick={() => {
                                    setProjectForm({ id: "", title: "", description: "", category: "Residential", order: 0 });
                                    setIsProjectDialogOpen(true);
                                }}>
                                    <Plus className="w-4 h-4 mr-2" /> Add Project
                                </Button>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {projects.map((project) => (
                                        <Card key={project._id} className="group overflow-hidden shadow-sm hover:shadow-xl transition-all">
                                            <div className="relative aspect-video">
                                                <img
                                                    src={project.imageUrl.startsWith("http") ? project.imageUrl : `${IMAGE_BASE_URL}${project.imageUrl}`}
                                                    className="w-full h-full object-cover"
                                                    alt={project.title}
                                                />
                                                <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Button variant="secondary" size="icon" className="w-8 h-8 rounded-full" onClick={() => {
                                                        setProjectForm({
                                                            id: project._id,
                                                            title: project.title,
                                                            description: project.description,
                                                            category: project.category,
                                                            order: project.order
                                                        });
                                                        setIsProjectDialogOpen(true);
                                                    }}>
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                    <Button variant="destructive" size="icon" className="w-8 h-8 rounded-full" onClick={() => deleteProject(project._id)}>
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                                <Badge className="absolute bottom-2 left-2 bg-black/50 backdrop-blur text-white border-0">
                                                    {project.category}
                                                </Badge>
                                            </div>
                                            <CardHeader className="p-4">
                                                <CardTitle className="text-lg">{project.title}</CardTitle>
                                                <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                                            </CardHeader>
                                        </Card>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Dialog open={isProjectDialogOpen} onOpenChange={setIsProjectDialogOpen}>
                            <DialogContent className="max-w-md">
                                <DialogHeader>
                                    <DialogTitle>{projectForm.id ? "Edit Project" : "Add Project"}</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4 py-4 max-h-[70vh] overflow-y-auto px-1">
                                    <div className="space-y-2">
                                        <Label htmlFor="p-title">Project Title</Label>
                                        <Input id="p-title" value={projectForm.title} onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="p-desc">Description</Label>
                                        <Input id="p-desc" value={projectForm.description} onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="p-cat">Category</Label>
                                        <select
                                            id="p-cat"
                                            className="w-full p-2 border rounded-md"
                                            value={projectForm.category}
                                            onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                                        >
                                            <option value="Residential">Residential</option>
                                            <option value="Commercial">Commercial</option>
                                            <option value="Industrial">Industrial</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="p-order">Order</Label>
                                        <Input id="p-order" type="number" value={projectForm.order} onChange={(e) => setProjectForm({ ...projectForm, order: parseInt(e.target.value) || 0 })} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Project Image</Label>
                                        <Input type="file" onChange={(e) => setProjectFile(e.target.files?.[0] || null)} accept="image/*" />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button onClick={handleSaveProject} className="bg-orange-600 hover:bg-orange-700">Save Project</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </TabsContent>

                    <TabsContent value="careers">
                        <Card className="border-none shadow-lg">
                            <CardHeader className="flex flex-row items-center justify-between border-b bg-white/50 backdrop-blur pb-6 px-6">
                                <div>
                                    <CardTitle className="text-2xl">Career Opportunities</CardTitle>
                                    <CardDescription>Manage job postings shown in the footer</CardDescription>
                                </div>
                                <Button className="bg-orange-600 hover:bg-orange-700" onClick={() => {
                                    setCareerForm({ id: "", title: "", postings: 0 });
                                    setIsCareerDialogOpen(true);
                                }}>
                                    <Plus className="w-4 h-4 mr-2" /> Add Career
                                </Button>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {careers.map((career) => (
                                        <Card key={career._id} className="group hover:border-orange-400 transition-all shadow-sm">
                                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                                <CardTitle className="text-lg">{career.title}</CardTitle>
                                                <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Button variant="ghost" size="icon" onClick={() => {
                                                        setCareerForm({ id: career._id, title: career.title, postings: career.postings });
                                                        setIsCareerDialogOpen(true);
                                                    }}>
                                                        <Edit className="w-4 h-4 text-blue-600" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" onClick={() => deleteCareer(career._id)}>
                                                        <Trash2 className="w-4 h-4 text-red-600" />
                                                    </Button>
                                                </div>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="flex items-center space-x-2 text-slate-600">
                                                    <Briefcase className="w-4 h-4" />
                                                    <span>{career.postings} {career.postings === 1 ? 'posting' : 'postings'}</span>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Dialog open={isCareerDialogOpen} onOpenChange={setIsCareerDialogOpen}>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>{careerForm.id ? "Edit Career" : "Add Career"}</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Job Title</Label>
                                        <Input
                                            id="title"
                                            placeholder="e.g. Sales Manager"
                                            value={careerForm.title}
                                            onChange={(e) => setCareerForm({ ...careerForm, title: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="postings">Number of Postings</Label>
                                        <Input
                                            id="postings"
                                            type="number"
                                            value={careerForm.postings}
                                            onChange={(e) => setCareerForm({ ...careerForm, postings: parseInt(e.target.value) || 0 })}
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button onClick={handleSaveCareer} className="bg-orange-600 hover:bg-orange-700">Save Changes</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </TabsContent>

                    <TabsContent value="offers">
                        <Card className="border-none shadow-lg">
                            <CardHeader className="flex flex-row items-center justify-between border-b bg-white/50 backdrop-blur pb-6 px-6">
                                <div>
                                    <CardTitle className="text-2xl">Promotional Offers</CardTitle>
                                    <CardDescription>Manage the popup grid shown on website entry</CardDescription>
                                </div>
                                <Button className="bg-orange-600 hover:bg-orange-700" onClick={() => {
                                    setOfferForm({ id: "", title: "", description: "", link: "", active: true, order: 0 });
                                    setIsOfferDialogOpen(true);
                                }}>
                                    <Plus className="w-4 h-4 mr-2" /> Add Offer
                                </Button>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {offers.map((offer) => (
                                        <Card key={offer._id} className={`group overflow-hidden shadow-md transition-all ${!offer.active ? 'opacity-70 bg-slate-100' : 'hover:shadow-xl'}`}>
                                            <div className="relative aspect-video">
                                                <img
                                                    src={offer.imageUrl.startsWith("http") ? offer.imageUrl : `${IMAGE_BASE_URL}${offer.imageUrl}`}
                                                    className="w-full h-full object-cover"
                                                    alt={offer.title}
                                                />
                                                <div className="absolute top-2 right-2">
                                                    <Button
                                                        variant={offer.active ? "secondary" : "destructive"}
                                                        size="icon"
                                                        className="w-8 h-8 rounded-full"
                                                        onClick={() => toggleOfferStatus(offer)}
                                                    >
                                                        {offer.active ? <Power className="w-4 h-4" /> : <PowerOff className="w-4 h-4" />}
                                                    </Button>
                                                </div>
                                            </div>
                                            <CardHeader className="p-4 pb-2">
                                                <CardTitle className="text-lg line-clamp-1">{offer.title}</CardTitle>
                                            </CardHeader>
                                            <CardFooter className="p-4 pt-2 flex justify-between">
                                                <div className="flex space-x-2">
                                                    <Button variant="outline" size="icon" onClick={() => {
                                                        setOfferForm({
                                                            id: offer._id,
                                                            title: offer.title,
                                                            description: offer.description || "",
                                                            link: offer.link || "",
                                                            active: offer.active,
                                                            order: offer.order || 0
                                                        });
                                                        setIsOfferDialogOpen(true);
                                                    }}>
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                    <Button variant="outline" size="icon" className="hover:text-red-500" onClick={() => deleteOffer(offer._id)}>
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                                <span className="text-xs font-mono text-slate-400">#Order: {offer.order}</span>
                                            </CardFooter>
                                        </Card>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Dialog open={isOfferDialogOpen} onOpenChange={setIsOfferDialogOpen}>
                            <DialogContent className="max-w-md">
                                <DialogHeader>
                                    <DialogTitle>{offerForm.id ? "Edit Offer" : "Add Offer"}</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4 py-4 max-h-[70vh] overflow-y-auto px-1">
                                    <div className="space-y-2">
                                        <Label htmlFor="o-title">Title</Label>
                                        <Input
                                            id="o-title"
                                            value={offerForm.title}
                                            onChange={(e) => setOfferForm({ ...offerForm, title: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="o-desc">Description</Label>
                                        <Input
                                            id="o-desc"
                                            value={offerForm.description}
                                            onChange={(e) => setOfferForm({ ...offerForm, description: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="o-link">Link (Optional)</Label>
                                        <Input
                                            id="o-link"
                                            value={offerForm.link}
                                            onChange={(e) => setOfferForm({ ...offerForm, link: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="o-order">Display Order</Label>
                                        <Input
                                            id="o-order"
                                            type="number"
                                            value={offerForm.order}
                                            onChange={(e) => setOfferForm({ ...offerForm, order: parseInt(e.target.value) || 0 })}
                                        />
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="o-active"
                                            checked={offerForm.active}
                                            onCheckedChange={(checked) => setOfferForm({ ...offerForm, active: checked === true })}
                                        />
                                        <Label htmlFor="o-active">Active</Label>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Image</Label>
                                        <Input type="file" onChange={(e) => setOfferFile(e.target.files?.[0] || null)} accept="image/*" />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button onClick={handleSaveOffer} className="bg-orange-600 hover:bg-orange-700">Save Offer</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </TabsContent>
                </Tabs>
            </main>

            {loading && (
                <div className="fixed inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <Loader2 className="w-10 h-10 text-orange-600 animate-spin" />
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
