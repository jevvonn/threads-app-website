export default function relativeDateTime(timestamp) {
  const now = new Date().getTime();
  const nowSeconds = Math.floor(now / 1000);
  const seconds = Math.floor(timestamp / 1000);
  const difference = nowSeconds - seconds;

  if (difference < 60) {
    // Less than a minute has passed:
    return `${difference} seconds ago`;
  } else if (difference < 3600) {
    // Less than an hour has passed:
    return `${Math.floor(difference / 60)} minutes ago`;
  } else if (difference < 86400) {
    // Less than a day has passed:
    return `${Math.floor(difference / 3600)} hours ago`;
  } else if (difference < 2620800) {
    // Less than a month has passed:
    return `${Math.floor(difference / 86400)} days ago`;
  } else if (difference < 31449600) {
    // Less than a year has passed:
    return `${Math.floor(difference / 2620800)} months ago`;
  } else {
    // More than a year has passed:
    return `${Math.floor(difference / 31449600)} years ago`;
  }
}
