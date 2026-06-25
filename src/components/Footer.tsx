import { Heart } from "lucide-react";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { author } from "@/lib/site";

type Props = { dict: Dictionary; locale: Locale };

// Server Component — static footer, hover effects via CSS only.
const Footer = ({ dict }: Props) => {
  const socials = [
    { label: "GitHub", href: author.social.github, icon: <FaGithub className="h-6 w-6" /> },
    { label: "LinkedIn", href: author.social.linkedin, icon: <FaLinkedin className="h-6 w-6" /> },
    { label: "WhatsApp", href: author.social.whatsapp, icon: <FaWhatsapp className="h-6 w-6" /> },
  ];

  return (
    <footer className="py-8 bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center">
          <a
            href="#home"
            className="text-xl font-bold text-primary-600 dark:text-primary-400 mb-1 transition-transform hover:scale-105"
          >
            {dict.hero.name}
          </a>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{dict.footer.role}</p>

          <div className="flex justify-center space-x-6 rtl:space-x-reverse mb-6">
            {socials.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-all hover:scale-110"
                aria-label={label}
              >
                {icon}
              </a>
            ))}
          </div>

          <div className="text-center">
            <p className="text-gray-700 dark:text-gray-300 mb-2">{dict.footer.copyright}</p>
            <p className="text-gray-600 dark:text-gray-400 flex items-center justify-center gap-1">
              {dict.footer.madeWith} <Heart size={16} className="text-red-500" aria-hidden="true" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
