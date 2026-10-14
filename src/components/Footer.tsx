'use client';

import { company, contact, links } from '@/lib/content';
import { useI18n } from '@/context/I18nContext';
import { ui } from '@/lib/ui';

const FOOT_NAV = [
  { id: 'about', label: ui.nav.about },
  { id: 'services', label: ui.nav.services },
  { id: 'buy-sell-rent', label: ui.nav.bsr },
  { id: 'branches', label: ui.nav.branches },
  { id: 'careers', label: ui.nav.careers },
  { id: 'contact', label: ui.nav.contact },
];

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t-4 border-brand bg-mist">
      <div className="wrap grid gap-10 py-12 md:grid-cols-12">
        <div className="md:col-span-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/real/logo-web-372x90.png" alt={t(company.shortName)} width={372} height={90} loading="lazy" className="h-10 w-auto" />
          <p className="mt-4 font-semibold text-ink">{t(company.name)}</p>
          <p className="mt-1 text-slate2">{t(contact.address)}</p>
        </div>
        <div className="md:col-span-4">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-brand">{t(ui.contactUs)}</h2>
          <ul className="text-slate2">
            <li><a href={contact.telHref} className="inline-flex min-h-[44px] items-center hover:text-brand">{t(ui.tel)} {contact.tel}</a></li>
            <li><a href={`mailto:${contact.email}`} className="inline-flex min-h-[44px] items-center hover:text-brand">{contact.email}</a></li>
          </ul>
        </div>
        <nav aria-label={t(ui.footerLinks)} className="md:col-span-3">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-brand">{t(ui.footerLinks)}</h2>
          <ul className="text-slate2">
            {FOOT_NAV.map((n) => (
              <li key={n.id}><a href={`#${n.id}`} className="inline-flex min-h-[44px] items-center hover:text-brand">{t(n.label)}</a></li>
            ))}
            <li>
              <a href={links.privacyPolicyTh} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center hover:text-brand">
                {t(ui.privacy)}<span className="sr-only"> {t(ui.external)}</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-slate-200">
        <p className="wrap py-4 text-sm text-slate2">&copy; {t(company.name)}</p>
      </div>
    </footer>
  );
}
