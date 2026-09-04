

import { siX, siInstagram, siGithub, siUpwork } from 'simple-icons';
import type { SimpleIcon } from 'simple-icons';

const ICONS: Record<string, SimpleIcon> = {
  x: siX,
  instagram: siInstagram,
  github: siGithub,
  upwork: siUpwork
};

export function SocialIcon({ platform }: { platform: string }) {
  const icon = ICONS[platform];
  if (!icon) return null;

  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      className="w-5 h-5 fill-current"
      aria-hidden="true"
    >
      <path d={icon.path} />
    </svg>
  );
}