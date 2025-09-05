/** @type {import('tailwindcss').Config} */
// Ensure tailwindcss-animate is available for Vercel deployment
let animatePlugin;
try {
  // First try the standard require
  animatePlugin = require("tailwindcss-animate");
  console.log("Successfully loaded tailwindcss-animate");
} catch (error) {
  console.warn('Initial load of tailwindcss-animate failed:', error.message);

  try {
    // Try with a node_modules path resolution as fallback
    animatePlugin = require("./node_modules/tailwindcss-animate");
    console.log("Successfully loaded tailwindcss-animate from node_modules path");
  } catch (secondError) {
    console.warn('Second attempt to load tailwindcss-animate failed:', secondError.message);

    // Create a synthetic plugin that mimics the basic structure
    console.warn('Using synthetic fallback for tailwindcss-animate');
    animatePlugin = {
      handler: function() {
        // Empty handler that will be called by Tailwind
        return {};
      }
    };
  }
}

// Verify if the plugin has the expected structure
if (typeof animatePlugin !== 'function' && !animatePlugin.handler) {
  console.warn('animatePlugin is not in the expected format, creating a compatible wrapper');
  const originalPlugin = animatePlugin;
  animatePlugin = function(options) {
    return originalPlugin;
  };
}

module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  plugins: [
    // Add the animate plugin with proper error handling
    function(options) {
      try {
        return animatePlugin(options);
      } catch (error) {
        console.error('Error while applying tailwindcss-animate plugin:', error.message);
        return {}; // Return empty plugin to prevent build failure
      }
    }
  ],
}
}
