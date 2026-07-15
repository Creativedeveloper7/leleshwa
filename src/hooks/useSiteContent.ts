import { useEffect, useState } from 'react';
import { STATIC_SITE_CONTENT } from '../lib/content/fallback';
import { loadSiteContent } from '../lib/content/loadSiteContent';
import type { SiteContent } from '../lib/content/types';

export function useSiteContent(): SiteContent {
  const [content, setContent] = useState<SiteContent>(STATIC_SITE_CONTENT);

  useEffect(() => {
    let active = true;
    loadSiteContent().then((next) => {
      if (active) setContent(next);
    });
    return () => {
      active = false;
    };
  }, []);

  return content;
}
