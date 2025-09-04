'use client'

import { useEffect, useRef, useImperativeHandle, forwardRef, useId } from 'react'
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

    const executeRecaptcha = () => {
      managerRef.current.executeWidget(containerId)
    }

    const resetRecaptcha = () => {
      managerRef.current.resetWidget(containerId)
    }

    useImperativeHandle(ref, () => ({
      executeRecaptcha,
      resetRecaptcha
    }))

    useEffect(() => {
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

      if (!siteKey) {
        console.error('reCAPTCHA site key not configured')
        onError?.()
        return
      }

      if (!recaptchaRef.current || isInitialized.current) {
        return
      }

      const initWidget = async () => {
        try {
          console.log('Initializing reCAPTCHA widget...')
          await managerRef.current.createWidget(
            containerId,
            recaptchaRef.current!,
            siteKey,
            onVerify,
            onError
          )
          isInitialized.current = true
          console.log('reCAPTCHA widget initialized successfully')
        } catch (error) {
          console.error('Failed to initialize reCAPTCHA widget:', error)
          if (error instanceof Error) {
            console.error('Error details:', error.message)
          }
          onError?.()
        }
      }

      initWidget()

      return () => {
        if (isInitialized.current) {
          managerRef.current.destroyWidget(containerId)
          isInitialized.current = false
        }
      }
    }, [containerId, onVerify, onError])

    return <div ref={recaptchaRef} />
  }
)

RecaptchaWrapper.displayName = 'RecaptchaWrapper'