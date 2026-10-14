'use client';

import { useState, type FormEvent } from 'react';
import { contact } from '@/lib/content';
import type { Bi } from '@/lib/content';
import { useI18n } from '@/context/I18nContext';
import { form, ui } from '@/lib/ui';
import { Reveal } from './Reveal';

export function Contact() {
  const { t } = useI18n();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<{ kind: 'error' | 'ok'; text: Bi } | null>(null);

  // No backend: this opens the visitor's e-mail app through a mailto: link.
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setStatus({ kind: 'error', text: form.contactError });
      return;
    }
    const body = `${t(form.contactName)}: ${name.trim()}\n${email.trim() ? `${t(ui.email)}: ${email.trim()}\n` : ''}\n${message.trim()}`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(t(form.contactSubject))}&body=${encodeURIComponent(body)}`;
    setStatus({ kind: 'ok', text: form.success });
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="section-pad bg-mist">
      <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <h2 id="contact-title" className="h2">{t(contact.title)}</h2>
          <p className="mt-6 text-lg font-semibold text-ink">{t({ th: 'สำนักงานใหญ่ กรุงเทพฯ', en: 'Head Office, Bangkok' })}</p>
          <dl className="mt-4 space-y-4">
            <div>
              <dt className="text-sm font-semibold uppercase tracking-wider text-brand">{t(ui.address)}</dt>
              <dd className="text-slate2">{t(contact.address)}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold uppercase tracking-wider text-brand">{t(ui.tel)}</dt>
              <dd><a href={contact.telHref} className="-my-2 inline-block py-2 text-ink underline underline-offset-2 hover:text-brand">{contact.tel}</a></dd>
            </div>
            <div>
              <dt className="text-sm font-semibold uppercase tracking-wider text-brand">{t(ui.mobile)}</dt>
              <dd className="text-slate2">{contact.mobiles.join(', ')}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold uppercase tracking-wider text-brand">{t(ui.fax)}</dt>
              <dd className="text-slate2">{contact.fax}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold uppercase tracking-wider text-brand">{t(ui.email)}</dt>
              <dd><a href={`mailto:${contact.email}`} className="-my-2 inline-block py-2 text-brand underline underline-offset-2 hover:text-brand-dark">{contact.email}</a></dd>
            </div>
          </dl>
        </Reveal>

        <Reveal className="lg:col-span-7">
          <form onSubmit={onSubmit} noValidate className="space-y-4 border border-slate-200 bg-white p-5 sm:p-8">
            <h3 className="text-xl font-bold text-ink">{t(form.contactIntro)}</h3>
            <div>
              <label htmlFor="c-name" className="mb-1 block text-[15px] font-medium text-ink">{t(form.contactName)} <span className="text-red-700" aria-hidden="true">*</span></label>
              <input id="c-name" value={name} onChange={(e) => setName(e.target.value)} required autoComplete="name" className="field" />
            </div>
            <div>
              <label htmlFor="c-email" className="mb-1 block text-[15px] font-medium text-ink">{t(form.email)}</label>
              <input id="c-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" className="field" />
            </div>
            <div>
              <label htmlFor="c-message" className="mb-1 block text-[15px] font-medium text-ink">{t(form.contactMessage)} <span className="text-red-700" aria-hidden="true">*</span></label>
              <textarea id="c-message" rows={5} value={message} onChange={(e) => setMessage(e.target.value)} required className="field" />
            </div>
            <button type="submit" className="btn-primary w-full sm:w-auto">{t(form.contactSend)}</button>
            <p role="status" aria-live="polite" className={status?.kind === 'error' ? 'font-medium text-red-700' : 'text-slate2'}>
              {status ? t(status.text) : ''}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
