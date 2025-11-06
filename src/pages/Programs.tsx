import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';
import { ArrowRight, Play,  Users,  Award,  Target, Brain } from 'lucide-react';
import c19Image from '@/assets/c19.webp'
import c23Image from '@/assets/c23.webp'
import ct3Image from '@/assets/ct3.webp'
interface VisibleSections {
  hero?: boolean;
  programs?: boolean;
  details?: boolean;
  benefits?: boolean;
  cta?: boolean;
}

const Programs = () => {
  const { isDark } = useTheme();
  const [visibleSections, setVisibleSections] = useState<VisibleSections>({});
  const [flippedCards, setFlippedCards] = useState([false, false, false]);

  const heroRef = useRef(null);
  const programsRef = useRef(null);
  const detailsRef = useRef(null);
  const benefitsRef = useRef(null);
  const ctaRef = useRef(null);

  const toggleFlip = (index: number) => {
    const newFlipped = [...flippedCards];
    newFlipped[index] = !newFlipped[index];
    setFlippedCards(newFlipped);
  };


  const benefits = [
    {
      icon: Brain,
      title: 'Mind Engineering',
      description: 'Transform your thinking patterns and mental models for breakthrough results',
    },
    {
      icon: Target,
      title: 'Strategic Leadership',
      description: 'Develop advanced leadership skills to navigate complex business challenges',
    },
    {
      icon: Users,
      title: 'Elite Network',
      description: 'Connect with high-performing leaders and build valuable relationships',
    },
    {
      icon: Award,
      title: 'Proven Results',
      description: 'Join thousands who have achieved measurable transformation and success',
    },
  ];

  // Intersection Observer
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const refs = [
      { ref: heroRef, name: 'hero' },
      { ref: programsRef, name: 'programs' },
      { ref: detailsRef, name: 'details' },
      { ref: benefitsRef, name: 'benefits' },
      { ref: ctaRef, name: 'cta' },
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

  return (
    <main id="main-content" className={isDark ? 'bg-gray-900' : 'bg-white'}>
      {/* Section 1: Hero - Vibrant blue gradient */}
     
      <section
        ref={heroRef}
        className="relative min-h-[70vh] md:min-h-screen bg-black overflow-hidden flex items-center pt-20 sm:pt-24 md:pt-40 -mt-16 sm:-mt-20 md:-mt-24"
      >
        <div className="hidden lg:block absolute text-[18rem] font-bold text-white/5 right-10 top-1/2 -translate-y-1/2 pointer-events-none select-none">
          Christos
        </div>
        <div className="hidden md:block absolute h-1 w-96 bg-blue-600/20 -rotate-45 top-1/4 right-20" />
        <div className="hidden md:block absolute h-2 w-64 bg-blue-600/20 rotate-30 bottom-1/3 right-40" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 sm:py-12 md:py-16 lg:py-0">
          <div className="flex flex-col lg:grid lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12 items-center">
            <div className="w-full lg:col-span-3 space-y-3 sm:space-y-4 md:space-y-6 text-left">
              <p className="text-gray-400 text-sm sm:text-base md:text-lg italic">Programs</p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                 Programs & Training
              </h1>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-br from-blue-800 via-blue-400 to-blue-600  bg-clip-text text-transparent">
                Around the World
              </h1>
              <p className="text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl lg:mx-0">
                Designed to Transform Minds and Elevate Leaders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Main Programs - Wave pattern with gradient orbs */}
      <section
        ref={programsRef}
        className={`relative py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden ${
          isDark ? 'bg-black' : 'bg-gradient-to-b from-gray-50 via-white to-gray-50'
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
          <div className="text-center mb-10 sm:mb-16">
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-3 sm:mb-4`}>
              Main Programs
            </h2>
          </div>

          <div className="flex flex-col md:grid md:grid-cols-3 gap-6 md:gap-8">
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
                className="relative h-[400px] sm:h-[450px] md:h-[500px]"
                style={{ perspective: '1000px' }}
              >
                <div
                  className={`relative w-full h-full transition-transform duration-700 ${
                    flippedCards[index] ? '' : ''
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

     

      {/* Section 4: Benefits - Radial gradient with geometric shapes */}
      <section
        ref={benefitsRef}
        className={`relative py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden ${
          isDark ? 'bg-black' : 'bg-white'
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

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-3 sm:mb-4`}>
              Why Join Our Programs?
            </h2>
            <p className={`text-base sm:text-lg md:text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Transform your leadership and unlock your potential
            </p>
          </div>

          <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className={`${
                  isDark ? 'bg-gray-900' : 'bg-gray-50'
                } rounded-2xl p-6 sm:p-8 transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                  visibleSections.benefits ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className={`text-lg sm:text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-3`}>
                  {benefit.title}
                </h3>
                <p className={`text-sm sm:text-base ${isDark ? 'text-gray-400' : 'text-gray-600'} leading-relaxed`}>
                  {benefit.description}
                </p>
              </div>
            ))}
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
    to="/event"
    className="inline-block bg-white hover:bg-gray-100 text-blue-900 px-10 sm:px-12 py-5 sm:py-6 rounded-full text-base sm:text-lg font-bold transition-all duration-300 hover:scale-105 shadow-2xl w-full sm:w-auto text-center"
  >
    Schedule a Consultation
  </Link>
  
  <Link
    to="/"
    className="inline-flex items-center space-x-2 text-white hover:text-blue-100 font-semibold text-base sm:text-lg transition-colors duration-300"
  >
    <Play className="w-5 h-5" />
    <span>Watch Success Stories</span>
  </Link>
</div>
    
              
            </div>
          </section>
    </main>
  );
};

export default Programs;