'use client';

import { careers } from '@/lib/content';
import { useI18n } from '@/context/I18nContext';
import { ui } from '@/lib/ui';
import { Reveal } from './Reveal';

export function Careers() {
  const { t } = useI18n();
  return (
    <section id="careers" aria-labelledby="careers-title" className="section-pad">
      <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-7">
          <h2 id="careers-title" className="h2">{t(careers.title)}</h2>
          <h3 className="mb-2 mt-8 text-xl font-bold text-ink">{t(careers.subtitle)}</h3>
          <p className="mb-4 text-[15px] text-slate2">{t(ui.location)}</p>
          <ul className="divide-y divide-slate-200 border-y border-slate-200">
            {careers.positions.map((p) => (
              <li key={p.title.en} className="flex items-start justify-between gap-4 py-4">
                <span className="text-lg text-ink">{t(p.title)}</span>
                <span className="shrink-0 bg-brand-tint px-3 py-1 text-[15px] font-semibold text-brand-deep">
                  {p.openings} {t(ui.openings)}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="lg:col-span-5">
          <div className="border border-slate-200 border-t-4 border-t-brand bg-mist p-6 sm:p-8">
            <h3 className="text-xl font-bold text-ink">{t(ui.howToApply)}</h3>
            <p className="mt-3 text-lg text-slate2">{t(careers.howToApply)}</p>
            <dl className="mt-5 space-y-1 text-[15px]">
              <div className="flex gap-2">
                <dt className="font-semibold text-ink">{t(ui.email)}</dt>
                <dd><a href={`mailto:${careers.email}`} className="-my-3 inline-block py-3 text-brand underline underline-offset-2 hover:text-brand-dark">{careers.email}</a></dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-semibold text-ink">{t(ui.tel)}</dt>
                <dd className="text-slate2">{careers.tel}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-semibold text-ink">{t(ui.fax)}</dt>
                <dd className="text-slate2">{careers.fax}</dd>
              </div>
            </dl>
            <a href={careers.applicationFormUrl} target="_blank" rel="noopener noreferrer" className="btn-primary mt-6 w-full sm:w-auto">
              {t(ui.applicationForm)}
              <span className="sr-only"> {t(ui.external)}</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
