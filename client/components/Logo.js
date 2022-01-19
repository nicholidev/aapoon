/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx }, ref) => {
  const theme = useTheme();
  const PRIMARY_LIGHT = theme.palette.primary.light;
  const PRIMARY_MAIN = theme.palette.primary.main;
  const PRIMARY_DARK = theme.palette.primary.dark;
  const router = useRouter();
  const logo = (
    <>
      <Box
        onClick={() => router.push('/')}
        ref={ref}
        style={{ cursor: 'pointer' }}
        sx={{ height: 40, ...sx, display: { xs: 'block', sm: 'none' } }}
      >
        <svg width="35" height="34" viewBox="0 0 35 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M33.1911 10.2322C32.2694 8.20071 31.0262 6.43457 29.4633 4.93376C27.9025 3.433 26.0788 2.24398 23.997 1.36669C21.9139 0.489451 19.6888 0.0507812 17.3232 0.0507812C14.9323 0.0507812 12.6904 0.495591 10.5954 1.38378C8.50249 2.27263 6.66757 3.48483 5.09352 5.02043C3.51945 6.55598 2.27754 8.35077 1.36568 10.4055C0.454529 12.4602 0 14.654 0 16.985C0 19.3174 0.454529 21.5044 1.36568 23.5475C2.27754 25.5912 3.51945 27.3745 5.09352 28.8984C6.66757 30.4224 8.50249 31.6292 10.5954 32.5174C12.6904 33.4062 14.9323 33.8503 17.3232 33.8503C18.8853 33.8503 20.3762 33.66 21.7964 33.2793C23.216 32.898 24.0005 32.5583 25.8438 30.125C26.2445 30.7949 26.7836 32.87 27.4584 33.2616C28.1333 33.6545 28.9185 33.8503 29.8199 33.8503C30.4814 33.8503 31.108 33.7296 31.7003 33.4874C32.2918 33.2452 32.8065 32.9096 33.2449 32.4826C33.682 32.0562 34.0261 31.5596 34.2743 30.994C34.5225 30.4285 34.647 29.8105 34.647 29.1406V16.7087C34.5988 14.4228 34.1142 12.2644 33.1911 10.2322Z"
            fill="#DE522D"
          />
          <path
            d="M28.2295 11.544C28.2302 11.3604 28.1484 11.1592 28.298 10.99C28.126 10.7356 28.0274 10.9525 27.9218 11.0521C27.3841 11.5596 26.8512 12.0712 26.317 12.5808C26.2848 12.6136 26.2526 12.6456 26.2211 12.6784C26.1988 12.7016 26.1764 12.7248 26.154 12.748C26.1204 12.778 26.0862 12.808 26.052 12.838L26.0603 12.8298C26.0289 12.8599 25.9981 12.8906 25.9666 12.9205L25.9757 12.9172C25.8324 13.059 25.6883 13.2009 25.545 13.3428C25.5212 13.366 25.4974 13.3899 25.4736 13.4131C24.8827 13.9636 24.2919 14.5134 23.6842 15.0803C23.601 15.038 23.6744 14.9146 23.673 14.8204C23.6667 14.0911 23.6646 13.3619 23.6723 12.6327C23.6758 12.3155 23.666 12.0024 23.566 11.6974C23.059 10.6442 22.2122 10.2321 21.022 10.2424C17.2103 10.2751 13.3979 10.2519 9.58611 10.2506C9.55884 10.2567 9.53157 10.2621 9.5043 10.2662C9.25046 10.3788 8.99589 10.4913 8.74137 10.6039C8.57003 10.7922 8.39875 10.9798 8.22672 11.1674C8.10851 11.4171 7.98967 11.666 7.87146 11.915C7.8498 12.147 7.81062 12.3796 7.81062 12.6115C7.80994 15.4241 7.81413 18.2367 7.81901 21.0486C7.81901 21.1844 7.78828 21.3256 7.8617 21.4545C7.87219 20.1181 7.88404 18.7825 7.89244 17.4468C7.88404 18.7825 7.87219 20.1181 7.8617 21.4545C7.86868 21.5855 7.87497 21.7164 7.88126 21.8474L8.22672 22.5937C8.50573 22.8113 8.71552 23.1135 9.06512 23.2452C9.1826 23.2895 9.17075 23.3925 9.16865 23.4881C9.45605 23.2814 9.73994 23.5017 10.0259 23.501C13.8384 23.4908 17.6508 23.5003 21.4633 23.4922C22.4695 23.4901 23.329 22.795 23.587 21.8427C23.6723 21.5296 23.666 21.2158 23.666 20.8999C23.6681 20.1386 23.6667 19.3773 23.6667 18.6187C25.1596 20.0534 26.6232 21.46 28.0868 22.8666C28.1302 22.8536 28.1729 22.8414 28.2162 22.8291C28.2008 22.722 28.1854 22.6156 28.17 22.5084C28.177 22.4402 28.1882 22.372 28.1889 22.3031C28.2015 18.717 28.212 15.1301 28.2295 11.544Z"
            fill="white"
          />
        </svg>
      </Box>

      <Box
        onClick={() => router.push('/')}
        ref={ref}
        style={{ cursor: 'pointer' }}
        sx={{ height: 40, ...sx, display: { xs: 'none', sm: 'block' } }}
      >
        <svg width="193" height="44" viewBox="0 0 193 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_1972_619)">
            <path
              d="M33.1911 20.2322C32.2694 18.2007 31.0262 16.4346 29.4633 14.9338C27.9025 13.433 26.0788 12.244 23.997 11.3667C21.9139 10.4895 19.6888 10.0508 17.3232 10.0508C14.9323 10.0508 12.6904 10.4956 10.5954 11.3838C8.50249 12.2726 6.66757 13.4848 5.09352 15.0204C3.51945 16.556 2.27754 18.3508 1.36568 20.4055C0.454529 22.4602 0 24.654 0 26.985C0 29.3174 0.454529 31.5044 1.36568 33.5475C2.27754 35.5912 3.51945 37.3745 5.09352 38.8984C6.66757 40.4224 8.50249 41.6292 10.5954 42.5174C12.6904 43.4062 14.9323 43.8503 17.3232 43.8503C18.8853 43.8503 20.3762 43.66 21.7964 43.2793C23.216 42.898 24.0005 42.5583 25.8438 40.125C26.2445 40.7949 26.7836 42.87 27.4584 43.2616C28.1333 43.6545 28.9185 43.8503 29.8199 43.8503C30.4814 43.8503 31.108 43.7296 31.7003 43.4874C32.2918 43.2452 32.8065 42.9096 33.2449 42.4826C33.682 42.0562 34.0261 41.5596 34.2743 40.994C34.5225 40.4285 34.647 39.8105 34.647 39.1406V26.7087C34.5988 24.4228 34.1142 22.2644 33.1911 20.2322Z"
              fill="#DE522D"
            />
            <path
              d="M51.8522 23.0221C51.686 22.7059 51.5655 22.3127 51.4907 21.8425C50.6181 22.7911 49.4837 23.2654 48.0875 23.2654C46.7661 23.2654 45.6691 22.8924 44.7965 22.1465C43.9321 21.4006 43.5 20.4602 43.5 19.3251C43.5 17.9307 44.0277 16.8605 45.0832 16.1146C46.1469 15.3687 47.6803 14.9917 49.6831 14.9836H51.3411V14.2296C51.3411 13.6215 51.1791 13.1351 50.855 12.7703C50.5391 12.4054 50.0364 12.223 49.3466 12.223C48.7399 12.223 48.262 12.3649 47.913 12.6487C47.5722 12.9324 47.4018 13.3216 47.4018 13.8161H43.7991C43.7991 13.054 44.0402 12.3487 44.5222 11.7001C45.0042 11.0515 45.6857 10.5448 46.5667 10.18C47.4476 9.80699 48.4365 9.62055 49.5336 9.62055C51.1957 9.62055 52.513 10.03 53.4854 10.8488C54.4661 11.6595 54.9565 12.8027 54.9565 14.2783V19.9818C54.9644 21.2304 55.1432 22.1749 55.4925 22.8154V23.0221H51.8522ZM48.8728 20.5777C49.4048 20.5777 49.8951 20.4642 50.3438 20.2372C50.7926 20.0021 51.1251 19.6899 51.3411 19.3008V17.0388H49.9948C48.1914 17.0388 47.2315 17.6469 47.1151 18.863L47.1026 19.0698C47.1026 19.5076 47.2606 19.8684 47.5764 20.1521C47.8922 20.4358 48.3244 20.5777 48.8728 20.5777ZM65.54 23.0221C65.3738 22.7059 65.2531 22.3127 65.1787 21.8425C64.306 22.7911 63.1716 23.2654 61.7755 23.2654C60.4538 23.2654 59.3567 22.8924 58.484 22.1465C57.6197 21.4006 57.1875 20.4602 57.1875 19.3251C57.1875 17.9307 57.7157 16.8605 58.7709 16.1146C59.8345 15.3687 61.368 14.9917 63.3709 14.9836H65.0287V14.2296C65.0287 13.6215 64.8666 13.1351 64.5425 12.7703C64.2268 12.4054 63.7244 12.223 63.0342 12.223C62.4279 12.223 61.9496 12.3649 61.6008 12.6487C61.2599 12.9324 61.0895 13.3216 61.0895 13.8161H57.487C57.487 13.054 57.7277 12.3487 58.2102 11.7001C58.6922 11.0515 59.3735 10.5448 60.2545 10.18C61.1351 9.80699 62.1242 9.62055 63.2214 9.62055C64.8834 9.62055 66.2008 10.03 67.1732 10.8488C68.1539 11.6595 68.6443 12.8027 68.6443 14.2783V19.9818C68.6521 21.2304 68.831 22.1749 69.1803 22.8154V23.0221H65.54ZM62.5606 20.5777C63.0924 20.5777 63.5828 20.4642 64.0317 20.2372C64.4806 20.0021 64.8126 19.6899 65.0287 19.3008V17.0388H63.6824C61.8793 17.0388 60.919 17.6469 60.8031 18.863L60.7905 19.0698C60.7905 19.5076 60.9484 19.8684 61.2641 20.1521C61.5799 20.4358 62.012 20.5777 62.5606 20.5777ZM83.5535 16.5646C83.5535 18.5914 83.0799 20.2169 82.1323 21.4411C81.1935 22.6573 79.9217 23.2654 78.3179 23.2654C76.9548 23.2654 75.8535 22.8032 75.0143 21.8789V28.0812H71.4113V9.86378H74.7526L74.8769 11.1528C75.7496 10.1313 76.8882 9.62055 78.2927 9.62055C79.9547 9.62055 81.2475 10.2205 82.17 11.4204C83.092 12.6203 83.5535 14.2742 83.5535 16.3821V16.5646ZM79.951 16.3092C79.951 15.0849 79.7266 14.1404 79.2776 13.4756C78.8371 12.8108 78.1931 12.4784 77.3455 12.4784C76.2153 12.4784 75.4381 12.9 75.0143 13.7431V19.1305C75.4549 19.998 76.24 20.4318 77.3702 20.4318C79.0904 20.4318 79.951 19.0576 79.951 16.3092ZM85.2365 16.3213C85.2365 15.016 85.494 13.8526 86.0096 12.8311C86.5246 11.8095 87.2641 11.0191 88.2285 10.4597C89.2009 9.90025 90.3269 9.62055 91.6066 9.62055C93.4264 9.62055 94.9101 10.1637 96.0571 11.2501C97.212 12.3365 97.8565 13.8121 97.9892 15.6768L98.0144 16.5767C98.0144 18.5955 97.4364 20.2169 96.2816 21.4411C95.1262 22.6573 93.5764 23.2654 91.6317 23.2654C89.687 23.2654 88.1326 22.6573 86.9693 21.4411C85.8139 20.2251 85.2365 18.5711 85.2365 16.4794V16.3213ZM88.839 16.5767C88.839 17.8253 89.0803 18.7819 89.5622 19.4467C90.0442 20.1034 90.7339 20.4318 91.6317 20.4318C92.5039 20.4318 93.1857 20.1075 93.6761 19.4589C94.1664 18.8022 94.4114 17.7564 94.4114 16.3213C94.4114 15.0971 94.1664 14.1485 93.6761 13.4756C93.1857 12.8027 92.496 12.4662 91.6066 12.4662C90.7255 12.4662 90.0442 12.8027 89.5622 13.4756C89.0803 14.1404 88.839 15.1741 88.839 16.5767ZM99.6722 16.3213C99.6722 15.016 99.9297 13.8526 100.445 12.8311C100.96 11.8095 101.7 11.0191 102.664 10.4597C103.637 9.90025 104.763 9.62055 106.042 9.62055C107.863 9.62055 109.346 10.1637 110.493 11.2501C111.648 12.3365 112.292 13.8121 112.425 15.6768L112.45 16.5767C112.45 18.5955 111.872 20.2169 110.717 21.4411C109.562 22.6573 108.012 23.2654 106.067 23.2654C104.123 23.2654 102.568 22.6573 101.405 21.4411C100.25 20.2251 99.6722 18.5711 99.6722 16.4794V16.3213ZM103.275 16.5767C103.275 17.8253 103.516 18.7819 103.998 19.4467C104.48 20.1034 105.17 20.4318 106.067 20.4318C106.94 20.4318 107.621 20.1075 108.112 19.4589C108.602 18.8022 108.847 17.7564 108.847 16.3213C108.847 15.0971 108.602 14.1485 108.112 13.4756C107.621 12.8027 106.932 12.4662 106.042 12.4662C105.161 12.4662 104.48 12.8027 103.998 13.4756C103.516 14.1404 103.275 15.1741 103.275 16.5767ZM117.985 9.86378L118.097 11.3839C119.061 10.2083 120.354 9.62055 121.974 9.62055C123.403 9.62055 124.467 10.03 125.165 10.8488C125.864 11.6677 126.221 12.8919 126.237 14.5215V23.0221H122.634V14.6066C122.634 13.8607 122.469 13.3216 122.136 12.9892C121.804 12.6487 121.251 12.4784 120.478 12.4784C119.464 12.4784 118.704 12.9 118.197 13.7431V23.0221H114.594V9.86378H117.985ZM138.716 9.86378L138.828 11.3353C139.784 10.1921 141.076 9.62055 142.705 9.62055C144.442 9.62055 145.635 10.2894 146.283 11.6271C147.23 10.2894 148.581 9.62055 150.334 9.62055C151.797 9.62055 152.886 10.038 153.6 10.8731C154.315 11.7001 154.672 12.9486 154.672 14.6187V23.0221H151.057V14.6309C151.057 13.885 150.908 13.3418 150.608 13.0013C150.31 12.6527 149.782 12.4784 149.026 12.4784C147.945 12.4784 147.197 12.9811 146.781 13.9864L146.794 23.0221H143.191V14.6431C143.191 13.881 143.037 13.3297 142.73 12.9892C142.423 12.6487 141.899 12.4784 141.159 12.4784C140.137 12.4784 139.398 12.8919 138.94 13.7188V23.0221H135.338V9.86378H138.716ZM163.661 23.2654C161.683 23.2654 160.07 22.6735 158.824 21.4898C157.585 20.3062 156.966 18.7292 156.966 16.7591V16.4186C156.966 15.0971 157.228 13.9175 157.752 12.8797C158.275 11.8339 159.015 11.0312 159.971 10.4718C160.934 9.9043 162.032 9.62055 163.261 9.62055C165.107 9.62055 166.557 10.188 167.612 11.3231C168.676 12.4581 169.208 14.0675 169.208 16.1511V17.5861H160.619C160.735 18.4455 161.084 19.1346 161.666 19.6535C162.256 20.1724 163 20.4318 163.898 20.4318C165.285 20.4318 166.37 19.9413 167.151 18.9603L168.921 20.8939C168.381 21.6398 167.65 22.2235 166.727 22.6451C165.805 23.0586 164.782 23.2654 163.661 23.2654ZM163.249 12.4662C162.535 12.4662 161.953 12.7014 161.504 13.1716C161.063 13.6418 160.781 14.3147 160.657 15.1903H165.668V14.9106C165.651 14.1323 165.435 13.5324 165.019 13.1108C164.604 12.6811 164.014 12.4662 163.249 12.4662ZM177.473 23.2654C175.495 23.2654 173.883 22.6735 172.636 21.4898C171.398 20.3062 170.779 18.7292 170.779 16.7591V16.4186C170.779 15.0971 171.041 13.9175 171.564 12.8797C172.088 11.8339 172.828 11.0312 173.783 10.4718C174.747 9.9043 175.844 9.62055 177.074 9.62055C178.919 9.62055 180.369 10.188 181.425 11.3231C182.489 12.4581 183.02 14.0675 183.02 16.1511V17.5861H174.431C174.548 18.4455 174.897 19.1346 175.478 19.6535C176.069 20.1724 176.812 20.4318 177.71 20.4318C179.098 20.4318 180.183 19.9413 180.963 18.9603L182.734 20.8939C182.193 21.6398 181.462 22.2235 180.54 22.6451C179.617 23.0586 178.595 23.2654 177.473 23.2654ZM177.062 12.4662C176.347 12.4662 175.765 12.7014 175.316 13.1716C174.876 13.6418 174.593 14.3147 174.469 15.1903H179.48V14.9106C179.464 14.1323 179.247 13.5324 178.832 13.1108C178.416 12.6811 177.826 12.4662 177.062 12.4662ZM189.39 6.62891V9.86378H191.697V12.4419H189.39V19.0089C189.39 19.4954 189.486 19.844 189.677 20.0548C189.868 20.2656 190.234 20.371 190.774 20.371C191.173 20.371 191.527 20.3426 191.834 20.2858V22.9492C191.127 23.16 190.401 23.2654 189.652 23.2654C187.126 23.2654 185.838 22.0209 185.788 19.5319V12.4419H183.818V9.86378H185.788V6.62891H189.39Z"
              fill="#363886"
            />
            <path
              d="M28.2295 21.544C28.2302 21.3604 28.1484 21.1592 28.298 20.99C28.126 20.7356 28.0274 20.9525 27.9218 21.0521C27.3841 21.5596 26.8512 22.0712 26.317 22.5808C26.2848 22.6136 26.2526 22.6456 26.2211 22.6784C26.1988 22.7016 26.1764 22.7248 26.154 22.748C26.1204 22.778 26.0862 22.808 26.052 22.838L26.0603 22.8298C26.0289 22.8599 25.9981 22.8906 25.9666 22.9205L25.9757 22.9172C25.8324 23.059 25.6883 23.2009 25.545 23.3428C25.5212 23.366 25.4974 23.3899 25.4736 23.4131C24.8827 23.9636 24.2919 24.5134 23.6842 25.0803C23.601 25.038 23.6744 24.9146 23.673 24.8204C23.6667 24.0911 23.6646 23.3619 23.6723 22.6327C23.6758 22.3155 23.666 22.0024 23.566 21.6974C23.059 20.6442 22.2122 20.2321 21.022 20.2424C17.2103 20.2751 13.3979 20.2519 9.58611 20.2506C9.55884 20.2567 9.53157 20.2621 9.5043 20.2662C9.25046 20.3788 8.99589 20.4913 8.74137 20.6039C8.57003 20.7922 8.39875 20.9798 8.22672 21.1674C8.10851 21.4171 7.98967 21.666 7.87146 21.915C7.8498 22.147 7.81062 22.3796 7.81062 22.6115C7.80994 25.4241 7.81413 28.2367 7.81901 31.0486C7.81901 31.1844 7.78828 31.3256 7.8617 31.4545C7.87219 30.1181 7.88404 28.7825 7.89244 27.4468C7.88404 28.7825 7.87219 30.1181 7.8617 31.4545C7.86868 31.5855 7.87497 31.7164 7.88126 31.8474L8.22672 32.5937C8.50573 32.8113 8.71552 33.1135 9.06512 33.2452C9.1826 33.2895 9.17075 33.3925 9.16865 33.4881C9.45605 33.2814 9.73994 33.5017 10.0259 33.501C13.8384 33.4908 17.6508 33.5003 21.4633 33.4922C22.4695 33.4901 23.329 32.795 23.587 31.8427C23.6723 31.5296 23.666 31.2158 23.666 30.8999C23.6681 30.1386 23.6667 29.3773 23.6667 28.6187C25.1596 30.0534 26.6232 31.46 28.0868 32.8666C28.1302 32.8536 28.1729 32.8414 28.2162 32.8291C28.2008 32.722 28.1854 32.6156 28.17 32.5084C28.177 32.4402 28.1882 32.372 28.1889 32.3031C28.2015 28.717 28.212 25.1301 28.2295 21.544Z"
              fill="white"
            />
            <path
              d="M115.125 33.9439L115.146 34.435C115.478 34.053 115.927 33.8621 116.492 33.8621C117.127 33.8621 117.559 34.0994 117.789 34.5741C117.94 34.3614 118.135 34.1894 118.376 34.0585C118.619 33.9275 118.906 33.8621 119.236 33.8621C120.231 33.8621 120.738 34.3763 120.754 35.4049V38.372H119.978V35.4499C119.978 35.1335 119.904 34.8974 119.756 34.742C119.608 34.5837 119.359 34.5046 119.01 34.5046C118.721 34.5046 118.482 34.5891 118.292 34.7583C118.102 34.9247 117.992 35.1498 117.961 35.4336V38.372H117.18V35.4704C117.18 34.8265 116.857 34.5046 116.211 34.5046C115.702 34.5046 115.354 34.716 115.167 35.1389V38.372H114.391V33.9439H115.125ZM124.731 38.372C124.687 38.2847 124.651 38.1291 124.622 37.9054C124.261 38.271 123.831 38.4538 123.331 38.4538C122.883 38.4538 122.515 38.331 122.227 38.0855C121.942 37.8372 121.799 37.5235 121.799 37.1442C121.799 36.6831 121.978 36.3257 122.336 36.072C122.697 35.8155 123.203 35.6873 123.854 35.6873H124.61V35.3394C124.61 35.0748 124.529 34.8647 124.366 34.7092C124.204 34.551 123.965 34.4718 123.649 34.4718C123.372 34.4718 123.14 34.54 122.953 34.6765C122.765 34.8129 122.672 34.9779 122.672 35.1716H121.891C121.891 34.9506 121.971 34.7379 122.131 34.5332C122.293 34.3258 122.511 34.1622 122.785 34.0421C123.062 33.9221 123.365 33.8621 123.695 33.8621C124.218 33.8621 124.628 33.9903 124.924 34.2467C125.221 34.5005 125.375 34.8511 125.386 35.2985V37.3366C125.386 37.7431 125.439 38.0664 125.545 38.3065V38.372H124.731ZM123.444 37.7949C123.687 37.7949 123.917 37.7335 124.136 37.6108C124.354 37.488 124.512 37.3284 124.61 37.1319V36.2234H124.001C123.05 36.2234 122.575 36.4949 122.575 37.0378C122.575 37.2752 122.656 37.4607 122.819 37.5944C122.981 37.7281 123.189 37.7949 123.444 37.7949ZM127.869 36.3216L127.383 36.8168V38.372H126.607V32.0859H127.383V35.8878L127.798 35.4008L129.212 33.9439H130.156L128.389 35.7937L130.361 38.372H129.451L127.869 36.3216ZM132.757 38.4538C132.141 38.4538 131.641 38.2573 131.255 37.8645C130.869 37.4689 130.676 36.9409 130.676 36.2807V36.1416C130.676 35.7023 130.761 35.3108 130.932 34.967C131.105 34.6205 131.346 34.3504 131.653 34.1567C131.964 33.9603 132.299 33.8621 132.66 33.8621C133.25 33.8621 133.709 34.0517 134.036 34.4309C134.364 34.8102 134.527 35.3531 134.527 36.0597V36.3748H131.452C131.463 36.8113 131.593 37.1647 131.842 37.4348C132.094 37.7021 132.413 37.8358 132.799 37.8358C133.073 37.8358 133.305 37.7813 133.495 37.6721C133.685 37.563 133.852 37.4184 133.994 37.2383L134.468 37.5985C134.088 38.1687 133.518 38.4538 132.757 38.4538ZM132.66 34.4841C132.347 34.4841 132.084 34.596 131.871 34.8197C131.659 35.0407 131.527 35.3517 131.477 35.7528H133.751V35.6955C133.728 35.3108 133.622 35.0134 133.432 34.8033C133.242 34.5905 132.985 34.4841 132.66 34.4841ZM138.29 33.9439L138.311 34.435C138.644 34.053 139.093 33.8621 139.657 33.8621C140.292 33.8621 140.725 34.0994 140.954 34.5741C141.105 34.3614 141.301 34.1894 141.541 34.0585C141.785 33.9275 142.071 33.8621 142.401 33.8621C143.397 33.8621 143.903 34.3763 143.92 35.4049V38.372H143.143V35.4499C143.143 35.1335 143.069 34.8974 142.922 34.742C142.773 34.5837 142.524 34.5046 142.175 34.5046C141.886 34.5046 141.648 34.5891 141.457 34.7583C141.267 34.9247 141.157 35.1498 141.126 35.4336V38.372H140.345V35.4704C140.345 34.8265 140.022 34.5046 139.376 34.5046C138.868 34.5046 138.519 34.716 138.332 35.1389V38.372H137.556V33.9439H138.29ZM146.978 38.4538C146.363 38.4538 145.862 38.2573 145.476 37.8645C145.09 37.4689 144.897 36.9409 144.897 36.2807V36.1416C144.897 35.7023 144.983 35.3108 145.153 34.967C145.327 34.6205 145.567 34.3504 145.875 34.1567C146.185 33.9603 146.521 33.8621 146.882 33.8621C147.472 33.8621 147.93 34.0517 148.257 34.4309C148.585 34.8102 148.748 35.3531 148.748 36.0597V36.3748H145.673C145.684 36.8113 145.814 37.1647 146.064 37.4348C146.315 37.7021 146.634 37.8358 147.02 37.8358C147.294 37.8358 147.526 37.7813 147.716 37.6721C147.907 37.563 148.073 37.4184 148.215 37.2383L148.69 37.5985C148.309 38.1687 147.739 38.4538 146.978 38.4538ZM146.882 34.4841C146.568 34.4841 146.305 34.596 146.093 34.8197C145.88 35.0407 145.749 35.3517 145.699 35.7528H147.972V35.6955C147.95 35.3108 147.844 35.0134 147.653 34.8033C147.463 34.5905 147.206 34.4841 146.882 34.4841ZM151.534 38.4538C150.919 38.4538 150.418 38.2573 150.032 37.8645C149.646 37.4689 149.453 36.9409 149.453 36.2807V36.1416C149.453 35.7023 149.539 35.3108 149.709 34.967C149.882 34.6205 150.123 34.3504 150.431 34.1567C150.741 33.9603 151.076 33.8621 151.437 33.8621C152.028 33.8621 152.486 34.0517 152.813 34.4309C153.141 34.8102 153.304 35.3531 153.304 36.0597V36.3748H150.229C150.24 36.8113 150.37 37.1647 150.62 37.4348C150.871 37.7021 151.19 37.8358 151.576 37.8358C151.85 37.8358 152.082 37.7813 152.272 37.6721C152.463 37.563 152.629 37.4184 152.771 37.2383L153.246 37.5985C152.865 38.1687 152.295 38.4538 151.534 38.4538ZM151.437 34.4841C151.124 34.4841 150.861 34.596 150.649 34.8197C150.436 35.0407 150.305 35.3517 150.255 35.7528H152.528V35.6955C152.506 35.3108 152.4 35.0134 152.209 34.8033C152.019 34.5905 151.762 34.4841 151.437 34.4841ZM155.259 32.8716V33.9439H156.106V34.5291H155.259V37.2752C155.259 37.4525 155.297 37.5862 155.372 37.6762C155.448 37.7635 155.577 37.8072 155.758 37.8072C155.848 37.8072 155.971 37.7908 156.127 37.7581V38.372C155.923 38.4265 155.725 38.4538 155.532 38.4538C155.185 38.4538 154.923 38.3515 154.748 38.1469C154.571 37.9422 154.483 37.6517 154.483 37.2752V34.5291H153.657V33.9439H154.483V32.8716H155.259ZM157.86 38.372H157.084V33.9439H157.86V38.372ZM157.021 32.7694C157.021 32.6466 157.059 32.5429 157.134 32.4584C157.213 32.3737 157.327 32.3315 157.478 32.3315C157.629 32.3315 157.744 32.3737 157.822 32.4584C157.901 32.5429 157.94 32.6466 157.94 32.7694C157.94 32.8921 157.901 32.9944 157.822 33.0763C157.744 33.1582 157.629 33.1991 157.478 33.1991C157.327 33.1991 157.213 33.1582 157.134 33.0763C157.059 32.9944 157.021 32.8921 157.021 32.7694ZM159.84 33.9439L159.865 34.5005C160.212 34.0748 160.665 33.8621 161.225 33.8621C162.184 33.8621 162.667 34.39 162.676 35.4458V38.372H161.9V35.4418C161.897 35.1226 161.821 34.8865 161.674 34.7338C161.528 34.5809 161.3 34.5046 160.99 34.5046C160.738 34.5046 160.517 34.57 160.327 34.701C160.136 34.8319 159.988 35.0039 159.882 35.2166V38.372H159.106V33.9439H159.84ZM163.662 36.1211C163.662 35.4308 163.825 34.8824 164.153 34.4759C164.48 34.0667 164.914 33.8621 165.453 33.8621C166.007 33.8621 166.439 34.053 166.749 34.435L166.787 33.9439H167.496V38.2655C167.496 38.8385 167.321 39.29 166.972 39.6202C166.625 39.9503 166.158 40.1153 165.571 40.1153C165.244 40.1153 164.923 40.0471 164.61 39.9107C164.297 39.7743 164.058 39.5874 163.893 39.35L164.295 38.8958C164.628 39.2969 165.035 39.4974 165.516 39.4974C165.894 39.4974 166.188 39.3937 166.397 39.1864C166.61 38.979 166.716 38.6871 166.716 38.3106V37.93C166.406 38.2792 165.982 38.4538 165.445 38.4538C164.914 38.4538 164.483 38.2451 164.153 37.8276C163.825 37.4102 163.662 36.8414 163.662 36.1211ZM164.442 36.207C164.442 36.7063 164.547 37.0992 164.757 37.3857C164.967 37.6694 165.26 37.8113 165.638 37.8113C166.127 37.8113 166.486 37.5944 166.716 37.1606V35.1389C166.478 34.716 166.121 34.5046 165.646 34.5046C165.269 34.5046 164.973 34.6478 164.761 34.9343C164.549 35.2207 164.442 35.645 164.442 36.207ZM171.314 37.1974C171.314 36.9928 171.234 36.8346 171.074 36.7227C170.918 36.6081 170.642 36.5099 170.248 36.428C169.857 36.3462 169.545 36.248 169.313 36.1334C169.084 36.0188 168.913 35.8824 168.801 35.7241C168.692 35.5659 168.637 35.3777 168.637 35.1593C168.637 34.7965 168.794 34.4896 169.107 34.2386C169.423 33.9876 169.826 33.8621 170.316 33.8621C170.83 33.8621 171.246 33.9916 171.565 34.2508C171.887 34.51 172.048 34.8415 172.048 35.2453H171.267C171.267 35.0379 171.177 34.8593 170.995 34.7092C170.816 34.5591 170.589 34.4841 170.316 34.4841C170.033 34.4841 169.812 34.5441 169.653 34.6642C169.493 34.7842 169.413 34.9411 169.413 35.1348C169.413 35.3176 169.487 35.4554 169.636 35.5481C169.784 35.6409 170.051 35.7296 170.437 35.8142C170.826 35.8987 171.141 35.9997 171.381 36.117C171.621 36.2343 171.799 36.3762 171.914 36.5426C172.031 36.7063 172.09 36.9069 172.09 37.1442C172.09 37.5398 171.928 37.8577 171.603 38.0978C171.279 38.3351 170.858 38.4538 170.341 38.4538C169.977 38.4538 169.655 38.391 169.376 38.2655C169.096 38.14 168.876 37.9654 168.717 37.7417C168.56 37.5153 168.482 37.2711 168.482 37.0092H169.258C169.272 37.2629 169.376 37.4648 169.569 37.6148C169.764 37.7622 170.022 37.8358 170.341 37.8358C170.634 37.8358 170.869 37.7786 171.045 37.664C171.224 37.5466 171.314 37.3911 171.314 37.1974ZM177.116 38.4538C176.5 38.4538 176 38.2573 175.614 37.8645C175.228 37.4689 175.035 36.9409 175.035 36.2807V36.1416C175.035 35.7023 175.12 35.3108 175.291 34.967C175.464 34.6205 175.704 34.3504 176.012 34.1567C176.323 33.9603 176.658 33.8621 177.019 33.8621C177.609 33.8621 178.068 34.0517 178.395 34.4309C178.722 34.8102 178.886 35.3531 178.886 36.0597V36.3748H175.811C175.822 36.8113 175.952 37.1647 176.201 37.4348C176.453 37.7021 176.772 37.8358 177.158 37.8358C177.431 37.8358 177.664 37.7813 177.854 37.6721C178.044 37.563 178.211 37.4184 178.353 37.2383L178.827 37.5985C178.447 38.1687 177.876 38.4538 177.116 38.4538ZM177.019 34.4841C176.706 34.4841 176.443 34.596 176.23 34.8197C176.018 35.0407 175.886 35.3517 175.836 35.7528H178.11V35.6955C178.087 35.3108 177.981 35.0134 177.791 34.8033C177.601 34.5905 177.343 34.4841 177.019 34.4841ZM182.59 38.372C182.545 38.2847 182.509 38.1291 182.481 37.9054C182.121 38.271 181.689 38.4538 181.189 38.4538C180.742 38.4538 180.374 38.331 180.086 38.0855C179.8 37.8372 179.658 37.5235 179.658 37.1442C179.658 36.6831 179.837 36.3257 180.195 36.072C180.556 35.8155 181.062 35.6873 181.714 35.6873H182.468V35.3394C182.468 35.0748 182.387 34.8647 182.225 34.7092C182.063 34.551 181.824 34.4718 181.508 34.4718C181.231 34.4718 180.999 34.54 180.811 34.6765C180.624 34.8129 180.53 34.9779 180.53 35.1716H179.75C179.75 34.9506 179.83 34.7379 179.989 34.5332C180.151 34.3258 180.369 34.1622 180.644 34.0421C180.921 33.9221 181.224 33.8621 181.554 33.8621C182.077 33.8621 182.487 33.9903 182.783 34.2467C183.08 34.5005 183.233 34.8511 183.244 35.2985V37.3366C183.244 37.7431 183.298 38.0664 183.404 38.3065V38.372H182.59ZM181.302 37.7949C181.546 37.7949 181.776 37.7335 181.995 37.6108C182.212 37.488 182.371 37.3284 182.468 37.1319V36.2234H181.86C180.909 36.2234 180.434 36.4949 180.434 37.0378C180.434 37.2752 180.515 37.4607 180.677 37.5944C180.839 37.7281 181.048 37.7949 181.302 37.7949ZM187.104 37.1974C187.104 36.9928 187.024 36.8346 186.865 36.7227C186.708 36.6081 186.433 36.5099 186.038 36.428C185.647 36.3462 185.335 36.248 185.103 36.1334C184.873 36.0188 184.703 35.8824 184.591 35.7241C184.482 35.5659 184.428 35.3777 184.428 35.1593C184.428 34.7965 184.584 34.4896 184.898 34.2386C185.213 33.9876 185.616 33.8621 186.105 33.8621C186.62 33.8621 187.037 33.9916 187.356 34.2508C187.677 34.51 187.838 34.8415 187.838 35.2453H187.058C187.058 35.0379 186.967 34.8593 186.785 34.7092C186.606 34.5591 186.38 34.4841 186.105 34.4841C185.823 34.4841 185.602 34.5441 185.443 34.6642C185.284 34.7842 185.204 34.9411 185.204 35.1348C185.204 35.3176 185.278 35.4554 185.426 35.5481C185.574 35.6409 185.842 35.7296 186.227 35.8142C186.616 35.8987 186.931 35.9997 187.171 36.117C187.412 36.2343 187.589 36.3762 187.704 36.5426C187.821 36.7063 187.88 36.9069 187.88 37.1442C187.88 37.5398 187.718 37.8577 187.393 38.0978C187.069 38.3351 186.648 38.4538 186.131 38.4538C185.767 38.4538 185.446 38.391 185.166 38.2655C184.886 38.14 184.667 37.9654 184.507 37.7417C184.351 37.5153 184.272 37.2711 184.272 37.0092H185.049C185.062 37.2629 185.166 37.4648 185.359 37.6148C185.555 37.7622 185.812 37.8358 186.131 37.8358C186.424 37.8358 186.659 37.7786 186.835 37.664C187.015 37.5466 187.104 37.3911 187.104 37.1974ZM190.376 37.2629L191.433 33.9439H192.264L190.439 39.0554C190.157 39.792 189.708 40.1603 189.093 40.1603L188.946 40.1481L188.656 40.0949V39.481L188.866 39.4974C189.129 39.4974 189.333 39.4456 189.479 39.3418C189.627 39.2382 189.748 39.0486 189.844 38.773L190.015 38.3228L188.396 33.9439H189.244L190.376 37.2629Z"
              fill="#2B2B2A"
            />
          </g>
          <defs>
            <clipPath id="clip0_1972_619">
              <rect width="193" height="44" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </Box>
    </>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <NextLink href="/">{logo}</NextLink>;
});

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default Logo;