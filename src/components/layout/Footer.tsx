import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Linkedin, Twitter, Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const Footer = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { isDark } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Simulate subscription
      setSubscribeStatus('success');
      setEmail('');
      setTimeout(() => setSubscribeStatus('idle'), 3000);
    }
  };

  const socialLinks = [
    { icon: Linkedin, href: 'https://www.linkedin.com/in/dr-christos-etoka-o-etoka?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://x.com/iamdrchristos?t=ICogyJvieXxS5y9IvSQ2qw&s=09', label: 'Twitter' },
    { icon: Facebook, href: 'https://www.facebook.com/share/1A7n5UZPRe/', label: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com/therealdretoka?igsh=d3ZiMmR1eWpkbXJh', label: 'Instagram' },
    { icon: Youtube, href: 'https://www.youtube.com/@therealdretoka', label: 'YouTube' },
  ];

  return (
    <footer
      className={`${isDark ? 'bg-black text-white' : 'bg-black text-white'
        } border-t border-gray-900 no-print`}
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-8 sm:mb-12">
          {/* Column 1: About */}
          <div>
            <div className="font-mono text-3xl font-bold text-blue-500 mb-4">CT</div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              Transforming minds and elevating leaders through Mind Engineering and human capacity
              development.
            </p>
            <p className="text-gray-500 text-xs">
              © {new Date().getFullYear()} Dr. Christos Etoka
              <br />
              All Rights Reserved.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-heading font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: 'About', path: '/about' },
                // { name: 'Expertise', path: '/expertise' },
                { name: 'Programs', path: '/programs' },

                { name: 'Events', path: '/events' },
                { name: 'Connect', path: '/connect' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-300 inline-block hover:translate-x-1 transform"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-6 border-t border-gray-800">
              <h4 className="font-ui font-semibold text-gray-300 text-sm mb-2">Legal</h4>
              <ul className="space-y-2">
                {[
                  { name: 'Terms of Service', path: '' },
                  { name: 'Privacy Policy', path: '' },
                  { name: 'Cookie Policy', path: '' }
                ].map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className="text-gray-500 hover:text-gray-400 text-xs transition-colors duration-300 inline-block hover:translate-x-1 transform"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 3: Connect */}
          <div>
            <h3 className="font-heading font-bold text-white mb-4">Connect</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <a
                    href="mailto:info@christosetoka.com"
                    className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-300 block"
                  >
                    Drchristos5689@gmail.com

                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <a
                    href="tel:+234-XXX-XXXX-XXX"
                    className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-300 block"
                  >
                    +234 815 703 7134
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div className="text-gray-400 text-sm">
                  <p>Xrislid Institute of Mind Engineering –Novare Central Mall, Wuse Zone 5, Federal Capital Territory, Abuja, Nigeria (HQ)</p> <br />
                  {/* <p>Xrislid Institute of Mind Engineering –No. 59C, I.C.E. Road, Off Wire Road, Benin City, 300271, Edo State, Nigeria.</p> */}
                  <p>Xrislid Institute of Mind Engineering –Learning Hall, Unit 15, Academic Park, 43 Chapel Street, Manchester, M3 5DF, United Kingdom.</p>
                </div>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="mt-6 flex items-center space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-9 h-9 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 4: Subscribe */}
          <div>
            <h3 className="font-heading font-bold text-white mb-4">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-4">
              Get weekly insights on Mind Engineering, leadership, and transformation.
            </p>

            <form
              onSubmit={handleSubscribe}
              action="https://formspree.io/f/manveznp"
              method="POST"
              className="space-y-3"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full px-4 py-2.5 bg-gray-900 border border-gray-800 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors duration-300"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-ui text-sm font-semibold transition-all duration-300 hover:scale-105 btn-ripple"
              >
                Subscribe
              </button>
            </form>

            {subscribeStatus === 'success' && (
              <p className="text-green-400 text-xs mt-2">✓ Subscribed successfully!</p>
            )}

            <p className="text-gray-500 text-xs mt-3">
              Join 50,000+ subscribers
              <br />
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-900">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm text-center md:text-left">
              Designed with{' '}
              <span className="text-red-500" aria-label="love">
                ♥
              </span>{' '}
              for transformational excellence
            </p>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-4 sm:bottom-8 sm:right-8 w-12 h-12 sm:w-14 sm:h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 z-40 ${showBackToTop
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-10 pointer-events-none'
          } hover:scale-110 active:scale-95 animate-bounce-gentle`}
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
    </footer>
  );
};

export default Footer;
