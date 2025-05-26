import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Sun, Moon, Languages, Menu, X } from 'lucide-react';

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);

  // Check if system prefers dark mode
  useEffect(() => {
    if (localStorage.theme === 'dark' || 
        (!('theme' in localStorage) && 
         window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Handle scroll detection for header background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    }
  };

  const toggleLanguage = () => {
    const newLanguage = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLanguage);
    document.documentElement.dir = newLanguage === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLanguage;
  };

  const closeMenu = () => setIsMenuOpen(false);

  const navItems = [
    { id: 'home', label: t('header.home') },
    { id: 'about', label: t('header.about') },
    { id: 'skills', label: t('header.skills') },
    { id: 'projects', label: t('header.projects') },
    { id: 'contact', label: t('header.contact') }
  ];

  const isRTL = i18n.language === 'ar';

  return (
    <motion.header 
      className={`fixed w-full z-50 py-4 transition-all duration-300 ${
        scrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur shadow-md' : ''
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <motion.a
          href="#home"
          className="text-2xl font-bold text-primary-600 dark:text-primary-400 flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className={`${isRTL ? 'font-arabic' : ''}`}>Omar Emad</span>
        </motion.a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 rtl:space-x-reverse">
          <ul className="flex space-x-8 rtl:space-x-reverse items-center">
            {navItems.map(item => (
              <motion.li key={item.id} whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                <a 
                  href={`#${item.id}`} 
                  className={`${isRTL ? 'font-arabic' : ''} text-gray-800 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 px-1 py-2 transition-colors`}
                >
                  {item.label}
                </a>
              </motion.li>
            ))}
          </ul>
          
          <div className="flex items-center ml-6 space-x-3 rtl:space-x-reverse">
            <motion.button
              onClick={toggleLanguage}
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle Language"
            >
              <Languages size={20} />
            </motion.button>
            
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
          </div>
        </nav>

        {/* Mobile Navigation Button */}
        <div className="md:hidden flex items-center">
          <div className="flex items-center space-x-3 rtl:space-x-reverse mr-2">
            <motion.button
              onClick={toggleLanguage}
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle Language"
            >
              <Languages size={20} />
            </motion.button>
            
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
          </div>
          
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            className="fixed inset-0 bg-white dark:bg-gray-900 z-50 pt-20 px-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            <ul className="flex flex-col space-y-6 items-center">
              {navItems.map(item => (
                <motion.li 
                  key={item.id} 
                  className="w-full text-center"
                  whileHover={{ x: isRTL ? -5 : 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a 
                    href={`#${item.id}`}
                    className={`${isRTL ? 'font-arabic' : ''} block text-xl font-medium py-2 text-gray-800 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors`}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <button
              onClick={closeMenu}
              className="absolute top-6 right-6 p-2 rounded-full text-gray-700 dark:text-gray-300"
              aria-label="Close Menu"
            >
              <X size={24} />
            </button>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;