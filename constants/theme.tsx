// constants/theme.tsx
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("screen");

export const COLORS = {
  primary: "#000",
  primaryLight: "rgba(0, 0, 0, 0.1)",
  secondary: "#B29954",
  success: "#159E42",
  danger: "#FF3131",
  warning: "#ffb02c",
  dark: "#2f2f2f",
  light: "#E6E6E6",
  info: "#2B39B9",
  white: "#fff",
  label: "#8A8A8A",
  backgroundColor: "#fff",
  black: "#000",

  // Light theme
  card: "#fff",
  background: "#F6F6F6",
  text: "rgba(0,0,0,.6)",
  title: "#000",
  borderColor: "rgba(0,0,0,.1)",
  input: "rgba(0,0,0,.03)",

  // Dark theme
  darkCard: "rgba(255,255,255,.05)",
  darkBackground: "#000303",
  darkText: "rgba(255,255,255,.6)",
  darkTitle: "#fff",
  darkBorder: "rgba(255,255,255,.2)",
  darkInput: "rgba(255,255,255,.05)",
};

export const SIZES = {
  fontLg: 16,
  font: 14,
  fontSm: 13,
  fontXs: 12,

  // Radius
  radius_sm: 8,
  radius: 6,
  radius_lg: 15,

  // Space
  padding: 15,
  margin: 15,

  // Font Sizes
  h1: 40,
  h2: 28,
  h3: 24,
  h4: 20,
  h5: 18,
  h6: 16,

  // App dimensions
  width,
  height,

  container: 800,
};

export const FONTS = {
  fontLg: {
    fontSize: SIZES.fontLg,
    color: COLORS.text,
    lineHeight: 20,
    fontFamily: "Inter-Regular",
  },
  font: {
    fontSize: SIZES.font,
    color: COLORS.text,
    lineHeight: 20,
    fontFamily: "Inter-Regular",
  },
  fontSm: {
    fontSize: SIZES.fontSm,
    color: COLORS.text,
    lineHeight: 18,
    fontFamily: "Inter-Regular",
  },
  fontXs: {
    fontSize: SIZES.fontXs,
    color: COLORS.text,
    lineHeight: 14,
    fontFamily: "Inter-Regular",
  },
  h1: { fontSize: SIZES.h1, color: COLORS.title, fontFamily: "Inter-SemiBold" },
  h2: { fontSize: SIZES.h2, color: COLORS.title, fontFamily: "Inter-SemiBold" },
  h3: { fontSize: SIZES.h3, color: COLORS.title, fontFamily: "Inter-SemiBold" },
  h4: { fontSize: SIZES.h4, color: COLORS.title, fontFamily: "Inter-SemiBold" },
  h5: { fontSize: SIZES.h5, color: COLORS.title, fontFamily: "Inter-SemiBold" },
  h6: { fontSize: SIZES.h6, color: COLORS.title, fontFamily: "Inter-SemiBold" },
  fontBold: { fontFamily: "Inter-Bold" },
  fontMedium: { fontFamily: "Inter-Medium" },
  fontTitle: { fontFamily: "Inter-Medium" },
  fontRegular: { fontFamily: "Inter-Regular" },
  fontSemiBold: { fontFamily: "Inter-SemiBold" },
  fontLight: { fontFamily: "Inter-Light" },
  fontExtraLight: { fontFamily: "Inter-ExtraLight" },
  fontThin: { fontFamily: "Inter-Thin" },
  fontBlack: { fontFamily: "Inter-Black" },
  fontExtraBold: { fontFamily: "Inter-ExtraBold" },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
