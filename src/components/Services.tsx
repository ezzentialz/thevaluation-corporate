'use client';

import { services } from '@/lib/content';
import { useI18n } from '@/context/I18nContext';
import { ServiceIcon } from './Icons';
import { Reveal } from './Reveal';

export function Services() {
  const { t } = useI18n();
  return (
    <section id="services" aria-labelledby="services-title" className="section-pad bg-mist">
      <div className="wrap">
        <Reveal className="max-w-3xl">
          <h2 id="services-title" className="h2">{t(services.title)}</h2>
          <p className="mt-5 text-lg text-slate2">{t(services.intro)}</p>
        </Reveal>

        <Reveal className="mt-12">
          <h3 className="mb-5 text-xl font-bold text-ink">{t(services.scopeTitle)}</h3>
          <ul className="grid gap-px border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">
            {services.scope.map((s) => (
              <li key={s.icon} className="flex flex-col gap-4 bg-white p-6 transition-colors duration-200 hover:bg-brand-tint">
                <ServiceIcon name={s.icon} className="h-10 w-10 text-brand" />
                <span className="text-lg font-semibold text-ink">{t(s.title)}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <h3 className="mb-5 border-b-2 border-brand pb-3 text-xl font-bold text-ink">{t(services.objectivesTitle)}</h3>
            <ul className="divide-y divide-slate-200">
              {t(services.objectives).map((o) => (
                <li key={o} className="py-3 text-slate2">{o}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal>
            <h3 className="mb-5 border-b-2 border-brand pb-3 text-xl font-bold text-ink">{t(services.typesTitle)}</h3>
            <ul className="divide-y divide-slate-200">
              {t(services.types).map((o) => (
                <li key={o} className="py-3 text-slate2">{o}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
