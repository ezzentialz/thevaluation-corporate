'use client';

import { useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react';
import { buySellRent, contact } from '@/lib/content';
import type { Bi } from '@/lib/content';
import { useI18n } from '@/context/I18nContext';
import { form, ui } from '@/lib/ui';
import { Reveal } from './Reveal';

type Mode = 'buy' | 'sell' | 'rent';
const MODES: Mode[] = ['buy', 'sell', 'rent'];

type FieldDef = { key: string; label: Bi };

const AREA_FIELDS: FieldDef[] = [
  { key: 'rai', label: form.rai },
  { key: 'ngan', label: form.ngan },
  { key: 'wah', label: form.wah },
  { key: 'sqm', label: form.sqm },
];
const ROOM_FIELDS: FieldDef[] = [
  { key: 'floors', label: form.floors },
  { key: 'bedrooms', label: form.bedrooms },
  { key: 'bathrooms', label: form.bathrooms },
  { key: 'kitchens', label: form.kitchens },
];
const ADDRESS_FIELDS: FieldDef[] = [
  { key: 'address', label: form.address },
  { key: 'moo', label: form.moo },
  { key: 'soi', label: form.soi },
  { key: 'road', label: form.road },
  { key: 'subDistrict', label: form.subDistrict },
  { key: 'district', label: form.district },
  { key: 'province', label: form.province },
];

type TextOptions = { type?: string; required?: boolean; inputMode?: 'numeric' | 'tel' | 'decimal'; autoComplete?: string };

function Field({ id, label, required, children }: { id: string; label: string; required?: boolean; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-[15px] font-medium text-ink">
        {label}
        {required && <span className="text-red-700" aria-hidden="true"> *</span>}
      </label>
      {children}
    </div>
  );
}

export function BuySellRent() {
  const { t } = useI18n();
  const [mode, setMode] = useState<Mode>('buy');
  const [values, setValues] = useState<Record<string, string>>({});
  const [advice, setAdvice] = useState(false);
  const [status, setStatus] = useState<{ kind: 'error' | 'ok'; text: Bi } | null>(null);

  const bind = (key: string) => ({
    id: `bsr-${key}`,
    name: key,
    value: values[key] ?? '',
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setValues((v) => ({ ...v, [key]: e.target.value })),
  });

  const textField = (key: string, label: Bi, opts: TextOptions = {}) => (
    <Field key={key} id={`bsr-${key}`} label={t(label)} required={opts.required}>
      <input {...bind(key)} type={opts.type ?? 'text'} inputMode={opts.inputMode} autoComplete={opts.autoComplete} required={opts.required} className="field" />
    </Field>
  );

  // This form has no backend: it builds a mailto: link and hands the details to the visitor's e-mail app.
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!values.fullName?.trim() || !values.phone?.trim()) {
      setStatus({ kind: 'error', text: form.errorRequired });
      return;
    }
    const line = (label: Bi, value?: string) => (value && value.trim() ? `${t(label)}: ${value.trim()}\n` : '');
    const lines = (defs: FieldDef[]) => defs.map((f) => line(f.label, values[f.key])).join('');
    const body =
      `${t(buySellRent.tabs[mode])}\n\n` +
      `${t(form.contactDetails)}\n` +
      line(form.fullName, values.fullName) +
      line(form.phone, values.phone) +
      line(form.email, values.email) +
      line(form.lineId, values.lineId) +
      `\n${t(form.propertyDetails)}\n` +
      line(form.propertyType, values.type) +
      line(form.otherType, values.otherType) +
      lines(AREA_FIELDS) +
      lines(ROOM_FIELDS) +
      line(form.price[mode], values.price) +
      (advice ? `${t(form.advice[mode])}\n` : '') +
      `\n${t(form.locationDetails)}\n` +
      lines(ADDRESS_FIELDS) +
      line(form.details, values.details);
    const subject = `${t(form.subject)}: ${t(buySellRent.tabs[mode])} - ${values.fullName.trim()}`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus({ kind: 'ok', text: form.success });
  };

  return (
    <section id="buy-sell-rent" aria-labelledby="bsr-title" className="section-pad">
      <div className="wrap">
        <Reveal className="max-w-3xl">
          <h2 id="bsr-title" className="h2">{t(buySellRent.title)}</h2>
          <p className="mt-5 text-lg text-slate2">{t(form.intro)}</p>
        </Reveal>

        <Reveal className="mt-10 border border-slate-200 bg-white shadow-[0_4px_24px_rgba(20,32,46,0.06)]">
          <div role="tablist" aria-label={t(buySellRent.title)} className="grid grid-cols-3 border-b border-slate-200">
            {MODES.map((m) => (
              <button
                key={m}
                type="button"
                role="tab"
                id={`bsr-tab-${m}`}
                aria-selected={mode === m}
                aria-controls="bsr-panel"
                onClick={() => {
                  setMode(m);
                  setStatus(null);
                }}
                className={`min-h-[56px] border-b-4 px-4 text-lg font-semibold transition-colors duration-200 ${mode === m ? 'border-brand bg-brand-tint text-brand-deep' : 'border-transparent text-slate2 hover:text-brand'}`}
              >
                {t(buySellRent.tabs[m])}
              </button>
            ))}
          </div>

          <form id="bsr-panel" role="tabpanel" aria-labelledby={`bsr-tab-${mode}`} onSubmit={onSubmit} noValidate className="space-y-10 p-5 sm:p-8">
            <fieldset>
              <legend className="mb-4 text-xl font-bold text-ink">{t(form.contactDetails)}</legend>
              <div className="grid gap-4 sm:grid-cols-2">
                {textField('fullName', form.fullName, { required: true, autoComplete: 'name' })}
                {textField('phone', form.phone, { required: true, type: 'tel', inputMode: 'tel', autoComplete: 'tel' })}
                {textField('email', form.email, { type: 'email', autoComplete: 'email' })}
                {textField('lineId', form.lineId)}
              </div>
            </fieldset>

            <fieldset>
              <legend className="mb-4 text-xl font-bold text-ink">{t(form.propertyDetails)}</legend>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field id="bsr-type" label={t(form.propertyType)}>
                  <select {...bind('type')} className="field">
                    <option value="">{t(form.choose)}</option>
                    {form.types.map((o) => (
                      <option key={o.en} value={t(o)}>{t(o)}</option>
                    ))}
                  </select>
                </Field>
                {textField('otherType', form.otherType)}
              </div>
              <p className="mb-2 mt-6 text-[15px] font-medium text-ink">{t(form.area)}</p>
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {AREA_FIELDS.map((f) => textField(f.key, f.label, { inputMode: 'decimal' }))}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
                {ROOM_FIELDS.map((f) => textField(f.key, f.label, { inputMode: 'numeric' }))}
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {textField('price', form.price[mode], { inputMode: 'decimal' })}
                <label className="flex min-h-[48px] items-center gap-3 self-end text-base text-ink">
                  <input type="checkbox" checked={advice} onChange={(e) => setAdvice(e.target.checked)} className="h-5 w-5 accent-brand" />
                  {t(form.advice[mode])}
                </label>
              </div>
            </fieldset>

            <fieldset>
              <legend className="mb-4 text-xl font-bold text-ink">{t(form.locationDetails)}</legend>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {ADDRESS_FIELDS.map((f) => textField(f.key, f.label))}
              </div>
              <div className="mt-4">
                <Field id="bsr-details" label={t(form.details)}>
                  <textarea {...bind('details')} rows={4} className="field" />
                </Field>
              </div>
            </fieldset>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <button type="submit" className="btn-primary sm:min-w-[180px]">{t(form.submit)}</button>
              <a href={buySellRent.agentUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center font-semibold text-brand underline underline-offset-4 hover:text-brand-dark">
                {t(ui.joinAgent)}<span className="sr-only"> {t(ui.external)}</span>
              </a>
            </div>
            <p role="status" aria-live="polite" className={`text-base ${status?.kind === 'error' ? 'font-medium text-red-700' : 'text-slate2'}`}>
              {status ? t(status.text) : ''}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
