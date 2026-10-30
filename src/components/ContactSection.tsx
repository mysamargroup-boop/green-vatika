import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

export const ContactSection: React.FC = () => {
  const [formSent, setFormSent] = useState<boolean>(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setName('');
      setPhone('');
      setMessage('');
    }, 3000);
  };

  const handleDirectWhatsApp = () => {
    const text = encodeURIComponent(`Hi Green Vatika, I have an inquiry:\nName: ${name || 'Visitor'}\nMessage: ${message || 'I would like to visit the nursery.'}`);
    window.open(`https://wa.me/919479480068?text=${text}`, '_blank');
  };

  return (
    <section id="section-contact" className="py-10 md:py-14 bg-secondary/30 relative scroll-mt-20 border-t border-border/40">
      <div className="container mx-auto px-4 md:px-8">
        {/* Title - Strictly NO Capsule Pill Labels */}
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-14 space-y-2">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground">
            Get in Touch with Green Vatika
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base px-4">
            Have questions about plant care, bulk orders, or nursery visits? We’re always excited to chat green!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column: Contact Info & Store Timings */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-card p-6 rounded-3xl border border-border/80 shadow-md space-y-3">
                <div className="h-12 w-12 rounded-2xl bg-primary/15 text-primary flex items-center justify-center">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase text-muted-foreground">Phone & WhatsApp</div>
                  <div className="font-heading font-extrabold text-lg text-foreground mt-0.5">+91-98765-43210</div>
                </div>
              </div>

              <div className="bg-card p-6 rounded-3xl border border-border/80 shadow-md space-y-3">
                <div className="h-12 w-12 rounded-2xl bg-primary/15 text-primary flex items-center justify-center">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase text-muted-foreground">Email Support</div>
                  <div className="font-heading font-extrabold text-lg text-foreground mt-0.5">care@greenvatika.co</div>
                </div>
              </div>

              <div className="bg-card p-6 rounded-3xl border border-border/80 shadow-md space-y-3">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-1">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-foreground">Nursery Address</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                      Niranjan Ward, Teen Puliya, Khairi Naka, Narsinghpur, Madhya Pradesh - 487001
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card p-6 rounded-3xl border border-border/80 shadow-md space-y-3">
                <div className="h-12 w-12 rounded-2xl bg-primary/15 text-primary flex items-center justify-center">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase text-muted-foreground">Visiting Hours</div>
                  <div className="font-heading font-bold text-sm text-foreground mt-0.5">
                    Open 7 Days • 8:00 AM - 8:00 PM
                  </div>
                </div>
              </div>
            </div>

            {/* Map Mockup Card */}
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-border/80 aspect-[16/9] bg-muted">
              <img
                src="https://images.unsplash.com/photo-1520157646479-22f25713523d?auto=format&fit=crop&w=600&q=75"
                alt="nursery location"
                className="w-full h-full object-cover filter brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                <div className="flex items-center gap-2 text-primary font-bold text-sm">
                  <MapPin className="h-5 w-5" /> Green Vatika Main Nursery
                </div>
                <p className="text-xs text-white/80 mt-1">
                  15+ Acres of lush green greenhouse & plant gardens open for visitors.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Instant Message / Inquiry Form */}
          <div className="bg-card p-8 md:p-10 rounded-3xl border border-border shadow-xl space-y-6">
            <div>
              <h3 className="font-heading text-2xl font-extrabold text-foreground">Send Us a Message</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Fill out the form below or chat with us instantly on WhatsApp.
              </p>
            </div>

            {formSent ? (
              <div className="py-12 text-center space-y-3">
                <CheckCircle2 className="h-12 w-12 text-primary mx-auto" />
                <h4 className="font-heading text-xl font-bold text-foreground">Message Sent Successfully!</h4>
                <p className="text-xs text-muted-foreground">We will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-muted-foreground mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-secondary/40 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary text-foreground"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-muted-foreground mb-1">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Your contact number"
                    className="w-full bg-secondary/40 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary text-foreground"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-muted-foreground mb-1">Your Message or Plant Requirement</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what plants or services you are looking for..."
                    className="w-full bg-secondary/40 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary text-foreground"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    type="submit"
                    className="py-3.5 px-6 rounded-full bg-primary text-white font-bold text-sm hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="h-4 w-4" /> Send Message
                  </button>

                  <button
                    type="button"
                    onClick={handleDirectWhatsApp}
                    className="py-3.5 px-6 rounded-full bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-2"
                  >
                    <WhatsAppIcon className="h-5 w-5 text-white" /> Order via WhatsApp
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
