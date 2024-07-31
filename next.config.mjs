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
      }
    
};

export default nextConfig;
