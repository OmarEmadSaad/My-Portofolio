import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { FaGithub, FaLinkedin, FaWhatsapp, FaEnvelope } from "react-icons/fa";
// import emailjs from "@emailjs/browser";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    if (form.current) {
      const formData = new FormData(form.current);
      try {
        const response = await fetch("https://formspree.io/f/xanoglrr", {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: formData,
        });

        if (response.ok) {
          setStatus("success");
          toast.success(t("contact.successMessage"), {
            position: isRTL ? "top-right" : "top-left",
            autoClose: 3000,
          });
          form.current.reset();
          setTimeout(() => setStatus("idle"), 3000);
        } else {
          const data = await response.json();
          throw new Error(data.error || "Failed to send message");
        }
      } catch (error: any) {
        setStatus("error");
        console.error("Formspree Error:", error.message);
        toast.error(`${t("contact.errorMessage")}: ${error.message}`, {
          position: isRTL ? "top-right" : "top-left",
          autoClose: 5000,
        });
        setTimeout(() => setStatus("idle"), 3000);
      }
    }
  };
  const contactInfo = [
    {
      icon: (
        <Mail className="text-primary-600 dark:text-primary-400" size={24} />
      ),
      text: "oemad3987@gmail.com",
    },
    {
      icon: (
        <Phone className="text-primary-600 dark:text-primary-400" size={24} />
      ),
      text: "+20 111 277 4155",
    },
    {
      icon: (
        <Phone className="text-primary-600 dark:text-primary-400" size={24} />
      ),
      text: "+20 155 382 6299",
    },
    {
      icon: (
        <MapPin className="text-primary-600 dark:text-primary-400" size={24} />
      ),
      text: "Cairo, Egypt",
    },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      className="py-20 bg-white dark:bg-gray-800"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h2
            className={`${
              isRTL ? "font-arabic" : ""
            } text-3xl font-bold text-gray-900 dark:text-white mb-6`}
          >
            {t("contact.title")}
          </h2>
        </motion.div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Form */}
          <motion.div
            className="bg-gray-50 dark:bg-gray-700 rounded-xl shadow-md p-8"
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            animate={
              inView
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: isRTL ? 50 : -50 }
            }
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form ref={form} onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="user_name"
                  className={`${
                    isRTL ? "font-arabic" : ""
                  } block text-gray-700 dark:text-gray-300 mb-2`}
                >
                  {t("contact.nameLabel")}
                </label>
                <input
                  type="text"
                  id="user_name"
                  name="user_name"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="user_email"
                  className={`${
                    isRTL ? "font-arabic" : ""
                  } block text-gray-700 dark:text-gray-300 mb-2`}
                >
                  {t("contact.emailLabel")}
                </label>
                <input
                  type="email"
                  id="user_email"
                  name="user_email"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className={`${
                    isRTL ? "font-arabic" : ""
                  } block text-gray-700 dark:text-gray-300 mb-2`}
                >
                  {t("contact.messageLabel")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                  required
                />
              </div>

              <motion.button
                type="submit"
                className={`${
                  isRTL ? "font-arabic" : ""
                } w-full flex items-center justify-center px-6 py-3 bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white rounded-lg transition-colors ${
                  status === "loading" ? "opacity-70 cursor-not-allowed" : ""
                }`}
                whileHover={status !== "loading" ? { scale: 1.02 } : {}}
                whileTap={status !== "loading" ? { scale: 0.98 } : {}}
                disabled={status === "loading"}
              >
                {status === "loading" ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <>
                    <Send size={18} className={`${isRTL ? "ml-2" : "mr-2"}`} />
                    {t("contact.submitButton")}
                  </>
                )}
              </motion.button>

              {status === "success" && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`${
                    isRTL ? "font-arabic" : ""
                  } text-green-500 text-center mt-2`}
                >
                  {t("contact.successMessage")}
                </motion.p>
              )}

              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`${
                    isRTL ? "font-arabic" : ""
                  } text-red-500 text-center mt-2`}
                >
                  {t("contact.errorMessage")}
                </motion.p>
              )}
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="flex flex-col justify-center space-y-8"
            initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
            animate={
              inView
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: isRTL ? -50 : 50 }
            }
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {contactInfo.map((item, index) => (
              <motion.div
                key={index}
                className="flex items-start space-x-4 rtl:space-x-reverse"
                whileHover={{ x: isRTL ? -5 : 5 }}
              >
                <div className="flex-shrink-0 mt-1">{item.icon}</div>
                <p
                  className={`${
                    isRTL ? "font-arabic" : ""
                  } text-gray-700 dark:text-gray-300`}
                >
                  {item.text}
                </p>
              </motion.div>
            ))}

            <motion.div
              className="mt-8 flex justify-start space-x-6 rtl:space-x-reverse"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {/* Social Media Links */}
              {[
                {
                  platform: "github",
                  href: "https://github.com/OmarEmadSaad",
                  icon: <FaGithub size={24} />,
                },
                {
                  platform: "linkedin",
                  href: "https://www.linkedin.com/in/omar-emad-1413a0238/",
                  icon: <FaLinkedin size={24} />,
                },
                {
                  platform: "whatsapp",
                  href: "https://wa.me/+201112774155",
                  icon: <FaWhatsapp size={24} />,
                },
                {
                  platform: "email",
                  href: "mailto:oemad3987@gmail.com?subject=Contact%20from%20Portfolio",
                  icon: <FaEnvelope size={24} />,
                },
              ].map(({ platform, href, icon }) => (
                <motion.a
                  key={platform}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="sr-only">{platform}</span>
                  {icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Contact;
