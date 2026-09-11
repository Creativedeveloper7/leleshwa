import { useEffect, useState } from 'react';
import { STATIC_SITE_CONTENT } from '../lib/content/fallback';
import { clearSiteContentCache, loadSiteContent } from '../lib/content/loadSiteContent';
import type { SiteContent } from '../lib/content/types';

export function useSiteContent(): SiteContent {
  const [content, setContent] = useState<SiteContent>(STATIC_SITE_CONTENT);

  useEffect(() => {
    let active = true;
    // Always refetch on mount so Studio publishes appear after a page reload.
    clearSiteContentCache();
    loadSiteContent().then((next) => {
      if (active) setContent(next);
    });
    return () => {
      active = false;
    };
  }, []);

  return content;
}
