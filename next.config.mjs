/** @type {import('next').NextConfig} */

const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  async redirects() {
    return [
      {
        source: '/login',
        has: [
          {
            type: 'cookie',
            key: 'auth_token',
          },
        ],
        permanent: false,
        destination: '/',
      },
      {
        source: '/signup',
        has: [
          {
            type: 'cookie',
            key: 'auth_token',
          },
        ],
        permanent: false,
        destination: '/',
      },
    ]
  },
};

export default nextConfig;
