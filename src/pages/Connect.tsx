import { useState, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Send, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import c11Image from '@/assets/c11.webp'
import c6Image from '@/assets/c6.webp'
import c5Image from '@/assets/c5.webp'
import c12Image from '@/assets/c12.webp'
import c13Image from '@/assets/c13.webp'
import c14Image from '@/assets/c14.webp'
import c9Image from '@/assets/c9.webp'
import c2Image from '@/assets/c2.webp'

const Connect = () => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    consent: false,
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  const heroRef = useRef(null);
  const formRef = useRef(null);
  const coachingRef = useRef(null);
  const faqRef = useRef(null);
  const pressRef = useRef(null);
  const galleryRef = useRef(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('sending');
    
    setTimeout(() => {
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '', consent: false });
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }, 2000);
  };

  const faqs = [
    {
      question: 'Can I book Dr. Christos to speak?',
      answer: 'Yes. Simply email us at info@drchristos.com, and we\'ll guide you on the next steps.',
    },
    {
      question: 'Where can I buy your books?',
      answer: 'Our books are available in our online store, Amazon, and other book retailers. For African customers, please visit https://rhbooks.com.ng/.',
    },
    {
      question: 'Does Dr. Christos provide one-on-one coaching?',
      answer: 'Yes. Book a discovery call, and our team will assist you.',
    },
    {
      question: 'Can Dr. Christos train my team, or do you offer training programs?',
      answer: 'Absolutely! Contact our team with your request, and we\'ll provide details and schedule your team.',
    },
   {
  question: 'Can I attend Xrislid’s Mind Engineering University?',
  answer: 'Yes, admission is open to individuals passionate about personal growth and leadership transformation. Please visit our admissions page for enrollment details and program dates.',
},

  ];

  const galleryImages = [
    c11Image,
    c6Image,
    c13Image,
    c14Image,
    c5Image,
    c2Image,
    c9Image,
    c12Image,
  ];


  return (
    <main id="main-content" className={isDark ? 'bg-gray-900' : 'bg-white'}>
      {/* Section 1: Hero - Soft gradient with floating orbs */}
     <section
        ref={heroRef}
        className="relative min-h-[70vh] md:min-h-screen bg-black overflow-hidden flex items-center pt-20 sm:pt-24 md:pt-40 -mt-16 sm:-mt-20 md:-mt-24"
      >
        <div className="hidden lg:block absolute text-[16rem] font-bold text-white/5 right-10 top-1/2 -translate-y-1/2 pointer-events-none select-none">
          Christos
        </div>
        <div className="hidden md:block absolute h-1 w-96 bg-blue-600/20 -rotate-45 top-1/4 right-20" />
        <div className="hidden md:block absolute h-2 w-64 bg-blue-600/20 rotate-30 bottom-1/3 right-40" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 sm:py-12 md:py-16 lg:py-0">
          <div className="flex flex-col lg:grid lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12 items-center">
            <div className="w-full lg:col-span-3 space-y-3 sm:space-y-4 md:space-y-6 text-left">
              <p className="text-gray-400 text-sm sm:text-base md:text-lg italic">Connect</p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
               Get In Touch
              </h1>
              
              <p className="text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl lg:mx-0">
                A Conversation Around Transformation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Executive Coaching CTA - Dynamic blue gradient */}
      <section ref={coachingRef} className="relative bg-gradient-to-br from-blue-800 via-blue-400 to-blue-600 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-500 opacity-50" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Image */}
            <div className="relative aspect-[4/3] bg-gradient-to-br from-blue-800 to-blue-900 rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <img src={c5Image} alt="executive coaching" />
            </div>

            {/* Content */}
            <div className="text-white">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">Executive Coaching</h2>
              <p className="text-base sm:text-lg text-blue-100 leading-relaxed mb-4 sm:mb-6">
                Elevate your leadership with personalized guidance from Dr. Christos Etoka. Experience
                transformative one-on-one executive coaching sessions tailored to your unique goals
                and challenges.
              </p>
              <p className="text-base sm:text-lg text-blue-100 leading-relaxed mb-6 sm:mb-8">
                Harness Dr. Christos's wealth of expertise in Mind Engineering to unlock your full
                potential, enhance your decision-making skills, and achieve unparalleled success in
                your professional journey.
              </p>

              <div className="space-y-3 mb-6 sm:mb-8">
                {[
                  'Personalized 1-on-1 sessions',
                  'Custom transformation roadmap',
                  '6-month intensive program',
                  'Ongoing support & accountability',
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-200 flex-shrink-0" />
                    <span className="text-sm sm:text-base">{benefit}</span>
                  </div>
                ))}
              </div>

              <button className="bg-white text-blue-600 hover:bg-blue-50 px-8 sm:px-10 py-4 sm:py-5 rounded-full text-base sm:text-lg font-bold transition-all duration-300 hover:scale-105 shadow-xl w-full sm:w-auto">
                Book A Discovery Call
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Contact Form - Grid pattern with diagonal accent */}
      <section
        ref={formRef}
        className={`relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden ${
          isDark ? 'bg-black' : 'bg-gray-50'
        }`}
      >
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        ></div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-600/5 to-transparent transform skew-x-12"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className={`${isDark ? 'bg-gray-900' : 'bg-white'} rounded-2xl p-6 sm:p-8 md:p-12 shadow-xl`}>
            <h2 className={`text-2xl sm:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
              Send Us A Message
            </h2>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-6 sm:mb-8`}>
              We'd love to hear from you
            </p>

            {submitStatus === 'success' ? (
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 sm:w-20 sm:h-20 text-green-500 mx-auto mb-6" />
                <h3 className={`text-xl sm:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
                  Message Sent Successfully!
                </h3>
              
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <label className={`block font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2 text-sm sm:text-base`}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-4 py-3 rounded-lg ${
                      isDark ? 'bg-black border-gray-800 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'
                    } border-2 focus:outline-none focus:border-blue-500 transition-colors duration-300`}
                  />
                </div>

                <div>
                  <label className={`block font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2 text-sm sm:text-base`}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-4 py-3 rounded-lg ${
                      isDark ? 'bg-black border-gray-800 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'
                    } border-2 focus:outline-none focus:border-blue-500 transition-colors duration-300`}
                  />
                </div>

                <div>
                  <label className={`block font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2 text-sm sm:text-base`}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full px-4 py-3 rounded-lg ${
                      isDark ? 'bg-black border-gray-800 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'
                    } border-2 focus:outline-none focus:border-blue-500 transition-colors duration-300`}
                  />
                </div>

                <div>
                  <label className={`block font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2 text-sm sm:text-base`}>
                    Subject *
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className={`w-full px-4 py-3 rounded-lg ${
                      isDark ? 'bg-black border-gray-800 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'
                    } border-2 focus:outline-none focus:border-blue-500 transition-colors duration-300`}
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="speaking">Speaking Engagement</option>
                    <option value="coaching">Executive Coaching</option>
                    <option value="media">Media/Press</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className={`block font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2 text-sm sm:text-base`}>
                    Message *
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={6}
                    className={`w-full px-4 py-3 rounded-lg ${
                      isDark ? 'bg-black border-gray-800 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'
                    } border-2 focus:outline-none focus:border-blue-500 transition-colors duration-300`}
                  />
                </div>

                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    className="mt-1"
                  />
                  <label className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    I agree to the privacy policy and consent to being contacted
                  </label>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={submitStatus === 'sending'}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-lg font-bold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {submitStatus === 'sending' ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

               
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Section 4: FAQ - Radial gradient with geometric shapes */}
      <section
        ref={faqRef}
        className={`relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden ${
          isDark ? 'bg-gray-900' : 'bg-white'
        }`}
      >
        {/* Radial gradient backgrounds */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-radial from-blue-100 to-transparent opacity-40 rounded-full"></div>
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-radial from-purple-100 to-transparent opacity-30 rounded-full"></div>
        </div>
        {/* Floating geometric shapes */}
        <div className="absolute top-40 right-20 w-32 h-32 border-4 border-blue-200/40 rounded-full"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 border-4 border-purple-200/40 transform rotate-45"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className={`text-3xl sm:text-4xl font-bold text-center ${isDark ? 'text-white' : 'text-gray-900'} mb-10 sm:mb-16`}>
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`${
                  isDark ? 'bg-black' : 'bg-gray-50'
                } rounded-xl overflow-hidden transition-all duration-300 ${
                  openFaq === index ? 'shadow-xl' : 'shadow-md'
                }`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-opacity-80 transition-colors duration-300"
                >
                  <span className={`text-base sm:text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {faq.question}
                  </span>
                  {openFaq === index ? (
                    <ChevronUp className={`w-5 h-5 flex-shrink-0 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                  ) : (
                    <ChevronDown className={`w-5 h-5 flex-shrink-0 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                  )}
                </button>
                {openFaq === index && (
                  <div className={`px-6 pb-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <p className="text-sm sm:text-base leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Press - Dotted pattern with corner accents */}
      <section
        ref={pressRef}
        className={`relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden ${
          isDark ? 'bg-black' : 'bg-gray-50'
        }`}
      >
        {/* Dotted pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle, #3B82F6 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        ></div>
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-purple-500/10 to-transparent"></div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className={`text-3xl sm:text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
              Press
            </h2>
          </div>

          <div className={`${isDark ? 'bg-gray-900' : 'bg-white'} rounded-2xl p-6 sm:p-8 lg:p-12 shadow-xl`}>
            <div className="space-y-4 sm:space-y-6">
              <p className={`text-base sm:text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                Dr. Christos Etoka O. Etoka is an educator, psychologist, and thought leader devoted to transforming lives through Mind Engineering and human capacity development.
              </p>

              <p className={`text-base sm:text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
               As the Executive Vice Chancellor of Xrislid Institute of Mind Engineering, he leads a revolutionary educational model that transcends traditional learning — focusing on reprogramming the mind, revamping thought patterns, and cultivating transformational thinkers for the 21st century.
              </p>

              <p className={`text-base sm:text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
               Dr. Christos holds an M.Sc. in Social Psychology from the University of Manchester, UK, and has built a distinguished career at the intersection of psychology, education, and leadership. His expertise spans mental reformation, behavioral psychology, leadership development, and transformational education.

Beyond academia, his thought-provoking insights have earned him numerous honors, including the President’s Award for Distinguished Contributions to Psychological Knowledge from the British Psychological Society, and the Man of the Year in Human Capacity Development (2023/2024).
              </p>

              <p className={`text-base sm:text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                Through his books, speeches, and mentorship, Dr. Christos continues to empower individuals to reshape their thinking, break mental limitations, and unlock their fullest potential. His impact extends to leaders, students, and professionals across Africa and beyond.

He is the author of “The Mind Makes the Man”, a groundbreaking work on the power of thought, mindset transformation, and the science of mental re-engineering.
              </p>
            </div>

           
          </div>
        </div>
      </section>

      {/* Section 6: Gallery - Animated gradient blobs */}
      <section
        ref={galleryRef}
        className={`relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden ${
          isDark ? 'bg-gray-900' : 'bg-white'
        }`}
      >
        {/* Animated gradient blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-300/30 to-purple-300/30 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-indigo-300/30 to-pink-300/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '2s' }}
        ></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className={`text-3xl sm:text-4xl font-bold text-center ${isDark ? 'text-white' : 'text-gray-900'} mb-10 sm:mb-16`}>
            Gallery
          </h2>

          <div className="flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="group relative aspect-square rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <img 
                  src={image} 
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Connect;