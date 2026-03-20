export function timeAgo(dateString) {
  const now = new Date();
  const postDate = new Date(dateString);

  const seconds = Math.floor((now - postDate) / 1000);

  if (seconds < 60) return `${seconds}s`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;

  const days = Math.floor(hours / 24);
  if (days === 1) return "Yesterday";

  return `${days}d`;
}
