import { useState, useRef, useEffect } from "react";
import { AlertCircle, CheckCircle2, Upload, Loader2, ChevronDown } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import modgcashQR from "@/assets/modgcash.jpg";

interface RegistrationFormData {
  firstName: string;
  lastName: string;
  birthday: string;
  email: string;
  phoneNumber: string;
  barangay: string;
  instructorName: string;
  civilStatus: "single" | "married" | "widowed" | "divorced" | "separated" | null;
  registrationPackage: "regular" | "vip" | null;
  modeOfPayment: "gcash" | "bank-transfer" | null;
  gcashProof: File | null;
  bankProof: File | null;
}

interface FormErrors {
  [key: string]: string;
}

export function ZumbaRegistration() {
  const [formData, setFormData] = useState<RegistrationFormData>({
    firstName: "",
    lastName: "",
    birthday: "",
    email: "",
    phoneNumber: "",
    barangay: "",
    instructorName: "",
    civilStatus: null,
    registrationPackage: null,
    modeOfPayment: null,
    gcashProof: null,
    bankProof: null,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isCivilStatusOpen, setIsCivilStatusOpen] = useState(false);
  const gcashFileInputRef = useRef<HTMLInputElement>(null);
  const bankFileInputRef = useRef<HTMLInputElement>(null);
  const civilStatusRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (civilStatusRef.current && !civilStatusRef.current.contains(event.target as Node)) {
        setIsCivilStatusOpen(false);
      }
    };

    if (isCivilStatusOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isCivilStatusOpen]);

  const packagePrices = {
    regular: 109,
    vip: 190,
  };

  const contestCategories = [
    "Best Dressed",
    "Best Dancer",
    "Best Zumba Instructor",
    "Most Energetic Participant",
    "Best Group / Team Spirit",
    "CleanIt App Star",
    "Social Media Star",
  ];

  const calculateAge = (birthDate: string): number => {
    if (!birthDate) return 0;
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "phoneNumber") {
      // Only allow numbers
      const numbersOnly = value.replace(/\D/g, "");
      if (numbersOnly.length <= 11) {
        setFormData(prev => ({ ...prev, phoneNumber: numbersOnly }));
      }
    } else if (name === "birthday") {
      setFormData(prev => ({ ...prev, birthday: value }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handlePackageSelect = (pkg: "regular" | "vip") => {
    setFormData(prev => ({ ...prev, registrationPackage: pkg }));
    if (errors.registrationPackage) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.registrationPackage;
        return newErrors;
      });
    }
  };

  const handleCivilStatusSelect = (
    status: "single" | "married" | "widowed" | "divorced" | "separated",
  ) => {
    setFormData(prev => ({ ...prev, civilStatus: status }));
    if (errors.civilStatus) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.civilStatus;
        return newErrors;
      });
    }
  };

  const handlePaymentMethodSelect = (method: "gcash" | "bank-transfer") => {
    setFormData(prev => ({
      ...prev,
      modeOfPayment: method,
      gcashProof: null,
      bankProof: null,
    }));
    if (errors.modeOfPayment) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.modeOfPayment;
        return newErrors;
      });
    }
    // Reset file inputs
    if (gcashFileInputRef.current) gcashFileInputRef.current.value = "";
    if (bankFileInputRef.current) bankFileInputRef.current.value = "";
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    paymentType: "gcash" | "bank",
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setErrors(prev => ({
          ...prev,
          [`${paymentType}Proof`]: "Please upload an image file (JPG, PNG, etc.)",
        }));
        return;
      }

      if (paymentType === "gcash") {
        setFormData(prev => ({ ...prev, gcashProof: file }));
      } else {
        setFormData(prev => ({ ...prev, bankProof: file }));
      }

      // Clear error for this field
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[`${paymentType}Proof`];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.birthday) {
      newErrors.birthday = "Birthday is required";
    } else {
      const birthDate = new Date(formData.birthday);
      const today = new Date();
      if (birthDate > today) {
        newErrors.birthday = "Birthday cannot be in the future";
      }
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (formData.phoneNumber.length !== 11) {
      newErrors.phoneNumber = "Phone number must be 11 digits";
    } else if (!formData.phoneNumber.startsWith("09")) {
      newErrors.phoneNumber = "Phone number must start with 09";
    }

    if (!formData.barangay.trim()) {
      newErrors.barangay = "Barangay is required";
    }

    if (!formData.civilStatus) {
      newErrors.civilStatus = "Please select a civil status";
    }

    if (!formData.registrationPackage) {
      newErrors.registrationPackage = "Please select a registration package";
    }

    if (!formData.modeOfPayment) {
      newErrors.modeOfPayment = "Please select a payment method";
    }

    if (formData.modeOfPayment === "gcash" && !formData.gcashProof) {
      newErrors.gcashProof = "Please upload proof of GCash payment";
    }

    if (formData.modeOfPayment === "bank-transfer" && !formData.bankProof) {
      newErrors.bankProof = "Please upload proof of bank transfer";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate form submission (replace with actual API call)
      // In production, you would upload files and send data to your backend
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Here you would typically:
      // 1. Upload files to a storage service (AWS S3, Firebase, etc.)
      // 2. Send form data to your backend
      // 3. Handle the response

      setIsSubmitted(true);
    } catch (error) {
      setSubmitError("An error occurred while submitting the form. Please try again.");
      console.error("Form submission error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const registrationFee = formData.registrationPackage
    ? packagePrices[formData.registrationPackage]
    : 0;

  if (isSubmitted) {
    return (
      <div className="bg-linear-to-br from-purple-900 via-blue-900 to-purple-800 flex items-center justify-center px-4 py-12 min-h-screen">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-green-100 p-4">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Registration Successful!</h2>
          <p className="text-gray-600 mb-8">
            Thank you for pre-registering for Zumba Fit by CleanIt. We look forward to seeing you at
            the event!
          </p>
          <div className="bg-purple-50 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-semibold text-gray-900">Registration Package:</span>{" "}
              {formData.registrationPackage === "regular" ? "Regular" : "VIP"}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-gray-900">Name:</span> {formData.firstName}{" "}
              {formData.lastName}
            </p>
          </div>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                firstName: "",
                lastName: "",
                birthday: "",
                email: "",
                phoneNumber: "",
                barangay: "",
                instructorName: "",
                civilStatus: null,
                registrationPackage: null,
                modeOfPayment: null,
                gcashProof: null,
                bankProof: null,
              });
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="w-full bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            Register Another Person
          </button>

          {/* CleanIt App Promotion - small ad-like section */}
          <div className="mt-6 pt-6 border-t border-gray-100 text-left">
            <h3 className="text-sm font-semibold text-gray-700">
              Want to experience more from CleanIt?
            </h3>
            <h4 className="text-lg font-bold text-gray-900 mt-1">Download the CleanIt App</h4>
            <p className="text-sm text-gray-600 mt-2 mb-4">
              Get the CleanIt mobile app and conveniently access CleanIt's services from your phone.
            </p>

            <div className="flex flex-col md:flex-row gap-3 md:gap-4">
              <a
                href="https://play.google.com/store/apps/details?id=com.cleanit.activities"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-3 px-4 py-3 rounded-lg bg-black text-white hover:opacity-95 transition-shadow shadow-sm md:max-w-[220px]"
              >
                {/* Android / Google Play icon (triangle) */}
                <svg
                  viewBox="0 0 24 24"
                  className="w-7 h-7 flex-shrink-0"
                  fill="currentColor"
                  aria-hidden
                  preserveAspectRatio="xMidYMid meet"
                >
                  <path d="M3 2.5L20 12 3 21.5V2.5z" />
                </svg>
                <span className="text-sm font-semibold">Download on Android</span>
              </a>

              <a
                href="https://apps.apple.com/ph/app/clean-it-mobile-app/id6774019021"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-3 px-4 py-3 rounded-lg bg-gray-900 text-white hover:opacity-95 transition-shadow shadow-sm md:max-w-[220px]"
              >
                {/* Apple icon */}
                <svg
                  viewBox="0 0 24 24"
                  className="w-9 h-9 flex-shrink-0"
                  fill="currentColor"
                  aria-hidden
                  preserveAspectRatio="xMidYMid meet"
                >
                  <path d="M16.365 1.43c-.99.02-2.16.63-2.86 1.29-.79.74-1.47 1.98-1.23 3.15 1.3.1 2.66-.66 3.51-1.56.84-.9 1.23-2.07.58-3.08zM12.5 5.5c-1.64 0-3.26.98-4.23 2.55-1.6 2.6-.43 6.25 1 8.45.66 1.04 1.5 2.2 2.77 2.2 1.2 0 1.55-.77 3.15-.77 1.6 0 1.95.77 3.15.76 1.33 0 2.13-1.06 2.78-2.1.45-.78.64-1.52.66-1.56-.02-.01-2.35-.9-2.41-3.48-.05-2.3 1.86-3.33 1.96-3.4-.85-1.23-2.18-1.34-2.65-1.34-1.14 0-2.24.67-2.86.67-.64 0-1.9-.68-3.22-.68z" />
                </svg>
                <span className="text-sm font-semibold">Download on iOS</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-linear-to-br from-purple-900 via-blue-900 to-purple-800 py-8 md:py-10 lg:py-12">
      <div className="max-w-2xl mx-auto px-3 sm:px-4 md:px-6">
        <div className="text-center mb-8 md:mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 md:mb-3">
            Zumba Fit by CleanIt
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-purple-400 font-bold mb-3 md:mb-4">
            Pre-Registration Form
          </p>
          <p className="text-purple-200 text-base sm:text-lg max-w-lg mx-auto">
            Secure your slot and enjoy a fun-filled Zumba experience with CleanIt!
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Banner Image - Inside Card */}
          <div className="overflow-hidden h-40 sm:h-48 md:h-56 lg:h-64">
            <img
              src="/assets/zumba-cleanit.png"
              alt="Zumba Fit by CleanIt"
              className="w-full h-full object-cover"
              onError={e => {
                // Hide image if not found
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>

          {/* Form Content */}
          <div className="p-6 sm:p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-8">
              {submitError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{submitError}</AlertDescription>
                </Alert>
              )}

              {/* Event Information - highlighted card above packages */}
              <div className="bg-linear-to-r from-purple-50 to-blue-50 rounded-xl p-4 mb-4">
                <h4 className="text-sm font-semibold text-purple-800">EVENT INFORMATION</h4>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-start gap-3">
                    <div className="text-purple-600 bg-purple-100 rounded-md p-2 flex-shrink-0">
                      {/* Calendar icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="w-5 h-5"
                        fill="currentColor"
                        aria-hidden
                        preserveAspectRatio="xMidYMid meet"
                      >
                        <path d="M7 10h5v5H7z" opacity="0.9" />
                        <path d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 14H5V9h14v9z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 font-semibold">Date & Time</p>
                      <p className="text-sm text-gray-900">
                        August 12, 2026 <br /> 9 AM onwards
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="text-purple-600 bg-purple-100 rounded-md p-2 flex-shrink-0">
                      {/* Location / Pin icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="w-5 h-5"
                        fill="currentColor"
                        aria-hidden
                        preserveAspectRatio="xMidYMid meet"
                      >
                        <path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 font-semibold">Location</p>
                      <p className="text-sm text-gray-900">
                        Ground Floor, Trade Hall, Robinsons Novaliches{" "}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="text-purple-600 bg-purple-100 rounded-md p-2 flex-shrink-0">
                      {/* Phone icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="w-5 h-5"
                        fill="currentColor"
                        aria-hidden
                        preserveAspectRatio="xMidYMid meet"
                      >
                        <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24 11.36 11.36 0 0 0 3.55.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h2.5a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.55 1 1 0 0 1-.24 1.01l-2.21 2.23z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 font-semibold">Contact</p>
                      <p className="text-sm text-gray-900">
                        <a href="tel:09171802216" className="hover:underline">
                          0917 180 2216
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="text-purple-600 bg-purple-100 rounded-md p-2 flex-shrink-0">
                      {/* Mail icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="w-5 h-5"
                        fill="currentColor"
                        aria-hidden
                        preserveAspectRatio="xMidYMid meet"
                      >
                        <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 font-semibold">Email</p>
                      <p className="text-sm text-gray-900">
                        <a href="mailto:info@cleanit.business" className="hover:underline">
                          info@cleanit.business
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Registration Packages Section */}
              <div className="space-y-4">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                  Registration Packages
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {/* Regular Package */}
                  <button
                    type="button"
                    onClick={() => handlePackageSelect("regular")}
                    className={`p-5 sm:p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                      formData.registrationPackage === "regular"
                        ? "border-purple-600 bg-purple-50"
                        : "border-gray-200 bg-white hover:border-purple-300"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">Regular</h4>
                        <p className="text-xl sm:text-2xl font-bold text-purple-600 mt-1">₱109</p>
                      </div>
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                          formData.registrationPackage === "regular"
                            ? "border-purple-600 bg-purple-600"
                            : "border-gray-300"
                        }`}
                      >
                        {formData.registrationPackage === "regular" && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                    </div>
                    <ul className="text-xs sm:text-sm text-gray-700 space-y-1.5">
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2 font-bold">•</span>
                        <span>Tote Bag</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2 font-bold">•</span>
                        <span>Sticker Set</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2 font-bold">•</span>
                        <span>Headband</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2 font-bold">•</span>
                        <span>Wristband</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2 font-bold">•</span>
                        <span>1 Raffle Ticket</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2 font-bold">•</span>
                        <span>Certificate of Participation</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2 font-bold">•</span>
                        <span>Snacks & Drinks</span>
                      </li>
                    </ul>
                  </button>

                  {/* VIP Package */}
                  <button
                    type="button"
                    onClick={() => handlePackageSelect("vip")}
                    className={`p-5 sm:p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                      formData.registrationPackage === "vip"
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200 bg-white hover:border-blue-300"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">VIP</h4>
                        <p className="text-xl sm:text-2xl font-bold text-blue-600 mt-1">₱190</p>
                      </div>
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                          formData.registrationPackage === "vip"
                            ? "border-blue-600 bg-blue-600"
                            : "border-gray-300"
                        }`}
                      >
                        {formData.registrationPackage === "vip" && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                    </div>
                    <ul className="text-xs sm:text-sm text-gray-700 space-y-1.5">
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2 font-bold">•</span>
                        <span>Tote Bag</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2 font-bold">•</span>
                        <span>Sticker Set</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2 font-bold">•</span>
                        <span>Headband</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2 font-bold">•</span>
                        <span>Wristband</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2 font-bold">•</span>
                        <span className="font-bold">Dri-fit Shirt</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2 font-bold">•</span>
                        <span>1 Raffle Ticket</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2 font-bold">•</span>
                        <span>Certificate of Participation</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2 font-bold">•</span>
                        <span>Snacks & Drinks</span>
                      </li>
                    </ul>
                  </button>
                </div>
                <div className="mt-5 space-y-3">
                  <div>
                    <h4 className="text-base font-bold text-gray-900">Contest Categories</h4>
                    <p className="text-sm italic text-purple-700/80">
                      Vouchers, Trophies, and Medals
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
                    {contestCategories.map(category => (
                      <div
                        key={category}
                        className="flex items-center rounded-lg border border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50 px-3 py-2.5 text-sm font-medium text-gray-800 shadow-sm"
                      >
                        <span className="mr-2 text-base" aria-hidden="true">
                          ⭐
                        </span>
                        <span>{category}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mt-4">
                  <p className="text-xs sm:text-sm text-gray-700 mb-2">
                    <span className="font-semibold text-gray-900">Raffle Prizes:</span>
                  </p>
                  <div className="bg-white border border-gray-300 rounded px-3 py-2 text-gray-500 text-xs sm:text-sm">
                    (Raffle prize information to be announced)
                  </div>
                </div>
                {errors.registrationPackage && (
                  <p className="text-red-600 text-sm font-medium">{errors.registrationPackage}</p>
                )}
              </div>

              {/* Personal Information Section */}
              <div className="space-y-3 md:space-y-4 border-t pt-6 md:pt-8">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">Personal Information</h3>

                {/* First Name and Last Name - Side by side on desktop, stacked on mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  {/* First Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      First Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter your first name"
                      className={`w-full px-4 py-2 rounded-lg border-2 transition-colors text-black placeholder-gray-400 ${
                        errors.firstName
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300 bg-gray-50 focus:border-purple-500 focus:bg-white"
                      } outline-none`}
                    />
                    {errors.firstName && (
                      <p className="text-red-600 text-sm font-medium mt-1">{errors.firstName}</p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Last Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter your last name"
                      className={`w-full px-4 py-2 rounded-lg border-2 transition-colors text-black placeholder-gray-400 ${
                        errors.lastName
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300 bg-gray-50 focus:border-purple-500 focus:bg-white"
                      } outline-none`}
                    />
                    {errors.lastName && (
                      <p className="text-red-600 text-sm font-medium mt-1">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                {/* Birthday */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Birthday <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="date"
                    name="birthday"
                    value={formData.birthday}
                    onChange={handleInputChange}
                    max={new Date().toISOString().split("T")[0]}
                    className={`w-full px-4 py-2 rounded-lg border-2 transition-colors text-black ${
                      errors.birthday
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 bg-gray-50 focus:border-purple-500 focus:bg-white"
                    } outline-none`}
                  />
                  {errors.birthday && (
                    <p className="text-red-600 text-sm font-medium mt-1">{errors.birthday}</p>
                  )}
                </div>

                {/* Age Display - Calculated from Birthday */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Age</label>
                  <div className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 bg-gray-100 text-black font-semibold">
                    {formData.birthday ? `${calculateAge(formData.birthday)} years old` : "--"}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Email <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    className={`w-full px-4 py-2 rounded-lg border-2 transition-colors text-black placeholder-gray-400 ${
                      errors.email
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 bg-gray-50 focus:border-purple-500 focus:bg-white"
                    } outline-none`}
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm font-medium mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Phone Number <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="09XXXXXXXXX"
                    inputMode="numeric"
                    className={`w-full px-4 py-2 rounded-lg border-2 transition-colors text-black placeholder-gray-400 ${
                      errors.phoneNumber
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 bg-gray-50 focus:border-purple-500 focus:bg-white"
                    } outline-none`}
                  />
                  <p className="text-xs text-gray-500 mt-1">Format: 09XXXXXXXXX (11 digits)</p>
                  {errors.phoneNumber && (
                    <p className="text-red-600 text-sm font-medium mt-1">{errors.phoneNumber}</p>
                  )}
                </div>

                {/* Barangay */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Barangay <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="barangay"
                    value={formData.barangay}
                    onChange={handleInputChange}
                    placeholder="Enter your barangay"
                    className={`w-full px-4 py-2 rounded-lg border-2 transition-colors text-black placeholder-gray-400 ${
                      errors.barangay
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 bg-gray-50 focus:border-purple-500 focus:bg-white"
                    } outline-none`}
                  />
                  {errors.barangay && (
                    <p className="text-red-600 text-sm font-medium mt-1">{errors.barangay}</p>
                  )}
                </div>

                {/* Civil Status */}
                <div ref={civilStatusRef}>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Civil Status <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsCivilStatusOpen(!isCivilStatusOpen)}
                      className={`w-full px-4 py-2 pr-10 rounded-lg border-2 transition-colors text-black text-left appearance-none cursor-pointer ${
                        errors.civilStatus
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300 bg-gray-50 focus:border-purple-500 focus:bg-white"
                      } outline-none focus:border-purple-500 focus:bg-white`}
                    >
                      {formData.civilStatus
                        ? {
                            single: "Single",
                            married: "Married",
                            widowed: "Widowed",
                            divorced: "Divorced",
                            separated: "Separated",
                          }[formData.civilStatus]
                        : "Select a civil status"}
                    </button>
                    <ChevronDown
                      className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none transition-transform duration-300 ${
                        isCivilStatusOpen ? "rotate-180" : ""
                      }`}
                    />

                    {/* Dropdown Menu */}
                    {isCivilStatusOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border-2 border-gray-300 rounded-lg shadow-lg z-10">
                        {[
                          { value: "single" as const, label: "Single" },
                          { value: "married" as const, label: "Married" },
                          { value: "widowed" as const, label: "Widowed" },
                          { value: "divorced" as const, label: "Divorced" },
                          { value: "separated" as const, label: "Separated" },
                        ].map(option => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => {
                              handleCivilStatusSelect(option.value);
                              setIsCivilStatusOpen(false);
                            }}
                            className={`w-full px-4 py-2 text-left transition-colors ${
                              formData.civilStatus === option.value
                                ? "bg-purple-100 text-purple-900 font-semibold"
                                : "text-gray-700 hover:bg-gray-100"
                            } first:rounded-t-md last:rounded-b-md`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  {errors.civilStatus && (
                    <p className="text-red-600 text-sm font-medium mt-1">{errors.civilStatus}</p>
                  )}
                </div>

                {/* Instructor Name (Optional) */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Instructor Name <span className="text-gray-500 text-xs">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    name="instructorName"
                    value={formData.instructorName}
                    onChange={handleInputChange}
                    placeholder="Enter instructor name (if applicable)"
                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 bg-gray-50 focus:border-purple-500 focus:bg-white outline-none transition-colors text-black placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Mode of Payment Section */}
              <div className="space-y-3 md:space-y-4 border-t pt-6 md:pt-8">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">Mode of Payment</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  {["gcash", "bank-transfer"].map(method => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => handlePaymentMethodSelect(method as "gcash" | "bank-transfer")}
                      className={`p-3 sm:p-4 rounded-lg border-2 font-semibold transition-all text-sm sm:text-base ${
                        formData.modeOfPayment === method
                          ? "border-purple-600 bg-purple-50 text-purple-900"
                          : "border-gray-300 bg-white text-gray-700 hover:border-purple-300"
                      }`}
                    >
                      {method === "gcash" && "GCash"}
                      {method === "bank-transfer" && "Bank Transfer"}
                    </button>
                  ))}
                </div>
                {errors.modeOfPayment && (
                  <p className="text-red-600 text-sm font-medium">{errors.modeOfPayment}</p>
                )}

                {/* GCash Payment */}
                {formData.modeOfPayment === "gcash" && (
                  <div className="mt-6 space-y-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-gray-900">GCash Payment</h4>
                    <p className="text-sm text-gray-700">Scan the QR code below to pay.</p>
                    <div className="flex justify-center my-6">
                      <img
                        src={modgcashQR}
                        alt="GCash QR Code"
                        className="max-w-sm w-full h-auto rounded-lg border-2 border-gray-300"
                        onError={e => {
                          (e.target as HTMLImageElement).style.display = "none";
                          // Show error message
                          const parent = (e.target as HTMLImageElement).parentElement;
                          if (parent) {
                            const errorDiv = document.createElement("div");
                            errorDiv.className = "text-center text-red-600 p-4";
                            errorDiv.textContent = "QR Code image not found";
                            parent.appendChild(errorDiv);
                          }
                        }}
                      />
                    </div>
                    <div className="border-t border-blue-200 pt-4">
                      <label className="block text-sm font-semibold text-gray-900 mb-3">
                        Upload Proof of Payment <span className="text-red-600">*</span>
                      </label>
                      <p className="text-xs text-gray-600 mb-3">
                        Please upload a clear screenshot/photo of your payment confirmation.
                      </p>
                      <div
                        onClick={() => gcashFileInputRef.current?.click()}
                        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                          errors.gcashProof
                            ? "border-red-400 bg-red-50"
                            : "border-gray-300 bg-gray-50 hover:border-purple-400 hover:bg-purple-50"
                        }`}
                      >
                        <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        {formData.gcashProof ? (
                          <p className="text-sm font-medium text-gray-900">
                            {formData.gcashProof.name}
                          </p>
                        ) : (
                          <>
                            <p className="text-sm font-medium text-gray-700">
                              Click to upload or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                          </>
                        )}
                      </div>
                      <input
                        ref={gcashFileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={e => handleFileChange(e, "gcash")}
                        className="hidden"
                      />
                      {errors.gcashProof && (
                        <p className="text-red-600 text-sm font-medium mt-2">{errors.gcashProof}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Bank Transfer Payment */}
                {formData.modeOfPayment === "bank-transfer" && (
                  <div className="mt-6 space-y-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-gray-900">Bank Transfer</h4>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Bank Name
                      </label>
                      <div className="bg-white border border-gray-300 rounded px-3 py-2 text-gray-900 font-medium">
                        TOPBANK PH
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Account Name
                      </label>
                      <div className="bg-white border border-gray-300 rounded px-3 py-2 text-gray-900 font-medium">
                        SMARTVEND SYSTEM CORPORATION
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Account Number
                      </label>
                      <div className="bg-white border border-gray-300 rounded px-3 py-2 text-gray-900 font-medium">
                        {/* 022-209-00005-8 */}000-000-00000-0
                      </div>
                    </div>
                    <div className="border-t border-blue-200 pt-4">
                      <label
                        className="block text-sm font-semibold text-gray
                      -900 mb-3"
                      >
                        Upload Proof of Payment <span className="text-red-600">*</span>
                      </label>
                      <p className="text-xs text-gray-600 mb-3">
                        Please upload a clear screenshot/photo of your payment confirmation.
                      </p>
                      <div
                        onClick={() => bankFileInputRef.current?.click()}
                        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                          errors.bankProof
                            ? "border-red-400 bg-red-50"
                            : "border-gray-300 bg-gray-50 hover:border-purple-400 hover:bg-purple-50"
                        }`}
                      >
                        <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        {formData.bankProof ? (
                          <p className="text-sm font-medium text-gray-900">
                            {formData.bankProof.name}
                          </p>
                        ) : (
                          <>
                            <p className="text-sm font-medium text-gray-700">
                              Click to upload or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                          </>
                        )}
                      </div>
                      <input
                        ref={bankFileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={e => handleFileChange(e, "bank")}
                        className="hidden"
                      />
                      {errors.bankProof && (
                        <p className="text-red-600 text-sm font-medium mt-2">{errors.bankProof}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Registration Summary */}
              {formData.registrationPackage && (
                <div className="border-t pt-6 md:pt-8 p-4 md:p-6 bg-linear-to-r from-purple-50 to-blue-50 rounded-lg">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Registration Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm md:text-base">
                      <span className="text-gray-700">Registration Package:</span>
                      <span className="font-semibold text-gray-900">
                        {formData.registrationPackage === "regular" ? "Regular" : "VIP"}
                      </span>
                    </div>
                    <div className="flex justify-between pb-3 border-b border-gray-200 text-sm md:text-base">
                      <span className="text-gray-700">Registration Fee:</span>
                      <span className="font-bold text-lg text-purple-600">₱{registrationFee}</span>
                    </div>
                    <div className="flex justify-between text-sm md:text-base">
                      <span className="text-gray-700">Mode of Payment:</span>
                      <span className="font-semibold text-gray-900">
                        {formData.modeOfPayment === "gcash"
                          ? "GCash"
                          : formData.modeOfPayment === "bank-transfer"
                            ? "Bank Transfer"
                            : "Not selected"}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 sm:py-4 rounded-lg font-bold text-white text-base sm:text-lg transition-all duration-300 flex items-center justify-center gap-2 mt-6 md:mt-8 ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 active:scale-95 transform"
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "PRE-REGISTER NOW"
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 md:mt-8 text-center text-purple-100 text-xs sm:text-sm">
          <p>Serbisyong So Sulit! Sayaw, Galaw at Saya! 💜</p>
        </div>
      </div>
    </div>
  );
}
