/** @type {import('next').NextConfig} */
const nextConfig = 
{
    images: {
        domains: ['https://thispersondoesnotexist.com/'],
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '**',
          },
        ],
      },
      async rewrites() {
        return [
          {
            source: '/api/socket',
            destination: '/api/socket',
          },
        ];
      },
    
};

export default nextConfig;
