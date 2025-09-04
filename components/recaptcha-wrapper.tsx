'use client'

import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react'

declare global {
  interface Window {
    grecaptcha: any
    onRecaptchaLoad?: () => void
  }
}

interface RecaptchaWrapperProps {
  onVerify: (token: string) => void
  onError?: () => void
}

export interface RecaptchaWrapperRef {
  executeRecaptcha: () => void
}

export const RecaptchaWrapper = forwardRef<RecaptchaWrapperRef, RecaptchaWrapperProps>(
  ({ onVerify, onError }, ref) => {
    const recaptchaRef = useRef<HTMLDivElement>(null)
    const widgetId = useRef<number | null>(null)
    const scriptLoaded = useRef<boolean>(false)

    const executeRecaptcha = () => {
      if (window.grecaptcha && widgetId.current !== null) {
        window.grecaptcha.execute(widgetId.current)
      }
    }

    useImperativeHandle(ref, () => ({
      executeRecaptcha
    }))

    useEffect(() => {
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

      if (!siteKey) {
        console.error('reCAPTCHA site key not configured')
        onError?.()
        return
      }

      const initRecaptcha = () => {
        if (window.grecaptcha && window.grecaptcha.render && recaptchaRef.current) {
          // Clean up existing widget if present
          if (widgetId.current !== null) {
            try {
              window.grecaptcha.reset(widgetId.current)
            } catch (e) {
              console.warn('Failed to reset reCAPTCHA:', e)
            }
            widgetId.current = null
          }

          // Clear the container
          if (recaptchaRef.current) {
            recaptchaRef.current.innerHTML = ''
          }

          try {
            widgetId.current = window.grecaptcha.render(recaptchaRef.current, {
              sitekey: siteKey,
              size: 'invisible',
              callback: onVerify,
              'error-callback': onError,
            })
          } catch (e) {
            console.error('Failed to render reCAPTCHA:', e)
            onError?.()
          }
        }
      }

      const loadRecaptcha = () => {
        if (scriptLoaded.current) {
          initRecaptcha()
          return
        }

        if (!window.grecaptcha) {
          const existingScript = document.querySelector('script[src*="recaptcha"]')
          if (existingScript) {
            existingScript.remove()
          }

          const script = document.createElement('script')
          script.src = `https://www.google.com/recaptcha/api.js?render=explicit&onload=onRecaptchaLoad`
          script.async = true
          script.defer = true
          
          // Use a global callback to ensure proper loading
          window.onRecaptchaLoad = () => {
            scriptLoaded.current = true
            initRecaptcha()
          }

          script.onerror = () => {
            console.error('Failed to load reCAPTCHA script')
            onError?.()
          }

          document.head.appendChild(script)
        } else {
          scriptLoaded.current = true
          initRecaptcha()
        }
      }

      // Small delay to ensure DOM is ready
      const timer = setTimeout(loadRecaptcha, 100)

      return () => {
        clearTimeout(timer)
        if (widgetId.current !== null && window.grecaptcha) {
          try {
            window.grecaptcha.reset(widgetId.current)
          } catch (e) {
            console.warn('Cleanup: Failed to reset reCAPTCHA:', e)
          }
          widgetId.current = null
        }
      }
    }, [onVerify, onError])

    return <div ref={recaptchaRef} />
  }
)