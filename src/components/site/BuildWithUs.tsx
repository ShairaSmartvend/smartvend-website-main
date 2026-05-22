import { useRef, useEffect, useState } from "react";
import {
  Code2,
  Smartphone,
  Zap,
  BarChart,
  Palette,
  Cpu,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  MessageSquare,
  X,
  Lightbulb,
  Target,
  Rocket,
  Trophy,
  ChevronDown,
  AlertCircle,
  Wrench,
} from "lucide-react";
import emailjs from "@emailjs/browser";

export function BuildWithUs() {
  const titleRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedProjectType, setSelectedProjectType] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    hour: "",
    minute: "",
    period: "AM",
    projectType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isProjectTypeOpen, setIsProjectTypeOpen] = useState(false);
  const [isHourOpen, setIsHourOpen] = useState(false);
  const [isMinuteOpen, setIsMinuteOpen] = useState(false);
  const [isPeriodOpen, setIsPeriodOpen] = useState(false);

  // Intersection Observer states for animations
  const [visibleProjects, setVisibleProjects] = useState<Record<number, boolean>>({});
  const [visibleSteps, setVisibleSteps] = useState<Record<number, boolean>>({});
  const projectCardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const stepCardRefs = useRef<Array<HTMLDivElement | null>>([]);

  const projectTypeRef = useRef<HTMLDivElement>(null);
  const hourRef = useRef<HTMLDivElement>(null);
  const minuteRef = useRef<HTMLDivElement>(null);
  const periodRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLInputElement | null>(null);

  const openDatePicker = () => {
    dateRef.current?.focus();
    (dateRef.current as HTMLInputElement & { showPicker?: () => void })?.showPicker?.();
  };

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (titleRef.current) {
        titleRef.current.classList.add("revealed");
      }
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (publicKey) {
      emailjs.init(publicKey);
    }
  }, []);

  useEffect(() => {
    if (selectedProjectType && showModal) {
      setFormData(prev => ({ ...prev, projectType: selectedProjectType }));
    }
  }, [selectedProjectType, showModal]);

  useEffect(() => {
    const handleClickOutside = event => {
      if (projectTypeRef.current && !projectTypeRef.current.contains(event.target)) {
        setIsProjectTypeOpen(false);
      }
      if (hourRef.current && !hourRef.current.contains(event.target)) {
        setIsHourOpen(false);
      }
      if (minuteRef.current && !minuteRef.current.contains(event.target)) {
        setIsMinuteOpen(false);
      }
      if (periodRef.current && !periodRef.current.contains(event.target)) {
        setIsPeriodOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Intersection Observer for project cards
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const idx = entry.target.getAttribute("data-card-idx");
          if (idx !== null && entry.isIntersecting) {
            setVisibleProjects(prev => ({ ...prev, [idx]: true }));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -50px 0px" },
    );

    projectCardRefs.current.forEach((el, idx) => {
      if (el) {
        el.setAttribute("data-card-idx", idx.toString());
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  // Intersection Observer for process steps
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const idx = entry.target.getAttribute("data-step-idx");
          if (idx !== null && entry.isIntersecting) {
            setVisibleSteps(prev => ({ ...prev, [idx]: true }));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -50px 0px" },
    );

    stepCardRefs.current.forEach((el, idx) => {
      if (el) {
        el.setAttribute("data-step-idx", idx.toString());
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  const handleOpenModal = (projectType = "") => {
    setSelectedProjectType(projectType);
    setShowModal(true);
  };

  // Phone number formatting: automatically adds spaces (4-3-4)
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, "");
    if (raw.length > 11) raw = raw.slice(0, 11);
    setFormData({ ...formData, phone: raw });
  };

  const handleInputChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.email || !formData.message || !formData.date) {
      setError("Please fill in all required fields");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId =
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID_BUILDWITHUS ||
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

    if (!serviceId || !templateId) {
      setError("Email service not configured. Please contact support.");
      setIsSubmitting(false);
      return;
    }

    const selectedTypeLabel =
      projectOptions.find(option => option.value === formData.projectType)?.label ||
      "Not specified";

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      from_phone: formData.phone,
      to_name: "Smartvend",
      subject: "Build With Us Consultation Request",
      project_type: selectedTypeLabel,
      preferred_date: formData.date,
      preferred_time: `${formData.hour}:${formData.minute} ${formData.period}`,
      message: formData.message,
      time: new Date().toLocaleString(),
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams);
      setSubmitted(true);
      setTimeout(() => {
        setShowModal(false);
        setSubmitted(false);
        setSelectedProjectType("");
        setFormData({
          name: "",
          email: "",
          phone: "",
          date: "",
          hour: "",
          minute: "",
          period: "AM",
          projectType: "",
          message: "",
        });
      }, 2000);
    } catch (err) {
      console.error("Error sending email:", err);
      setError("Failed to send request. Please try again later.");
      setTimeout(() => setError(""), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const projectOptions = [
    { value: "web", label: "Web Development", icon: Code2 },
    { value: "mobile", label: "Mobile App Development", icon: Smartphone },
    { value: "pos", label: "POS Systems", icon: Zap },
    { value: "analytics", label: "Analytics & BI", icon: BarChart },
    { value: "uiux", label: "UI/UX Design", icon: Palette },
    { value: "custom", label: "Custom Software", icon: Cpu },
  ];

  const hourOptions = Array.from({ length: 12 }, (_, i) => ({ value: i + 1, label: i + 1 }));
  const minuteOptions = [
    { value: "00", label: "00" },
    { value: "15", label: "15" },
    { value: "30", label: "30" },
    { value: "45", label: "45" },
  ];
  const periodOptions = [
    { value: "AM", label: "AM" },
    { value: "PM", label: "PM" },
  ];

  const projects = [
    {
      id: "web",
      title: "Web Development",
      description:
        "High-performance web applications built with modern frameworks, optimized for speed, security, and scalability.",
      icon: Code2,
      gradient: "from-blue-500 to-cyan-400",
      bgGradient: "from-blue-600/30 to-cyan-500/20",
      borderColor: "border-blue-500/50",
      bgColor: "bg-[#0a0f1a]",
    },
    {
      id: "mobile",
      title: "Mobile App Development",
      description:
        "Native iOS and Android applications with intuitive interfaces and seamless performance across all devices.",
      icon: Smartphone,
      gradient: "from-purple-500 to-pink-400",
      bgGradient: "from-purple-600/30 to-pink-500/20",
      borderColor: "border-purple-500/50",
      bgColor: "bg-[#0a0f1a]",
    },
    {
      id: "pos",
      title: "POS Systems",
      description:
        "Comprehensive point-of-sale solutions for retail and service businesses with real-time inventory management.",
      icon: Zap,
      gradient: "from-orange-500 to-red-400",
      bgGradient: "from-orange-600/30 to-red-500/20",
      borderColor: "border-orange-500/50",
      bgColor: "bg-[#0a0f1a]",
    },
    {
      id: "analytics",
      title: "Analytics & BI",
      description:
        "Data analysis, reporting, and visualization to help you understand performance and drive better business decisions.",
      icon: BarChart,
      gradient: "from-sky-500 to-blue-400",
      bgGradient: "from-sky-600/30 to-blue-500/20",
      borderColor: "border-sky-500/50",
      bgColor: "bg-[#0a0f1a]",
    },
    {
      id: "uiux",
      title: "UI/UX Design",
      description:
        "Beautiful, intuitive interfaces designed for conversion that blend aesthetics with functionality.",
      icon: Palette,
      gradient: "from-pink-500 to-rose-400",
      bgGradient: "from-pink-600/30 to-rose-500/20",
      borderColor: "border-pink-500/50",
      bgColor: "bg-[#0a0f1a]",
    },
    {
      id: "custom",
      title: "Custom Software Development",
      description:
        "Custom-built software designed to fit your unique business needs, from planning to launch and support.",
      icon: Cpu,
      gradient: "from-indigo-500 to-blue-400",
      bgGradient: "from-indigo-600/30 to-blue-500/20",
      borderColor: "border-indigo-500/50",
      bgColor: "bg-[#0a0f1a]",
    },
  ];

  const processSteps = [
    {
      num: "01",
      title: "Discovery",
      desc: "We learn about your vision and requirements in detail",
      icon: Lightbulb,
    },
    {
      num: "02",
      title: "Strategy",
      desc: "We create a detailed roadmap and timeline for success",
      icon: Target,
    },
    {
      num: "03",
      title: "Development",
      desc: "We build with agility, transparency, and excellence",
      icon: Rocket,
    },
    {
      num: "04",
      title: "Launch",
      desc: "We deploy and support your growth and success",
      icon: Trophy,
    },
    {
      num: "05",
      title: "Maintain",
      desc: "We provide continuous support, updates, and improvements to keep your system running smoothly",
      icon: Wrench,
    },
  ];

  // Helper to display formatted phone number (4-3-4)
  const formatPhoneDisplay = (raw: string) => {
    if (!raw) return "";
    if (raw.length <= 4) return raw;
    if (raw.length <= 7) return raw.slice(0, 4) + " " + raw.slice(4);
    return raw.slice(0, 4) + " " + raw.slice(4, 7) + " " + raw.slice(7, 11);
  };

  // Define bright neon glow colors for each step (CSS-compatible)
 const stepGlowColors = [
    "#00f0ff", // Discovery – bright neon cyan
    "#a855f7", // Strategy – purple (keep as is)
    "#f97316", // Development – orange
    "#10b981", // Launch – green
    "#6366f1", // Maintain – indigo
];

  return (
    <section
      id="projects"
      className="relative py-10 px-5 overflow-hidden bg-gradient-to-br from-[#0a0a0f] via-[#0d1117] to-[#080e18] scroll-mt-20"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 -left-40 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 -right-40 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 backdrop-blur-sm px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-cyan-400 border border-white/10 mb-5">
            <Sparkles className="h-3 w-3" />
            Build With Us
          </div>
          <h2
            ref={titleRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-5"
          >
            What do you want to{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              build
            </span>
            ?
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6 md:mb-8 px-2">
            Choose your project type and let's turn your vision into reality. Each option is
            customizable to your specific needs with our flexible engagement models.
          </p>

          <div className="relative inline-block group">
            <div
              className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition duration-700 animate-pulse"
              style={{ animationDuration: "3s" }}
            />
            <div
              className="absolute -inset-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-2xl opacity-50 group-hover:opacity-75 transition duration-700"
              style={{ animation: "ping 3s cubic-bezier(0, 0, 0.2, 1) infinite" }}
            />
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/50 to-blue-600/50 rounded-full blur-md opacity-0 group-hover:opacity-100 transition duration-500" />
            <button
              onClick={() => handleOpenModal("")}
              className="relative inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold text-white shadow-lg transition-all duration-300 hover:gap-4 hover:shadow-xl hover:scale-105 overflow-hidden hover:cursor-pointer"
            >
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
              Schedule a Free Consultation
              <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
            </button>
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => {
            const Icon = project.icon;
            const isVisible = visibleProjects[index];
            return (
              <div
                key={project.id}
                ref={el => (projectCardRefs.current[index] = el)}
                className={`group relative rounded-2xl overflow-hidden transition-all duration-700 hover:-translate-y-2 will-change-transform ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.bgGradient} ${project.bgColor} rounded-2xl border-2 ${project.borderColor} transition-all duration-500 group-hover:border-opacity-100`}
                />
                <div className="absolute inset-0 bg-[#0d1117]/80 rounded-2xl transition-all duration-500 group-hover:bg-transparent" />
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
                </div>
                <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-white/5 to-transparent rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-white/5 to-transparent rounded-br-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 p-6 sm:p-8">
                  <div
                    className={`relative inline-flex p-3 sm:p-4 rounded-xl bg-gradient-to-br ${project.gradient} mb-4 sm:mb-6 shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:shadow-xl`}
                  >
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <h3
                    className={`text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-white transition-all duration-300 group-hover:bg-gradient-to-r ${project.gradient} group-hover:bg-clip-text group-hover:text-transparent`}
                  >
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 transition-all duration-300 group-hover:text-gray-300">
                    {project.description}
                  </p>
                  <button
                    onClick={() => handleOpenModal(project.id)}
                    className={`inline-flex items-center gap-2 rounded-lg bg-gradient-to-r ${project.gradient} px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:gap-3 hover:shadow-xl group-hover:translate-x-1 hover:cursor-pointer`}
                  >
                    Get Started{" "}
                    <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                  <div
                    className={`absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br ${project.gradient} rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-all duration-500`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Process Section - with CSS group-hover glow (cursor pointer, hover anywhere triggers glow) */}
        <div className="mt-16 md:mt-20">
          <div className="text-center mb-10 md:mb-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 backdrop-blur-sm px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-cyan-400 border border-cyan-400/30 mb-4">
              How We Work
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
              Our{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Proven Process
              </span>
            </h3>
            <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto px-4">
              A transparent, collaborative approach that ensures your vision comes to life
            </p>
          </div>

          <div className="max-w-4xl mx-auto px-2 sm:px-4">
            {processSteps.map((step, idx) => {
              const StepIcon = step.icon;
              const isVisible = visibleSteps[idx];
              const glowColor = stepGlowColors[idx % stepGlowColors.length];
              const gradientClass =
                idx === 0
                  ? "from-blue-500 to-cyan-400"
                  : idx === 1
                  ? "from-purple-500 to-pink-400"
                  : idx === 2
                  ? "from-orange-500 to-red-400"
                  : idx === 3
                  ? "from-green-500 to-emerald-400"
                  : "from-indigo-500 to-violet-400";

              return (
                <div
                  key={idx}
                  ref={el => (stepCardRefs.current[idx] = el)}
                  className={`group relative mb-6 md:mb-8 transition-all duration-700 cursor-pointer ${
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
                  }`}
                  style={{ transitionDelay: `${idx * 120}ms` }}
                >
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
                    {/* Small left icon - hover effects via group-hover */}
                    <div className="flex-shrink-0 sm:w-24 md:w-32 flex justify-center sm:justify-start">
                      <div
                        className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${gradientClass} flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-[0_0_25px_${glowColor}]`}
                        style={{ transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)" }}
                      >
                        <StepIcon className="h-5 w-5 sm:h-6 sm:w-6 text-white transition-all duration-300 group-hover:brightness-125" />
                        <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-black/80 text-white text-[10px] font-bold flex items-center justify-center">
                          {step.num}
                        </span>
                      </div>
                    </div>

                    {/* Content card */}
                    <div className="flex-1 w-full">
                      <div className="relative rounded-2xl border border-white/20 bg-white/5 backdrop-blur-sm p-4 sm:p-6 transition-all duration-300 hover:border-white/40 hover:bg-white/10 hover:shadow-xl">
                        {/* Large background icon - pure CSS group-hover glow (no JS) */}
                        <div
                          className="absolute top-3 right-3 sm:top-4 sm:right-4 transition-all duration-300 process-bg-icon"
                          style={{
                            opacity: 0.05,
                            transition: "opacity 0.3s ease, filter 0.3s ease",
                            "--glow-color": glowColor,
                          } as React.CSSProperties}
                        >
                          <StepIcon className="w-12 h-12 sm:w-16 sm:h-16" style={{ color: glowColor }} />
                        </div>
                        <h4 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2 transition-all duration-300 group-hover:text-cyan-400">
                          {step.title}
                        </h4>
                        <p className="text-gray-400 text-sm sm:text-base leading-relaxed pr-8">
                          {step.desc}
                        </p>
                        <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                          <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Consultation Modal - made responsive */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative bg-gradient-to-br from-[#0d1117] to-[#0a0a0f] rounded-2xl border border-white/10 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 z-30 bg-[#0d1117] border-b border-white/10 p-4 sm:p-6 backdrop-blur-md">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              </button>
              <div className="flex items-center gap-3">
                <div className="p-2 sm:p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600">
                  <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    Schedule a Consultation
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm">
                    Let's discuss your project and find the best solution
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6">
              {submitted ? (
                <div className="text-center py-8 sm:py-12">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-white mb-2">Request Sent!</h4>
                  <p className="text-gray-400 text-sm sm:text-base">
                    Thanks for contacting us! We’ll reply as soon as possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cyan-400" />
                        <input
                          type="text"
                          name="name"
                          required
                          disabled={isSubmitting}
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-[#1a1f2e] border border-cyan-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                          placeholder="Juan Dela Cruz"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cyan-400" />
                        <input
                          type="email"
                          name="email"
                          required
                          disabled={isSubmitting}
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-[#1a1f2e] border border-cyan-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                          placeholder="juan@example.com"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cyan-400" />
                        <input
                          type="tel"
                          name="phone"
                          disabled={isSubmitting}
                          value={formatPhoneDisplay(formData.phone)}
                          onChange={handlePhoneChange}
                          maxLength={15}
                          className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-[#1a1f2e] border border-cyan-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                          placeholder="0912 345 6789"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Project Type *
                      </label>
                      <div className="relative" ref={projectTypeRef}>
                        <Code2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cyan-400 z-10" />
                        <div
                          onClick={() => setIsProjectTypeOpen(!isProjectTypeOpen)}
                          className="w-full pl-10 pr-10 py-2.5 sm:py-3 bg-[#1a1f2e] border border-cyan-500/30 rounded-xl text-white cursor-pointer flex items-center justify-between transition-all duration-300 hover:border-cyan-400 text-sm sm:text-base"
                        >
                          <span className={formData.projectType ? "text-white" : "text-gray-400"}>
                            {formData.projectType
                              ? projectOptions.find(opt => opt.value === formData.projectType)
                                  ?.label
                              : "Select project type"}
                          </span>
                          <ChevronDown
                            className={`h-4 w-4 text-cyan-400 transition-transform duration-300 ${isProjectTypeOpen ? "rotate-180" : ""}`}
                          />
                        </div>
                        {isProjectTypeOpen && (
                          <div className="absolute z-20 w-full mt-2 bg-[#1a1f2e] border border-cyan-500/30 rounded-xl shadow-2xl overflow-hidden animate-fadeIn">
                            {projectOptions.map(option => {
                              const OptionIcon = option.icon;
                              return (
                                <div
                                  key={option.value}
                                  onClick={() => {
                                    setFormData({ ...formData, projectType: option.value });
                                    setIsProjectTypeOpen(false);
                                  }}
                                  className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-all duration-200 hover:bg-cyan-500/10 ${
                                    formData.projectType === option.value
                                      ? "bg-cyan-500/10 border-l-2 border-cyan-400"
                                      : ""
                                  }`}
                                >
                                  <OptionIcon className="h-4 w-4 text-cyan-400" />
                                  <span className="text-white text-sm">{option.label}</span>
                                  {formData.projectType === option.value && (
                                    <CheckCircle2 className="h-4 w-4 text-cyan-400 ml-auto" />
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Preferred Date *
                      </label>
                      <div className="relative">
                        <input
                          ref={dateRef}
                          type="date"
                          name="date"
                          required
                          disabled={isSubmitting}
                          min={today}
                          value={formData.date}
                          onChange={handleInputChange}
                          className="custom-date-input w-full px-4 py-2.5 sm:py-3 pr-10 bg-[#1a1f2e] border border-cyan-500/30 rounded-xl text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                        />
                        <Calendar
                          onClick={openDatePicker}
                          className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cyan-400 cursor-pointer"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Preferred Time *
                      </label>
                      <div className="flex items-center gap-2">
                        <div className="relative flex-1" ref={hourRef}>
                          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cyan-400 z-10" />
                          <div
                            onClick={() => setIsHourOpen(!isHourOpen)}
                            className="w-full pl-10 pr-8 py-2.5 sm:py-3 bg-[#1a1f2e] border border-cyan-500/30 rounded-xl text-white cursor-pointer flex items-center justify-start gap-4 transition-all duration-300 hover:border-cyan-400 text-sm sm:text-base"
                          >
                            <span className={formData.hour ? "text-white" : "text-gray-400"}>
                              {formData.hour || "Hour"}
                            </span>
                            <ChevronDown
                              className={`h-4 w-4 text-cyan-400 transition-transform duration-300 ${isHourOpen ? "rotate-180" : ""}`}
                            />
                          </div>
                          {isHourOpen && (
                            <div className="absolute z-20 w-full mt-2 bg-[#1a1f2e] border border-cyan-500/30 rounded-xl shadow-2xl overflow-hidden animate-fadeIn max-h-48 overflow-y-auto">
                              {hourOptions.map(option => (
                                <div
                                  key={option.value}
                                  onClick={() => {
                                    setFormData({ ...formData, hour: option.value.toString() });
                                    setIsHourOpen(false);
                                  }}
                                  className={`px-4 py-2 cursor-pointer transition-all duration-200 hover:bg-cyan-500/10 text-center ${
                                    formData.hour === option.value.toString()
                                      ? "bg-cyan-500/10 text-cyan-400"
                                      : "text-white"
                                  }`}
                                >
                                  {option.label}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <span className="text-cyan-400 text-xl font-bold animate-pulse">:</span>

                        <div className="relative flex-1" ref={minuteRef}>
                          <div
                            onClick={() => setIsMinuteOpen(!isMinuteOpen)}
                            className="w-full px-3 py-2.5 sm:py-3 bg-[#1a1f2e] border border-cyan-500/30 rounded-xl text-white cursor-pointer flex items-center justify-between transition-all duration-300 hover:border-cyan-400 text-sm sm:text-base"
                          >
                            <span className={formData.minute ? "text-white" : "text-gray-400"}>
                              {formData.minute || "Min"}
                            </span>
                            <ChevronDown
                              className={`h-4 w-4 text-cyan-400 transition-transform duration-300 ${isMinuteOpen ? "rotate-180" : ""}`}
                            />
                          </div>
                          {isMinuteOpen && (
                            <div className="absolute z-20 w-full mt-2 bg-[#1a1f2e] border border-cyan-500/30 rounded-xl shadow-2xl overflow-hidden animate-fadeIn">
                              {minuteOptions.map(option => (
                                <div
                                  key={option.value}
                                  onClick={() => {
                                    setFormData({ ...formData, minute: option.value });
                                    setIsMinuteOpen(false);
                                  }}
                                  className={`px-4 py-2 cursor-pointer transition-all duration-200 hover:bg-cyan-500/10 text-center ${
                                    formData.minute === option.value
                                      ? "bg-cyan-500/10 text-cyan-400"
                                      : "text-white"
                                  }`}
                                >
                                  {option.label}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="relative flex-1" ref={periodRef}>
                          <div
                            onClick={() => setIsPeriodOpen(!isPeriodOpen)}
                            className="w-full px-3 py-2.5 sm:py-3 bg-[#1a1f2e] border border-cyan-500/30 rounded-xl text-white cursor-pointer flex items-center justify-between transition-all duration-300 hover:border-cyan-400 text-sm sm:text-base"
                          >
                            <span className="text-white">{formData.period}</span>
                            <ChevronDown
                              className={`h-4 w-4 text-cyan-400 transition-transform duration-300 ${isPeriodOpen ? "rotate-180" : ""}`}
                            />
                          </div>
                          {isPeriodOpen && (
                            <div className="absolute z-20 w-full mt-2 bg-[#1a1f2e] border border-cyan-500/30 rounded-xl shadow-2xl overflow-hidden animate-fadeIn">
                              {periodOptions.map(option => (
                                <div
                                  key={option.value}
                                  onClick={() => {
                                    setFormData({ ...formData, period: option.value });
                                    setIsPeriodOpen(false);
                                  }}
                                  className={`px-4 py-2 cursor-pointer transition-all duration-200 hover:bg-cyan-500/10 text-center ${
                                    formData.period === option.value
                                      ? "bg-cyan-500/10 text-cyan-400"
                                      : "text-white"
                                  }`}
                                >
                                  {option.label}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Project Details
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-cyan-400" />
                      <textarea
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-[#1a1f2e] border border-cyan-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 resize-none disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                        placeholder="Tell us about your project, goals, and requirements..."
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 text-red-500 bg-red-500/10 rounded-lg p-3 text-sm border border-red-500/30">
                      <AlertCircle className="h-4 w-4 flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 sm:py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Submitting...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2 cursor-pointer">
                        Submit Request <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
                      </span>
                    )}
                  </button>
                  <p className="text-xs text-gray-500 text-center">
                    We respect your privacy. Your information will only be used to schedule your
                    consultation.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        /* Pure CSS group-hover glow for the large background icon */
        .group:hover .process-bg-icon {
         opacity: 0.7 !important;
         filter: drop-shadow(0 0 20px var(--glow-color)) drop-shadow(0 0 45px var(--glow-color)) drop-shadow(0 0 80px var(--glow-color));
        }

        input[type="date"] {
          color-scheme: dark;
        }
        input[type="date"]::-webkit-calendar-picker-indicator {
          opacity: 0;
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          cursor: pointer;
          opacity: 0.7;
          transition: all 0.2s ease;
        }
        input[type="date"]::-webkit-calendar-picker-indicator:hover {
          opacity: 1;
          transform: scale(1.1);
        }
        ::-webkit-datetime-edit {
          color: white;
        }
        ::-webkit-datetime-edit-fields-wrapper {
          color: white;
        }
        ::-webkit-datetime-edit-text {
          color: #06b6d4;
        }
        ::-webkit-datetime-edit-month-field:hover,
        ::-webkit-datetime-edit-day-field:hover,
        ::-webkit-datetime-edit-year-field:hover {
          background-color: rgba(6, 182, 212, 0.2);
          border-radius: 4px;
        }
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #0d1117;
          border-radius: 10px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #06b6d4;
          border-radius: 10px;
        }
      `}</style>
    </section>
  );
}