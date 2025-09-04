declare global {
  interface Window {
    grecaptcha: any
    grecaptchaCallback?: () => void
  }
}

class RecaptchaManager {
  private static instance: RecaptchaManager
  private widgets: Map<string, number> = new Map()
  private scriptLoaded: boolean = false
  private scriptLoading: boolean = false
  private loadPromise: Promise<void> | null = null

  static getInstance(): RecaptchaManager {
    if (!RecaptchaManager.instance) {
      RecaptchaManager.instance = new RecaptchaManager()
    }
    return RecaptchaManager.instance
  }

  async loadScript(): Promise<void> {
    if (this.scriptLoaded && window.grecaptcha && window.grecaptcha.render) {
      return Promise.resolve()
    }

    if (this.loadPromise) {
      return this.loadPromise
    }

    this.loadPromise = new Promise((resolve, reject) => {
      if (typeof window === 'undefined') {
        reject(new Error('Window is not available'))
        return
      }

      // Check if grecaptcha is already available and has render function
      if (window.grecaptcha && typeof window.grecaptcha.render === 'function') {
        this.scriptLoaded = true
        resolve()
        return
      }

      // Remove any existing scripts
      const existingScripts = document.querySelectorAll('script[src*="recaptcha"]')
      existingScripts.forEach(script => script.remove())

      // Clean up any existing global callbacks
      delete (window as any).onRecaptchaLoad
      delete (window as any).grecaptchaCallback

      const script = document.createElement('script')
      script.src = 'https://www.google.com/recaptcha/api.js?onload=grecaptchaCallback&render=explicit'
      script.async = true
      script.defer = true

      // Use a unique global callback name
      ;(window as any).grecaptchaCallback = () => {
        console.log('reCAPTCHA script loaded successfully')
        if (window.grecaptcha && typeof window.grecaptcha.render === 'function') {
          this.scriptLoaded = true
          this.scriptLoading = false
          resolve()
        } else {
          console.error('reCAPTCHA loaded but render function not available')
          reject(new Error('reCAPTCHA render function not available'))
        }
      }

      script.onload = () => {
        // Fallback in case callback doesn't fire
        setTimeout(() => {
          if (!this.scriptLoaded) {
            if (window.grecaptcha && typeof window.grecaptcha.render === 'function') {
              this.scriptLoaded = true
              this.scriptLoading = false
              resolve()
            } else {
              console.error('reCAPTCHA script loaded but API not available')
              reject(new Error('reCAPTCHA API not available'))
            }
          }
        }, 1000)
      }

      script.onerror = () => {
        this.scriptLoading = false
        console.error('Failed to load reCAPTCHA script from CDN')
        reject(new Error('Failed to load reCAPTCHA script'))
      }

      this.scriptLoading = true
      document.head.appendChild(script)
    })

    return this.loadPromise
  }

  async createWidget(
    containerId: string, 
    element: HTMLElement, 
    siteKey: string,
    onVerify: (token: string) => void,
    onError?: () => void
  ): Promise<number> {
    if (!siteKey) {
      throw new Error('reCAPTCHA site key is required')
    }

    try {
      await this.loadScript()
    } catch (error) {
      console.error('Failed to load reCAPTCHA script:', error)
      throw new Error('reCAPTCHA script loading failed')
    }

    if (!window.grecaptcha) {
      throw new Error('reCAPTCHA global object not available')
    }

    if (typeof window.grecaptcha.render !== 'function') {
      throw new Error('reCAPTCHA render function not available')
    }

    // Destroy existing widget if it exists
    this.destroyWidget(containerId)

    // Clear the container
    element.innerHTML = ''

    try {
      console.log('Creating reCAPTCHA widget with site key:', siteKey.substring(0, 10) + '...')
      
      const widgetId = window.grecaptcha.render(element, {
        sitekey: siteKey,
        size: 'invisible',
        callback: onVerify,
        'error-callback': onError,
      })

      if (typeof widgetId !== 'number') {
        throw new Error('Invalid widget ID returned from reCAPTCHA')
      }

      this.widgets.set(containerId, widgetId)
      console.log('reCAPTCHA widget created successfully with ID:', widgetId)
      return widgetId
    } catch (error) {
      console.error('Failed to create reCAPTCHA widget:', error)
      onError?.()
      throw error
    }
  }

  executeWidget(containerId: string): void {
    const widgetId = this.widgets.get(containerId)
    if (widgetId !== undefined && window.grecaptcha) {
      try {
        window.grecaptcha.execute(widgetId)
      } catch (error) {
        console.error('Failed to execute reCAPTCHA:', error)
      }
    }
  }

  resetWidget(containerId: string): void {
    const widgetId = this.widgets.get(containerId)
    if (widgetId !== undefined && window.grecaptcha) {
      try {
        window.grecaptcha.reset(widgetId)
      } catch (error) {
        console.warn('Failed to reset reCAPTCHA:', error)
      }
    }
  }

  destroyWidget(containerId: string): void {
    const widgetId = this.widgets.get(containerId)
    if (widgetId !== undefined && window.grecaptcha) {
      try {
        window.grecaptcha.reset(widgetId)
      } catch (error) {
        console.warn('Failed to reset widget during destroy:', error)
      }
      this.widgets.delete(containerId)
    }
  }

  cleanup(): void {
    this.widgets.forEach((widgetId, containerId) => {
      this.destroyWidget(containerId)
    })
    this.widgets.clear()
  }
}

export default RecaptchaManager