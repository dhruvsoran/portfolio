export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-app py-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <a href="#" className="text-xl font-black gradient-text tracking-tight">DS</a>
          <p className="text-app-muted text-xs mt-1">
            &copy; {new Date().getFullYear()} Dhruv Soran. All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-1">
          <a
            href="https://github.com/dhruvsoran"
            target="_blank"
            rel="noopener noreferrer"
            className="min-w-[44px] min-h-[44px] flex items-center justify-center text-app-muted hover:text-[#00d4ff] transition-colors duration-300 hover:scale-110 rounded-lg"
            aria-label="GitHub"
            style={{ touchAction: 'manipulation' }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.73.083-.73 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12 24 5.37 18.63 0 12 0z" />
            </svg>
          </a>
          <a
            href="https://linkedin.com/in/dhruv-soran-950495211"
            target="_blank"
            rel="noopener noreferrer"
            className="min-w-[44px] min-h-[44px] flex items-center justify-center text-app-muted hover:text-[#00d4ff] transition-colors duration-300 hover:scale-110 rounded-lg"
            aria-label="LinkedIn"
            style={{ touchAction: 'manipulation' }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a
            href="mailto:dhruvsoran@gmail.com"
            className="min-w-[44px] min-h-[44px] flex items-center justify-center text-app-muted hover:text-[#00d4ff] transition-colors duration-300 hover:scale-110 rounded-lg"
            aria-label="Email"
            style={{ touchAction: 'manipulation' }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
          <a
            href="/resume.pdf"
            download="Dhruv_Soran_Resume.pdf"
            className="min-w-[44px] min-h-[44px] flex items-center justify-center text-app-muted hover:text-[#ff6ec7] transition-colors duration-300 hover:scale-110 rounded-lg"
            aria-label="Download Resume"
            style={{ touchAction: 'manipulation' }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>
        </div>

        <p className="text-app-muted text-xs text-center md:text-right">
          Built with React, Three.js & Tailwind CSS
        </p>
      </div>
    </footer>
  )
}
