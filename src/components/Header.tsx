'use client';

import { useEffect, useState } from 'react';
import { useI18n } from '@/context/I18nContext';
import { ui } from '@/lib/ui';
import { CloseIcon, MenuIcon } from './Icons';

const NAV = [
  { id: 'about', label: ui.nav.about },
  { id: 'services', label: ui.nav.services },
  { id: 'buy-sell-rent', label: ui.nav.bsr },
  { id: 'branches', label: ui.nav.branches },
  { id: 'careers', label: ui.nav.careers },
];

export function Header() {
  const { t, locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const langButton = (
    <button
      type="button"
      onClick={() => setLocale(locale === 'th' ? 'en' : 'th')}
      aria-label={t(ui.switchLang)}
      className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center border border-slate-300 px-3 text-sm font-semibold text-ink transition-colors duration-200 hover:border-brand hover:text-brand"
    >
      <span className={locale === 'th' ? 'text-brand' : 'text-slate2'}>TH</span>
      <span className="px-1 text-slate-400" aria-hidden="true">/</span>
      <span className={locale === 'en' ? 'text-brand' : 'text-slate2'}>EN</span>
    </button>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
      <a href="#main" className="sr-only z-50 bg-white px-4 py-3 font-semibold text-brand focus:not-sr-only focus:fixed focus:left-2 focus:top-2">
        {t(ui.skip)}
      </a>
      <div className="wrap flex h-16 items-center justify-between gap-4 lg:h-[72px]">
        <a href="#top" className="flex min-h-[44px] shrink-0 items-center" aria-label={t({ th: 'หน้าแรก', en: 'Home' })}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/real/logo-web-372x90.png" alt="The Valuation & Consultants" width={372} height={90} className="h-9 w-auto sm:h-10" />
        </a>

        <nav aria-label={t(ui.mainNav)} className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {NAV.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="inline-flex min-h-[44px] items-center text-[15px] font-medium text-ink transition-colors duration-200 hover:text-brand">
                  {t(item.label)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {langButton}
          <a href="#contact" className="btn-primary !min-h-[44px] !py-2">
            {t(ui.contactUs)}
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          {langButton}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={t(ui.menuOpen)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="inline-flex h-11 w-11 items-center justify-center border border-slate-300 text-ink"
          >
            <MenuIcon />
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" role="dialog" aria-modal="true" aria-label={t(ui.mainNav)} className="fixed inset-0 z-50 flex flex-col bg-white lg:hidden">
          <div className="wrap flex h-16 shrink-0 items-center justify-between border-b border-slate-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/real/logo-web-372x90.png" alt="" width={372} height={90} className="h-9 w-auto" />
            <button type="button" onClick={() => setOpen(false)} aria-label={t(ui.menuClose)} className="inline-flex h-11 w-11 items-center justify-center border border-slate-300 text-ink">
              <CloseIcon />
            </button>
          </div>
          <nav aria-label={t(ui.mainNav)} className="wrap flex-1 overflow-y-auto py-4">
            <ul>
              {[...NAV, { id: 'contact', label: ui.nav.contact }].map((item) => (
                <li key={item.id} className="border-b border-slate-200">
                  <a href={`#${item.id}`} onClick={() => setOpen(false)} className="flex min-h-[56px] items-center text-xl font-semibold text-ink">
                    {t(item.label)}
                  </a>
                </li>
              ))}
            </ul>
            <a href="#contact" onClick={() => setOpen(false)} className="btn-primary mt-8 w-full">
              {t(ui.contactUs)}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
