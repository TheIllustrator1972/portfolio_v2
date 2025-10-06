export interface AppStoreApp {
  trackId: number;
  trackName: string;
  artistName: string;
  artworkUrl100: string;
  description: string;
  primaryGenreName: string;
  averageUserRating?: number;
  userRatingCount?: number;
  trackViewUrl: string;
  version?: string;
  fileSizeBytes?: number;
  contentAdvisoryRating?: string;
  price?: number;
  screenshotUrls?: string[];
  ipadScreenshotUrls?: string[];
  wrapperType?: string;
}

export interface ITunesAPIResponse {
  resultCount: number;
  results: AppStoreApp[];
}