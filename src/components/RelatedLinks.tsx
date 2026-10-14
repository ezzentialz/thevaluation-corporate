'use client';

import { links, relatedLinks } from '@/lib/content';
import { useI18n } from '@/context/I18nContext';
import { ui } from '@/lib/ui';
import { Reveal } from './Reveal';

export function RelatedLinks() {
  const { t } = useI18n();
  return (
    <section aria-labelledby="links-title" className="section-pad">
      <Reveal className="wrap">
        <h2 id="links-title" className="text-2xl font-bold text-ink sm:text-3xl">{t(ui.relatedLinks)}</h2>
        <p className="mt-4">
          <a href={links.researchArticles} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center font-semibold text-brand underline underline-offset-4 hover:text-brand-dark">
            {t(ui.researchArticles)}
            <span className="sr-only"> {t(ui.external)}</span>
          </a>
        </p>
        <div className="mt-4 border-y border-slate-200">
          {relatedLinks.map((g) => (
            <details key={g.group.en} className="group border-b border-slate-200 last:border-b-0">
              <summary className="flex min-h-[52px] cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold text-ink [&::-webkit-details-marker]:hidden">
                {t(g.group)}
                <span aria-hidden="true" className="text-2xl leading-none text-brand group-open:hidden">+</span>
                <span aria-hidden="true" className="hidden text-2xl leading-none text-brand group-open:inline">&minus;</span>
              </summary>
              <ul className="grid gap-x-8 pb-4 sm:grid-cols-2">
                {g.items.map((i) => (
                  <li key={i.url}>
                    <a href={i.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center text-slate2 underline underline-offset-2 hover:text-brand">
                      {i.name}
                      <span className="sr-only"> {t(ui.external)}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
