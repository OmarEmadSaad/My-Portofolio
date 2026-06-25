import { type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return (
    <>
      <Header dict={dict} locale={locale} />
      <main id="main">
        <Hero dict={dict} locale={locale} />
        <About dict={dict} locale={locale} />
        <Services dict={dict} locale={locale} />
        <Skills dict={dict} locale={locale} />
        <Projects dict={dict} locale={locale} />
        <Contact dict={dict} locale={locale} />
      </main>
      <Footer dict={dict} locale={locale} />
    </>
  );
}
