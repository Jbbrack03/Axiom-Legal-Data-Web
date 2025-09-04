'use client'

import { useEffect, useRef, useImperativeHandle, forwardRef, useId, useCallback } from 'react'
import RecaptchaManager from '@/lib/recaptcha-manager'

declare global {
  interface Window {
    grecaptcha: any
  }
}

interface RecaptchaWrapperProps {
  onVerify: (token: string) => void
  onError?: () => void
}

export interface RecaptchaWrapperRef {
  executeRecaptcha: () => void
  resetRecaptcha: () => void
}

export const RecaptchaWrapper = forwardRef<RecaptchaWrapperRef, RecaptchaWrapperProps>(
  ({ onVerify, onError }, ref) => {
    const recaptchaRef = useRef<HTMLDivElement>(null)
    const containerId = useId()
    const managerRef = useRef<RecaptchaManager>(RecaptchaManager.getInstance())
    const isInitialized = useRef<boolean>(false)

    // Stable callback references to prevent infinite re-initialization
    const onVerifyRef = useRef(onVerify)
    const onErrorRef = useRef(onError)
    
    // Update refs when callbacks change but don't trigger re-initialization
    useEffect(() => {
      onVerifyRef.current = onVerify
    }, [onVerify])
    
    useEffect(() => {
      onErrorRef.current = onError
    }, [onError])

    // Stable callback wrappers
    const stableOnVerify = useCallback((token: string) => {
      onVerifyRef.current(token)
    }, [])

    const stableOnError = useCallback(() => {
      onErrorRef.current?.()
    }, [])

    const executeRecaptcha = useCallback(() => {
      managerRef.current.executeWidget(containerId)
    }, [containerId])

    const resetRecaptcha = useCallback(() => {
      managerRef.current.resetWidget(containerId)
    }, [containerId])

    useImperativeHandle(ref, () => ({
      executeRecaptcha,
      resetRecaptcha
    }), [executeRecaptcha, resetRecaptcha])

    // Initialize only once when component mounts
    useEffect(() => {
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

      if (!siteKey) {
        console.error('reCAPTCHA site key not configured')
        stableOnError()
        return
      }

      if (!recaptchaRef.current || isInitialized.current) {
        return
      }

      const initWidget = async () => {
        try {
          await managerRef.current.createWidget(
            containerId,
            recaptchaRef.current!,
            siteKey,
            stableOnVerify,
            stableOnError
          )
          isInitialized.current = true
        } catch (error) {
          console.error('Failed to initialize reCAPTCHA:', error)
          stableOnError()
        }
      }

      initWidget()

      return () => {
        if (isInitialized.current) {
          managerRef.current.destroyWidget(containerId)
          isInitialized.current = false
        }
      }
    }, []) // Empty dependency array - initialize only once!

    return <div ref={recaptchaRef} />
  }
)

RecaptchaWrapper.displayName = 'RecaptchaWrapper'