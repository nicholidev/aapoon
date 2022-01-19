/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import helpersClass from './helper';
const helpers = new helpersClass();

export const addTocalender = (event, currentItem, isIE) => {
  let url = helpers.buildUrl(event, currentItem, isIE);

  if (!helpers.isMobile() && (url.startsWith('data') || url.startsWith('BEGIN'))) {
    let filename = 'download.ics';
    let blob = new Blob([url], { type: 'text/calendar;charset=utf-8' });

    if (isIE) {
      window.navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      /****************************************************************
      // many browsers do not properly support downloading data URIs
      // (even with "download" attribute in use) so this solution
      // ensures the event will download cross-browser
      ****************************************************************/
      let link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  } else {
    window.open(url, '_blank');
  }
};
