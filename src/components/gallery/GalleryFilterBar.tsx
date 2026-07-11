import { HorizontalScroll } from '../shared/HorizontalScroll';
import type { GalleryFilterId } from '../../types/galleryPhoto';

interface GalleryFilterBarProps {
  active: GalleryFilterId;
  filters: { id: GalleryFilterId; label: string }[];
  onChange: (id: GalleryFilterId) => void;
}

export function GalleryFilterBar({ active, filters, onChange }: GalleryFilterBarProps) {
  return (
    <HorizontalScroll
      className="gallery-filters"
      ariaLabel="Gallery categories"
      shellClassName="gallery-filters-shell"
      role="tablist"
      showNav
    >
      {filters.map((filter) => {
        const isActive = active === filter.id;
        return (
          <button
            key={filter.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`dining-form-tab concierge-btn-ghost gallery-filter-tab${isActive ? ' dining-form-tab--active' : ''}`}
            onClick={() => onChange(filter.id)}
          >
            {filter.label}
          </button>
        );
      })}
    </HorizontalScroll>
  );
}
