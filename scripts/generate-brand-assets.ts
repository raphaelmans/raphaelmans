import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { brandColors, RM_MARK_PATH } from "../lib/brand";

const appDirectory = join(process.cwd(), "app");
const iconSvgPath = join(appDirectory, "icon.svg");
const faviconPath = join(appDirectory, "favicon.ico");
const appleIconPath = join(appDirectory, "apple-icon.png");
const markScale = 896 / 751;
const markOffsetY = (1024 - 392.031637 * markScale) / 2;

const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
  <rect width="1024" height="1024" fill="${brandColors.graphite}"/>
  <g transform="translate(64 ${markOffsetY}) scale(${markScale})">
    <path d="${RM_MARK_PATH}" fill="${brandColors.paper}"/>
  </g>
</svg>
`;

writeFileSync(iconSvgPath, iconSvg);

execFileSync("magick", [
  iconSvgPath,
  "-background",
  "none",
  "-define",
  "icon:auto-resize=48,32,16",
  faviconPath,
]);

execFileSync("magick", [
  iconSvgPath,
  "-resize",
  "180x180",
  "-strip",
  "-define",
  "png:compression-level=9",
  appleIconPath,
]);

console.log("Generated app/icon.svg, app/favicon.ico, and app/apple-icon.png.");
