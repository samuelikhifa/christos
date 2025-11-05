import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { CheckCircle, Shield, AlertTriangle } from 'lucide-react';

interface VisibleSections {
  hero?: boolean;
  content?: boolean;
}

const TermsOfService = () => {
  const { isDark } = useTheme();
  const [visibleSections, setVisibleSections] = useState<VisibleSections>({});
  
  const heroRef = useRef(null);
  const contentRef = useRef(null);

  // Intersection Observer
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const refs = [
      { ref: heroRef, name: 'hero' },
      { ref: contentRef, name: 'content' },
    ];

    refs.forEach(({ ref, name }) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [name]: true }));
          }
        },
        { threshold: 0.1 }
      );

      if (ref.current) {
        observer.observe(ref.current);
        observers.push(observer);
      }
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing and using the services provided by Dr. Christos Etoka ('we', 'us', or 'our'), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service."
    },
    {
      title: "2. Services Description",
      content: "Dr. Christos Etoka provides leadership development, mind engineering training, coaching services, educational programs, and related content. Our services include but are not limited to online courses, workshops, seminars, coaching sessions, and digital resources."
    },
    {
      title: "3. User Responsibilities",
      content: "Users are responsible for maintaining the confidentiality of their account information, using services in compliance with applicable laws, respecting intellectual property rights, and engaging respectfully with other participants in programs and events."
    },
    {
      title: "4. Payment and Refunds",
      content: "Payment terms vary by service and will be clearly communicated at the time of purchase. Refund policies are specific to each program or service and will be outlined in the respective service agreement. Generally, refunds are processed within 14 days of the refund request approval."
    },
    {
      title: "5. Intellectual Property",
      content: "All content, materials, and resources provided through our services are protected by copyright and other intellectual property laws. Users may not reproduce, distribute, or create derivative works without explicit written permission from Dr. Christos Etoka."
    },
    {
      title: "6. Privacy and Data Protection",
      content: "We are committed to protecting your privacy and personal data. Our data collection and processing practices are detailed in our Privacy Policy, which forms an integral part of these Terms of Service."
    },
    {
      title: "7. Limitation of Liability",
      content: "Dr. Christos Etoka shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses resulting from your use of our services."
    },
    {
      title: "8. Termination",
      content: "We reserve the right to terminate or suspend access to our services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms of Service."
    },
    {
      title: "9. Changes to Terms",
      content: "We reserve the right to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect."
    },
    {
      title: "10. Contact Information",
      content: "If you have any questions about these Terms of Service, please contact us at info@christosetoka.com or through our official contact channels."
    }
  ];

  return (
    <main id="main-content" className={isDark ? 'bg-gray-900' : 'bg-white'}>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative pt-24 pb-16 sm:pt-32 sm:pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-blue-800 overflow-hidden pt-40 sm:pt-30 -mt-20 sm:-mt-24"
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-900 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
          <div
            className={`transition-all duration-1000 ${
              visibleSections.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Shield className="w-4 h-4" />
              <span>Legal Document</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              Terms of Service
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto">
              Please read these terms carefully before using our services
            </p>
            <p className="text-sm text-blue-200 mt-4">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section
        ref={contentRef}
        className={`py-16 sm:py-24 px-4 sm:px-6 lg:px-8 ${
          isDark ? 'bg-gray-900' : 'bg-white'
        }`}
      >
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className={`${isDark ? 'bg-gray-800' : 'bg-gray-50'} rounded-2xl p-6 sm:p-8 mb-12`}>
            <div className="flex items-start space-x-4">
              <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
              <div>
                <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-3`}>
                  Important Notice
                </h2>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                  These Terms of Service constitute a legally binding agreement between you and Dr. Christos Etoka. 
                  By using our services, you acknowledge that you have read, understood, and agree to be bound by these terms.
                </p>
              </div>
            </div>
          </div>

          {/* Terms Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <div
                key={index}
                className={`${
                  isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                } border rounded-2xl p-6 sm:p-8 transition-all duration-500 hover:shadow-lg ${
                  visibleSections.content ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-lg sm:text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-3`}>
                      {section.title}
                    </h3>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                      {section.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className={`${isDark ? 'bg-blue-900' : 'bg-blue-50'} rounded-2xl p-6 sm:p-8 mt-12 text-center`}>
            <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-3`}>
              Questions About These Terms?
            </h3>
            <p className={`${isDark ? 'text-blue-200' : 'text-blue-700'} mb-6`}>
              If you have any questions or concerns about our Terms of Service, we're here to help.
            </p>
            <a
              href="mailto:info@christosetoka.com"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default TermsOfService;
