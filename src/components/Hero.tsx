'use client';

import { useEffect, useState } from 'react';
import { about, company } from '@/lib/content';
import { useI18n } from '@/context/I18nContext';
import { ui } from '@/lib/ui';
import { Chevron } from './Icons';

const SLIDES = [
  { src: '/images/real/about.jpg', alt: { th: 'ผู้คนในอาคารสำนักงานผนังกระจกมองเห็นตึกสูง', en: 'People in a glass-walled office overlooking tall buildings' } },
  { src: '/images/hero-slide.jpg', alt: { th: 'ทิวทัศน์เมืองและตึกสูงยามพลบค่ำ', en: 'City skyline and tall buildings at dusk' } },
  { src: '/images/real/office-building.jpg', alt: { th: 'อาคารสำนักงานผนังกระจก', en: 'Glass-fronted office buildings' } },
];

const INTERVAL_MS = 8000;

export function Hero() {
  const { t } = useI18n();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (paused || reduced) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused, reduced, index]);

  const go = (n: number) => setIndex((n + SLIDES.length) % SLIDES.length);

  return (
    <section
      aria-roledescription="carousel"
      aria-label={t(company.name)}
      className="on-dark relative isolate overflow-hidden bg-brand-deep text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="absolute inset-0 -z-10">
        {SLIDES.map((slide, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={slide.src}
            src={slide.src}
            alt={i === index ? t(slide.alt) : ''}
            width={1920}
            height={900}
            loading={i === 0 ? 'eager' : 'lazy'}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${i === index ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-deep/95 via-brand-deep/80 to-brand-deep/25 max-lg:bg-brand-deep/75" />
      </div>

      <div className="wrap flex min-h-[560px] flex-col justify-center pb-44 pt-16 sm:min-h-[620px] lg:min-h-[660px] lg:pb-36">
        <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/80">{t(company.name)}</p>
        <h1 className="max-w-3xl text-4xl font-bold leading-[1.4] sm:text-5xl sm:leading-[1.4] lg:text-6xl lg:leading-[1.35]">{t(company.slogan)}</h1>
        <p className="mt-6 max-w-xl text-lg text-white/90">{t(about.paragraphs)[2]}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="#services" className="btn-white">
            {t(ui.ourServices)}
          </a>
          <a href="#contact" className="btn-outline-light">
            {t(ui.contactUs)}
          </a>
        </div>
      </div>

      <div className="wrap pointer-events-none absolute inset-x-0 bottom-20 flex justify-start lg:bottom-24 lg:justify-end">
        <div className="pointer-events-auto flex items-center">
          <button type="button" onClick={() => go(index - 1)} aria-label={t(ui.prevSlide)} className="inline-flex h-11 w-11 items-center justify-center border border-white/60 transition-colors duration-200 hover:bg-white hover:text-brand-deep">
            <Chevron dir="left" />
          </button>
          <div className="flex">
            {SLIDES.map((slide, i) => (
              <button key={slide.src} type="button" onClick={() => go(i)} aria-label={`${t(ui.goToSlide)} ${i + 1}`} aria-current={i === index} className="group inline-flex h-11 w-9 items-center justify-center">
                <span className={`block h-1 w-6 transition-colors duration-200 ${i === index ? 'bg-white' : 'bg-white/40 group-hover:bg-white/70'}`} />
              </button>
            ))}
          </div>
          <button type="button" onClick={() => go(index + 1)} aria-label={t(ui.nextSlide)} className="inline-flex h-11 w-11 items-center justify-center border border-white/60 transition-colors duration-200 hover:bg-white hover:text-brand-deep">
            <Chevron dir="right" />
          </button>
        </div>
      </div>
    </section>
  );
}
