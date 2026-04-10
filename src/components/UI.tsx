import React from 'react';

/* ── Button ── */
type ButtonVariant = 'primary' | 'blue' | 'ghost' | 'danger';

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'bg-purple-600 text-white hover:bg-purple-500',
  blue:    'bg-blue-500 text-white hover:bg-blue-400',
  ghost:   'bg-transparent text-gray-400 border border-white/10 hover:bg-white/[0.05] hover:text-white',
  danger:  'bg-red-900 text-red-300 hover:bg-red-800',
};

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  onClick?: () => void;
  style?: React.CSSProperties;
  fullWidth?: boolean;
}

export function Button({ children, variant = 'primary', onClick, style, fullWidth }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-1.5 px-[18px] py-[9px] rounded-sm text-[13px] font-medium font-body border-none cursor-pointer transition-all whitespace-nowrap ${VARIANT_CLASSES[variant]} ${fullWidth ? 'w-full' : ''}`}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  );
}

/* ── Card ── */
interface CardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export function Card({ children, style, className }: CardProps) {
  return (
    <div className={`bg-gray-800 border border-white/[0.07] rounded p-5 ${className ?? ''}`} style={style}>
      {children}
    </div>
  );
}

/* ── MetricCard ── */
interface MetricCardProps {
  label: string;
  value: string;
  change?: string;
  changeUp?: boolean;
  color?: string;
}

export function MetricCard({ label, value, change, changeUp = true, color }: MetricCardProps) {
  return (
    <div className="bg-gray-800 border border-white/[0.07] rounded p-5">
      <div className="text-[11px] text-gray-400 uppercase tracking-[0.8px] mb-2">{label}</div>
      <div className="font-head text-[28px] font-bold leading-none" style={{ color }}>{value}</div>
      {change && (
        <div className={`text-xs mt-1.5 ${changeUp ? 'text-green' : 'text-red'}`}>{change}</div>
      )}
    </div>
  );
}

/* ── SectionTitle ── */
interface SectionTitleProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export function SectionTitle({ children, style }: SectionTitleProps) {
  return <h2 className="font-head text-base font-bold mb-4 text-white" style={style}>{children}</h2>;
}

/* ── Input ── */
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, ...props }: InputProps) {
  return (
    <div className="mb-3.5">
      {label && <label className="block text-[11px] uppercase tracking-[0.7px] text-gray-400 mb-1.5">{label}</label>}
      <input
        className="w-full bg-gray-700 border border-white/[0.08] rounded-sm px-3.5 py-2.5 text-[13px] font-body text-white outline-none transition-colors focus:border-purple-500"
        {...props}
      />
    </div>
  );
}

/* ── Textarea ── */
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  rows?: number;
}

export function Textarea({ label, rows = 4, ...props }: TextareaProps) {
  return (
    <div className="mb-3.5">
      {label && <label className="block text-[11px] uppercase tracking-[0.7px] text-gray-400 mb-1.5">{label}</label>}
      <textarea
        className="w-full bg-gray-700 border border-white/[0.08] rounded-sm px-3.5 py-2.5 text-[13px] font-body text-white outline-none transition-colors focus:border-purple-500 resize-y leading-relaxed"
        rows={rows}
        {...props}
      />
    </div>
  );
}

/* ── Select ── */
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  children: React.ReactNode;
}

export function Select({ label, children, ...props }: SelectProps) {
  return (
    <div className="mb-3.5">
      {label && <label className="block text-[11px] uppercase tracking-[0.7px] text-gray-400 mb-1.5">{label}</label>}
      <select
        className="w-full bg-gray-700 border border-white/[0.08] rounded-sm px-3.5 py-2.5 text-[13px] font-body text-white outline-none transition-colors focus:border-purple-500"
        {...props}
      >
        {children}
      </select>
    </div>
  );
}

/* ── Toggle ── */
interface ToggleProps {
  on: boolean;
  onToggle: () => void;
}

export function Toggle({ on, onToggle }: ToggleProps) {
  return (
    <div
      className={`relative w-10 h-[22px] rounded-full cursor-pointer shrink-0 transition-colors duration-200 ${on ? 'bg-purple-500' : 'bg-gray-600'}`}
      onClick={onToggle}
      role="switch"
      aria-checked={on}
    >
      <span
        className="absolute top-[3px] left-[3px] w-4 h-4 rounded-full bg-white transition-transform duration-200"
        style={{ transform: on ? 'translateX(18px)' : 'translateX(0)' }}
      />
    </div>
  );
}

/* ── Badge ── */
type BadgeVariant = 'trained' | 'pending' | 'error';

const BADGE_CLASSES: Record<BadgeVariant, string> = {
  trained: 'bg-green/15 text-green',
  pending: 'bg-amber/15 text-amber',
  error:   'bg-red/15 text-red',
};

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
}

export function Badge({ children, variant = 'trained' }: BadgeProps) {
  return (
    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium shrink-0 ${BADGE_CLASSES[variant]}`}>
      {children}
    </span>
  );
}

/* ── KnowledgeItem ── */
interface KnowledgeItemProps {
  icon: string;
  name: string;
  meta: string;
  status: BadgeVariant;
}

export function KnowledgeItem({ icon, name, meta, status }: KnowledgeItemProps) {
  return (
    <div className="bg-gray-700 border border-white/[0.06] rounded-sm px-3.5 py-3 flex items-center gap-2.5">
      <div className="w-7 h-7 bg-white/[0.06] rounded-[6px] flex items-center justify-center text-sm shrink-0">{icon}</div>
      <div className="text-[13px] font-medium flex-1">{name}</div>
      <div className="text-[11px] text-gray-500 mr-1">{meta}</div>
      <Badge variant={status}>{status}</Badge>
    </div>
  );
}

/* ── CodeBlock ── */
interface CodeBlockProps {
  children: string;
}

export function CodeBlock({ children }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);
  const copy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="bg-gray-950 border border-white/[0.08] rounded-sm p-4 relative overflow-x-auto">
      <button
        className="absolute top-2.5 right-2.5 bg-gray-700 border-none text-gray-300 px-2.5 py-1 rounded text-[11px] cursor-pointer font-body hover:bg-gray-600 hover:text-white"
        onClick={copy}
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
      <pre className="font-mono text-xs text-purple-300 leading-[1.7] whitespace-pre-wrap">{children}</pre>
    </div>
  );
}
