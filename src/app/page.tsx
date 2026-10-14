import { About } from '@/components/About';
import { Branches } from '@/components/Branches';
import { BuySellRent } from '@/components/BuySellRent';
import { Careers } from '@/components/Careers';
import { Contact } from '@/components/Contact';
import { Executives } from '@/components/Executives';
import { Footer } from '@/components/Footer';
import { Glance } from '@/components/Glance';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { QuickLinks } from '@/components/QuickLinks';
import { RelatedLinks } from '@/components/RelatedLinks';
import { Services } from '@/components/Services';

export default function Page() {
  return (
    <div id="top">
      <Header />
      <main id="main">
        <Hero />
        <QuickLinks />
        <About />
        <Glance />
        <Services />
        <Executives />
        <BuySellRent />
        <Branches />
        <Careers />
        <Contact />
        <RelatedLinks />
      </main>
      <Footer />
    </div>
  );
}
