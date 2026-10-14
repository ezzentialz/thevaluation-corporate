'use client';

import { executives } from '@/lib/content';
import { useI18n } from '@/context/I18nContext';
import { ui } from '@/lib/ui';
import { Reveal } from './Reveal';

export function Executives() {
  const { t } = useI18n();
  return (
    <section aria-labelledby="exec-title" className="section-pad">
      <div className="wrap grid gap-8 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <h2 id="exec-title" className="h2">{t(ui.executives)}</h2>
        </Reveal>
        <Reveal className="lg:col-span-8">
          <ul className="divide-y divide-slate-200 border-y border-slate-200">
            {executives.map((e) => (
              <li key={e.name.en} className="grid gap-1 py-5 sm:grid-cols-5 sm:gap-6">
                <p className="text-lg font-semibold text-ink sm:col-span-2">{t(e.name)}</p>
                <p className="text-slate2 sm:col-span-3">{t(e.role)}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
