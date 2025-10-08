import React from 'react';
import { Code, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { ProjectConfig, PROJECTS_CONFIG } from '@/app/constants';

interface ProjectCardProps {
    project: ProjectConfig;
  }
  
  const OtherProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    return (
      <div
        className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 transition-all duration-200 will-change-transform hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1 flex flex-col overflow-hidden"
      >
        <div className="w-full aspect-video bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center">
          <Image
             src={`/projects/${project.imagePath}.png`}
            alt={`${project.title} preview`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      
        <div className="p-4 flex flex-col flex-grow"> 
          
          <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2 text-center">
            {project.title}
          </h3>
          
          <p className="text-neutral-700 dark:text-neutral-300 text-base mb-4 flex-grow">
            {project.description}
          </p>
  
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                {PROJECTS_CONFIG.map((project) => (
                    <OtherProjectCard key={project.id} project={project} />
                ))}
            </div>
        </div>
    );
};

export default WebProjectsSection;
