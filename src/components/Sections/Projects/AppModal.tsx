import { ExternalLink, RefreshCw, X } from "lucide-react";
import { AppStoreApp } from "./types";
import { formatFileSize, formatPrice, formatRating } from "./helpers";

interface ModalProps {
    app: AppStoreApp;
    loading: boolean;
    onClose: () => void;
  }
  
  const AppModal= (props: ModalProps) => {
    const { app, loading, onClose } = props
    const handleModalBackdropClick = (e: React.MouseEvent): void => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };
  
    return (
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 transition-opacity duration-300"
        onClick={handleModalBackdropClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div 
          className="bg-white dark:bg-neutral-800 rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-neutral-200 dark:border-neutral-700 shadow-2xl transition-transform duration-300 scale-100 opacity-100"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="sticky top-0 bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 p-6 flex items-start justify-between z-10 flex-shrink-0">
            <div className="flex items-start gap-4 flex-1 min-w-0">
              <img
                src={app.artworkUrl100}
                alt={`${app.trackName} icon`}
                className="w-20 h-20 rounded-2xl flex-shrink-0 shadow-md"
                loading="lazy"
              />
              <div className="flex-1 min-w-0">
                <h2 
                  id="modal-title"
                  className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2 truncate"
                >
                  {app.trackName}
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-2">
                  {app.artistName}
                </p>
                <div className="flex items-center gap-4 text-sm flex-wrap">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500" aria-hidden="true">★</span>
                    <span className="text-neutral-900 dark:text-neutral-100 font-medium">
                      {formatRating(app.averageUserRating)}
                    </span>
                    <span className="text-neutral-500 dark:text-neutral-400">
                      ({app.userRatingCount || 0})
                    </span>
                  </div>
                  <span className="text-neutral-500 dark:text-neutral-400">
                    {app.primaryGenreName}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 p-2 rounded-lg transition-colors flex-shrink-0 ml-4"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
          </div>
  
          <div className="overflow-y-auto flex-1 p-6 space-y-8">
            {loading ? (
              <div className="text-center py-12 text-neutral-600 dark:text-neutral-400 flex items-center justify-center gap-3">
                <RefreshCw size={20} className="animate-spin" />
                Loading details...
              </div>
            ) : (
              <>
                <div>
                  <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                    About
                  </h3>
                  <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed whitespace-pre-line">
                    {app.description}
                  </p>
                </div>
  
                {/* Screenshots (if available) */}
                {(app.screenshotUrls && app.screenshotUrls.length > 0) && (
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                      Screenshots
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {app.screenshotUrls.slice(0, 3).map((screenshot, index) => (
                        <div
                          key={`screenshot-${index}`}
                          className="rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700 shadow-md aspect-[9/16]" // Added aspect ratio for mobile screenshots
                        >
                          <img
                            src={screenshot}
                            alt={`${app.trackName} screenshot ${index + 1}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
  
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-neutral-50 dark:bg-neutral-700/50 rounded-xl p-4 border border-neutral-200 dark:border-neutral-600">
                    <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-1">Version</p>
                    <p className="text-neutral-900 dark:text-neutral-100 font-semibold">{app.version || 'N/A'}</p>
                  </div>
                  <div className="bg-neutral-50 dark:bg-neutral-700/50 rounded-xl p-4 border border-neutral-200 dark:border-neutral-600">
                    <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-1">Size</p>
                    <p className="text-neutral-900 dark:text-neutral-100 font-semibold">{formatFileSize(app.fileSizeBytes)}</p>
                  </div>
                  <div className="bg-neutral-50 dark:bg-neutral-700/50 rounded-xl p-4 border border-neutral-200 dark:border-neutral-600">
                    <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-1">Age Rating</p>
                    <p className="text-neutral-900 dark:text-neutral-100 font-semibold">{app.contentAdvisoryRating || 'N/A'}</p>
                  </div>
                  <div className="bg-neutral-50 dark:bg-neutral-700/50 rounded-xl p-4 border border-neutral-200 dark:border-neutral-600">
                    <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-1">Price</p>
                    <p className="text-neutral-900 dark:text-neutral-100 font-semibold">{formatPrice(app.price)}</p>
                  </div>
                </div>
  
                <div className="flex justify-center pt-4">
                  <a
                    href={app.trackViewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors flex items-center gap-2 shadow-lg w-full md:w-auto justify-center"
                    aria-label={`View ${app.trackName} in App Store`}
                  >
                    <ExternalLink size={20} />
                    View in App Store
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  export default AppModal;