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
    if (this.scriptLoaded) {
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

      if (window.grecaptcha) {
        this.scriptLoaded = true
        resolve()
        return
      }

      // Remove any existing scripts
      const existingScripts = document.querySelectorAll('script[src*="recaptcha"]')
      existingScripts.forEach(script => script.remove())

      // Clean up any existing global callback
      delete (window as any).onRecaptchaLoad

      const script = document.createElement('script')
      script.src = 'https://www.google.com/recaptcha/api.js?render=explicit'
      script.async = true
      script.defer = true

      script.onload = () => {
        this.scriptLoaded = true
        this.scriptLoading = false
        resolve()
      }

      script.onerror = () => {
        this.scriptLoading = false
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
    await this.loadScript()

    if (!window.grecaptcha) {
      throw new Error('reCAPTCHA script not loaded')
    }

    // Destroy existing widget if it exists
    this.destroyWidget(containerId)

    // Clear the container
    element.innerHTML = ''

    try {
      const widgetId = window.grecaptcha.render(element, {
        sitekey: siteKey,
        size: 'invisible',
        callback: onVerify,
        'error-callback': onError,
      })

      this.widgets.set(containerId, widgetId)
      return widgetId
    } catch (error) {
      console.error('Failed to create reCAPTCHA widget:', error)
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