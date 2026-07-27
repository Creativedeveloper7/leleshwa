/** Only pass Sanity image objects to preview media — legacy string paths crash Studio. */
export function imagePreviewMedia(media: unknown): unknown {
  if (!media || typeof media === 'string') return undefined;
  if (typeof media === 'object' && (media as { _type?: string })._type === 'image') {
    return media;
  }
  return undefined;
}

export function previewWithImage(select: {
  title: string;
  subtitle: string;
  media: string;
}) {
  return {
    select,
    prepare({
      title,
      subtitle,
      media,
    }: {
      title?: string;
      subtitle?: string;
      media?: unknown;
    }) {
      return {
        title,
        subtitle,
        media: imagePreviewMedia(media),
      };
    },
  };
}
