import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ResumePage = () => {
  const containerRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    // Initial animations with unique class names
    tl.fromTo(
      '.resume-top-content',
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    )
      .fromTo(
        '.cv-section',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2 },
        '-=0.5'
      );

    // Scroll-triggered animations
    gsap.utils.toArray('.project-tile').forEach((card) => {
      gsap.fromTo(
        card,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'top 60%',
            scrub: 1,
          },
        }
      );
    });

    gsap.utils.toArray('.award-box').forEach((item) => {
      gsap.fromTo(
        item,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            end: 'top 60%',
            scrub: 1,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleDownload = () => {
    window.open('/path-to-your-resume.pdf', '_blank');
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#0b0b0b] text-gray-100 overflow-x-hidden font-sans pt-20"
    >
      {/* CV Document Container */}
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        {/* Main CV Content */}
        <div className="relative">
          {/* Header Section with new design */}
          <div ref={headerRef} className="cv-document resume-top-content">
            {/* Top Banner */}
            <div className="cv-banner bg-gradient-to-r from-[#44a02c] to-[#2d6a1f] text-white rounded-t-2xl p-8 mb-8 shadow-2xl">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-4">
                  <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                    SIBI BALASANKAR
                  </h1>
                  <p className="text-xl text-white/90 opacity-90">
                    AI & Blockchain Engineer | Full Stack Developer
                  </p>
                </div>
                
                <button
                  onClick={handleDownload}
                  className="group relative px-6 py-3 bg-white text-[#44a02c] font-semibold rounded-lg hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download CV
                </button>
              </div>
              
              {/* Contact Info Bar */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-white/70">Email</p>
                    <p className="font-medium text-sm">sibibs03@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-white/70">LinkedIn</p>
                    <p className="font-medium text-sm">/sibi-b-s</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-white/70">GitHub</p>
                    <p className="font-medium text-sm">@Sibibalasankar</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-white/70">Location</p>
                    <p className="font-medium text-sm">Coimbatore, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Summary */}
            <div className="cv-summary bg-[#1a1a1a] rounded-lg p-6 mb-8 shadow-lg border-l-4 border-[#44a02c]">
              <h2 className="text-xl font-bold text-[#44a02c] mb-4">Professional Profile</h2>
              <p className="text-gray-300 leading-relaxed">
                Generative AI, Blockchain DApp, and full-stack web developer with expertise in building intelligent applications, 
                integrating AI models, and developing secure smart contracts. Specialized in creating scalable architecture 
                and delivering practical solutions for real-world challenges. Passionate about innovative technologies 
                and their practical applications.
              </p>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Education & Skills */}
              <div className="lg:col-span-1 space-y-8">
                {/* Education Timeline */}
                <section className="cv-section">
                  <div className="cv-card bg-[#1a1a1a] rounded-lg p-6 shadow-lg border border-[#44a02c]/20">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-[#44a02c]/10 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-[#44a02c]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                        </svg>
                      </div>
                      <h2 className="text-xl font-bold text-gray-200">Education</h2>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="relative pl-8 pb-6 border-l-2 border-[#44a02c]/30">
                        <div className="absolute -left-2 top-0 w-4 h-4 bg-[#44a02c] rounded-full shadow-lg"></div>
                        <div className="mb-2">
                          <span className="inline-block px-3 py-1 bg-[#44a02c]/20 text-[#44a02c] text-xs font-semibold rounded-full">2024 - Present</span>
                        </div>
                        <h3 className="font-bold text-gray-200">Bachelor of Technology</h3>
                        <p className="text-gray-400">AI & Data Science</p>
                        <p className="text-sm text-gray-500">KGISL Institute of Technology</p>
                        <div className="mt-3">
                          <span className="inline-block px-3 py-1 bg-green-900/40 text-green-400 text-sm font-semibold rounded">
                            CGPA: 9.01
                          </span>
                        </div>
                      </div>
                      
                      <div className="relative pl-8">
                        <div className="absolute -left-2 top-0 w-4 h-4 bg-[#44a02c] rounded-full shadow-lg"></div>
                        <div className="mb-2">
                          <span className="inline-block px-3 py-1 bg-[#44a02c]/20 text-[#44a02c] text-xs font-semibold rounded-full">2021 - 2024</span>
                        </div>
                        <h3 className="font-bold text-gray-200">Diploma</h3>
                        <p className="text-gray-400">Computer Engineering</p>
                        <p className="text-sm text-gray-500">Sri Ranganathar Institute of Polytechnic</p>
                        <div className="mt-3">
                          <span className="inline-block px-3 py-1 bg-green-900/40 text-green-400 text-sm font-semibold rounded">
                            Score: 96%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Technical Skills */}
                <section className="cv-section">
                  <div className="cv-card bg-[#1a1a1a] rounded-lg p-6 shadow-lg border border-[#44a02c]/20">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-[#44a02c]/10 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-[#44a02c]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h2 className="text-xl font-bold text-gray-200">Technical Skills</h2>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-gray-300 mb-2">AI & Machine Learning</h3>
                        <div className="flex flex-wrap gap-2">
                          {['Python', 'PyTorch', 'TensorFlow', 'Generative AI', 'ML Models'].map((skill) => (
                            <span key={skill} className="px-3 py-1 bg-blue-900/30 text-blue-300 text-sm rounded border border-blue-700/30 hover:border-blue-500/50 transition-colors">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-gray-300 mb-2">Blockchain & Web3</h3>
                        <div className="flex flex-wrap gap-2">
                          {['Solidity', 'Smart Contracts', 'Web3.js', 'DApps', 'Hyperledger'].map((skill) => (
                            <span key={skill} className="px-3 py-1 bg-purple-900/30 text-purple-300 text-sm rounded border border-purple-700/30 hover:border-purple-500/50 transition-colors">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-gray-300 mb-2">Web Development</h3>
                        <div className="flex flex-wrap gap-2">
                          {['React', 'Node.js', 'MongoDB', 'Express', 'MERN Stack'].map((skill) => (
                            <span key={skill} className="px-3 py-1 bg-green-900/30 text-green-300 text-sm rounded border border-green-700/30 hover:border-green-500/50 transition-colors">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-gray-300 mb-2">Tools & DevOps</h3>
                        <div className="flex flex-wrap gap-2">
                          {['Docker', 'Git', 'GitHub', 'Flask', 'Django'].map((skill) => (
                            <span key={skill} className="px-3 py-1 bg-orange-900/30 text-orange-300 text-sm rounded border border-orange-700/30 hover:border-orange-500/50 transition-colors">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Achievements */}
                <section className="cv-section">
                  <div className="cv-card bg-[#1a1a1a] rounded-lg p-6 shadow-lg border border-[#44a02c]/20">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-[#44a02c]/10 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-[#44a02c]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                      <h2 className="text-xl font-bold text-gray-200">Achievements</h2>
                    </div>
                    
                    <div className="space-y-4">
                      {[
                        { title: 'Best Paper Award', event: 'KGCAS STF Project Expo' },
                        { title: '1st Prize', event: 'National Level Technical Symposium' },
                        { title: '2nd Place', event: 'Infest Web Development Competition' },
                        { title: '1st Place', event: 'Technical Paper Presentation' },
                        { title: '2nd Prize', event: 'Polyfest Project Expo' }
                      ].map((achievement, idx) => (
                        <div key={idx} className="award-box flex items-start gap-3 p-3 hover:bg-[#44a02c]/10 rounded-lg transition-colors">
                          <div className="w-6 h-6 bg-yellow-900/40 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-200">{achievement.title}</h4>
                            <p className="text-sm text-gray-400">{achievement.event}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </div>

              {/* Right Column - Experience & Projects */}
              <div className="lg:col-span-2 space-y-8">
                {/* Professional Experience */}
                <section className="cv-section">
                  <div className="cv-card bg-[#1a1a1a] rounded-lg p-6 shadow-lg border border-[#44a02c]/20">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-[#44a02c]/10 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-[#44a02c]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                          <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                        </svg>
                      </div>
                      <h2 className="text-xl font-bold text-gray-200">Professional Experience</h2>
                    </div>
                    
                    <div className="space-y-8">
                      {/* Experience 1 */}
                      <div className="experience-item">
                        <div className="flex flex-col md:flex-row justify-between items-start mb-3">
                          <div>
                            <h3 className="text-lg font-bold text-gray-200">App Development & Backend Engineering</h3>
                            <p className="text-[#44a02c] font-medium">Lakshmi Life Sciences • Coimbatore, India</p>
                          </div>
                          <span className="mt-2 md:mt-0 px-3 py-1 bg-[#44a02c]/20 text-[#44a02c] text-sm font-semibold rounded-full">
                            2025
                          </span>
                        </div>
                        <ul className="space-y-2 text-gray-300">
                          <li className="flex items-start gap-2">
                            <span className="w-2 h-2 bg-[#44a02c] rounded-full mt-2 flex-shrink-0"></span>
                            <span>Developed applications and managed backend systems with efficient solutions for business processes</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="w-2 h-2 bg-[#44a02c] rounded-full mt-2 flex-shrink-0"></span>
                            <span>Handled administrative tasks and supported day-to-day organizational operations</span>
                          </li>
                        </ul>
                      </div>
                      
                      {/* Experience 2 */}
                      <div className="experience-item">
                        <div className="flex flex-col md:flex-row justify-between items-start mb-3">
                          <div>
                            <h3 className="text-lg font-bold text-gray-200">Administrator</h3>
                            <p className="text-[#44a02c] font-medium">SRI Valves • Coimbatore, India</p>
                          </div>
                          <span className="mt-2 md:mt-0 px-3 py-1 bg-[#44a02c]/20 text-[#44a02c] text-sm font-semibold rounded-full">
                            2022
                          </span>
                        </div>
                        <ul className="space-y-2 text-gray-300">
                          <li className="flex items-start gap-2">
                            <span className="w-2 h-2 bg-[#44a02c] rounded-full mt-2 flex-shrink-0"></span>
                            <span>Developed applications and managed backend systems for business process optimization</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="w-2 h-2 bg-[#44a02c] rounded-full mt-2 flex-shrink-0"></span>
                            <span>Handled administrative tasks and supported operational efficiency</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Projects */}
                <section className="cv-section">
                  <div className="cv-card bg-[#1a1a1a] rounded-lg p-6 shadow-lg border border-[#44a02c]/20">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-[#44a02c]/10 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-[#44a02c]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h2 className="text-xl font-bold text-gray-200">Featured Projects</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        {
                          title: 'Smart Contract Auditing Tool',
                          company: 'LayerOneX, Australia',
                          year: '2023',
                          desc: 'AI-powered Solidity contract analysis for vulnerabilities',
                          impact: '< 2min Audits'
                        },
                        {
                          title: 'Green Wheels Supply Chain',
                          company: 'GWSCS, Coimbatore',
                          year: '2025',
                          desc: 'Modern logistics website with clean UI/UX',
                          impact: '89% Client Visits'
                        },
                        {
                          title: 'Digital Audit System',
                          company: 'Lakshmi Life Sciences',
                          year: '2025',
                          desc: 'Comprehensive auditing application with workflow',
                          impact: '96% Improvement'
                        },
                        {
                          title: 'EduCerts NFT Platform',
                          company: 'Personal Project',
                          year: '2025',
                          desc: 'DApp for minting educational certificates as NFTs',
                          impact: '99.9% Verification'
                        }
                      ].map((project, idx) => (
                        <div key={idx} className="project-tile bg-[#252525] rounded-lg p-5 border border-[#44a02c]/20 hover:border-[#44a02c]/50 hover:shadow-xl transition-all duration-300">
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="font-bold text-gray-200 text-sm">{project.title}</h3>
                            <span className="px-2 py-1 bg-[#44a02c]/20 text-[#44a02c] text-xs font-semibold rounded">
                              {project.year}
                            </span>
                          </div>
                          <p className="text-sm text-gray-400 mb-3">{project.company}</p>
                          <p className="text-gray-300 text-sm mb-4">{project.desc}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              <span className="text-sm font-semibold text-green-400">{project.impact}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Additional Info */}
                <section className="cv-section">
                  <div className="cv-card bg-gradient-to-r from-[#1a1a1a] to-[#252525] rounded-lg p-6 shadow-lg border border-[#44a02c]/20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="font-semibold text-gray-200 mb-4 flex items-center gap-2">
                          <svg className="w-5 h-5 text-[#44a02c]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                          Additional Skills
                        </h3>
                        <ul className="space-y-3">
                          <li className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-[#44a02c]/20 rounded-lg flex items-center justify-center">
                              <span className="text-[#44a02c] font-bold">✓</span>
                            </div>
                            <span className="text-gray-300">Problem Solving</span>
                          </li>
                          <li className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-[#44a02c]/20 rounded-lg flex items-center justify-center">
                              <span className="text-[#44a02c] font-bold">✓</span>
                            </div>
                            <span className="text-gray-300">Team Leadership</span>
                          </li>
                          <li className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-[#44a02c]/20 rounded-lg flex items-center justify-center">
                              <span className="text-[#44a02c] font-bold">✓</span>
                            </div>
                            <span className="text-gray-300">Project Management</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-gray-200 mb-4 flex items-center gap-2">
                          <svg className="w-5 h-5 text-[#44a02c]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z" clipRule="evenodd" />
                          </svg>
                          Languages
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-gray-300">English</span>
                              <span className="text-[#44a02c] font-semibold">Fluent</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div className="bg-[#44a02c] h-2 rounded-full w-4/5"></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-gray-300">Tamil</span>
                              <span className="text-[#44a02c] font-semibold">Native</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div className="bg-[#44a02c] h-2 rounded-full w-full"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-12 pt-8 border-t border-[#44a02c]/20">
              <div className="text-center">
                <p className="text-gray-400 mb-4 italic">
                  "Innovation distinguishes between a leader and a follower." - Steve Jobs
                </p>
                <p className="text-sm text-gray-500">
                  © {new Date().getFullYear()} Sibi Balasankar • Portfolio available upon request
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePage;