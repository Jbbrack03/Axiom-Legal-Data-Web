'use client'

import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    grecaptcha: any
  }
}

interface RecaptchaWrapperProps {
  onVerify: (token: string) => void
  onError?: () => void
}

export function RecaptchaWrapper({ onVerify, onError }: RecaptchaWrapperProps) {
  const recaptchaRef = useRef<HTMLDivElement>(null)
  const widgetId = useRef<number | null>(null)

  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

    if (!siteKey) {
      console.error('reCAPTCHA site key not configured')
      onError?.()
      return
    }

    const loadRecaptcha = () => {
      if (window.grecaptcha && window.grecaptcha.render && recaptchaRef.current && !widgetId.current) {
        widgetId.current = window.grecaptcha.render(recaptchaRef.current, {
          sitekey: siteKey,
          size: 'invisible',
          callback: onVerify,
          'error-callback': onError,
        })
      }
    }

    // Load reCAPTCHA script if not already loaded
    if (!window.grecaptcha) {
      const script = document.createElement('script')
      script.src = 'https://www.google.com/recaptcha/api.js?render=explicit'
      script.async = true
      script.defer = true
      script.onload = loadRecaptcha
      document.head.appendChild(script)
    } else {
      loadRecaptcha()
    }

    return () => {
      if (widgetId.current !== null && window.grecaptcha) {
        window.grecaptcha.reset(widgetId.current)
      }
    }
  }, [onVerify, onError])

  const executeRecaptcha = () => {
    if (window.grecaptcha && widgetId.current !== null) {
      window.grecaptcha.execute(widgetId.current)
    }
  }

  // Expose execute function to parent
  useEffect(() => {
    const element = recaptchaRef.current
    if (element) {
      (element as any).executeRecaptcha = executeRecaptcha
    }
  }, [])

  return <div ref={recaptchaRef} />
}