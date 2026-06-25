"use client";

import { useState, useRef, type FormEvent } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { FaGithub, FaLinkedin, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { author } from "@/lib/site";

type Props = { dict: Dictionary; locale: Locale };

const Contact = ({ dict }: Props) => {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    if (!form.current) return;

    const formData = new FormData(form.current);
    try {
      const response = await fetch("https://formspree.io/f/xanoglrr", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      if (response.ok) {
        setStatus("success");
        form.current.reset();
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        const data = await response.json();
        throw new Error(data.error || "Failed to send message");
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const contactInfo = [
    { icon: <Mail className="text-primary-600 dark:text-primary-400" size={24} />, text: author.email },
    { icon: <Phone className="text-primary-600 dark:text-primary-400" size={24} />, text: "+20 111 277 4155" },
    { icon: <Phone className="text-primary-600 dark:text-primary-400" size={24} />, text: "+20 155 382 6299" },
    { icon: <MapPin className="text-primary-600 dark:text-primary-400" size={24} />, text: dict.contact.location },
  ];

  const socials = [
    { platform: "GitHub", href: author.social.github, icon: <FaGithub size={24} /> },
    { platform: "LinkedIn", href: author.social.linkedin, icon: <FaLinkedin size={24} /> },
    { platform: "WhatsApp", href: author.social.whatsapp, icon: <FaWhatsapp size={24} /> },
    { platform: "Email", href: author.social.email, icon: <FaEnvelope size={24} /> },
  ];

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900 scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="reveal max-w-3xl mx-auto text-center mb-12" data-reveal>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {dict.contact.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {dict.contact.subtitle}
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="reveal bg-white dark:bg-gray-800 rounded-xl shadow-md p-8" data-reveal>
            <form ref={form} onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="user_name" className="block text-gray-700 dark:text-gray-300 mb-2">
                  {dict.contact.nameLabel}
                </label>
                <input
                  type="text"
                  id="user_name"
                  name="user_name"
                  autoComplete="name"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="user_email" className="block text-gray-700 dark:text-gray-300 mb-2">
                  {dict.contact.emailLabel}
                </label>
                <input
                  type="email"
                  id="user_email"
                  name="user_email"
                  autoComplete="email"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 mb-2">
                  {dict.contact.messageLabel}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className={`w-full flex items-center justify-center px-6 py-3 bg-primary-600 hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-700 text-white rounded-lg transition-colors ${
                  status === "loading" ? "opacity-70 cursor-not-allowed" : ""
                }`}
                disabled={status === "loading"}
              >
                {status === "loading" ? (
                  dict.contact.sending
                ) : (
                  <>
                    <Send size={18} className="mr-2 rtl:ml-2 rtl:mr-0" aria-hidden="true" />
                    {dict.contact.submitButton}
                  </>
                )}
              </button>

              {/* Accessible, polite status message (replaces a heavy toast lib). */}
              <p
                role="status"
                aria-live="polite"
                className={`text-center text-sm min-h-[1.25rem] ${
                  status === "success"
                    ? "text-green-600 dark:text-green-400"
                    : status === "error"
                      ? "text-red-600 dark:text-red-400"
                      : ""
                }`}
              >
                {status === "success" && dict.contact.successMessage}
                {status === "error" && dict.contact.errorMessage}
              </p>
            </form>
          </div>

          <div className="reveal flex flex-col justify-center space-y-8" data-reveal>
            <address className="not-italic space-y-6">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start space-x-4 rtl:space-x-reverse">
                  <div className="flex-shrink-0 mt-1">{item.icon}</div>
                  <p className="text-gray-700 dark:text-gray-300">{item.text}</p>
                </div>
              ))}
            </address>

            <div className="mt-8 flex justify-start space-x-6 rtl:space-x-reverse">
              {socials.map(({ platform, href, icon }) => (
                <a
                  key={platform}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
                  aria-label={platform}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
