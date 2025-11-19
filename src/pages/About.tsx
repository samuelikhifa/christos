import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';
import { Heart, Users, Lightbulb, Play, Award, Target, Shield, Smile, Sparkles } from 'lucide-react';
import c12Image from '@/assets/c12.webp'
import c10Image from '@/assets/c10.webp'
import c14Image from '@/assets/c14.webp'
interface VisibleSections {
  hero?: boolean;
  story?: boolean;
  philosophy?: boolean;
  values?: boolean;
  cta?: boolean;
}

const About = () => {
  const { isDark } = useTheme();
  const [visibleSections, setVisibleSections] = useState<VisibleSections>({});

  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const philosophyRef = useRef(null);
  const valuesRef = useRef(null);
  const ctaRef = useRef(null);

  const values = [
    {
      icon: Heart,
      title: 'Concern for Others',
      description: 'Turning my focus from myself to others to identify their feelings and needs, and to do what I can to assist, was one of the greatest turning points in my life. Love is the highest relationship principle in the world.',
      color: 'text-red-500',
      bgColor: 'bg-red-500',
    },
    {
      icon: Users,
      title: 'Leadership',
      description: 'At the highest level of success, we help others to succeed. Doing this is leadership. This speaks directly to my personal purpose. I help others to succeed.',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500',
    },
    {
      icon: Smile,
      title: 'Family',
      description: 'I believe that the family provides some of our best opportunities to be loved and to learn to love. I am happy I have a family to love and that loves me.',
      color: 'text-pink-500',
      bgColor: 'bg-pink-500',
    },
    {
      icon: Lightbulb,
      title: 'Wisdom',
      description: 'I value knowledge and its accurate application for the achievement of success. I am a learner for life, and I am passionate about sharing what I learn to help others improve their outcomes.',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500',
    },
    {
      icon: Target,
      title: 'Simplicity',
      description: 'I try to avoid complexity in my desires, so I can derive joy from the basic blessings life offers.',
      color: 'text-green-500',
      bgColor: 'bg-green-500',
    },
    {
      icon: Shield,
      title: 'Honesty',
      description: "I don't like to deceive myself. Neither do I like to deceive others. This helps me to perceive people and events with clarity.",
      color: 'text-purple-500',
      bgColor: 'bg-purple-500',
    },
    {
      icon: Award,
      title: 'Autonomy',
      description: 'I am an original thinker and need the space and power to try out my ideas and to control outcomes. I value independence.',
      color: 'text-orange-500',
      bgColor: 'bg-orange-500',
    },
    {
      icon: Sparkles,
      title: 'Spirituality',
      description: 'Perhaps my training as an engineer makes me appreciate that the invisible part of life, like that of a building, controls the visible part. Spirituality helps me deal with challenges better, giving me a constant supply of hope, peace, joy, and a sense of meaning.',
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-500',
    },
  ];

  // Intersection Observer for animations
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const refs = [
      { ref: heroRef, name: 'hero' },
      { ref: storyRef, name: 'story' },
      { ref: philosophyRef, name: 'philosophy' },
      { ref: valuesRef, name: 'values' },
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
    <>
      {/* Section 1: Hero - Black with geometric lines */}
      <section
        ref={heroRef}
        className="relative min-h-[70vh] md:min-h-screen bg-black overflow-hidden flex items-center pt-20 sm:pt-24 md:pt-40 -mt-16 sm:-mt-20 md:-mt-24"
      >
        <div className="hidden lg:block absolute text-[16rem] font-bold text-white/5 right-10 top-1/2 -translate-y-1/2 pointer-events-none select-none">
          Christos
        </div>
        <div className="hidden md:block absolute h-1 w-96 bg-blue-600/20 rotate-45 top-1/4 right-20" />
        <div className="hidden md:block absolute h-2 w-64 bg-blue-600/20 -rotate-30 bottom-1/3 right-40" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 sm:py-12 md:py-16 lg:py-0">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            <div className="w-full space-y-3 sm:space-y-4 md:space-y-6 text-left">
              <p className="text-gray-400 text-sm sm:text-base md:text-lg italic mt-16">About</p>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
                Dr. Christos Etoka
              </h1>
              <p className="font-body text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
                Educator, Psychologist, and Transformational Leader dedicated to unlocking human
                potential through Mind Engineering.
              </p>
            </div>
            {/* <div className=" sm:mt-8 lg:mt-16"> */}
              <div className="w-full relative aspect-square sm:mt-8 lg:mt-16 max-w-[260px] sm:max-w-sm md:max-w-md mx-auto lg:max-w-none bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden">
                <img
                  src={c12Image}
                  alt="Professional Portrait"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              </div>
            </div>
          {/* </div> */}
        {/* </div> */}
      </section>

      {/* Section 2: The Story - Soft gradient with floating orbs */}
      <section
        ref={storyRef}
        className={`relative py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-white via-blue-50 to-white'
          }`}
      >
        {/* Decorative floating orbs */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-indigo-200/20 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Large Bio Block */}
            <div
              className={`lg:col-span-2 ${isDark ? 'bg-black' : 'bg-white'
                } rounded-2xl p-6 sm:p-8 lg:p-12 shadow-lg transition-all duration-700 ${visibleSections.story ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
            >
              <h2
                className={`text-2xl sm:text-3xl lg:text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'
                  } mb-6 sm:mb-8`}
              >
                The Story
              </h2>
              <div className="space-y-4 sm:space-y-6">
                <p
                  className={`font-body text-base sm:text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'
                    } leading-relaxed`}
                >
                  Dr. Christos Etoka O. Etoka is a distinguished educator, psychologist, and thought
                  leader whose work has transformed thousands of lives across continents. With over 30
                  years of experience in human capacity development, he has pioneered the concept of
                  Mind Engineering – a revolutionary approach to mental transformation and leadership
                  excellence.
                </p>
                <p
                  className={`font-body text-base sm:text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'
                    } leading-relaxed`}
                >
                  His academic journey culminated in a Master of Science in Social Psychology from the
                  prestigious University of Manchester, UK, where he deepened his understanding of
                  human behavior, group dynamics, and the psychological foundations of leadership.
                </p>
                <p
                  className={`text-base sm:text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'
                    } leading-relaxed`}
                >
                  As the Executive Vice Chancellor of Xrislid Institute of Mind Engineering, Dr.
                  Christos leads a movement that challenges conventional thinking and empowers
                  individuals to break mental barriers. His work has earned him the prestigious
                  President's Award from the British Psychological Society and recognition as Man of
                  the Year in Human Capacity Development.
                </p>
              </div>
            </div>

            {/* Photo Block */}
            <div

              style={{ transitionDelay: '0.2s' }}
            >
              <div className="aspect-[4/2]  flex items-center justify-center text-white text-lg mt-0">

              </div>
              <img src={c10Image} alt="the story" />
            </div>

            {/* Quote Block */}
            <div
              className={`lg:col-span-3 bg-gradient-to-br from-blue-800 via-blue-400 to-blue-600 rounded-2xl p-8 sm:p-12 shadow-lg transition-all duration-700 ${visibleSections.story ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              style={{ transitionDelay: '0.4s' }}
            >
              <blockquote className="text-center">
                <p className="font-mono text-2xl sm:text-3xl md:text-4xl text-white font-bold italic mb-4 sm:mb-6">
                  "Every person has the capacity to lead, to influence, and to transform their world.
                  The question is: will you unlock it?"
                </p>
                <footer className="text-blue-100 text-base sm:text-lg">— Dr. Christos Etoka</footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Philosophy - Grid pattern with image and cards */}
      <section
        ref={philosophyRef}
        className={`relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden ${isDark ? 'bg-black' : 'bg-gray-100'
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
        {/* Diagonal accent lines */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-600/5 to-transparent transform skew-x-12"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-2/3 bg-gradient-to-tr from-purple-600/5 to-transparent transform -skew-x-12"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <h2
            className={`font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-center ${isDark ? 'text-white' : 'text-gray-900'
              } mb-10 sm:mb-16`}
          >
            My Philosophy
          </h2>

          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Image with overlay */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[300px] sm:h-[400px] lg:h-[600px] w-full">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-900">
                <img src={c14Image} alt="the story" className="w-full h-full object-cover" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
                <p className="font-mono text-white text-base sm:text-lg md:text-xl italic font-semibold">
                  "True transformation begins in the mind"
                </p>
              </div>
            </div>

            {/* Philosophy Cards Stack */}
            <div className="font-display flex flex-col lg:relative gap-4 lg:gap-0 lg:min-h-[600px]">
              {[
                {
                  title: 'Mental Reformation',
                  desc: 'True transformation begins in the mind. By reforming our mental patterns, we reshape our reality.',
                  accent: 'border-blue-500',
                },
                {
                  title: 'Behavioral Psychology',
                  desc: 'Understanding human behavior is key to influencing positive change in individuals and organizations.',
                  accent: 'border-purple-500',
                },
                {
                  title: 'Leadership Development',
                  desc: "Leadership is not a position—it's a mindset. Every person can develop the capacity to lead with impact.",
                  accent: 'border-green-500',
                },
                {
                  title: 'Transformational Education',
                  desc: 'Education should transform, not just inform. We create learning experiences that produce lasting change.',
                  accent: 'border-orange-500',
                },
              ].map((philosophy, index) => (
                <div
                  key={index}
                  className={`lg:absolute lg:left-0 lg:right-0 ${isDark ? 'bg-gray-900 hover:bg-gray-800' : 'bg-white hover:bg-gray-50'
                    } rounded-2xl p-6 sm:p-8 shadow-xl border-l-4 ${philosophy.accent
                    } cursor-pointer transition-all duration-500 lg:hover:scale-105 lg:hover:z-50 ${visibleSections.philosophy ? 'opacity-100' : 'opacity-0'
                    }`}
                  style={{
                    top: window.innerWidth >= 1024 ? `${index * 80}px` : 'auto',
                    transform: window.innerWidth >= 1024 ? `rotate(${(index % 2 === 0 ? 1 : -1) * 2}deg)` : 'none',
                    transitionDelay: `${index * 0.15}s`,
                    zIndex: window.innerWidth >= 1024 ? index + 1 : 'auto',
                  }}
                  onMouseEnter={(e) => {
                    if (window.innerWidth >= 1024) {
                      e.currentTarget.style.transform = 'rotate(0deg)';
                      e.currentTarget.style.zIndex = '50';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (window.innerWidth >= 1024) {
                      e.currentTarget.style.transform = `rotate(${(index % 2 === 0 ? 1 : -1) * 2}deg)`;
                      e.currentTarget.style.zIndex = `${index + 1}`;
                    }
                  }}
                >
                  <h3
                    className={`text-xl sm:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'
                      } mb-3 sm:mb-4`}
                  >
                    {philosophy.title}
                  </h3>
                  <p
                    className={`text-sm sm:text-base ${isDark ? 'text-gray-400' : 'text-gray-600'
                      } leading-relaxed`}
                  >
                    {philosophy.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: My Values - Radial gradient with geometric shapes */}
      <section
        ref={valuesRef}
        className={`relative py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden ${isDark ? 'bg-gray-900' : 'bg-white'
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
          <h2
            className={`font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-center ${isDark ? 'text-white' : 'text-gray-900'
              } mb-10 sm:mb-16`}
          >
            My Values
          </h2>

          <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className={`group ${isDark ? 'bg-black' : 'bg-gray-50'
                  } rounded-2xl p-6 sm:p-8 transition-all duration-500 hover:scale-105 hover:shadow-2xl ${visibleSections.values ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 ${value.bgColor} rounded-full flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <value.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3
                  className={`text-lg sm:text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'
                    } mb-3 sm:mb-4`}
                >
                  {value.title}
                </h3>
                <p
                  className={`text-sm sm:text-base ${isDark ? 'text-gray-400' : 'text-gray-600'
                    } leading-relaxed`}
                >
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section
        ref={ctaRef}
        className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-white/5 rounded-full -top-48 -left-48 animate-pulse"></div>
          <div className="absolute w-96 h-96 bg-white/5 rounded-full -bottom-48 -right-48 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="font-display hidden lg:block absolute text-[16rem] font-bold text-white/5 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
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
              to="/"
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

export default About;