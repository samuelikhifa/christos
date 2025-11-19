import { useEffect, useState, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import SEOHead from '../components/seo/SEOHead';
import { Link } from 'react-router-dom';

// import { ChevronDown, Play, ArrowRight, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { Youtube, Facebook, Twitter, Linkedin, Instagram, ChevronLeft, ChevronRight, Play, ArrowRight, ChevronDown, ExternalLink } from 'lucide-react';
import c13Image from '@/assets/c13.webp'
import c19Image from '@/assets/c19.webp'
import c23Image from '@/assets/c23.webp'
import ct3Image from '@/assets/ct3.webp'
import ct5Image from '@/assets/ct5.webp'
import bookcover from '@/assets/bookcover.jpg'
interface VisibleSections {
  hero?: boolean;
  letter?: boolean;
  recognition?: boolean;
  programs?: boolean;
  books?: boolean;
  stats?: boolean;
  testimonials?: boolean;
  leadership?: boolean;
  cta?: boolean;
}

const Home = () => {
  const { isDark } = useTheme();
  const [visibleSections, setVisibleSections] = useState<VisibleSections>({});
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [flippedCards, setFlippedCards] = useState<boolean[]>([false, false, false]);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const heroRef = useRef(null);
  const letterRef = useRef(null);
  const recognitionRef = useRef(null);
  const programsRef = useRef(null);
  const booksRef = useRef(null);
  const statsRef = useRef(null);
  const testimonialsRef = useRef(null);
  const leadershipRef = useRef(null);
  const ctaRef = useRef(null);

  const testimonials = [
    {
      quote: "Dr. Christos's Mind Engineering program completely transformed how I approach leadership. The insights and practical tools have elevated my impact exponentially.",
      name: "John Doe",
      role: "CEO, Tech Innovations Ltd",
      initials: "JD"
    },
    {
      quote: "The BLA Roundtable experience was life-changing. I've gained clarity, confidence, and a network of like-minded leaders who inspire me daily.",
      name: "Sarah Johnson",
      role: "Founder, Impact Hub",
      initials: "SJ"
    },
    {
      quote: "After attending the C-Suite Retreat, I returned with renewed vision and strategies that doubled our company's growth in just 6 months.",
      name: "Michael Chen",
      role: "Director, Global Ventures",
      initials: "MC"
    }
  ];

  // Auto-slide testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const refs = [
      { ref: heroRef, name: 'hero' },
      { ref: letterRef, name: 'letter' },
      { ref: recognitionRef, name: 'recognition' },
      { ref: programsRef, name: 'programs' },
      { ref: booksRef, name: 'books' },
      { ref: statsRef, name: 'stats' },
      { ref: testimonialsRef, name: 'testimonials' },
      { ref: leadershipRef, name: 'leadership' },
      { ref: ctaRef, name: 'cta' }
    ];

    refs.forEach(({ ref, name }) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => ({ ...prev, [name]: true }));
          }
        },
        { threshold: 0.1 }
      );

      if (ref.current) {
        observer.observe(ref.current);
        observers.push(observer);
      }
    });

    return () => observers.forEach(observer => observer.disconnect());
  }, []);


  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const toggleFlip = (index: number) => {
    setFlippedCards(prev => {
      const newFlipped = [...prev];
      newFlipped[index] = !newFlipped[index];
      return newFlipped;
    });
  };

  return (
    <>
      <SEOHead
        title="Dr. Christos Etoka | Mind Engineering & Transformational Leadership"
        description="Executive Vice Chancellor of Xrislid Institute. Transforming lives through Mind Engineering, leadership development, and human capacity building. Book Dr. Christos for speaking engagements and executive coaching."
        keywords={[
          'mind engineering',
          'leadership development',
          'transformational education',
          'executive coaching',
          'Dr. Christos Etoka',
          'Xrislid Institute',
          'human capacity development',
          'transformational leadership',
          'executive presence',
          'mental resilience'
        ]}
        url="drchristos.xmindengineering.org"
        type="website"
      />
      {/* Section 1: Hero Section - Dark with geometric lines */}
      <section
        ref={heroRef}
        className="relative min-h-[70vh] md:min-h-screen bg-black overflow-hidden flex items-center pt-20 sm:pt-24 md:pt-40 -mt-16 sm:-mt-20 md:-mt-24"
      >
        <div className="hidden lg:block absolute text-[16rem] font-bold text-white/5 left-10 top-1/2 -translate-y-1/2 pointer-events-none select-none">
          Christos
        </div>

        <div className="hidden md:block absolute h-1 w-48 md:w-96 bg-blue-600/20 -rotate-45 top-1/4 left-10 md:left-20" />
        <div className="hidden md:block absolute h-0.5 w-32 md:w-64 bg-blue-600/20 rotate-45 top-1/3 left-20 md:left-40" />
        <div className="hidden md:block absolute h-2 w-40 md:w-80 bg-blue-600/20 -rotate-30 top-2/3 left-5 md:left-10" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 sm:py-12 md:py-16 lg:py-0">
          <div className="flex flex-col lg:grid lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12 items-center">
            <div className="w-full lg:col-span-3 space-y-3 sm:space-y-4 md:space-y-6 text-left">
              <p className="text-gray-400 text-sm sm:text-base md:text-lg mt-16">Hi, I'm</p>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
                Dr. Christos Etoka
              </h1>
              <p className="font-display text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl lg:mx-0 leading-relaxed">
                An educator, psychologist, and thought leader transforming lives through Mind
                Engineering and human capacity development.
              </p>

              <div className="font-ui flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4 justify-start">
                <Link
                  to="/connect" className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 text-sm sm:text-base w-full sm:w-auto">
                  Book A Session
                </Link>
                <button
                  onClick={() => {
                    document.getElementById('watch-christos')?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start'
                    });
                  }} className="border-2 border-white text-white hover:bg-white hover:text-black px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 inline-flex items-left justify-left space-x-2 text-sm sm:text-base w-full sm:w-auto">
                  <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Watch Dr. Christos</span>
                </button>
              </div>
            </div>

            <div className="w-full lg:col-span-2 relative sm:mt-8 lg:mt-16">
              <div className="relative w-full aspect-[3/4] max-w-[260px] sm:max-w-sm md:max-w-md mx-auto lg:max-w-none bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden">
                <img
                  src={c13Image}
                  alt="Dr. Christos Photo"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            </div>

          </div>

          <div className="hidden md:block absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8 text-white opacity-70" />
          </div>
        </div>
      </section>



      {/* Section 2: Welcome Letter - Soft gradient with floating orbs */}
      <section
        ref={letterRef}
        className={`relative py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-white via-blue-50 to-white'
          }`}
      >
        {/* Decorative floating orbs */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-indigo-200/20 rounded-full blur-3xl"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className={visibleSections.letter ? 'opacity-100 transition-opacity duration-1000' : 'opacity-0'}>
            <h2 className={`text-2xl sm:text-3xl ${isDark ? 'text-white' : 'text-gray-900'} mb-6 sm:mb-8 italic`}>
              Hello Friend,
            </h2>

            <div className="space-y-4 sm:space-y-6 relative">
              <p className={`text-base sm:text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                You are an asset to your world. You possess untapped potential waiting to be
                unleashed. Your journey to transformational leadership begins with understanding the
                power of your mind and reprogramming it for excellence.
              </p>

              <div className="font-ui sm:float-right sm:ml-6 sm:mb-4 sm:max-w-xs bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-4 sm:p-6 rounded-r-lg shadow-lg mb-4 sm:mb-0">
                <p className={`italic text-sm sm:text-base ${isDark ? 'text-blue-200' : 'text-blue-900'}`}>
                  "The mind is your greatest asset"
                </p>
              </div>

              <p className={`text-base sm:text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                I am committed to helping you break mental barriers, reshape your thinking patterns,
                and unlock your full potential through Mind Engineering. Together, we will explore
                new horizons and ignite the giant within you.
              </p>

              <p className={`text-base sm:text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                Our world needs leaders who think differently. I welcome you to join a movement of
                high-impact individuals who are reshaping their minds and transforming their
                destinies.
              </p>

              <div className="pt-6 sm:pt-8">
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-2 text-sm sm:text-base`}>
                  To your transformation,
                </p>
                <p className="font-mono text-xl sm:text-2xl font-semibold text-blue-600">Dr. Christos Etoka</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Main Program - Wave pattern with gradient orbs */}
      <section
        ref={programsRef}
        className={`relative py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden ${isDark ? 'bg-black' : 'bg-gradient-to-b from-gray-50 via-white to-gray-50'
          }`}
      >
        {/* Abstract wave patterns */}
        <div className="absolute inset-0 opacity-10">
          <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="wave-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M0 50 Q 25 30, 50 50 T 100 50" fill="none" stroke="#3B82F6" strokeWidth="2" />
                <path d="M0 70 Q 25 50, 50 70 T 100 70" fill="none" stroke="#8B5CF6" strokeWidth="1.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#wave-pattern)" />
          </svg>
        </div>
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-gradient-to-tl from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="font-mono text-center mb-10 sm:mb-16">
            <h2 className={`font-headingn text-3xl sm:text-4xl md:text-5xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-3 sm:mb-4`}>
              Main Program
            </h2>
          </div>

          <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: 'Inner Circle',
                desc: 'The inner circle is a monthly mentoring program with Dr. Christos and community based network for aspiring leaders.',
                image: ct3Image,
                cta: 'Join Inner Circle',
              },
              {
                title: 'Mind Engineering',
                desc: 'Mind Engineering is an innovative learning institute dedicated to shaping thinkers and transformational leaders. It offers a redefined approach to education—focusing on mastering the mind, unlocking human potential, and engineering lasting impact beyond conventional systems.',
                image: c23Image,
                cta: 'Join The Inner Circle',
              },
              {
                title: 'C-Suite Retreat',
                desc: 'An exclusive executive retreat designed for C-level leaders to rejuvenate, strategize, and connect in a transformative environment.',
                image: c19Image,
                cta: 'Register for Retreat',
              },
            ].map((program, index) => (
              <div
                key={index}
                className="relative h-96 sm:h-[500px]"
                style={{ perspective: '1000px' }}
              >
                <div
                  className={`relative w-full h-full transition-transform duration-700 ${flippedCards[index] ? '' : ''
                    }`}
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: flippedCards[index] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  }}
                >
                  {/* Front of card */}
                  <div
                    className={`absolute inset-0 ${program.image} rounded-2xl overflow-hidden shadow-2xl`}
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    {/* Background Image */}
                    <img
                      src={program.image}
                      alt={program.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 bg-gradient-to-t from-black/80 to-transparent">

                      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                        {program.title}
                      </h3>


                      <button
                        onClick={() => toggleFlip(index)}
                        className="absolute top-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-blue-600 hover:scale-110 transition-all duration-300 group shadow-lg"
                      >
                        <ArrowRight className="w-5 h-5 text-black group-hover:text-white" />
                      </button>
                    </div>
                  </div>

                  {/* Back of card */}
                  <div
                    className={`absolute inset-0 ${program.image} rounded-2xl overflow-hidden shadow-2xl`}
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                    }}
                  >
                    <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8 bg-gradient-to-br from-black/90 to-black/80">
                      <button
                        onClick={() => toggleFlip(index)}
                        className="absolute top-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-blue-600 hover:scale-110 transition-all duration-300 group shadow-lg"
                      >
                        <ArrowRight className="w-5 h-5 text-black group-hover:text-white transform rotate-180" />
                      </button>

                      <div>
                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                          {program.title}
                        </h3>
                        <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                          {program.desc}
                        </p>
                      </div>

                      <button className="inline-flex items-center justify-center space-x-2 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 w-full sm:w-auto shadow-lg">
                        <span>{program.cta}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: Featured Books - Dotted pattern with corner accents */}
      <section
        ref={booksRef}
        className={`relative py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden ${isDark ? 'bg-gray-900' : 'bg-white'
          }`}
      >
        {/* Dotted pattern */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'radial-gradient(circle, #3B82F6 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}></div>
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-purple-500/10 to-transparent"></div>
        {/* Additional decorative elements */}
        <div className="absolute top-1/3 right-20 w-40 h-40 border-2 border-blue-200/30 rounded-full"></div>
        <div className="absolute bottom-1/3 left-20 w-32 h-32 border-2 border-purple-200/30 rounded-lg transform rotate-45"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex justify-between items-center mb-10 sm:mb-16">
            <h2 className={` font-heading text-3xl sm:text-4xl md:text-5xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Featured Books
            </h2>
            {/* <button className="font-ui text-blue-600 hover:text-blue-700 font-semibold text-sm sm:text-base inline-flex items-center space-x-2">
              <span>View All</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button> */}
          </div>

          <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="relative">
              <div className={`${isDark ? 'bg-gray-800' : 'bg-gray-100'} rounded-2xl p-4 sm:p-8 md:p-12 aspect-[3/4] flex items-center justify-center overflow-hidden`}>
                <div className="text-center px-2">
                  <img
                    src={bookcover}   // <-- replace with your actual import or URL
                    alt="Book Cover"
                    className="w-full max-w-[300px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[450px] xl:max-w-[500px] mx-auto object-contain"
                  />

                  {/* <p
    className={`text-xs sm:text-sm md:text-base ${
      isDark ? "text-gray-400" : "text-gray-600"
    } mt-2`}
  >
    Book Cover
  </p> */}
                </div>

              </div>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <h3 className={`font-heading text-2xl sm:text-3xl md:text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                The Minds Makes The Man: The Age of Mind Engineering
              </h3>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>1st Edition</p>

              <p className={`font-body text-base sm:text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                Your step-by-step guide to mastering the power of the mind for personal and societal transformation. In The Mind Makes The Man, Dr. Christos Etoka unveils a revolutionary blueprint for reshaping human potential in the age of Mind Engineering. Drawing from decades of research, mentorship, and leadership insights, he shows readers how the quality of their thoughts determines the quality of their lives — and ultimately, the world around them. Through practical wisdom and tested principles, this book empowers you to reprogram limiting beliefs, cultivate creative intelligence, and harness the mind as the ultimate tool for transformation and leadership in a rapidly changing world.
              </p>

              <div className={`${isDark ? 'bg-gray-800' : 'bg-gray-50'} rounded-xl p-6 space-y-3`}>
                <p className={`font-heading font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-3`}>
                  The Framework:
                </p>
                {[
                  { num: '1', title: 'Awaken', desc: 'Recognize the hidden power of your mind and its role in shaping your reality.' },
                  { num: '2', title: 'recode', desc: 'Replace old thought patterns with empowering mental frameworks.' },
                  { num: '3', title: 'Visualize', desc: 'Train your imagination to attract the life and impact you desire.' },
                  { num: '4', title: 'Align', desc: 'Synchronize your thoughts, emotions, and actions for purposeful living.' },
                  { num: '5', title: 'Engineer', desc: 'Build a mental architecture that sustains growth, innovation, and resilience.' },
                  { num: '6', title: 'Manifest', desc: 'Transform your internal shifts into external success and lasting influence.' },
                ].map((step) => (
                  <div key={step.num} className="flex items-start space-x-3">
                    <span className="text-blue-600 font-bold flex-shrink-0">{step.num}.</span>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      <span className="font-semibold">{step.title}:</span> {step.desc}
                    </p>
                  </div>
                ))}
              </div>

              <a
                href="https://selar.com/pfa70541z5"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="font-ui bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 inline-flex items-center space-x-2 w-full sm:w-auto justify-center">
                  <span>Get the Book Now</span>
                  <ExternalLink className="w-5 h-5" />
                </button>
              </a>

            </div>
          </div>
        </div>
      </section>



      {/* Section 8: Testimonials - Animated gradient blobs with diagonal pattern */}
      <section
        ref={testimonialsRef}
        className={`relative py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden ${isDark ? 'bg-black' : 'bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30'
          }`}
      >
        {/* Animated gradient blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-300/30 to-purple-300/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-indigo-300/30 to-pink-300/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        {/* Subtle line pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #3B82F6 0px, #3B82F6 1px, transparent 1px, transparent 20px)',
        }}></div>

        <div className="font-body max-w-6xl mx-auto relative z-10">
          <h2 className={`font-heding text-2xl sm:text-3xl md:text-4xl font-bold text-center ${isDark ? 'text-white' : 'text-gray-900'} mb-10 sm:mb-16`}>
            Transformations & Testimonials
          </h2>

          <div className="relative">
            <div className={`${isDark ? 'bg-gray-900' : 'bg-white'} rounded-xl sm:rounded-2xl p-6 sm:p-10 md:p-12 shadow-xl max-w-3xl mx-auto`}>
              <div className="text-4xl sm:text-6xl text-blue-600 mb-3 sm:mb-4">"</div>
              <p className={`text-base sm:text-lg md:text-xl italic ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-6 sm:mb-8 leading-relaxed min-h-[120px]`}>
                {testimonials[currentTestimonial].quote}
              </p>
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-300 rounded-full flex items-center justify-center font-bold text-gray-600 text-sm sm:text-base flex-shrink-0">
                  {testimonials[currentTestimonial].initials}
                </div>
                <div>
                  <p className={`font-bold text-sm sm:text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {testimonials[currentTestimonial].name}
                  </p>
                  <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {testimonials[currentTestimonial].role}
                  </p>
                  <div className="flex space-x-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-500 text-sm sm:text-base">★</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-12 ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'
                } p-3 rounded-full shadow-lg transition-all duration-300`}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className={`w-5 h-5 ${isDark ? 'text-white' : 'text-gray-900'}`} />
            </button>
            <button
              onClick={nextTestimonial}
              className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-12 ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'
                } p-3 rounded-full shadow-lg transition-all duration-300`}
              aria-label="Next testimonial"
            >
              <ChevronRight className={`w-5 h-5 ${isDark ? 'text-white' : 'text-gray-900'}`} />
            </button>

            {/* Slide Indicators */}
            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${index === currentTestimonial
                    ? 'w-8 bg-blue-600'
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                    }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 9: Leadership Live */}
      <section
        id="watch-christos"
        ref={leadershipRef}
        className={`relative py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden ${isDark ? 'bg-gray-900' : 'bg-white'
          }`}
      >
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Main Content Card */}
          <div className={`rounded-3xl overflow-hidden shadow-2xl ${isDark ? 'bg-gray-800' : 'bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50'
            }`}>
            <div className="flex flex-col md:grid md:grid-cols-2 gap-0 items-center">
              {/* Left Content */}
              <div className="font-display p-8 sm:p-12 lg:p-16 relative z-10">
                <h2 className={`font-display text-3xl sm:text-4xl lg:text-6xl font-bold ${isDark ? 'text-white' : 'text-gray-900'
                  } mb-2 leading-tight`}>
                  Mind Engineering<br />Live
                </h2>

                <div className={`text-sm sm:text-base font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'
                  } mb-6 flex items-center gap-2 flex-wrap`}>
                  <span>4PM EST</span>
                  <span className="text-gray-400">|</span>
                  <span>9PM UK</span>
                  <span className="text-gray-400">|</span>
                  <span>NIG</span>
                </div>

                {/* YouTube Play Button - Centered */}
                <div className="mb-8">
                  <button
                    onClick={() => setIsVideoPlaying(true)}
                    className="w-20 h-20 bg-red-600 hover:bg-red-700 rounded-2xl flex items-center justify-center transition-all hover:scale-110 shadow-lg"
                  >
                    <Youtube className="w-10 h-10 text-white" fill="white" />
                  </button>
                </div>

                {/* Social Media Icons */}
                <div className="flex items-center gap-2">
                  <a href="#" className={`w-10 h-10 rounded-lg ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-black hover:bg-gray-800'
                    } flex items-center justify-center transition-colors`}>
                    <Youtube className="w-5 h-5 text-white" />
                  </a>
                  <a href="https://www.facebook.com/share/1A7n5UZPRe/" className={`w-10 h-10 rounded-lg ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-black hover:bg-gray-800'
                    } flex items-center justify-center transition-colors`}>
                    <Facebook className="w-5 h-5 text-white" />
                  </a>
                  <a href="https://x.com/iamdrchristos?t=ICogyJvieXxS5y9IvSQ2qw&s=09" className={`w-10 h-10 rounded-lg ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-black hover:bg-gray-800'
                    } flex items-center justify-center transition-colors`}>
                    <Twitter className="w-5 h-5 text-white" />
                  </a>
                  <a href="https://www.linkedin.com/in/dr-christos-etoka-o-etoka?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" className={`w-10 h-10 rounded-lg ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-black hover:bg-gray-800'
                    } flex items-center justify-center transition-colors`}>
                    <Linkedin className="w-5 h-5 text-white" />
                  </a>
                  <a href="https://www.instagram.com/therealdretoka?igsh=d3ZiMmR1eWpkbXJh" className={`w-10 h-10 rounded-lg ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-black hover:bg-gray-800'
                    } flex items-center justify-center transition-colors`}>
                    <Instagram className="w-5 h-5 text-white" />
                  </a>
                </div>
              </div>

              {/* Right Content - Video/Image with Wave Background */}
              <div className="relative h-full min-h-[400px] md:min-h-[500px] overflow-hidden">
                {/* Wave Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-800 via-blue-400 to-blue-600 opacity-80">
                  <svg className="absolute bottom-0 left-0 w-full h-auto" viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path
                      fill="rgba(255,255,255,0.1)"
                      d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                    ></path>
                  </svg>
                </div>

                {/* Video Player or Image */}
                {!isVideoPlaying ? (
                  // Show image when video is not playing
                  <div className="absolute bottom-0 right-0 w-full h-full flex items-end justify-end">
                    <div className="relative w-full h-full flex items-end justify-center md:justify-end p-8">
                      <img
                        src={ct5Image}
                        alt="christos"
                        className="h-full w-auto object-contain object-bottom"
                      />

                      {/* Text overlay */}
                      <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 md:bottom-12 md:right-12 text-white">
                        <p className="text-xs sm:text-sm font-light">with</p>
                        <p className="text-lg sm:text-xl md:text-2xl font-bold">Christos Etoka</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Show video when playing
                  <div className="absolute inset-0 flex items-center justify-center bg-black p-4">
                    <div className="w-full h-full max-w-full max-h-full relative">
                      <iframe
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/uSTssOdgfN8?autoplay=1&rel=0"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full rounded-xl"
                      ></iframe>

                      {/* Close button */}
                      <button
                        onClick={() => setIsVideoPlaying(false)}
                        className="absolute -top-12 right-0 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Section 10: Final CTA - Dramatic gradient with animated elements */}
      <section
        ref={ctaRef}
        className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-white/5 rounded-full -top-48 -left-48 animate-pulse"></div>
          <div className="absolute w-96 h-96 bg-white/5 rounded-full -bottom-48 -right-48 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="hidden lg:block absolute text-[16rem] font-bold text-white/5 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
          Christos
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">


          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Your Transformation Journey Starts Here
          </h2>

          <p className="font-body text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed">
            Join thousands of leaders who have unlocked their potential and transformed their impact through Mind Engineering
          </p>

          <div className="font-ui flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link
              to="/events"
              className="inline-block bg-white hover:bg-gray-100 text-blue-900 px-10 sm:px-12 py-5 sm:py-6 rounded-full text-base sm:text-lg font-bold transition-all duration-300 hover:scale-105 shadow-2xl w-full sm:w-auto text-center"
            >
              Schedule a Consultation
            </Link>

            <Link
              to="/home"
              className="inline-flex items-center space-x-2 text-white hover:text-blue-100 font-semibold text-base sm:text-lg transition-colors duration-300"
            >
              <Play className="w-5 h-5" />
              <span>Watch Success Stories</span>
            </Link>
          </div>


        </div>
      </section>
    </>
  );
};

export default Home;
