'use client'
import { TextareaHTMLAttributes, InputHTMLAttributes } from 'react'
import clsx from 'clsx'

type Props = (
  | ({ as: 'textarea' } & TextareaHTMLAttributes<HTMLTextAreaElement>)
  | ({ as?: 'input' } & InputHTMLAttributes<HTMLInputElement>)
) & { label: string; hint?: string; error?: string }

export default function Field(props: Props) {
  const { label, hint, error, as = 'input', ...rest } = props as any
  const id = (rest.id as string) || label.toLowerCase().replace(/\s+/g, '-')
  const classes = clsx(
    'mt-1 block w-full rounded-xl border border-gray-300 px-3 py-2 shadow-sm focus:ring-2 focus:ring-indigo-500',
    error && 'border-red-500 focus:ring-red-500'
  )
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
      {as === 'textarea' ? (
        <textarea id={id} className={classes} {...(rest as any)} />
      ) : (
        <input id={id} className={classes} {...(rest as any)} />
      )}
      {hint && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
      {error && <p className="mt-1 text-xs text-red-600" role="alert">{error}</p>}
    </div>
  )
}
