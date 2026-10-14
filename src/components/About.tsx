'use client';

import { about } from '@/lib/content';
import { useI18n } from '@/context/I18nContext';
import { ui } from '@/lib/ui';
import { Reveal } from './Reveal';

export function About() {
  const { t } = useI18n();
  return (
    <section id="about" aria-labelledby="about-title" className="section-pad pt-24 sm:pt-28">
      <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="self-start lg:sticky lg:top-28 lg:col-span-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/real/workers-of-real-estate-agency-PNLKS22.jpg"
            alt={t({ th: 'ทีมงานทำงานร่วมกันบนแบบแปลนและแผนที่', en: 'A team working together over plans and maps' })}
            width={540}
            height={368}
            loading="lazy"
            className="aspect-[3/2] w-full object-cover lg:aspect-[4/5]"
          />
        </Reveal>
        <Reveal className="lg:col-span-7">
          <p className="eyebrow">{t(ui.nav.about)}</p>
          <h2 id="about-title" className="h2 mb-8">{t(about.title)}</h2>
          <div className="space-y-5 text-lg text-slate2">
            {t(about.paragraphs).map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <h3 className="mb-4 mt-10 text-xl font-bold text-ink">{t(ui.clientsTitle)}</h3>
          <ul className="flex flex-wrap gap-2">
            {t(about.clientTypes).map((c) => (
              <li key={c} className="border border-slate-300 bg-white px-3 py-1.5 text-[15px] text-ink">
                {c}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

