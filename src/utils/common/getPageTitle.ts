import defaultSettings from '@config/config';

const title = defaultSettings.title;

export function getPageTitle(pageTitle: string) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`;
  }
  return `${title}`;
}

export function setPageTitle(pageTitle: string) {
  document.title = getPageTitle(pageTitle);
}
