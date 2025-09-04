'use client'

import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RecaptchaWrapper, RecaptchaWrapperRef } from './recaptcha-wrapper'
import { Loader2 } from 'lucide-react'

export function PilotProgramForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    companyName: '',
    role: '',
    dataNeeds: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)
  const recaptchaPromiseRef = useRef<{resolve: (token: string) => void, reject: () => void} | null>(null)
  const recaptchaRef = useRef<RecaptchaWrapperRef>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleRecaptchaVerify = (token: string) => {
    console.log('reCAPTCHA verified successfully, token received')
    setRecaptchaToken(token)
    // Resolve the promise if one is waiting
    if (recaptchaPromiseRef.current) {
      recaptchaPromiseRef.current.resolve(token)
      recaptchaPromiseRef.current = null
    }
  }

  const handleRecaptchaError = () => {
    console.log('reCAPTCHA verification failed')
    setMessage({ type: 'error', text: 'CAPTCHA verification failed. Please try again.' })
    // Reject the promise if one is waiting
    if (recaptchaPromiseRef.current) {
      recaptchaPromiseRef.current.reject()
      recaptchaPromiseRef.current = null
    }
  }

  const executeRecaptcha = (): Promise<string> => {
    console.log('executeRecaptcha called')
    return new Promise((resolve, reject) => {
      if (recaptchaRef.current) {
        console.log('Creating reCAPTCHA promise and executing')
        recaptchaPromiseRef.current = { resolve, reject }
        recaptchaRef.current.executeRecaptcha()
      } else {
        console.error('recaptchaRef.current is null')
        reject(new Error('reCAPTCHA not available'))
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    // Validate required fields
    if (!formData.fullName || !formData.workEmail || !formData.companyName || !formData.role || !formData.dataNeeds) {
      setMessage({ type: 'error', text: 'Please fill in all required fields.' })
      setIsLoading(false)
      return
    }

    // Execute reCAPTCHA
    if (!recaptchaToken) {
      try {
        console.log('Executing reCAPTCHA for form submission...')
        
        // Create a cancellable timeout
        let timeoutId: NodeJS.Timeout
        const timeoutPromise = new Promise<never>((_, reject) => {
          timeoutId = setTimeout(() => {
            console.log('reCAPTCHA verification timed out')
            reject(new Error('CAPTCHA verification timed out'))
          }, 10000)
        })

        // Race between reCAPTCHA execution and timeout
        const token = await Promise.race([
          executeRecaptcha(),
          timeoutPromise
        ])

        // Cancel the timeout since we got the token
        clearTimeout(timeoutId!)
        console.log('reCAPTCHA token received, proceeding with form submission')
        setRecaptchaToken(token)
        await submitForm(token)
        
      } catch (error) {
        console.error('reCAPTCHA execution failed:', error)
        setMessage({ type: 'error', text: 'CAPTCHA verification failed. Please try again.' })
        setIsLoading(false)
      }
      return
    }

    await submitForm()
  }

  const submitForm = async (token?: string) => {
    const tokenToUse = token || recaptchaToken
    try {
      const response = await fetch('/api/pilot-program', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken: tokenToUse,
        }),
      })

      const result = await response.json()

      if (response.ok) {
        setMessage({ type: 'success', text: 'Application submitted successfully! We\'ll be in touch within 24 hours.' })
        setFormData({
          fullName: '',
          workEmail: '',
          companyName: '',
          role: '',
          dataNeeds: '',
        })
        setRecaptchaToken(null)
        if (recaptchaRef.current) {
          recaptchaRef.current.resetRecaptcha()
        }
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to submit application. Please try again.' })
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setMessage({ 
        type: 'error', 
        text: 'Network error. Please check your connection and try again. If the problem persists, try disabling browser extensions temporarily.' 
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-white text-2xl">Apply for a Spot.</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {message && (
          <div className={`p-4 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-900/20 border border-green-500/20 text-green-400' 
              : 'bg-red-900/20 border border-red-500/20 text-red-400'
          }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-2">
              Full Name *
            </label>
            <Input
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="bg-input border-border text-white placeholder:text-muted-foreground"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label htmlFor="workEmail" className="block text-sm font-medium text-foreground mb-2">
              Work Email *
            </label>
            <Input
              id="workEmail"
              name="workEmail"
              type="email"
              value={formData.workEmail}
              onChange={handleInputChange}
              className="bg-input border-border text-white placeholder:text-muted-foreground"
              placeholder="john@company.com"
              required
            />
          </div>

          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-foreground mb-2">
              Company Name *
            </label>
            <Input
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              className="bg-input border-border text-white placeholder:text-muted-foreground"
              placeholder="Your Company"
              required
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-foreground mb-2">
              Role *
            </label>
            <Input
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="bg-input border-border text-white placeholder:text-muted-foreground"
              placeholder="e.g., CTO, Founder, Head of AI"
              required
            />
          </div>

          <div>
            <label htmlFor="dataNeeds" className="block text-sm font-medium text-foreground mb-2">
              Briefly describe your data needs. *
            </label>
            <Textarea
              id="dataNeeds"
              name="dataNeeds"
              value={formData.dataNeeds}
              onChange={handleInputChange}
              className="bg-input border-border text-white placeholder:text-muted-foreground min-h-[120px]"
              placeholder="Tell us about your specific data requirements and use cases..."
              required
            />
          </div>

          <RecaptchaWrapper
            ref={recaptchaRef}
            onVerify={handleRecaptchaVerify}
            onError={handleRecaptchaError}
          />

          <Button 
            type="submit" 
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit Application'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}