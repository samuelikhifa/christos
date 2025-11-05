/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
  // Dark mode configuration
  darkMode: 'class',
  
  theme: {
    extend: {
      fontFamily: {
        'display': ['Montserrat', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
        'heading': ['Mulish', 'sans-serif'],
        'ui': ['Roboto', 'sans-serif'],
        'mono': ['IBM Plex Sans', 'monospace'],
      },
      // Add custom aspect ratios for responsive images
      aspectRatio: {
        '4/3': '4 / 3',
        '21/9': '21 / 9',
      },
    },
  },
  
  plugins: [
    // Add aspect ratio plugin if needed
    // require('@tailwindcss/aspect-ratio'),
  ],
  
  // Optimize for production
  ...(process.env.NODE_ENV === 'production' ? {
    // Purge unused styles in production
    purge: {
      enabled: true,
      content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
      ],
      // Safelist commonly used dynamic classes
      safelist: [
        'bg-blue-600',
        'bg-blue-700',
        'bg-blue-800',
        'bg-blue-900',
        'text-blue-600',
        'text-blue-700',
        'text-blue-800',
        'text-blue-900',
        'hover:bg-blue-700',
        'hover:text-blue-600',
        // Add more dynamic classes as needed
      ],
      options: {
        // Remove unused keyframes
        keyframes: true,
        // Remove unused font-face
        fontFace: true,
      },
    },
  } : {}),
}
