/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')

module.exports = withPWA({
  reactStrictMode: true,
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
  },
  images: {
    domains: [
      'seminar-rooms-media.s3-ap-south-1.amazonaws.com',
      'edit.org',
      'picsum.photos',
    ],
  },
})
