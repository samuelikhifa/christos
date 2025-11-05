import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Shield, Eye, Lock, Database, Users, AlertCircle } from 'lucide-react';

interface VisibleSections {
  hero?: boolean;
  content?: boolean;
}

const PrivacyPolicy = () => {
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
      title: "Information We Collect",
      icon: Database,
      content: "We collect information you provide directly to us, such as when you create an account, enroll in programs, contact us, or subscribe to our newsletter. This may include your name, email address, phone number, organization details, and payment information."
    },
    {
      title: "How We Use Your Information",
      icon: Eye,
      content: "We use the information we collect to provide, maintain, and improve our services, process transactions, send you technical notices and support messages, communicate with you about programs and events, and personalize your experience."
    },
    {
      title: "Information Sharing and Disclosure",
      icon: Users,
      content: "We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share information with service providers who assist us in operating our website and conducting our business."
    },
    {
      title: "Data Security",
      icon: Lock,
      content: "We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure."
    },
    {
      title: "Cookies and Tracking Technologies",
      icon: AlertCircle,
      content: "We use cookies and similar tracking technologies to enhance your experience on our website, analyze usage patterns, and deliver personalized content. You can control cookie preferences through your browser settings."
    },
    {
      title: "Your Rights and Choices",
      icon: Shield,
      content: "You have the right to access, update, or delete your personal information. You may also opt out of certain communications from us. For residents of certain jurisdictions, additional rights may apply under local privacy laws."
    }
  ];

  const dataTypes = [
    {
      category: "Personal Information",
      items: ["Name", "Email address", "Phone number", "Organization details", "Job title"]
    },
    {
      category: "Account Information",
      items: ["Username", "Password (encrypted)", "Profile preferences", "Program enrollments"]
    },
    {
      category: "Usage Data",
      items: ["Website interactions", "Course progress", "Event attendance", "Communication history"]
    },
    {
      category: "Technical Data",
      items: ["IP address", "Browser type", "Device information", "Cookies and tracking data"]
    }
  ];

  return (
    <main id="main-content" className={isDark ? 'bg-gray-900' : 'bg-white'}>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative pt-24 pb-16 sm:pt-32 sm:pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-600 to-green-800 overflow-hidden pt-40 sm:pt-30 -mt-20 sm:-mt-24"
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-green-900 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
          <div
            className={`transition-all duration-1000 ${
              visibleSections.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Shield className="w-4 h-4" />
              <span>Privacy Protection</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              Privacy Policy
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-green-100 max-w-2xl mx-auto">
              Your privacy is important to us. Learn how we protect and use your information.
            </p>
            <p className="text-sm text-green-200 mt-4">
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
        <div className="max-w-6xl mx-auto">
          {/* Introduction */}
          <div className={`${isDark ? 'bg-gray-800' : 'bg-gray-50'} rounded-2xl p-6 sm:p-8 mb-12`}>
            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
              Our Commitment to Your Privacy
            </h2>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed mb-4`}>
              At Dr. Christos Etoka, we are committed to protecting your privacy and ensuring the security of your personal information. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services.
            </p>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
              By using our services, you consent to the data practices described in this policy.
            </p>
          </div>

          {/* Data Types We Collect */}
          <div className="mb-16">
            <h2 className={`text-2xl sm:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-8 text-center`}>
              Types of Data We Collect
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {dataTypes.map((type, index) => (
                <div
                  key={index}
                  className={`${
                    isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                  } border rounded-2xl p-6 transition-all duration-500 hover:shadow-lg ${
                    visibleSections.content ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
                    {type.category}
                  </h3>
                  <ul className="space-y-2">
                    {type.items.map((item, idx) => (
                      <li key={idx} className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} flex items-center space-x-2`}>
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Privacy Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <div
                key={index}
                className={`${
                  isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                } border rounded-2xl p-6 sm:p-8 transition-all duration-500 hover:shadow-lg ${
                  visibleSections.content ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${(index + 4) * 0.1}s` }}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <section.icon className="w-6 h-6 text-white" />
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

          {/* GDPR & Compliance */}
          <div className={`${isDark ? 'bg-blue-900' : 'bg-blue-50'} rounded-2xl p-6 sm:p-8 mt-12`}>
            <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
              GDPR Compliance & International Users
            </h3>
            <p className={`${isDark ? 'text-blue-200' : 'text-blue-700'} mb-4`}>
              We comply with the General Data Protection Regulation (GDPR) and other applicable privacy laws. 
              If you are located in the European Union or other regions with privacy regulations, you have additional rights including:
            </p>
            <ul className={`${isDark ? 'text-blue-200' : 'text-blue-700'} space-y-2`}>
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                <span>Right to access your personal data</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                <span>Right to rectification of inaccurate data</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                <span>Right to erasure (right to be forgotten)</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                <span>Right to data portability</span>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className={`${isDark ? 'bg-green-900' : 'bg-green-50'} rounded-2xl p-6 sm:p-8 mt-12 text-center`}>
            <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-3`}>
              Questions About Your Privacy?
            </h3>
            <p className={`${isDark ? 'text-green-200' : 'text-green-700'} mb-6`}>
              If you have any questions about this Privacy Policy or our data practices, please don't hesitate to contact us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:privacy@christosetoka.com"
                className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
              >
                Email Privacy Team
              </a>
              <a
                href="mailto:info@christosetoka.com"
                className="inline-block border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                General Contact
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PrivacyPolicy;
