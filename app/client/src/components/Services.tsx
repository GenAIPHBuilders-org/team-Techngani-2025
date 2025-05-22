import { Youtube, Calendar, Image } from "lucide-react";

export default function Services() {
  return (
    <>
      {/* Social proof */}
      <div className="mt-24 pt-12">
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold  mb-6 leading-tight relative z-10 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 font-sans ">
          Our services
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature Card 1 */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 hover:border-blue-500/30 transition-all duration-300">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-900/30 border border-blue-500/30 mb-6">
              <Youtube className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              Content Creation
            </h3>
            <p className="text-slate-300 mb-6">
              Generate engaging YouTube scripts, blog posts, and social media
              content automatically with our AI-powered creation tools.
            </p>
            <a
              href="#"
              className="group inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
            >
              Learn more
              <svg
                className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 6L15 12L9 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>

          {/* Feature Card 2 */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 hover:border-purple-500/30 transition-all duration-300">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-purple-900/30 border border-purple-500/30 mb-6">
              <Image className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Visual Assets</h3>
            <p className="text-slate-300 mb-6">
              Create eye-catching thumbnails, social media graphics, and
              promotional materials with our intuitive AI design tools.
            </p>
            <a
              href="#"
              className="group inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
            >
              Learn more
              <svg
                className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 6L15 12L9 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>

          {/* Feature Card 3 */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 hover:border-teal-500/30 transition-all duration-300">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-teal-900/30 border border-teal-500/30 mb-6">
              <Calendar className="h-6 w-6 text-teal-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              Publishing Automation
            </h3>
            <p className="text-slate-300 mb-6">
              Schedule and automate content distribution across multiple
              platforms, ensuring consistent posting and maximizing reach.
            </p>
            <a
              href="#"
              className="group inline-flex items-center text-teal-400 hover:text-teal-300 transition-colors"
            >
              Learn more
              <svg
                className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 6L15 12L9 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
