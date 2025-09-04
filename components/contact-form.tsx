'use client'

import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RecaptchaWrapper, RecaptchaWrapperRef } from './recaptcha-wrapper'
import { Loader2 } from 'lucide-react'

export function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    subject: '',
    message: '',
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
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.subject || !formData.message) {
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
      const response = await fetch('/api/contact', {
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
        setMessage({ type: 'success', text: 'Message sent successfully! We\'ll get back to you within 24 hours.' })
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          company: '',
          subject: '',
          message: '',
        })
        setRecaptchaToken(null)
        if (recaptchaRef.current) {
          recaptchaRef.current.resetRecaptcha()
        }
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to send message. Please try again.' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please check your connection and try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="bg-[#0A192F] border-[#CCD6F6]/20">
      <CardHeader>
        <CardTitle className="text-white text-2xl">Send us a Message</CardTitle>
        <CardDescription className="text-[#CCD6F6]">
          Fill out the form below and we'll get back to you within 24 hours.
        </CardDescription>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-white">
                First Name *
              </Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="John"
                className="bg-[#0A192F] border-[#CCD6F6]/30 text-white placeholder:text-[#CCD6F6]/50 focus:border-[#64FFDA]"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-white">
                Last Name *
              </Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Doe"
                className="bg-[#0A192F] border-[#CCD6F6]/30 text-white placeholder:text-[#CCD6F6]/50 focus:border-[#64FFDA]"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">
              Email *
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="john@company.com"
              className="bg-[#0A192F] border-[#CCD6F6]/30 text-white placeholder:text-[#CCD6F6]/50 focus:border-[#64FFDA]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company" className="text-white">
              Company
            </Label>
            <Input
              id="company"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              placeholder="Your Company Name"
              className="bg-[#0A192F] border-[#CCD6F6]/30 text-white placeholder:text-[#CCD6F6]/50 focus:border-[#64FFDA]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject" className="text-white">
              Subject *
            </Label>
            <Input
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              placeholder="How can we help you?"
              className="bg-[#0A192F] border-[#CCD6F6]/30 text-white placeholder:text-[#CCD6F6]/50 focus:border-[#64FFDA]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-white">
              Message *
            </Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Tell us about your legal data challenges and how we can help..."
              rows={5}
              className="bg-[#0A192F] border-[#CCD6F6]/30 text-white placeholder:text-[#CCD6F6]/50 focus:border-[#64FFDA] resize-none"
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
            className="w-full bg-[#64FFDA] text-[#0A192F] hover:bg-[#64FFDA]/90 font-semibold py-3"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              'Send Message'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}