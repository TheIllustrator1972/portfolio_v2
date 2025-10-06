import React from 'react';
import { Code, ArrowRight } from 'lucide-react';

// --- Configuration Interface ---
interface ProjectConfig {
  id: number;
  title: string;
  description: string;
  imagePath: string; // Path to the image in the public directory (e.g., /projects/my_app.png)
  link: string; // External link to the project
}

const PROJECTS_CONFIG: ProjectConfig[] = [
    {
      id: 1,
      title: "Indie App Landing Page Template",
      description: "A customizable, modern landing page template designed for indie app developers. Built with React and Tailwind CSS, it features responsive layouts, smooth animations, and prebuilt sections for showcasing app features and download links.",
      imagePath: "indie_app_landing_page_template",
      link: "https://indie-app-landing-page-template.vercel.app/",
    },
    {
      id: 2,
      title: "XCode → Mockup",
      description: "A macOS utility that automatically captures Xcode simulator screenshots and arranges them into polished device mockups. Ideal for quickly generating marketing visuals or App Store previews.",
      imagePath: "screenshot_placement",
      link: "https://github.com/TheIllustrator1972/ScreenshotPlacement",
    },
    {
      id: 3,
      title: "ASCII Art Generator",
      description: "A fun web app that converts images or text into ASCII art in real time. Built with React, it lets users adjust character density, contrast, and export results directly as text or image files.",
      imagePath: "ascii_art_generator",
      link: "https://ascii-art-generator-theillustrator.netlify.app/",
    },
    {
      id: 4,
      title: "Sorting Visualizer",
      description: "An interactive tool that visually demonstrates how different sorting algorithms work. Users can control array size, animation speed, and watch algorithms like Bubble Sort, Merge Sort, and Quick Sort in action.",
      imagePath: "sorting",
      link: "https://sorting-visualizer-theillustrator.netlify.app/",
    },
  ];


interface ProjectCardProps {
    project: ProjectConfig;
  }
  
  const OtherProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    return (
      <div
        // Added overflow-hidden to ensure the image sits nicely within the rounded corners
        className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 transition-all duration-200 will-change-transform hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1 flex flex-col overflow-hidden"
      >
        {/* 1. Full-width Image Preview */}
        <div className="w-full aspect-video bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center">
          <img
             src={`/projects/${project.imagePath}.png`}
            alt={`${project.title} preview`}
            // Image now covers the full area
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        
        {/* 2. Text Content (Name and Description only) */}
        <div className="p-4 flex flex-col flex-grow"> {/* Changed padding from p-6 to p-4 */}
          
          {/* Name */}
          <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2 text-center"> {/* Changed size from text-2xl to text-xl and mb-3 to mb-2 */}
            {project.title}
          </h3>
          
          {/* Removed Category */}
          
          {/* Description */}
          <p className="text-neutral-700 dark:text-neutral-300 text-base mb-4 flex-grow"> {/* Changed margin from mb-6 to mb-4 */}
            {project.description}
          </p>
  
          {/* 3. Link Button */}
          <a 
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg text-base font-semibold transition-colors flex items-center justify-center gap-2 w-full mt-auto"
            aria-label={`View ${project.title} project`}
          >
            <ArrowRight size={18} />
            View Project
          </a>
        </div>
      </div>
    );
  };

// --- Main Section Component ---

const WebProjectsSection: React.FC = () => {
    if (PROJECTS_CONFIG.length === 0) {
        return <p className="text-center text-neutral-500">No other projects configured.</p>;
    }

    return (
        <div className="space-y-10">
            <div className="mb-8 text-center">
                <h2 className="text-4xl font-extrabold text-neutral-800 dark:text-neutral-100 mb-3 tracking-tight flex items-center justify-center gap-3">
                    <Code size={30} className="text-cyan-500" />
                    My Web Projects
                </h2>
            </div>

            {/* Layout: 1 column on mobile, 2 on medium, max 3 on large screens */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                {PROJECTS_CONFIG.map((project) => (
                    <OtherProjectCard key={project.id} project={project} />
                ))}
            </div>
        </div>
    );
};

export default WebProjectsSection;
