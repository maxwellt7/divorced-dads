import { useState } from 'react';
import { Play, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';

function toEmbedUrl(url) {
  if (!url) return null;
  // Handle standard youtube.com/watch?v=ID
  const watchMatch = url.match(/youtube\.com\/watch\?v=([^&]+)/);
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;
  // Handle youtu.be/ID
  const shortMatch = url.match(/youtu\.be\/([^?]+)/);
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;
  // Handle already-embed URLs or other providers — pass through
  return url;
}

export default function VideoPlayer({ videoUrl, onWatched, isWatched }) {
  const [marked, setMarked] = useState(false);
  const embedUrl = toEmbedUrl(videoUrl);
  const watched = isWatched || marked;

  const handleMarkWatched = () => {
    setMarked(true);
    if (onWatched) onWatched();
  };

  return (
    <div className="w-full space-y-3">
      {embedUrl ? (
        <div className="relative w-full rounded-xl overflow-hidden bg-black" style={{ paddingTop: '56.25%' }}>
          <iframe
            className="absolute inset-0 w-full h-full"
            src={embedUrl}
            title="Task video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <div className="w-full rounded-xl bg-gray-100 flex flex-col items-center justify-center py-16 text-gray-400 space-y-3">
          <Play className="w-12 h-12" />
          <span className="text-sm font-medium">Video coming soon</span>
        </div>
      )}

      <div className="flex justify-end">
        {watched ? (
          <div className="flex items-center gap-2 text-green-600 font-medium text-sm py-2">
            <CheckCircle className="w-5 h-5" />
            Watched
          </div>
        ) : (
          <Button
            variant="outline"
            size="sm"
            onClick={handleMarkWatched}
            disabled={marked}
          >
            Mark as Watched
          </Button>
        )}
      </div>
    </div>
  );
}
