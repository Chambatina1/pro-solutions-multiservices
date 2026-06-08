"use client";

import { useState, useEffect, useRef, type FormEvent } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
} from "framer-motion";
import {
  TreePine,
  Scissors,
  Trash2,
  Droplets,
  Paintbrush,
  Hammer,
  Sun,
  Star,
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  Calculator,
  CheckCircle2,
  Leaf,
  Sprout,
  Home,
  ArrowRight,
  Quote,
  Send,
  Users,
  Award,
  CalendarCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

/* ─────────── DATA ─────────── */

const NAV_LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Galería", href: "#galeria" },
  { label: "Testimonios", href: "#testimonios" },
  { label: "Calculadora", href: "#calculadora" },
  { label: "Contacto", href: "#contacto" },
];

interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  features: string[];
  priceFrom: number;
}

const SERVICES: Service[] = [
  {
    title: "Jardinería y Mantenimiento de Césped",
    description:
      "Servicio completo de jardinería que incluye corte de césped, edging, fertilización, control de malezas y mantenimiento general del área verde de su propiedad. Utilizamos equipos profesionales para garantizar un acabado impecable en cada visita.",
    icon: <Sprout className="h-7 w-7" />,
    image: "/images/service-maintenance.jpg",
    features: [
      "Corte de césped profesional",
      "Fertilización estacional",
      "Control de malezas",
      "Aireación del suelo",
      "Resiembra",
    ],
    priceFrom: 75,
  },
  {
    title: "Poda de Árboles y Arbustos",
    description:
      "Poda profesional de árboles y arbustos para mantener la salud y apariencia de su paisaje. Nuestros expertos evalúan cada planta para aplicar técnicas correctas de poda que promuevan un crecimiento saludable y una estructura fuerte.",
    icon: <Scissors className="h-7 w-7" />,
    image: "/images/service-pruning.jpg",
    features: [
      "Poda de formación",
      "Poda de sanidad",
      "Reducción de copa",
      "Eliminación de ramas muertas",
      "Poda de arbustos ornamentales",
    ],
    priceFrom: 150,
  },
  {
    title: "Limpieza de Terrenos y Yards",
    description:
      "Servicio integral de limpieza que transforma terrenos descuidados en espacios ordenados y agradables. Incluye retirada de escombros, limpieza de maleza alta, nivelación básica y preparación del terreno para nuevos proyectos de paisajismo.",
    icon: <Trash2 className="h-7 w-7" />,
    image: "/images/service-cleanup.jpg",
    features: [
      "Retirada de escombros",
      "Limpieza de maleza",
      "Nivelación del terreno",
      "Preparación para paisajismo",
      "Habitación de lotes vacíos",
    ],
    priceFrom: 200,
  },
  {
    title: "Diseño de Paisajismo",
    description:
      "Diseñamos paisajes personalizados que combinan la belleza del desierto de Arizona con elementos funcionales. Desde xeriscaping eficiente en agua hasta jardines tropicales, creamos espacios exteriores que reflejan su estilo y se adaptan al clima local.",
    icon: <Paintbrush className="h-7 w-7" />,
    image: "/images/service-design.jpg",
    features: [
      "Xeriscaping (paisajismo desértico)",
      "Diseño de jardines",
      "Instalación de plantas nativas",
      "Diseño de áreas de descanso",
      "Planos 3D del proyecto",
    ],
    priceFrom: 500,
  },
  {
    title: "Sistemas de Riego e Irrigación",
    description:
      "Instalación y mantenimiento de sistemas de riego eficientes que conservan agua y mantienen su paisaje saludable. Ofrecemos soluciones de riego por goteo, aspersión y sistemas inteligentes que se adaptan a las condiciones climáticas de Arizona.",
    icon: <Droplets className="h-7 w-7" />,
    image: "/images/service-irrigation.jpg",
    features: [
      "Riego por goteo",
      "Sistemas de aspersión",
      "Controladores inteligentes",
      "Reparación de fugas",
      "Winterización del sistema",
    ],
    priceFrom: 350,
  },
  {
    title: "Construcción Exterior y Hardscape",
    description:
      "Construimos elementos exteriores que transforman su propiedad: muros de contención, patios con piedras pavimentadas, caminos decorativos, áreas de BBQ y más. Cada proyecto se ejecuta con materiales de alta calidad y acabados profesionales.",
    icon: <Hammer className="h-7 w-7" />,
    image: "/images/service-hardscape.jpg",
    features: [
      "Pavimentación de patios",
      "Muros decorativos",
      "Caminos de piedra",
      "Áreas de BBQ",
      "Pérgolas y estructuras",
    ],
    priceFrom: 800,
  },
];

const GALLERY_IMAGES = [
  { src: "/images/service-maintenance.jpg", alt: "Mantenimiento de césped profesional en Arizona" },
  { src: "/images/service-pruning.jpg", alt: "Poda especializada de árboles" },
  { src: "/images/service-cleanup.jpg", alt: "Limpieza completa de terrenos" },
  { src: "/images/service-design.jpg", alt: "Diseño de paisajismo desértico" },
  { src: "/images/service-irrigation.jpg", alt: "Sistema de riego eficiente" },
  { src: "/images/service-hardscape.jpg", alt: "Construcción de patios exteriores" },
];

const REVIEWS = [
  {
    name: "María García",
    rating: 5,
    text: "Contraté a Pro Solutions para el mantenimiento de mi jardín y quedé encantada. Mi césped nunca se ha visto tan verde y saludable. El equipo es puntual, profesional y los precios son muy justos para la calidad del trabajo. Los recomiendo sin dudarlo.",
    service: "Jardinería y Mantenimiento",
    avatar: "MG",
  },
  {
    name: "Robert Johnson",
    rating: 5,
    text: "Needed serious tree pruning after a storm. They came out quickly, gave a fair estimate, and did amazing work. The trees look beautiful and healthy now. Will definitely use their services again for all my landscaping needs.",
    service: "Poda de Árboles",
    avatar: "RJ",
  },
  {
    name: "Ana Martínez",
    rating: 5,
    text: "Transformaron completamente mi patio trasero con un diseño de xeriscaping. Ahorro muchísimo agua y mi jardín se ve increíble todo el año. El equipo fue muy atento a mis ideas y las mejoró con su experiencia profesional.",
    service: "Diseño de Paisajismo",
    avatar: "AM",
  },
  {
    name: "David Wilson",
    rating: 4,
    text: "Great cleanup service for a property I just purchased. They cleared years of overgrowth and debris in just two days. Fair pricing and excellent communication throughout the project. Very satisfied with the results.",
    service: "Limpieza de Terreno",
    avatar: "DW",
  },
  {
    name: "Carmen López",
    rating: 5,
    text: "La instalación del sistema de riego fue impecable. Mi consumo de agua se redujo notablemente y todas mis plantas lucen más saludables. El personal técnico es muy conocedor y me explicó cómo usar y mantener el sistema.",
    service: "Sistemas de Riego",
    avatar: "CL",
  },
  {
    name: "James Thompson",
    rating: 5,
    text: "They built a beautiful paver patio with a fire pit area. The craftsmanship is outstanding and the project was completed on time. Professional crew that cleaned up perfectly after each work day. Highly recommend for any hardscaping project.",
    service: "Construcción Exterior",
    avatar: "JT",
  },
];

const STATS = [
  { number: 500, suffix: "+", label: "Clientes Satisfechos", icon: <Users className="h-6 w-6" /> },
  { number: 12, suffix: "+", label: "Años de Experiencia", icon: <Award className="h-6 w-6" /> },
  { number: 98, suffix: "%", label: "Tasa de Satisfacción", icon: <Star className="h-6 w-6" /> },
  { number: 4.9, suffix: "", label: "Rating en Google", icon: <Star className="h-6 w-6" /> },
];

/* ─────────── ANIMATION VARIANTS ─────────── */

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

/* ─────────── ANIMATED SECTION WRAPPER ─────────── */

function AnimatedSection({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      id={id}
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ─────────── NAVBAR ─────────── */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass shadow-lg shadow-black/5"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-20 items-center justify-between">
          {/* Logo */}
          <a href="#inicio" className="flex items-center gap-2 sm:gap-3">
            <img
              src="/images/logo-icon.png"
              alt="Pro Solutions Multiservices"
              className="h-9 w-9 sm:h-10 sm:w-10 rounded-full object-cover"
            />
            <div className="leading-tight">
              <span className="block text-sm sm:text-base font-bold text-green-800">
                Pro Solutions
              </span>
              <span className="hidden sm:block text-xs text-muted-foreground">
                Multiservices LLC
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-earth-700 hover:text-green-700 transition-colors rounded-lg hover:bg-green-50"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <a href="#contacto" className="hidden sm:inline-flex">
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700 text-white shadow-md shadow-green-600/20"
              >
                <Phone className="mr-2 h-4 w-4" />
                Cotizar Ahora
              </Button>
            </a>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t"
          >
            <div className="px-4 py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-earth-700 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a href="#contacto" onClick={() => setMobileOpen(false)}>
                <Button className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white">
                  <Phone className="mr-2 h-4 w-4" />
                  Cotizar Ahora
                </Button>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* ─────────── HERO ─────────── */

function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-landscaping.jpg"
          alt="Professional landscaping in Arizona"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32 sm:py-40">
        <div className="max-w-2xl">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeInUp}>
              <Badge className="bg-green-600 text-white mb-6 px-4 py-1.5 text-sm">
                <Leaf className="mr-1.5 h-3.5 w-3.5" />
                Servicios Profesionales en Arizona
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
            >
              Tu Paisaje Perfecto{" "}
              <span className="text-green-400">Comienza Aquí</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="mt-6 text-lg sm:text-xl text-white/90 leading-relaxed max-w-xl"
            >
              En <strong>Pro Solutions Multiservices LLC</strong> transformamos espacios
              exteriores con servicios profesionales de jardinería, poda, limpieza y
              construcción. Calidad garantizada con más de 12 años de experiencia en Arizona.
            </motion.p>

            <motion.div variants={fadeInUp} className="mt-8 flex flex-wrap gap-4">
              <a href="#contacto">
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white text-base shadow-xl shadow-green-600/30 px-8"
                >
                  Solicitar Cotización
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <a href="#servicios">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 text-base px-8"
                >
                  Ver Servicios
                </Button>
              </a>
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-12 flex flex-wrap gap-6 sm:gap-10">
              <div className="flex items-center gap-2 text-white/90">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
                <span className="text-sm">Licencia activa en Arizona</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
                <span className="text-sm">Seguro y garantía incluidos</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
                <span className="text-sm">Cotización gratuita</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ChevronDown className="h-8 w-8 text-white/60" />
      </motion.div>
    </section>
  );
}

/* ─────────── STATS ─────────── */

function StatsSection() {
  return (
    <section className="relative -mt-16 z-20 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {STATS.map((stat) => (
          <motion.div
            key={stat.label}
            variants={fadeInUp}
            className="bg-white rounded-xl shadow-xl shadow-black/5 p-5 sm:p-6 text-center border border-green-100"
          >
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-700 mb-3">
              {stat.icon}
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-green-700">
              {stat.number}
              {stat.suffix}
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground mt-1">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

/* ─────────── SERVICES ─────────── */

function ServicesSection() {
  const [expandedService, setExpandedService] = useState<number | null>(null);

  return (
    <AnimatedSection id="servicios" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div variants={fadeInUp} className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <Badge variant="secondary" className="mb-4 text-green-700 bg-green-50 border-green-200">
            Nuestros Servicios
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-earth-800">
            Soluciones Completas para su{" "}
            <span className="gradient-text">Espacio Exterior</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-base sm:text-lg leading-relaxed">
            Ofrecemos una amplia gama de servicios profesionales de jardinería y mantenimiento
            exterior, cada uno ejecutado por personal calificado con equipos de primera calidad.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES.map((service, i) => (
            <motion.div key={service.title} variants={fadeInUp}>
              <Card className="overflow-hidden group h-full border border-green-100/80 hover:border-green-300 hover:shadow-xl hover:shadow-green-600/5 transition-all duration-300">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <div className="flex items-center gap-2 bg-green-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
                      {service.icon}
                      {service.title.split(" ").slice(0, 2).join(" ")}
                    </div>
                  </div>
                </div>

                <CardContent className="p-5 sm:p-6">
                  <h3 className="text-lg font-bold text-earth-800 mb-2 leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {service.description}
                  </p>

                  {/* Features toggle */}
                  <button
                    onClick={() =>
                      setExpandedService(expandedService === i ? null : i)
                    }
                    className="flex items-center gap-1.5 text-sm font-medium text-green-700 hover:text-green-800 transition-colors"
                  >
                    {expandedService === i ? (
                      <>
                        Ocultar detalles <ChevronUp className="h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Ver detalles <ChevronDown className="h-4 w-4" />
                      </>
                    )}
                  </button>

                  <AnimatePresence>
                    {expandedService === i && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <ul className="mt-3 space-y-2">
                          {service.features.map((feature) => (
                            <li
                              key={feature}
                              className="flex items-center gap-2 text-sm text-earth-600"
                            >
                              <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <Separator className="my-4" />

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-muted-foreground">Desde</span>
                      <p className="text-xl font-bold text-green-700">
                        ${service.priceFrom}
                      </p>
                    </div>
                    <a href="#contacto">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-green-200 text-green-700 hover:bg-green-50 hover:text-green-800"
                      >
                        Cotizar
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ─────────── GALLERY ─────────── */

function GallerySection() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [selectedAlt, setSelectedAlt] = useState<string>("");

  return (
    <AnimatedSection
      id="galeria"
      className="py-20 sm:py-28 bg-gradient-to-b from-earth-50/50 to-transparent"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeInUp} className="text-center max-w-3xl mx-auto mb-14">
          <Badge variant="secondary" className="mb-4 text-green-700 bg-green-50 border-green-200">
            Galería de Trabajos
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-earth-800">
            Nuestros <span className="gradient-text">Proyectos Realizados</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-base sm:text-lg leading-relaxed">
            Cada proyecto es una muestra de nuestro compromiso con la calidad y la satisfacción
            del cliente. Descubra lo que podemos lograr en su propiedad.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {GALLERY_IMAGES.map((img, i) => (
            <motion.div
              key={img.src}
              variants={scaleIn}
              className="relative group cursor-pointer rounded-xl overflow-hidden aspect-[4/3] shadow-lg"
              onClick={() => {
                setSelectedImg(img.src);
                setSelectedAlt(img.alt);
              }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3">
                  <Sun className="h-5 w-5 text-green-700" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Dialog */}
      <Dialog
        open={!!selectedImg}
        onOpenChange={() => setSelectedImg(null)}
      >
        <DialogContent className="max-w-4xl p-2 bg-black/90 border-none">
          <DialogHeader className="sr-only">
            <DialogTitle>Imagen del proyecto</DialogTitle>
            <DialogDescription>Proyecto de landscaping</DialogDescription>
          </DialogHeader>
          {selectedImg && (
            <img
              src={selectedImg}
              alt={selectedAlt}
              className="w-full rounded-lg"
            />
          )}
        </DialogContent>
      </Dialog>
    </AnimatedSection>
  );
}

/* ─────────── REVIEWS ─────────── */

function ReviewsSection() {
  return (
    <AnimatedSection id="testimonios" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeInUp} className="text-center max-w-3xl mx-auto mb-14">
          <Badge variant="secondary" className="mb-4 text-green-700 bg-green-50 border-green-200">
            Testimonios
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-earth-800">
            Lo Que Dicen Nuestros{" "}
            <span className="gradient-text">Clientes</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-base sm:text-lg leading-relaxed">
            La satisfacción de nuestros clientes es nuestra mejor carta de presentación.
            Lea las experiencias reales de quienes confiaron en nosotros.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((review, i) => (
            <motion.div key={review.name} variants={fadeInUp}>
              <Card className="h-full border border-green-100/80 hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-5 sm:p-6">
                  {/* Quote icon & stars */}
                  <div className="flex items-start justify-between mb-4">
                    <Quote className="h-8 w-8 text-green-200" />
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star
                          key={s}
                          className={`h-4 w-4 ${
                            s < review.rating
                              ? "fill-amber-500 text-amber-500"
                              : "fill-gray-200 text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Review text */}
                  <p className="text-sm text-earth-600 leading-relaxed mb-4">
                    &ldquo;{review.text}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-green-100">
                    <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-sm">
                      {review.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-earth-800">
                        {review.name}
                      </p>
                      <p className="text-xs text-muted-foreground">{review.service}</p>
                    </div>
                    <div className="ml-auto">
                      <img
                        src="https://www.gstatic.com/images/branding/googlelogo/2x/googlelogo_color_27x92dp.png"
                        alt="Google"
                        className="h-4 opacity-50"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ─────────── PRICE CALCULATOR ─────────── */

interface CalcState {
  service: string;
  propertySize: string;
  frequency: string;
  extras: string[];
  calculatedPrice: number | null;
}

function PriceCalculatorSection() {
  const [calc, setCalc] = useState<CalcState>({
    service: "",
    propertySize: "",
    frequency: "",
    extras: [],
    calculatedPrice: null,
  });
  const { toast } = useToast();

  const SERVICE_PRICES: Record<string, number> = {
    lawn: 0.04,
    pruning: 8,
    cleanup: 0.15,
    design: 3.5,
    irrigation: 2.5,
    hardscape: 5,
  };

  const SIZE_MULTIPLIERS: Record<string, number> = {
    small: 0.7,
    medium: 1,
    large: 1.5,
    extra_large: 2,
  };

  const FREQUENCY_DISCOUNTS: Record<string, number> = {
    one_time: 1,
    monthly: 0.85,
    biweekly: 0.9,
    weekly: 0.8,
  };

  const EXTRAS_PRICES: Record<string, number> = {
    fertilization: 45,
    weed_control: 35,
    aeration: 60,
    mulch_installation: 50,
    pest_control: 55,
    seasonal_cleaning: 75,
  };

  const SERVICE_LABELS: Record<string, string> = {
    lawn: "Jardinería y Mantenimiento de Césped",
    pruning: "Poda de Árboles y Arbustos",
    cleanup: "Limpieza de Terrenos y Yards",
    design: "Diseño de Paisajismo",
    irrigation: "Sistemas de Riego e Irrigación",
    hardscape: "Construcción Exterior y Hardscape",
  };

  const EXTRA_LABELS: Record<string, string> = {
    fertilization: "Fertilización (+$45)",
    weed_control: "Control de Malezas (+$35)",
    aeration: "Aireación (+$60)",
    mulch_installation: "Instalación de Mulch (+$50)",
    pest_control: "Control de Plagas (+$55)",
    seasonal_cleaning: "Limpieza Estacional (+$75)",
  };

  function calculatePrice() {
    if (!calc.service || !calc.propertySize || !calc.frequency) {
      toast({
        title: "Campos requeridos",
        description: "Por favor seleccione el servicio, tamaño y frecuencia.",
        variant: "destructive",
      });
      return;
    }

    const baseRate = SERVICE_PRICES[calc.service] || 0;
    const sizeMultiplier = SIZE_MULTIPLIERS[calc.propertySize] || 1;
    const freqDiscount = FREQUENCY_DISCOUNTS[calc.frequency] || 1;

    let basePrice: number;

    if (calc.service === "lawn") {
      basePrice = baseRate * (sizeMultiplier === 0.7 ? 2000 : sizeMultiplier === 1 ? 4000 : sizeMultiplier === 1.5 ? 7000 : 10000);
    } else if (calc.service === "cleanup") {
      basePrice = baseRate * (sizeMultiplier === 0.7 ? 1500 : sizeMultiplier === 1 ? 3000 : sizeMultiplier === 1.5 ? 5000 : 8000);
    } else if (calc.service === "design" || calc.service === "irrigation" || calc.service === "hardscape") {
      basePrice = baseRate * (sizeMultiplier === 0.7 ? 200 : sizeMultiplier === 1 ? 400 : sizeMultiplier === 1.5 ? 600 : 800);
    } else {
      basePrice = baseRate * (sizeMultiplier === 0.7 ? 3 : sizeMultiplier === 1 ? 5 : sizeMultiplier === 1.5 ? 8 : 12);
    }

    basePrice = basePrice * freqDiscount;

    const extrasTotal = calc.extras.reduce(
      (sum, e) => sum + (EXTRAS_PRICES[e] || 0),
      0
    );

    const total = Math.round(basePrice + extrasTotal);
    setCalc((prev) => ({ ...prev, calculatedPrice: total }));

    toast({
      title: "Precio estimado calculado",
      description: `El precio estimado es $${total}. Recuerde que es solo una estimación.`,
    });
  }

  function toggleExtra(extra: string) {
    setCalc((prev) => ({
      ...prev,
      extras: prev.extras.includes(extra)
        ? prev.extras.filter((e) => e !== extra)
        : [...prev.extras, extra],
      calculatedPrice: null,
    }));
  }

  return (
    <AnimatedSection
      id="calculadora"
      className="py-20 sm:py-28 bg-gradient-to-b from-green-50/60 to-transparent"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeInUp} className="text-center max-w-3xl mx-auto mb-14">
          <Badge variant="secondary" className="mb-4 text-green-700 bg-green-50 border-green-200">
            <Calculator className="mr-1.5 h-3.5 w-3.5" />
            Calculadora de Precio
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-earth-800">
            Estime su <span className="gradient-text">Inversión</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-base sm:text-lg leading-relaxed">
            Utilice nuestra calculadora para obtener una estimación aproximada del costo
            de su proyecto. Los precios están ajustados al mercado de Arizona.
          </p>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Card className="border-2 border-green-200/60 shadow-lg shadow-green-600/5 overflow-hidden">
            <CardContent className="p-6 sm:p-8">
              <div className="grid sm:grid-cols-2 gap-6">
                {/* Service Select */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-earth-700">
                    Tipo de Servicio
                  </Label>
                  <Select
                    value={calc.service}
                    onValueChange={(v) =>
                      setCalc((p) => ({ ...p, service: v, calculatedPrice: null }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un servicio" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(SERVICE_LABELS).map(([key, label]) => (
                        <SelectItem key={key} value={key}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Property Size */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-earth-700">
                    Tamaño de Propiedad
                  </Label>
                  <Select
                    value={calc.propertySize}
                    onValueChange={(v) =>
                      setCalc((p) => ({ ...p, propertySize: v, calculatedPrice: null }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione tamaño" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">
                        Pequeño (hasta 2,000 sq ft)
                      </SelectItem>
                      <SelectItem value="medium">
                        Mediano (2,000 - 5,000 sq ft)
                      </SelectItem>
                      <SelectItem value="large">
                        Grande (5,000 - 10,000 sq ft)
                      </SelectItem>
                      <SelectItem value="extra_large">
                        Extra Grande (10,000+ sq ft)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Frequency */}
                <div className="space-y-2 sm:col-span-2">
                  <Label className="text-sm font-semibold text-earth-700">
                    Frecuencia del Servicio
                  </Label>
                  <Select
                    value={calc.frequency}
                    onValueChange={(v) =>
                      setCalc((p) => ({ ...p, frequency: v, calculatedPrice: null }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione frecuencia" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="one_time">
                        Una sola vez (sin descuento)
                      </SelectItem>
                      <SelectItem value="monthly">
                        Mensual (15% descuento)
                      </SelectItem>
                      <SelectItem value="biweekly">
                        Quincenal (10% descuento)
                      </SelectItem>
                      <SelectItem value="weekly">
                        Semanal (20% descuento)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Extras */}
                <div className="space-y-2 sm:col-span-2">
                  <Label className="text-sm font-semibold text-earth-700">
                    Servicios Adicionales
                  </Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1">
                    {Object.entries(EXTRA_LABELS).map(([key, label]) => (
                      <button
                        key={key}
                        onClick={() => toggleExtra(key)}
                        className={`px-3 py-2.5 text-xs sm:text-sm rounded-lg border transition-all duration-200 text-left ${
                          calc.extras.includes(key)
                            ? "bg-green-600 text-white border-green-600 shadow-sm"
                            : "bg-white text-earth-600 border-green-200 hover:border-green-400 hover:bg-green-50"
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          {calc.extras.includes(key) ? (
                            <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                          ) : (
                            <div className="h-3.5 w-3.5 rounded-full border-2 border-green-300 shrink-0" />
                          )}
                          <span className="leading-tight">{label}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Calculate Button */}
              <div className="mt-8 text-center">
                <Button
                  size="lg"
                  onClick={calculatePrice}
                  className="bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/25 px-10 text-base"
                >
                  <Calculator className="mr-2 h-5 w-5" />
                  Calcular Precio Estimado
                </Button>
              </div>

              {/* Result */}
              <AnimatePresence>
                {calc.calculatedPrice !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-8 bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 sm:p-8 text-center text-white"
                  >
                    <p className="text-sm font-medium text-green-100 mb-1">
                      Precio Estimado Total
                    </p>
                    <p className="text-4xl sm:text-5xl font-bold">
                      ${calc.calculatedPrice.toLocaleString()}
                    </p>
                    <p className="text-green-200 text-sm mt-3 max-w-lg mx-auto">
                      * Esta es una estimación basada en promedios del mercado en Arizona.
                      Los precios finales pueden variar según la complejidad específica del
                      proyecto. Solicite una cotización personalizada para un precio exacto.
                    </p>
                    <a href="#contacto">
                      <Button
                        variant="outline"
                        className="mt-5 bg-white text-green-700 hover:bg-green-50 border-white font-semibold"
                      >
                        <Send className="mr-2 h-4 w-4" />
                        Solicitar Cotización Exacta
                      </Button>
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

/* ─────────── CONTACT / QUOTE FORM ─────────── */

function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    propertySize: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast({
      title: "Cotización enviada",
      description:
        "Hemos recibido su solicitud. Nos pondremos en contacto dentro de 24 horas.",
    });
  };

  if (submitted) {
    return (
      <AnimatedSection id="contacto" className="py-20 sm:py-28">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div variants={scaleIn}>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-earth-800 mb-4">
              Solicitud Recibida
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-8">
              Gracias por su interés en nuestros servicios. Nuestro equipo revisará su
              solicitud y se pondrá en contacto con usted dentro de las próximas 24 horas.
            </p>
            <Button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  name: "",
                  email: "",
                  phone: "",
                  service: "",
                  propertySize: "",
                  message: "",
                });
              }}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Enviar Otra Cotización
            </Button>
          </motion.div>
        </div>
      </AnimatedSection>
    );
  }

  return (
    <AnimatedSection id="contacto" className="py-20 sm:py-28 bg-gradient-to-b from-earth-50/50 to-transparent">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left - Info */}
          <motion.div variants={fadeInUp}>
            <Badge variant="secondary" className="mb-4 text-green-700 bg-green-50 border-green-200">
              Contacto
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-earth-800 mb-4">
              Solicite su <span className="gradient-text">Cotización Gratuita</span>
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-8">
              Complete el formulario y uno de nuestros especialistas se comunicará con usted
              para evaluar su proyecto y ofrecerle una cotización personalizada sin compromiso.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                  <Phone className="h-5 w-5 text-green-700" />
                </div>
                <div>
                  <p className="font-semibold text-earth-800 text-sm">Teléfono</p>
                  <p className="text-muted-foreground text-sm">(786) 307-9608</p>
                  <p className="text-xs text-muted-foreground">Lunes a Sábado, 7am - 6pm</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5 text-green-700" />
                </div>
                <div>
                  <p className="font-semibold text-earth-800 text-sm">Email</p>
                  <p className="text-muted-foreground text-sm">prosolutionsmultiservices@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-green-700" />
                </div>
                <div>
                  <p className="font-semibold text-earth-800 text-sm">Área de Servicio</p>
                  <p className="text-muted-foreground text-sm">
                    Tucson, Phoenix, y áreas circundantes en Arizona
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                  <CalendarCheck className="h-5 w-5 text-green-700" />
                </div>
                <div>
                  <p className="font-semibold text-earth-800 text-sm">Horario</p>
                  <p className="text-muted-foreground text-sm">
                    Lunes a Sábado: 7:00 AM - 6:00 PM
                  </p>
                  <p className="text-xs text-muted-foreground">Domingo: Cerrado</p>
                </div>
              </div>
            </div>

            {/* Other Services hint */}
            <Separator className="my-8" />
            <div>
              <p className="text-sm font-semibold text-earth-700 mb-2">
                <Home className="inline mr-1.5 h-4 w-4" />
                Otros Servicios Disponibles
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Además de jardinería y exteriores, ofrecemos servicios de limpieza
                general, mantenimiento de propiedades, pressure washing y más. Pregunte
                por nuestros paquetes combinados para obtener mejores precios.
              </p>
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div variants={fadeInUp}>
            <Card className="border-2 border-green-200/60 shadow-lg shadow-green-600/5">
              <CardContent className="p-6 sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre Completo *</Label>
                      <Input
                        id="name"
                        required
                        placeholder="Su nombre"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, name: e.target.value }))
                        }
                        className="border-green-200 focus-visible:ring-green-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Teléfono *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        placeholder="(786) 307-9608"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, phone: e.target.value }))
                        }
                        className="border-green-200 focus-visible:ring-green-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      placeholder="su@email.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, email: e.target.value }))
                      }
                      className="border-green-200 focus-visible:ring-green-500"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Servicio de Interés *</Label>
                      <Select
                        value={formData.service}
                        onValueChange={(v) =>
                          setFormData((p) => ({ ...p, service: v }))
                        }
                        required
                      >
                        <SelectTrigger className="border-green-200">
                          <SelectValue placeholder="Seleccione servicio" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lawn">
                            Jardinería y Mantenimiento
                          </SelectItem>
                          <SelectItem value="pruning">Poda de Árboles</SelectItem>
                          <SelectItem value="cleanup">Limpieza de Terreno</SelectItem>
                          <SelectItem value="design">Diseño de Paisajismo</SelectItem>
                          <SelectItem value="irrigation">Sistemas de Riego</SelectItem>
                          <SelectItem value="hardscape">Construcción Exterior</SelectItem>
                          <SelectItem value="pressure">Pressure Washing</SelectItem>
                          <SelectItem value="cleaning">Limpieza General</SelectItem>
                          <SelectItem value="other">Otro Servicio</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Tamaño de Propiedad</Label>
                      <Select
                        value={formData.propertySize}
                        onValueChange={(v) =>
                          setFormData((p) => ({ ...p, propertySize: v }))
                        }
                      >
                        <SelectTrigger className="border-green-200">
                          <SelectValue placeholder="Seleccione tamaño" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Pequeña</SelectItem>
                          <SelectItem value="medium">Mediana</SelectItem>
                          <SelectItem value="large">Grande</SelectItem>
                          <SelectItem value="extra_large">Extra Grande</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Descripción del Proyecto</Label>
                    <Textarea
                      id="message"
                      placeholder="Describa brevemente lo que necesita, ubicación, detalles específicos..."
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, message: e.target.value }))
                      }
                      className="border-green-200 focus-visible:ring-green-500 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/25 text-base"
                  >
                    <Send className="mr-2 h-5 w-5" />
                    Enviar Solicitud de Cotización
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    Al enviar este formulario, acepta ser contactado por nuestro equipo.
                    No compartimos su información con terceros.
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ─────────── FOOTER ─────────── */

function Footer() {
  return (
    <footer className="bg-earth-800 text-white/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/images/logo-icon.png"
                alt="Pro Solutions Multiservices"
                className="h-10 w-10 rounded-full object-cover border-2 border-green-400"
              />
              <div>
                <p className="font-bold text-white text-base">Pro Solutions</p>
                <p className="text-xs text-white/50">Multiservices LLC</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-white/60">
              Servicios profesionales de jardinería, limpieza, poda y mantenimiento
              exterior en Arizona. Más de 12 años transformando propiedades residenciales
              y comerciales.
            </p>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4 uppercase tracking-wider">
              Servicios
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#servicios" className="hover:text-green-400 transition-colors">
                  Jardinería y Mantenimiento
                </a>
              </li>
              <li>
                <a href="#servicios" className="hover:text-green-400 transition-colors">
                  Poda de Árboles
                </a>
              </li>
              <li>
                <a href="#servicios" className="hover:text-green-400 transition-colors">
                  Limpieza de Terrenos
                </a>
              </li>
              <li>
                <a href="#servicios" className="hover:text-green-400 transition-colors">
                  Diseño de Paisajismo
                </a>
              </li>
              <li>
                <a href="#servicios" className="hover:text-green-400 transition-colors">
                  Sistemas de Riego
                </a>
              </li>
              <li>
                <a href="#servicios" className="hover:text-green-400 transition-colors">
                  Construcción Exterior
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4 uppercase tracking-wider">
              Enlaces Rápidos
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#inicio" className="hover:text-green-400 transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#galeria" className="hover:text-green-400 transition-colors">
                  Galería
                </a>
              </li>
              <li>
                <a href="#testimonios" className="hover:text-green-400 transition-colors">
                  Testimonios
                </a>
              </li>
              <li>
                <a href="#calculadora" className="hover:text-green-400 transition-colors">
                  Calculadora de Precio
                </a>
              </li>
              <li>
                <a href="#contacto" className="hover:text-green-400 transition-colors">
                  Cotizar Servicio
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4 uppercase tracking-wider">
              Contacto
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-green-400 shrink-0" />
                (786) 307-9608
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-green-400 shrink-0" />
                prosolutionsmultiservices@gmail.com
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />
                <span>Tucson, AZ y áreas circundantes</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-green-400 shrink-0" />
                Lun - Sáb: 7am - 6pm
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-10 bg-white/10" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>
            &copy; {new Date().getFullYear()} Pro Solutions Multiservices LLC. Todos los
            derechos reservados.
          </p>
          <p>
            Licenciado y asegurado en el Estado de Arizona | ROC #XXXXXX
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─────────── MAIN PAGE ─────────── */

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <GallerySection />
      <ReviewsSection />
      <PriceCalculatorSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
