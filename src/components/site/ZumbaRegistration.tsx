import { useState, useRef } from "react";
import { AlertCircle, CheckCircle2, Upload, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface RegistrationFormData {
  fullName: string;
  age: string;
  phoneNumber: string;
  barangay: string;
  instructorName: string;
  registrationPackage: "regular" | "vip" | null;
  modeOfPayment: "cash" | "gcash" | "bank-transfer" | null;
  gcashProof: File | null;
  bankProof: File | null;
}

interface FormErrors {
  [key: string]: string;
}

export function ZumbaRegistration() {
  const [formData, setFormData] = useState<RegistrationFormData>({
    fullName: "",
    age: "",
    phoneNumber: "",
    barangay: "",
    instructorName: "",
    registrationPackage: null,
    modeOfPayment: null,
    gcashProof: null,
    bankProof: null,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const gcashFileInputRef = useRef<HTMLInputElement>(null);
  const bankFileInputRef = useRef<HTMLInputElement>(null);

  const packagePrices = {
    regular: 150,
    vip: 300,
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "age") {
      // Only allow numbers and max 2 digits
      const numbersOnly = value.replace(/\D/g, "");
      if (numbersOnly.length <= 2) {
        setFormData(prev => ({ ...prev, age: numbersOnly }));
      }
    } else if (name === "phoneNumber") {
      // Only allow numbers
      const numbersOnly = value.replace(/\D/g, "");
      if (numbersOnly.length <= 11) {
        setFormData(prev => ({ ...prev, phoneNumber: numbersOnly }));
      }
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

  const handlePaymentMethodSelect = (method: "cash" | "gcash" | "bank-transfer") => {
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

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.age) {
      newErrors.age = "Age is required";
    } else if (
      isNaN(Number(formData.age)) ||
      Number(formData.age) < 1 ||
      Number(formData.age) > 150
    ) {
      newErrors.age = "Please enter a valid age";
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
              <span className="font-semibold text-gray-900">Name:</span> {formData.fullName}
            </p>
          </div>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                fullName: "",
                age: "",
                phoneNumber: "",
                barangay: "",
                instructorName: "",
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
                        <p className="text-xl sm:text-2xl font-bold text-purple-600 mt-1">₱150</p>
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
                        <p className="text-xl sm:text-2xl font-bold text-blue-600 mt-1">₱300</p>
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
                    </ul>
                  </button>
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

                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Full Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className={`w-full px-4 py-2 rounded-lg border-2 transition-colors text-black placeholder-gray-400 ${
                      errors.fullName
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 bg-gray-50 focus:border-purple-500 focus:bg-white"
                    } outline-none`}
                  />
                  {errors.fullName && (
                    <p className="text-red-600 text-sm font-medium mt-1">{errors.fullName}</p>
                  )}
                </div>

                {/* Age */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Age <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    placeholder="Enter your age"
                    inputMode="numeric"
                    className={`w-full px-4 py-2 rounded-lg border-2 transition-colors text-black placeholder-gray-400 ${
                      errors.age
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 bg-gray-50 focus:border-purple-500 focus:bg-white"
                    } outline-none`}
                  />
                  {errors.age && (
                    <p className="text-red-600 text-sm font-medium mt-1">{errors.age}</p>
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
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                  {["cash", "gcash", "bank-transfer"].map(method => (
                    <button
                      key={method}
                      type="button"
                      onClick={() =>
                        handlePaymentMethodSelect(method as "cash" | "gcash" | "bank-transfer")
                      }
                      className={`p-3 sm:p-4 rounded-lg border-2 font-semibold transition-all text-sm sm:text-base ${
                        formData.modeOfPayment === method
                          ? "border-purple-600 bg-purple-50 text-purple-900"
                          : "border-gray-300 bg-white text-gray-700 hover:border-purple-300"
                      }`}
                    >
                      {method === "cash" && "Cash"}
                      {method === "gcash" && "GCash"}
                      {method === "bank-transfer" && "Bank Transfer"}
                    </button>
                  ))}
                </div>
                {errors.modeOfPayment && (
                  <p className="text-red-600 text-sm font-medium">{errors.modeOfPayment}</p>
                )}

                {/* Cash Payment */}
                {formData.modeOfPayment === "cash" && (
                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-gray-700">
                      <span className="font-semibold text-gray-900">Payment Method:</span> Payment
                      will be made during the event.
                    </p>
                  </div>
                )}

                {/* GCash Payment */}
                {formData.modeOfPayment === "gcash" && (
                  <div className="mt-6 space-y-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-gray-900">GCash Payment</h4>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        GCash Account Name
                      </label>
                      <div className="bg-white border border-gray-300 rounded px-3 py-2 text-gray-500">
                        ____________________
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        GCash Account Number
                      </label>
                      <div className="bg-white border border-gray-300 rounded px-3 py-2 text-gray-500">
                        ____________________
                      </div>
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
                      <div className="bg-white border border-gray-300 rounded px-3 py-2 text-gray-500">
                        ____________________
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Account Name
                      </label>
                      <div className="bg-white border border-gray-300 rounded px-3 py-2 text-gray-500">
                        ____________________
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Account Number
                      </label>
                      <div className="bg-white border border-gray-300 rounded px-3 py-2 text-gray-500">
                        ____________________
                      </div>
                    </div>
                    <div className="border-t border-blue-200 pt-4">
                      <label className="block text-sm font-semibold text-gray-900 mb-3">
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
                        {formData.modeOfPayment === "cash"
                          ? "Cash"
                          : formData.modeOfPayment === "gcash"
                            ? "GCash"
                            : "Bank Transfer"}
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
