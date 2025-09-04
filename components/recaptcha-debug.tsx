'use client'

import { useEffect, useState } from 'react'

export function RecaptchaDebug() {
  const [debugInfo, setDebugInfo] = useState<{
    siteKey: string | undefined
    scriptLoaded: boolean
    grecaptchaAvailable: boolean
    renderFunctionAvailable: boolean
    error: string | null
  }>({
    siteKey: undefined,
    scriptLoaded: false,
    grecaptchaAvailable: false,
    renderFunctionAvailable: false,
    error: null
  })

  useEffect(() => {
    const checkRecaptcha = () => {
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
      const scriptLoaded = !!document.querySelector('script[src*="recaptcha"]')
      const grecaptchaAvailable = !!window.grecaptcha
      const renderFunctionAvailable = !!(window.grecaptcha && typeof window.grecaptcha.render === 'function')

      setDebugInfo({
        siteKey: siteKey ? siteKey.substring(0, 20) + '...' : 'NOT SET',
        scriptLoaded,
        grecaptchaAvailable,
        renderFunctionAvailable,
        error: null
      })

      if (!siteKey) {
        setDebugInfo(prev => ({ ...prev, error: 'NEXT_PUBLIC_RECAPTCHA_SITE_KEY not configured' }))
      } else if (!grecaptchaAvailable) {
        setDebugInfo(prev => ({ ...prev, error: 'window.grecaptcha not available' }))
      } else if (!renderFunctionAvailable) {
        setDebugInfo(prev => ({ ...prev, error: 'window.grecaptcha.render is not a function' }))
      }
    }

    checkRecaptcha()
    
    // Check periodically as script may load asynchronously
    const interval = setInterval(checkRecaptcha, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="p-4 bg-gray-800 text-white font-mono text-sm rounded">
      <h3 className="font-bold mb-2">reCAPTCHA Debug Info:</h3>
      <div>Site Key: {debugInfo.siteKey}</div>
      <div>Script Loaded: {debugInfo.scriptLoaded ? '✅' : '❌'}</div>
      <div>grecaptcha Available: {debugInfo.grecaptchaAvailable ? '✅' : '❌'}</div>
      <div>render Function: {debugInfo.renderFunctionAvailable ? '✅' : '❌'}</div>
      {debugInfo.error && (
        <div className="text-red-400 mt-2">❌ Error: {debugInfo.error}</div>
      )}
    </div>
  )
}