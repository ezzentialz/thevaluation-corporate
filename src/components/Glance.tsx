'use client';

import { branches, company, executives, services } from '@/lib/content';
import { useI18n } from '@/context/I18nContext';
import { ui } from '@/lib/ui';
import { Reveal } from './Reveal';

/** Only facts that can be counted from the real content. */
export function Glance() {
  const { t } = useI18n();
  const stats = [
    { value: t(company.founded), label: t(ui.founded) },
    { value: String(branches.length), label: t(ui.offices) },
    { value: String(services.scope.length), label: t(ui.serviceLines) },
    { value: String(executives.length), label: t(ui.execMembers) },
  ];

  return (
    <section aria-labelledby="glance-title" className="on-dark bg-brand-deep py-14 text-white sm:py-16">
      <Reveal className="wrap">
        <h2 id="glance-title" className="mb-8 text-sm font-semibold uppercase tracking-wider text-white/80">
          {t(ui.glance)}
        </h2>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse justify-end border-t border-white/30 pt-4">
              <dt className="mt-2 text-[15px] text-white/85">{s.label}</dt>
              <dd className="text-4xl font-bold sm:text-5xl">{s.value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-10 border-t border-white/30 pt-5 sm:flex sm:gap-6">
          <p className="mb-2 shrink-0 text-sm font-semibold uppercase tracking-wider text-white/80 sm:mb-0 sm:pt-0.5">{t(ui.approvalsLabel)}</p>
          <p className="text-lg">{t(company.approvals)}</p>
        </div>
      </Reveal>
    </section>
  );
}
