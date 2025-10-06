export const formatFileSize = (bytes: number | undefined): string => {
  if (!bytes) return 'N/A';
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
};

export const formatRating = (rating: number | undefined): string => {
  if (!rating) return 'N/A';
  return rating.toFixed(1);
};

export const formatPrice = (price: number | undefined): string => {
  if (price === undefined) return 'N/A';
  return price === 0 ? 'Free' : `$${price.toFixed(2)}`;
};