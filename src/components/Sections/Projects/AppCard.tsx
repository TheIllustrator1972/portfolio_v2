import { ExternalLink } from "lucide-react";
import { formatRating } from "./helpers";
import { AppStoreApp } from "./types";
import Image from "next/image";

interface CardProps {
    app: AppStoreApp;
    onClick: (e: React.MouseEvent) => void;
  }
  
const AppCard = (props: CardProps) => {
    const { app, onClick } = props;
    const handleAppStoreClick = (e: React.MouseEvent): void => {
      e.stopPropagation();
    };
  
    return (
      <div
        onClick={onClick}
        className="bg-white dark:bg-neutral-800 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-700 cursor-pointer transition-all duration-200 will-change-transform hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick(e as unknown as React.MouseEvent);
          }
        }}
      >
        <div className="flex items-start gap-4 mb-4">
          <Image
            src={app.artworkUrl100}
            alt={`${app.trackName} icon`}
            className="w-16 h-16 rounded-xl flex-shrink-0"
            loading="lazy"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 truncate mb-1">
              {app.trackName}
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm">
              {app.primaryGenreName}
            </p>
          </div>
        </div>
        
        <p className="text-neutral-700 dark:text-neutral-300 text-sm mb-4 line-clamp-3 min-h-[3.75rem]">
          {app.description}
        </p>
  
        <div className="flex items-center justify-between">
          {app?.userRatingCount ? <div className="flex items-center gap-2">
            <span className="text-yellow-500" aria-hidden="true">★</span>
            <span className="text-neutral-900 dark:text-neutral-100 font-medium text-sm">
              {formatRating(app.averageUserRating)}
            </span>
            <span className="text-neutral-500 dark:text-neutral-400 text-xs">
              ({app.userRatingCount || 0})
            </span>
          </div>:<></>}
          
          <a 
            href={app.trackViewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
            onClick={handleAppStoreClick}
            aria-label={`View ${app.trackName} in App Store`}
          >
            <ExternalLink size={14} />
            App Store
          </a>
        </div>
      </div>
    );
  };

  export default AppCard;