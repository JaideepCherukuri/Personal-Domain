import { useEffect } from 'react';

const BASE_TITLE = 'Jaideep Cherukuri';

/**
 * Hook to set the document title dynamically
 * @param title - The page-specific title (will be appended to base title)
 * @param options - Configuration options
 */
export function useDocumentTitle(
  title?: string,
  options: { suffix?: boolean } = { suffix: true }
) {
  useEffect(() => {
    const previousTitle = document.title;

    if (title) {
      document.title = options.suffix
        ? `${title} | ${BASE_TITLE}`
        : title;
    } else {
      document.title = `${BASE_TITLE} | Creative Director & Designer`;
    }

    return () => {
      document.title = previousTitle;
    };
  }, [title, options.suffix]);
}

export default useDocumentTitle;
