import { PluginOptions } from 'gatsby';
import { ImageFitModeEnum, ImageFormatEnum } from '@kentico/kontent-delivery';

/**
 * The plugin options.
 */
interface CustomPluginOptions extends PluginOptions {
  local: boolean;
}

/**
 * A Kentico Kontent asset.
 */
interface KontentAsset {
  name: string;
  description?: string;
  type: string;
  size: number;
  url: string;
  width: number;
  height: number;
}

interface KontentAssetFixed {
  aspectRatio: number;
  base64: string!;
  height: number;
  src: string;
  srcSet: string;
  width: number;
}

interface KontentAssetFixedArgs {
  width: number!;
  height: number;
  fit: ImageFitModeEnum;
  quality: number;
  format: ImageFormatEnum;
}

interface KontentAssetFluid {
  aspectRatio: number!;
  base64: string!;
  sizes: string!;
  src: string!;
  srcSet: string!;
}

interface KontentAssetFluidArgs {
  fit: ImageFitModeEnum;
  format: ImageFormatEnum;
  maxHeight: number;
  maxWidth: number!;
  quality: number;
  srcSetBreakpoints: number[];
}

interface KontentAssetResize {
  aspectRatio: number!;
  base64: string!;
  height: number!;
  src: string!;
  width: number!;
}

interface KontentAssetResizeArgs {
  width: number!;
  height: number;
  fit: ImageFitModeEnum;
  base64: boolean;
  quality: number;
  format: ImageFormatEnum;
}
