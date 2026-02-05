"use client";

import { useEffect, useState } from "react";


const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: "Smart Explanations",
    description: "AI breaks down complex topics into digestible concepts tailored to your learning style",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    title: "Exam Preparation",
    description: "Generate practice questions and mock tests based on your study material",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    title: "Interview Practice",
    description: "Simulate real interview scenarios with instant AI feedback and improvement tips",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    title: "Spaced Revision",
    description: "Smart scheduling ensures you review concepts at optimal intervals for retention",
  },
];

const stats = [
  { value: "10K+", label: "Active Learners" },
  { value: "1M+", label: "Questions Answered" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "24/7", label: "AI Availability" },
];

const testimonials = [
  {
    quote: "This completely transformed how I prepare for exams. The AI explanations are incredibly clear.",
    author: "Sarah K.",
    role: "Medical Student",
  },
  {
    quote: "Finally, a study tool that adapts to my pace. The interview prep feature landed me my dream job.",
    author: "Marcus T.",
    role: "Software Engineer",
  },
];

export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (

    
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Decorative glow orbs */}

      {/* Hero Section - Content on sides, center clear for Spline */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-24">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Left Content */}
            <div
              className={`space-y-8 text-left ${mounted ? "animate-fade-in-left" : "opacity-0"}`}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 text-xs bg-white/5 border border-white/10 rounded-full backdrop-blur-sm shadow-depth-md animate-pulse-glow">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                AI-Powered Learning
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-balance gradient-text">
                Learn Smarter,
                <br />
                Not Harder
              </h1>

              <p className="text-base md:text-lg text-neutral-400 max-w-md leading-relaxed">
                Your personal AI study companion that explains, quizzes, and guides you through any subject.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href="/study"
                  className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-full shadow-depth-xl glow-white text-sm"
                >
                  Start Learning Free
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a
                  href="/sessions"
                  className="btn-secondary inline-flex items-center justify-center gap-2 px-8 py-4 glass rounded-full text-sm font-medium"
                >
                  View Sessions
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 pt-8 border-t border-white/10">
                {stats.slice(0, 2).map((stat, i) => (
                  <div
                    key={stat.label}
                    className={`${mounted ? "animate-fade-in-up" : "opacity-0"}`}
                    style={{ animationDelay: `${600 + i * 100}ms` }}
                  >
                    <div className="text-2xl md:text-3xl font-bold text-glow">{stat.value}</div>
                    <div className="text-xs text-neutral-500 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Center - Empty for Spline sphere */}
            <div className="hidden lg:block h-[500px]" />

            {/* Right Content */}
            <div
              className={`space-y-8 text-right ${mounted ? "animate-fade-in-right" : "opacity-0"}`}
              style={{ animationDelay: "200ms" }}
            >
              {/* Feature Cards Stack */}
              <div className="space-y-4">
                {features.slice(0, 2).map((feature, i) => (
                  <div
                    key={feature.title}
                    className={`
                      glass card-hover p-6 rounded-2xl shadow-depth-lg text-left
                      ${mounted ? "animate-scale-in" : "opacity-0"}
                    `}
                    style={{ animationDelay: `${400 + i * 150}ms` }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10 glow-white">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
                        <p className="text-xs text-neutral-400 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/10">
                {stats.slice(2, 4).map((stat, i) => (
                  <div
                    key={stat.label}
                    className={`text-left ${mounted ? "animate-fade-in-up" : "opacity-0"}`}
                    style={{ animationDelay: `${800 + i * 100}ms` }}
                  >
                    <div className="text-2xl md:text-3xl font-bold text-glow">{stat.value}</div>
                    <div className="text-xs text-neutral-500 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-white/60 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div
            className={`text-center mb-20 ${mounted ? "animate-fade-in-up" : "opacity-0"}`}
          >
            <span className="inline-block px-4 py-2 text-xs bg-white/5 border border-white/10 rounded-full mb-6">
              Powerful Features
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 gradient-text text-balance">
              Everything You Need to Excel
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto text-balance">
              Our AI-powered platform adapts to your learning style and helps you master any subject efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className={`
                  glass card-hover p-8 rounded-3xl shadow-depth-lg
                  ${mounted ? "animate-scale-in" : "opacity-0"}
                `}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 w-fit mb-6 glow-white animate-pulse-glow">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-neutral-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 text-xs bg-white/5 border border-white/10 rounded-full mb-6">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight gradient-text">
              Loved by Learners
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, i) => (
              <div
                key={testimonial.author}
                className={`
                  glass card-hover p-8 rounded-3xl shadow-depth-xl
                  ${mounted ? "animate-fade-in-up" : "opacity-0"}
                `}
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <svg
                  className="w-10 h-10 text-white/20 mb-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-lg md:text-xl text-neutral-200 mb-6 leading-relaxed">
                  {testimonial.quote}
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-semibold">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-sm text-neutral-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div
            className={`
              glass rounded-[2.5rem] p-12 md:p-16 text-center shadow-depth-xxl
              ${mounted ? "animate-scale-in" : "opacity-0"}
            `}
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 gradient-text text-balance">
              Ready to Transform Your Learning?
            </h2>
            <p className="text-neutral-400 max-w-xl mx-auto mb-10 text-balance">
              Join thousands of students who have accelerated their learning journey with AI-powered study assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/study"
                className="btn-primary inline-flex items-center justify-center gap-2 px-10 py-5 bg-white text-black font-semibold rounded-full shadow-depth-xl glow-white-intense text-base"
              >
                Get Started for Free
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
            <p className="text-xs text-neutral-500 mt-6">No credit card required</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full border-2 border-white/60 flex items-center justify-center">
              <div className="w-2 h-2 bg-white/60 rounded-full" />
            </div>
            <span className="text-sm text-neutral-400">StudyAI</span>
          </div>
          <div className="flex items-center gap-8 text-xs text-neutral-500">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          <p className="text-xs text-neutral-600">
            Made with care for learners everywhere
          </p>
        </div>
      </footer>
    </main>
  );
}
