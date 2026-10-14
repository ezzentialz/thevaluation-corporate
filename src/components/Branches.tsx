'use client';

import { useEffect, useRef, useState } from 'react';
import { branches, type Branch } from '@/lib/content';
import { useI18n } from '@/context/I18nContext';
import { ui } from '@/lib/ui';
import { CloseIcon } from './Icons';
import { Reveal } from './Reveal';

function MapDialog({ branch, onClose }: { branch: Branch; onClose: () => void }) {
  const { t } = useI18n();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      previous?.focus();
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/70 p-4" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${t(ui.mapOf)} ${t(branch.name)}`}
        className="flex max-h-full w-full max-w-3xl flex-col bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-5 py-3">
          <p className="text-lg font-semibold text-ink">{t(branch.name)}</p>
          <button ref={closeRef} type="button" onClick={onClose} aria-label={t(ui.closeMap)} className="inline-flex h-11 w-11 shrink-0 items-center justify-center text-ink hover:text-brand">
            <CloseIcon />
          </button>
        </div>
        <div className="overflow-auto">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={branch.map} alt={`${t(ui.mapOf)} ${t(branch.name)}`} className="h-auto w-full" />
        </div>
        <p className="border-t border-slate-200 px-5 py-3 text-slate2">{t(branch.address)}</p>
      </div>
    </div>
  );
}

export function Branches() {
  const { t } = useI18n();
  const [openId, setOpenId] = useState<string | null>(null);
  const openBranch = branches.find((b) => b.id === openId);

  return (
    <section id="branches" aria-labelledby="branches-title" className="section-pad bg-mist">
      <div className="wrap">
        <Reveal>
          <h2 id="branches-title" className="h2">{t(ui.branches)}</h2>
        </Reveal>
        <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {branches.map((b) => (
            <li key={b.id}>
              <Reveal className="flex h-full flex-col border border-slate-200 border-t-4 border-t-brand bg-white p-6">
                <h3 className="text-xl font-bold text-ink">{t(b.name)}</h3>
                <p className="mt-3 text-slate2">{t(b.address)}</p>
                <dl className="mb-5 mt-4 space-y-1 text-[15px]">
                  <div className="flex gap-2">
                    <dt className="shrink-0 font-semibold text-ink">{t(ui.tel)}</dt>
                    <dd className="text-slate2">{b.phones}</dd>
                  </div>
                  {b.mobile && (
                    <div className="flex gap-2">
                      <dt className="shrink-0 font-semibold text-ink">{t(ui.mobile)}</dt>
                      <dd className="text-slate2">{b.mobile}</dd>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <dt className="shrink-0 font-semibold text-ink">{t(ui.email)}</dt>
                    <dd className="min-w-0 break-words">
                      <a href={`mailto:${b.email}`} className="-my-3 inline-block py-3 text-brand underline underline-offset-2 hover:text-brand-dark">{b.email}</a>
                    </dd>
                  </div>
                </dl>
                {b.map && (
                  <button type="button" onClick={() => setOpenId(b.id)} className="btn-outline mt-auto !min-h-[44px] !py-2 self-start">
                    {t(ui.viewMap)}
                    <span className="sr-only"> {t(b.name)}</span>
                  </button>
                )}
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
      {openBranch && <MapDialog branch={openBranch} onClose={() => setOpenId(null)} />}
    </section>
  );
}

