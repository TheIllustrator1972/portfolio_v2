import React, { useState} from 'react';
import { RefreshCw } from 'lucide-react';
import { AppStoreApp, ITunesAPIResponse } from './types';
import AppCard from './AppCard';
import AppModal from './AppModal';
import useFetchIndieApps from './useFetchIndieApps';

interface StateProps {
  message: string;
  isError?: boolean;
  onRetry?: () => void;
}

const LoadingState: React.FC = () => (
  <div className="w-full flex items-center justify-center py-20">
    <div className="text-neutral-600 dark:text-neutral-400 text-lg flex items-center gap-2">
      <RefreshCw size={20} className="animate-spin" />
      Loading apps...
    </div>
  </div>
);

const ErrorState: React.FC<StateProps> = ({ message, onRetry }) => (
  <div className="w-full flex flex-col items-center justify-center py-20">
    <div className="text-red-600 dark:text-red-400 text-lg mb-4 text-center px-4">{message}</div>
    {onRetry && (
      <button
        onClick={onRetry}
        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
      >
        <RefreshCw size={18} />
        Try Again
      </button>
    )}
  </div>
);

const IndieApps: React.FC = () => {
  const { apps, loading, error, fetchApps } = useFetchIndieApps();
  const [selectedApp, setSelectedApp] = useState<AppStoreApp | null>(null);
  const [modalLoading, setModalLoading] = useState<boolean>(false);
  
  const openModal = async (app: AppStoreApp): Promise<void> => {
    // 1. Immediately show modal with basic app info
    setSelectedApp(app);
    setModalLoading(true);

    // 2. Fetch detailed information
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
      
      const response = await fetch(
        `https://itunes.apple.com/lookup?id=${app.trackId}&country=us&entity=software`,
        {
          signal: controller.signal,
          headers: {
            'Accept': 'application/json',
          }
        }
      );
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: ITunesAPIResponse = await response.json();
      
      // Update the selected app with detailed data
      if (data.results && data.results.length > 0) {
        setSelectedApp(data.results[0]);
      }
    } catch (e) {
      console.error('Error fetching app details:', e);
      // Fail silently and keep the basic app info
    } finally {
      setModalLoading(false);
    }
  };

  const closeModal = (): void => {
    setSelectedApp(null);
  };

  const handleCardClick = (app: AppStoreApp) => (e: React.MouseEvent): void => {
    e.preventDefault();
    openModal(app);
  };
  
  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={fetchApps} />;
  }

  if (apps.length === 0) {
    return <ErrorState message="No apps found." />;
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 p-4 sm:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-extrabold text-neutral-800 dark:text-neutral-100 mb-3 tracking-tight">
            Indie App Showcase
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            A curated list of independently crafted iOS applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 w-full">
          {apps.map((app) => (
            <AppCard
              key={app.trackId}
              app={app}
              onClick={handleCardClick(app)}
            />
          ))}
        </div>
      </div>
      
      {selectedApp && (
        <AppModal
          app={selectedApp}
          loading={modalLoading}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default IndieApps;
