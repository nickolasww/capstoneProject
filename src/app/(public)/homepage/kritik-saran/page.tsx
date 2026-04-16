import React, { useState } from "react";
import { Spinner } from "@/app/loading";

const KritikDanSaran = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Handle form submission here
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Form submitted:", formData);
      alert("Terima kasih atas kritik dan saran Anda!");

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-4 text-center text-4xl font-bold text-gray-800">
            Kritik dan Saran
          </h1>
          <p className="mb-12 text-center text-gray-600">
            Kami sangat menghargai masukan Anda untuk meningkatkan layanan kami
          </p>
          <div className="max-w-sm flex flex-col items-center justify-center mx-auto">
          <a
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=human_resource@bukitaurumnsejahtera.co.id&su=${encodeURIComponent(
              "Kritik dan Saran",
            )}&body=${encodeURIComponent("Halo, saya ingin mengirim kritik dan saran: ")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded-lg bg-green-600 py-3 px-fit font-semibold text-white transition hover:bg-green-700 flex items-center justify-center gap-2"
          >
            Beri Kritik dan Saran
          </a>
           <p className="mt-4 text-xs text-gray-400">
            Akan membuka email melalui browser Anda
          </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KritikDanSaran;
