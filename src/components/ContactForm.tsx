
import React, { useState } from 'react';
import { toast } from '@/hooks/use-toast';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent",
        description: "Thank you for contacting Anastasia. She will get back to you shortly.",
        variant: "default",
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium text-real-700">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 border border-real-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400"
          placeholder="Your name"
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-real-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 border border-real-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400"
          placeholder="your.email@example.com"
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="phone" className="block text-sm font-medium text-real-700">
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-3 border border-real-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400"
          placeholder="(000) 000-0000"
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="message" className="block text-sm font-medium text-real-700">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          value={formData.message}
          onChange={handleChange}
          className="w-full p-3 border border-real-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 resize-none"
          placeholder="I'm interested in learning more about..."
        />
      </div>
      
      <button
        type="submit"
        disabled={loading}
        className="w-full mt-4 btn-primary flex items-center justify-center"
      >
        {loading ? (
          <>
            <span className="animate-spin h-5 w-5 mr-2 border-2 border-white/30 border-t-white rounded-full"></span>
            <span>Sending...</span>
          </>
        ) : (
          <span>Send Message</span>
        )}
      </button>
    </form>
  );
};

export default ContactForm;
