import { useState, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Clock, MapPin, Calendar,  ArrowRight } from 'lucide-react';
import tsImage from '@/assets/ts.jpg'
import c20Image from '@/assets/c20.jpg'
import c22Image from '@/assets/c22.webp'




const Events = () => {
  const { isDark } = useTheme();
  const [flippedCards, setFlippedCards] = useState([false, false, false]);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    firstName: '',
    lastName: '',
    organization: '',
    jobTitle: '',
    phone: '',
    topicOfInterest: '',
    eventDate: '',
    eventLocation: '',
    numAttendees: '',
    budgetRange: '',
    eventType: '',
  });
  
  const heroRef = useRef(null);
  const featuredRef = useRef(null);
  const upcomingRef = useRef(null);
  const bookingRef = useRef(null);

  const toggleFlip = (index: number) => {
    setFlippedCards(prev => {
      const newFlipped = [...prev];
      newFlipped[index] = !newFlipped[index];
      return newFlipped;
    });
  };


  const upcomingEvents = [
    {
      title: 'Talk Show',
      date: 'Every Saturday',
      location: 'Armed Force Radio, Abuja',
      // attendees: '5000+',
      description: 'Dont just listen, experience mindset reset that will shift your entire reality',
      image: tsImage,
    },
    {
      title: 'The Mind and The Man',
      date: 'March 16, 2024',
      location: 'Benin, Nigeria',
      // attendees: '2000+',
      description: 'An intensive meeting focused on developing next-generation leaders with practical tools and insights for navigating complex business landscapes.',
      image: c20Image
    },
    {
      title: 'The Mindset For Wealth',
      date: 'May 8, 2025',
      location: 'Virtual',
      // attendees: '1500+',
      description: 'An exclusive meeting for young aspiring leaders',
      image: c22Image
    }
  ];

  return (
    <main id="main-content" className={isDark ? 'bg-gray-900' : 'bg-white'}>
      {/* Section 1: Hero - Black with geometric lines */}
      <section
        ref={heroRef}
        className="relative min-h-[80vh] bg-black overflow-hidden flex items-center pt-40 sm:pt-30-mt-20 sm:-mt-24"
      >
        <div className="hidden lg:block absolute text-[16rem] font-bold text-white/5 right-10 top-1/2 -translate-y-1/2 pointer-events-none select-none">
          Christos
        </div>
        <div className="hidden md:block absolute h-1 w-96 bg-blue-600/20 -rotate-45 top-1/4 right-20" />
        <div className="hidden md:block absolute h-2 w-64 bg-blue-600/20 rotate-30 bottom-1/3 right-40" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-3 space-y-4 sm:space-y-6">
              <p className="text-gray-400 text-base sm:text-lg italic">Events</p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
                Transforming Minds
              </h1>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-br from-blue-800 via-blue-400 to-blue-600 bg-clip-text text-transparent">
                Around the World
              </h1>
              <p className="text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl">
                Join us at powerful events where minds are renewed and leaders are born.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Featured Event -  Conference with Video */}
<section
  ref={featuredRef}
  className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center -mt-20 sm:-mt-24"
>
  <div className="max-w-7xl mx-auto w-full relative z-10">
    <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
      {/* Left - Text */}
      <div className="relative">
        <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-none">
          A<br />
          Podcast<br />
          Session
        </h2>
        <button 
          onClick={() => setIsVideoPlaying(true)}
          className="absolute -top-4 -right-16 w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center hover:bg-blue-600 hover:scale-110 transition-all duration-300 group shadow-lg"
        >
          <ArrowRight className="w-6 h-6 sm:w-7 sm:h-7 text-black group-hover:text-white" />
        </button>
      </div>

      {/* Right - Video Player */}
      <div className="relative">
        <div className="w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] aspect-video rounded-3xl overflow-hidden shadow-2xl">
          
          {/* Show thumbnail when not playing */}
          {!isVideoPlaying ? (
            <div 
              onClick={() => setIsVideoPlaying(true)}
              className="w-full h-full bg-gradient-to-br from-blue-800 via-purple-700 to-pink-700 relative cursor-pointer group"
            >
              <div className="absolute inset-0 bg-black/20"></div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-400/30 to-purple-400/30 blur-3xl"></div>
              </div>
              
              <div className="absolute bottom-6 left-6 bg-red-600 px-4 py-2 rounded flex items-center space-x-2">
                <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
                  <span className="text-red-600 font-bold text-xs">▶</span>
                </div>
                <span className="text-white font-bold text-sm tracking-wider">Nugest</span>
                <span className="text-white text-xs">Video</span>
              </div>
              
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-all duration-300">
                <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                  <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-blue-600 border-b-[12px] border-b-transparent ml-1"></div>
                </div>
              </div>
            </div>
          ) : (
            // Show video when playing
            <div className="w-full h-full relative">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/YM9wNnZmy9k?autoplay=1&rel=0"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          )}
          
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Section 3: Upcoming Events - Three Card Grid with Flip */}
      <section
        ref={upcomingRef}
        className={`relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden `}
      >
        {/* Decorative floating orbs */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-indigo-200/20 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <h2
            className={`font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-center ${
              isDark ? 'text-white' : 'text-gray-900'
            } mb-12 sm:mb-16`}
          >
            Upcoming Events
          </h2>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {upcomingEvents.map((event, index) => (
              <div
                key={index}
                className="relative h-[500px]"
                style={{ perspective: '1000px' }}
              >
                <div
                  className={`relative w-full h-full transition-transform duration-700 ${
                    flippedCards[index] ? 'rotate-y-180' : ''
                  }`}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Front of card */}
                  <div
                    className="absolute inset-0 rounded-2xl overflow-hidden shadow-xl"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    {/* Background Image */}
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
                    
                    <div className="absolute inset-0 flex flex-col justify-between p-6">
                      {/* Flyer placeholder - Replace with actual image */}
                      <div className="flex-1 flex items-center justify-center">
                        
                      </div>

                      {/* Bottom info */}
                      <div className="bg-black/50 backdrop-blur-sm rounded-xl p-4">
                        <h3 className="text-xl font-bold text-white mb-2">
                          {event.title}
                        </h3>
                        <div className="flex items-center text-white/80 text-sm space-x-4">
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {event.date}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => toggleFlip(index)}
                        className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-blue-600 hover:scale-110 transition-all duration-300 group"
                      >
                        <ArrowRight className="w-5 h-5 text-black group-hover:text-white" />
                      </button>
                    </div>
                  </div>

                  {/* Back of card */}
                  <div
                    className="absolute inset-0 rounded-2xl overflow-hidden shadow-xl"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                  >
                    {/* Background Image for back */}
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    
                    <div className="absolute inset-0 flex flex-col justify-between p-6 bg-gradient-to-br from-black/90 to-black/80">
                      <button
                        onClick={() => toggleFlip(index)}
                        className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-blue-600 hover:scale-110 transition-all duration-300 group"
                      >
                        <ArrowRight className="w-5 h-5 text-black group-hover:text-white transform rotate-180" />
                      </button>

                      <div className="space-y-4 mt-12">
                        <h3 className="text-2xl font-bold text-white">
                          {event.title}
                        </h3>
                        <p className="text-white/90 text-sm leading-relaxed">
                          {event.description}
                        </p>

                        <div className="space-y-3 pt-4">
                          <div className="flex items-center text-white/80">
                            <Calendar className="w-5 h-5 mr-3 text-blue-400" />
                            <span className="text-sm">{event.date}</span>
                          </div>
                          <div className="flex items-center text-white/80">
                            <MapPin className="w-5 h-5 mr-3 text-blue-400" />
                            <span className="text-sm">{event.location}</span>
                          </div>
                         
                        </div>
                      </div>

                      <button className="font-ui w-full bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300">
                        Register Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Book Dr. Christos - Enhanced with creative elements */}
      <section
        ref={bookingRef}
        className="font-display relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700"
      >
        {/* Animated gradient backgrounds */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-white/5 rounded-full blur-2xl"></div>
        </div>

        {/* Decorative shapes */}
        <div className="absolute top-10 right-10 w-32 h-32 border-2 border-white/20 rounded-full"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 border-2 border-white/20 rotate-45"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start text-white">
            {/* Left Column - Info */}
            <div className="space-y-8">
              <div>
                <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6">
                  Book Dr. Christos
                </h2>
                <p className="font-ui text-xl sm:text-2xl text-blue-100 mb-2">For Your Next Event</p>
                <div className="w-24 h-1 bg-white/50 rounded-full"></div>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 space-y-4">
                <h3 className=" font-uitext-xl font-bold mb-4">Speaking Topics</h3>
                {['Keynote Speeches', 'Workshops & Seminars', 'Corporate Training', 'Conference Sessions'].map(
                  (item) => (
                    <div key={item} className="flex items-center space-x-3 group cursor-pointer">
                      <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                        <Clock className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-base sm:text-lg group-hover:translate-x-1 transition-transform duration-300">{item}</span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-white/20 shadow-2xl">
              <h3 className="font-body text-2xl sm:text-3xl font-bold mb-6 flex items-center">
                Get In Touch
                <span className="ml-3 w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
              </h3>
              <div className="space-y-4">
                {/* First & Last Name */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">First Name *</label>
                    <input
                      type="text"
                      value={bookingForm.firstName}
                      onChange={(e) =>
                        setBookingForm({ ...bookingForm, firstName: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:border-white focus:bg-white/25 transition-all duration-300"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Last Name *</label>
                    <input
                      type="text"
                      value={bookingForm.lastName}
                      onChange={(e) =>
                        setBookingForm({ ...bookingForm, lastName: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:border-white focus:bg-white/25 transition-all duration-300"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                {/* Organization */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Organization *</label>
                  <input
                    type="text"
                    value={bookingForm.organization}
                    onChange={(e) =>
                      setBookingForm({ ...bookingForm, organization: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:border-white focus:bg-white/25 transition-all duration-300"
                    placeholder="Your Company"
                  />
                </div>

                {/* Job Title */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Job Title *</label>
                  <input
                    type="text"
                    value={bookingForm.jobTitle}
                    onChange={(e) => setBookingForm({ ...bookingForm, jobTitle: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:border-white focus:bg-white/25 transition-all duration-300"
                    placeholder="CEO / Director"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Phone *</label>
                  <input
                    type="tel"
                    value={bookingForm.phone}
                    onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:border-white focus:bg-white/25 transition-all duration-300"
                    placeholder="+234 xxx xxx xxxx"
                  />
                </div>

                {/* Topic of Interest */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Topic of Interest *</label>
                  <input
                    type="text"
                    value={bookingForm.topicOfInterest}
                    onChange={(e) =>
                      setBookingForm({ ...bookingForm, topicOfInterest: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:border-white focus:bg-white/25 transition-all duration-300"
                    placeholder="Leadership Development"
                  />
                </div>

                {/* Date & Location */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Event Date *</label>
                    <input
                      type="date"
                      value={bookingForm.eventDate}
                      onChange={(e) =>
                        setBookingForm({ ...bookingForm, eventDate: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:border-white focus:bg-white/25 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Location *</label>
                    <input
                      type="text"
                      value={bookingForm.eventLocation}
                      onChange={(e) =>
                        setBookingForm({ ...bookingForm, eventLocation: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:border-white focus:bg-white/25 transition-all duration-300"
                      placeholder="Lagos, Nigeria"
                    />
                  </div>
                </div>

                {/* Attendees & Budget */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Attendees *</label>
                    <input
                      type="number"
                      value={bookingForm.numAttendees}
                      onChange={(e) =>
                        setBookingForm({ ...bookingForm, numAttendees: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:border-white focus:bg-white/25 transition-all duration-300"
                      placeholder="100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Budget Range *</label>
                    <select
                      value={bookingForm.budgetRange}
                      onChange={(e) =>
                        setBookingForm({ ...bookingForm, budgetRange: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:border-white focus:bg-white/25 transition-all duration-300"
                    >
                      <option value="" className="text-gray-900">Select Range</option>
                      <option value="<100k" className="text-gray-900">&lt; ₦100,000</option>
                      <option value="100k-500k" className="text-gray-900">₦100,000 - ₦500,000</option>
                      <option value="500k-1m" className="text-gray-900">₦500,000 - ₦1,000,000</option>
                      <option value=">1m" className="text-gray-900">&gt; ₦1,000,000</option>
                    </select>
                  </div>
                </div>

                {/* Type of Event */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Type of Event or Theme *</label>
                  <select
                    value={bookingForm.eventType}
                    onChange={(e) => setBookingForm({ ...bookingForm, eventType: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:border-white focus:bg-white/25 transition-all duration-300"
                  >
                    <option value="" className="text-gray-900">Select Event Type</option>
                    <option value="keynote" className="text-gray-900">Keynote</option>
                    <option value="fireside" className="text-gray-900">Fireside Chat or Sitdown Q&A</option>
                    <option value="breakout" className="text-gray-900">Breakout Session</option>
                    <option value="virtual" className="text-gray-900">Virtual Presentation</option>
                  </select>
                </div>

                <button className="w-full bg-white text-blue-600 hover:bg-blue-50 px-6 py-4 rounded-lg font-bold transition-all duration-300 hover:scale-105 shadow-xl mt-2 flex items-center justify-center group">
                  <span>Submit Booking Request</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Events;