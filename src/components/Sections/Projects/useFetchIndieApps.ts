import { useEffect, useRef, useState } from "react";
import { AppStoreApp, ITunesAPIResponse } from "./types";

interface AppFetcherResult {
    apps: AppStoreApp[];
    loading: boolean;
    error: string | null;
    fetchApps: () => Promise<void>;
  }

const useFetchIndieApps = (): AppFetcherResult => {
    const [apps, setApps] = useState<AppStoreApp[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const hasFetchedRef = useRef<boolean>(false);
  
    const fetchApps = async (): Promise<void> => {
      try {
        setError(null);
        setApps([]);
        setLoading(true);
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000);
        
        const response = await fetch(
          'https://itunes.apple.com/lookup?id=1790227862&country=us&entity=software&limit=200',
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
        
        if (!data.results || data.results.length === 0) {
          throw new Error('No apps found in the response');
        }
        
        const appResults = data.results.filter(
          (item): item is AppStoreApp => item.wrapperType === 'software'
        );
        
        if (appResults.length === 0) {
          throw new Error('No software apps found');
        }
        
        setApps(appResults);
      } catch (e) {
        console.error('Error fetching apps:', e);
        let errorMessage = 'Failed to load apps. ';
        
        if (e instanceof Error) {
          if (e.name === 'AbortError') {
            errorMessage += 'Request timeout.';
          } else if (e.message.includes('Failed to fetch') || e.message.includes('NetworkError')) {
            errorMessage += 'Network error. Are you running your dev server over HTTPS?';
          } else {
            errorMessage += e.message;
          }
        } else {
          errorMessage += 'Unknown error occurred.';
        }
        
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      if (!hasFetchedRef.current) {
        hasFetchedRef.current = true;
        fetchApps();
      }
    }, []);
  
    return { apps, loading, error, fetchApps };
  };

export default useFetchIndieApps;