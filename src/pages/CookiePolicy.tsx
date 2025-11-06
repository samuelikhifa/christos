import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Cookie, Settings, BarChart3, Shield, Eye, Zap } from 'lucide-react';

interface VisibleSections {
  hero?: boolean;
  content?: boolean;
}

const CookiePolicy = () => {
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

  const cookieTypes = [
    {
      name: "Essential Cookies",
      icon: Shield,
      color: "green",
      description: "These cookies are necessary for the website to function and cannot be switched off in our systems.",
      examples: ["Session management", "Security features", "Load balancing", "Form submissions"],
      canDisable: false
    },
    {
      name: "Performance Cookies",
      icon: BarChart3,
      color: "blue",
      description: "These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site.",
      examples: ["Google Analytics", "Page load times", "Error tracking", "User flow analysis"],
      canDisable: true
    },
    {
      name: "Functional Cookies",
      icon: Settings,
      color: "purple",
      description: "These cookies enable the website to provide enhanced functionality and personalization.",
      examples: ["Language preferences", "Theme settings", "Video players", "Social media features"],
      canDisable: true
    },
    {
      name: "Targeting Cookies",
      icon: Eye,
      color: "orange",
      description: "These cookies may be set through our site by our advertising partners to build a profile of your interests.",
      examples: ["Advertising networks", "Social media tracking", "Remarketing", "Interest-based ads"],
      canDisable: true
    }
  ];

  const sections = [
    {
      title: "What Are Cookies?",
      content: "Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and to provide information to website owners about how users interact with their sites."
    },
    {
      title: "How We Use Cookies",
      content: "We use cookies to enhance your browsing experience, analyze site traffic, personalize content, and serve targeted advertisements. Cookies help us understand which parts of our website are most popular and how visitors navigate through our site."
    },
    {
      title: "Third-Party Cookies",
      content: "Some cookies on our site are set by third-party services that appear on our pages. These include social media platforms, analytics providers, and advertising networks. We do not control these cookies, and you should check the relevant third party's website for more information."
    },
    {
      title: "Managing Your Cookie Preferences",
      content: "You can control and manage cookies in various ways. Most web browsers automatically accept cookies, but you can usually modify your browser settings to decline cookies if you prefer. However, this may prevent you from taking full advantage of the website."
    },
    {
      title: "Cookie Retention",
      content: "Different cookies have different lifespans. Session cookies are temporary and are deleted when you close your browser. Persistent cookies remain on your device for a set period or until you delete them manually."
    }
  ];

  const browserInstructions = [
    {
      browser: "Chrome",
      steps: "Settings > Privacy and security > Cookies and other site data"
    },
    {
      browser: "Firefox",
      steps: "Options > Privacy & Security > Cookies and Site Data"
    },
    {
      browser: "Safari",
      steps: "Preferences > Privacy > Manage Website Data"
    },
    {
      browser: "Edge",
      steps: "Settings > Cookies and site permissions > Cookies and site data"
    }
  ];

  return (
    <main id="main-content" className={isDark ? 'bg-gray-900' : 'bg-white'}>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative pt-24 pb-16 sm:pt-32 sm:pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-600 to-orange-800 overflow-hidden pt-40 sm:pt-30  -mt-20 sm:-mt-24"
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-900 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
          <div
            className={`transition-all duration-1000 ${
              visibleSections.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Cookie className="w-4 h-4" />
              <span>Cookie Information</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              Cookie Policy
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-orange-100 max-w-2xl mx-auto">
              Learn about how we use cookies to improve your experience on our website
            </p>
            <p className="text-sm text-orange-200 mt-4">
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
          {/* Cookie Types */}
          <div className="mb-16">
            <h2 className={`text-2xl sm:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-8 text-center`}>
              Types of Cookies We Use
            </h2>
            <div className="flex flex-col sm:grid sm:grid-cols-2 gap-6">
              {cookieTypes.map((cookie, index) => (
                <div
                  key={index}
                  className={`${
                    isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                  } border rounded-2xl p-6 transition-all duration-500 hover:shadow-lg ${
                    visibleSections.content ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start space-x-4 mb-4">
                    <div className={`w-12 h-12 bg-${cookie.color}-600 rounded-full flex items-center justify-center flex-shrink-0`}>
                      <cookie.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {cookie.name}
                        </h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          cookie.canDisable 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {cookie.canDisable ? 'Optional' : 'Required'}
                        </span>
                      </div>
                      <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                        {cookie.description}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className={`text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-700'} mb-2`}>
                      Examples:
                    </h4>
                    <ul className="space-y-1">
                      {cookie.examples.map((example, idx) => (
                        <li key={idx} className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} flex items-center space-x-2`}>
                          <div className={`w-1.5 h-1.5 bg-${cookie.color}-500 rounded-full`}></div>
                          <span>{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Policy Sections */}
          <div className="space-y-8 mb-16">
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
                <h3 className={`text-lg sm:text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-3`}>
                  {section.title}
                </h3>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          {/* Browser Instructions */}
          <div className={`${isDark ? 'bg-gray-800' : 'bg-gray-50'} rounded-2xl p-6 sm:p-8 mb-12`}>
            <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>
              How to Manage Cookies in Your Browser
            </h3>
            <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4">
              {browserInstructions.map((instruction, index) => (
                <div key={index} className={`${isDark ? 'bg-gray-700' : 'bg-white'} rounded-lg p-4`}>
                  <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
                    {instruction.browser}
                  </h4>
                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {instruction.steps}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Cookie Consent */}
          <div className={`${isDark ? 'bg-orange-900' : 'bg-orange-50'} rounded-2xl p-6 sm:p-8 mb-12`}>
            <div className="flex items-start space-x-4">
              <Zap className="w-8 h-8 text-orange-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-3`}>
                  Your Consent
                </h3>
                <p className={`${isDark ? 'text-orange-200' : 'text-orange-700'} mb-4`}>
                  By continuing to use our website, you consent to our use of cookies as described in this policy. 
                  You can withdraw your consent at any time by adjusting your browser settings or contacting us directly.
                </p>
                <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105">
                  Manage Cookie Preferences
                </button>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className={`${isDark ? 'bg-orange-900' : 'bg-orange-50'} rounded-2xl p-6 sm:p-8 text-center`}>
            <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-3`}>
              Questions About Our Cookie Policy?
            </h3>
            <p className={`${isDark ? 'text-orange-200' : 'text-orange-700'} mb-6`}>
              If you have any questions about our use of cookies, please contact us.
            </p>
            <a
              href="mailto:info@christosetoka.com"
              className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CookiePolicy;
