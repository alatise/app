/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#000",
        "primary-light": "rgba(0, 0, 0, 0.1)",
        secondary: "#B29954",
        success: "#159E42",
        danger: "#FF3131",
        warning: "#ffb02c",
        dark: "#2f2f2f",
        light: "#E6E6E6",
        info: "#2B39B9",
        white: "#fff",
        label: "#8A8A8A",
        "background-color": "#fff",
        black: "#000",

        // Light theme
        card: "#fff",
        background: "#FFFFFF",
        text: "rgba(0,0,0,.6)",
        title: "#000",
        "border-color": "rgba(0,0,0,.1)",
        input: "rgba(0,0,0,.03)",

        // Dark theme
        "dark-card": "rgba(255,255,255,.05)",
        "dark-background": "#000303",
        "dark-text": "rgba(255,255,255,.6)",
        "dark-title": "#fff",
        "dark-border": "rgba(255,255,255,.2)",
        "dark-input": "rgba(255,255,255,.05)",
      },
      fontSize: {
        "font-lg": "16px",
        font: "14px",
        "font-sm": "13px",
        "font-xs": "12px",
        h1: "40px",
        h2: "28px",
        h3: "24px",
        h4: "20px",
        h5: "18px",
        h6: "16px",
      },
      borderRadius: {
        "radius-sm": "8px",
        radius: "6px",
        "radius-lg": "15px",
      },
      spacing: {
        padding: "15px",
        margin: "15px",
        container: "800px",
      },
      fontFamily: {
        "inter-regular": ["Inter-Regular"],
        "inter-bold": ["Inter-Bold"],
        "inter-medium": ["Inter-Medium"],
        "inter-semibold": ["Inter-SemiBold"],
        "inter-light": ["Inter-Light"],
        "inter-extralight": ["Inter-ExtraLight"],
        "inter-thin": ["Inter-Thin"],
        "inter-black": ["Inter-Black"],
        "inter-extrabold": ["Inter-ExtraBold"],
        "montserrat-Medium": ["Montserrat-Medium"],
        "montserrat-Regular": ["Montserrat-Regular"],
        "montserrat-Semibold": ["Montserrat-Semibold"],
        "montserrat-Bold": ["Montserrat-Bold"],
        "montserrat-Light": ["Montserrat-Light"]
      },
      lineHeight: {
        14: "14px",
        18: "18px",
        20: "20px",
      },
      maxWidth: {
        container: "800px",
      },
    },
  },
  plugins: [],
};
