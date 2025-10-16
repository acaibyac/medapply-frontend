'use client'
import { useState } from 'react'
import Field from './Field'
import { startCheckout } from '@/lib/api'

export default function Form() {
  const [errors, setErrors] = useState<Record<string,string>>({})
  const [loading, setLoading] = useState(false)
  const [format, setFormat] = useState<'txt'|'docx'|'pdf'>('txt')
  const price = process.env.NEXT_PUBLIC_PRICE_GBP || '24'

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const fd = new FormData(e.target as HTMLFormElement)
    const payload = {
      email: String(fd.get('deliveryEmail')||''),
      experience: String(fd.get('experience')||'').trim(),
      jobDescription: String(fd.get('jobDescription')||'').trim(),
      examples: String(fd.get('examples')||'').trim() || undefined,
      format,
    }
    const errs: Record<string,string> = {}
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(payload.email)) errs.deliveryEmail = 'Please enter a valid email address.'
    if (payload.experience.length < 50) errs.experience = 'Please provide at least 50 characters.'
    if (payload.jobDescription.length < 10) errs.jobDescription = 'Please paste the job description or link.'
    setErrors(errs)
    if (Object.keys(errs).length) return

    setLoading(true)
    try {
      const { checkoutUrl } = await startCheckout(payload)
      window.location.href = checkoutUrl
    } catch (err) {
      alert('Sorry, we could not start the payment. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" aria-describedby="sla">
      <Field as="textarea" name="experience" label="Your experience" minLength={50} rows={6} required hint="Min 50 characters" error={errors.experience} />
      <Field as="textarea" name="jobDescription" label="Job description or NHS Jobs URL" rows={6} required error={errors.jobDescription} />
      <Field as="textarea" name="examples" label="Examples to highlight (optional)" rows={4} />
      <Field name="deliveryEmail" type="email" label="Where should we send your Personal Statement?" required error={errors.deliveryEmail} />

      <fieldset className="mb-4">
        <legend className="text-sm font-medium text-gray-700">Format</legend>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {([
            { key:'txt', label:'Plain text (email body)' },
            { key:'docx', label:'DOCX (attachment)' },
            { key:'pdf', label:'PDF (attachment)' },
          ] as const).map(opt => (
            <label key={opt.key} className={`flex items-center gap-2 rounded-xl border p-3 cursor-pointer ${format===opt.key?'border-indigo-600 ring-2 ring-indigo-500':'border-gray-300'}`}>
              <input className="sr-only" type="radio" name="format" value={opt.key} checked={format===opt.key} onChange={()=>setFormat(opt.key)} />
              <span className="text-sm">{opt.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <button type="submit" disabled={loading} className="w-full rounded-2xl bg-indigo-600 px-4 py-3 text-white text-base font-semibold shadow hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 disabled:opacity-50">
        {loading ? 'Redirecting to Stripe…' : `Pay & Generate – £${price}`}
      </button>

      <p id="sla" className="text-xs text-gray-500">
        No accounts. One-time payment. If you don’t receive your statement within 24 hours, please raise a ticket – we respond within 24 hours.
      </p>
    </form>
  )
}
