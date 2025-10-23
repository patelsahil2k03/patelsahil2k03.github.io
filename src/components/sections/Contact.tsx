'use client';

import React, { useState } from 'react';
import { personalInfo, social, contact } from '@/data';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Mail, Phone, MapPin, Github, Linkedin, Download, Send, CheckCircle2 } from 'lucide-react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission (you can integrate with your backend/service)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Reset form
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-20 lg:py-32 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="default" size="lg" className="mb-4">
            Get in Touch
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Let&apos;s <span className="text-blue-600">Connect</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Open to opportunities, collaborations, and interesting conversations
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Availability Card */}
            <Card className="border-2 border-green-200 bg-green-50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <h3 className="font-bold text-slate-900">Currently Available</h3>
                </div>
                <p className="text-sm text-slate-700">
                  {contact.availability} • Typically responds within 24 hours
                </p>
              </CardContent>
            </Card>

            {/* Contact Details */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="font-bold text-lg text-slate-900 mb-4">Contact Information</h3>
                
                {/* Email */}
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group"
                >
                  <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Email</p>
                    <p className="text-sm text-slate-900 font-medium">{contact.email}</p>
                  </div>
                </a>

                {/* Phone */}
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group"
                >
                  <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                    <Phone className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Phone</p>
                    <p className="text-sm text-slate-900 font-medium">{contact.phone}</p>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-center gap-3 p-3 rounded-lg">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <MapPin className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Location</p>
                    <p className="text-sm text-slate-900 font-medium">{contact.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg text-slate-900 mb-4">Connect on Social</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => window.open(social.github.url, '_blank')}
                    leftIcon={<Github className="w-4 h-4" />}
                  >
                    GitHub
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => window.open(social.linkedin.url, '_blank')}
                    leftIcon={<Linkedin className="w-4 h-4" />}
                  >
                    LinkedIn
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => window.open(social.leetcode.url, '_blank')}
                    leftIcon={<svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-2.365-1.914-5.766-1.649-7.974.632L5.304 8.16l-3.853 4.126c-.184.198-.35.417-.495.652a5.266 5.266 0 0 0-.653 1.379 5.376 5.376 0 0 0-.233 1.64 5.527 5.527 0 0 0 .062 1.062c.058.362.153.72.282 1.068.13.348.296.682.495 1l.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019" />
                    </svg>}
                  >
                    LeetCode
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => window.open('/resume.pdf', '_blank')}
                    leftIcon={<Download className="w-4 h-4" />}
                  >
                    Resume
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <Card className="border-2 border-slate-200">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Send a Message</h3>

                {isSubmitted && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <p className="text-sm text-green-800">
                      Thanks for reaching out! I&apos;ll get back to you soon.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      placeholder="john@example.com"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      placeholder="Job Opportunity / Collaboration / General Inquiry"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                      placeholder="Tell me about your project, opportunity, or just say hi..."
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    isLoading={isSubmitting}
                    rightIcon={!isSubmitting ? <Send className="w-5 h-5" /> : undefined}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>

                  <p className="text-xs text-center text-slate-500">
                    Or email me directly at{' '}
                    <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline font-medium">
                      {contact.email}
                    </a>
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-16 text-center">
          <Card className="max-w-3xl mx-auto bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-100">
            <CardContent className="p-6">
              <p className="text-slate-700">
                <strong className="text-slate-900">Looking for opportunities?</strong> I&apos;m currently exploring roles in AI/ML Engineering, Full Stack Development, and Data Science. Feel free to reach out!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
