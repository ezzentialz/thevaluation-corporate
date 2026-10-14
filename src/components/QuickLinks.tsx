'use client';

import { buySellRent, contact, services } from '@/lib/content';
import { useI18n } from '@/context/I18nContext';
import { ui } from '@/lib/ui';
import { ArrowRight, ServiceIcon } from './Icons';

const LINKS = [
  { href: '#services', icon: 'building', label: services.title },
  { href: '#buy-sell-rent', icon: 'key', label: buySellRent.title },
  { href: '#branches', icon: 'pin', label: ui.branches },
  { href: '#contact', icon: 'mail', label: contact.title },
];

/** White card strip overlapping the bottom edge of the hero. */
export function QuickLinks() {
  const { t } = useI18n();
  return (
    <nav aria-label={t(ui.quickLinks)} className="wrap relative z-10 -mt-16">
      <ul className="grid grid-cols-1 bg-white shadow-[0_8px_30px_rgba(16,26,77,0.14)] sm:grid-cols-2 lg:grid-cols-4">
        {LINKS.map((l) => (
          <li key={l.href} className="border-b border-slate-200 last:border-b-0 sm:odd:border-r sm:[&:nth-child(n+3)]:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0">
            <a href={l.href} className="group flex min-h-[88px] items-center gap-4 px-5 py-4 transition-colors duration-200 hover:bg-brand-tint">
              <ServiceIcon name={l.icon} className="h-9 w-9 shrink-0 text-brand" />
              <span className="flex-1 text-lg font-semibold text-ink">{t(l.label)}</span>
              <ArrowRight className="shrink-0 text-brand transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
