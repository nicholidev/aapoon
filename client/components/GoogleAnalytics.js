/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import { Helmet } from 'react-helmet-async';
import { GOOGLE_ANALYTICS_API } from '../config';

// ----------------------------------------------------------------------

const GA_MEASUREMENT_ID = GOOGLE_ANALYTICS_API;

export default function GoogleAnalytics() {
  return (
    <Helmet>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
      <script>
        {`
          window.dataLayer = window.dataLayer || [];

          function gtag() {
            dataLayer.push(arguments);
          }

          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </script>
    </Helmet>
  );
}
