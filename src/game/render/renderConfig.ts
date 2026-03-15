export interface WorldPalette {
  floor: string;
  floorAlt: string;
  glow: string;
  label: string;
}

export const renderConfig = {
  backdropTop: "#080a10",
  backdropBottom: "#14111b",
  frame: "rgba(255, 255, 255, 0.08)",
  gridLine: "rgba(255, 255, 255, 0.05)",
  divider: "rgba(255, 255, 255, 0.1)",
  palettes: {
    light: {
      floor: "#261c16",
      floorAlt: "#31241d",
      glow: "rgba(255, 195, 111, 0.38)",
      label: "#ffd8a6",
    } satisfies WorldPalette,
    shadow: {
      floor: "#19182c",
      floorAlt: "#22213b",
      glow: "rgba(145, 129, 255, 0.4)",
      label: "#cdbfff",
    } satisfies WorldPalette,
  },
};
