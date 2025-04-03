/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'm.media-amazon.com',
          },
          {
            protocol: 'https',
            hostname: 'www.gallimard.fr',
          },
          // Ajoutez d'autres domaines si nécessaire
        ],
      },
};

export default nextConfig;
