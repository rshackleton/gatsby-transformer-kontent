import { ImageFitModeEnum, ImageUrlBuilder } from '@kentico/kontent-delivery';

import { KontentAsset, KontentAssetArgs, KontentRichTextImage } from './types';

/**
 * Calculate adjusted image size
 * @param args The adjusted size arguments
 */
function calculateAdjustedSize(args: {
  fit: ImageFitModeEnum;
  originalHeight: number;
  originalWidth: number;
  targetHeight: number;
  targetWidth: number;
}): { width: number; height: number } {
  const {
    fit,
    originalHeight,
    originalWidth,
    targetHeight,
    targetWidth,
  } = args;

  let width = 0;
  let height = 0;

  // Get adjusted width.
  if (targetWidth > originalWidth) {
    const scaleRatio = originalWidth / targetWidth;
    width = scaleRatio * targetWidth;
  } else {
    width = targetWidth;
  }

  // Get adjusted height.
  if (fit === ImageFitModeEnum.Clip || !targetHeight) {
    const aspectRatio = originalWidth / originalHeight;
    height = width / aspectRatio;
  } else if (targetHeight > originalHeight) {
    const scaleRatio = originalHeight / targetHeight;
    height = scaleRatio * targetHeight;
    width = scaleRatio * width;
  } else {
    height = targetHeight;
  }

  width = Math.round(width);
  height = Math.round(height);

  return { height, width };
}

/**
 * Create an instance of ImageUrlBuilder for the provided arguments.
 * @param url The base Kontent asset URL
 * @param args The GraphQL resolver arguments
 */
function createUrlBuilder(
  url: string,
  args: KontentAssetArgs,
): ImageUrlBuilder {
  let builder = new ImageUrlBuilder(url);

  if (args.fit) {
    builder = builder.withFitMode(args.fit);
  }

  if (args.format) {
    builder = builder.withFormat(args.format);
  }

  if (args.quality) {
    builder = builder.withQuality(args.quality);
  }

  return builder;
}

/**
 * Get the asset URL for the provided arguments.
 * @param url The base Kontent asset URL
 * @param args The GraphQL resolver arguments
 */
function getAssetUrl(
  source: KontentAsset | KontentRichTextImage,
  targetWidth: number,
  targetHeight: number,
  args: KontentAssetArgs,
): {
  height: number;
  url: string;
  width: number;
} {
  const { height, width } = calculateAdjustedSize({
    fit: args.fit,
    originalHeight: source.height,
    originalWidth: source.width,
    targetHeight,
    targetWidth,
  });

  const builder = createUrlBuilder(source.url, args)
    .withWidth(width)
    .withHeight(height);

  return { height, url: builder.getUrl(), width };
}

export { calculateAdjustedSize, createUrlBuilder, getAssetUrl };
