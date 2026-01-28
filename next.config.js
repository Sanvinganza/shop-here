// next.config.js
import withNextIntl from 'next-intl/plugin';

const withNextIntlConfig = withNextIntl('./app/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default withNextIntlConfig(nextConfig);