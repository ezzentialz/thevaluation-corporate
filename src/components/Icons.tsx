import type { ReactNode } from 'react';

type IconProps = { className?: string };

function Svg({ className, children }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 32 32"
      width="32"
      height="32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {children}
    </svg>
  );
}

/** Thin line icons for the eight service lines. Keys match `services.scope[].icon`. */
const icons: Record<string, (p: IconProps) => JSX.Element> = {
  building: (p) => (
    <Svg {...p}>
      <path d="M6 28V6h13v22M19 12h7v16M3 28h26" />
      <path d="M10 11h5M10 16h5M10 21h5M22 17h1.5M22 22h1.5" />
    </Svg>
  ),
  cog: (p) => (
    <Svg {...p}>
      <circle cx="16" cy="16" r="4.5" />
      <path d="M16 3.5v3.5M16 25v3.5M3.5 16H7M25 16h3.5M7.2 7.2l2.5 2.5M22.3 22.3l2.5 2.5M24.8 7.2l-2.5 2.5M9.7 22.3l-2.5 2.5" />
    </Svg>
  ),
  chart: (p) => (
    <Svg {...p}>
      <path d="M4 4v24h24" />
      <path d="M9 21l6-7 4 4 8-10" />
      <path d="M22 8h5v5" />
    </Svg>
  ),
  search: (p) => (
    <Svg {...p}>
      <circle cx="14" cy="14" r="8" />
      <path d="M20 20l8 8M10.5 14h7M14 10.5v7" />
    </Svg>
  ),
  handshake: (p) => (
    <Svg {...p}>
      <path d="M2 13l5-4 6 1 3 2 4-3 7 1 3 4" />
      <path d="M2 13l8 9a2.5 2.5 0 003.5 0l1-1M13 22l2 2a2.5 2.5 0 003.5 0l1-1M19 20l3 3a2.5 2.5 0 003.5 0L30 18" />
      <path d="M13 10l6 6" />
    </Svg>
  ),
  briefcase: (p) => (
    <Svg {...p}>
      <rect x="3" y="10" width="26" height="17" rx="1.5" />
      <path d="M11 10V6h10v4M3 18h26M14 18v3h4v-3" />
    </Svg>
  ),
  shield: (p) => (
    <Svg {...p}>
      <path d="M16 3l11 4v8c0 7-4.5 11.5-11 14C9.5 26.500 5 22 5 15V7l11-4z" />
      <path d="M11 16l3.5 3.5L21.500 12" />
    </Svg>
  ),
  file: (p) => (
    <Svg {...p}>
      <path d="M8 3h11l6 6v20H8V3z" />
      <path d="M19 3v6h6M12 15h9M12 19h9M12 23h5" />
    </Svg>
  ),
  pin: (p) => (
    <Svg {...p}>
      <path d="M16 29s9-8.200 9-15a9 9 0 10-18 0c0 6.800 9 15 9 15z" />
      <circle cx="16" cy="14" r="3.500" />
    </Svg>
  ),
  mail: (p) => (
    <Svg {...p}>
      <rect x="3" y="6" width="26" height="20" rx="1.500" />
      <path d="M3.500 7.500L16 18 28.500 7.500" />
    </Svg>
  ),
  key: (p) => (
    <Svg {...p}>
      <circle cx="10" cy="16" r="5" />
      <path d="M15 16h14M24 16v5M28 16v4" />
    </Svg>
  ),
};

export function ServiceIcon({ name, className }: { name: string; className?: string }) {
  const Icon = icons[name] ?? icons.file;
  return <Icon className={className} />;
}

export function ArrowRight({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" className={className}>
      <path d="M3 10h13M11 5l5 5-5 5" />
    </svg>
  );
}

export function Chevron({ dir, className }: IconProps & { dir: 'left' | 'right' }) {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" className={className}>
      <path d={dir === 'left' ? 'M12 4l-6 6 6 6' : 'M8 4l6 6-6 6'} />
    </svg>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" focusable="false" className={className}>
      <path d="M5 5l14 14M19 5L5 19" />
    </svg>
  );
}

export function MenuIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" focusable="false" className={className}>
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  );
}
