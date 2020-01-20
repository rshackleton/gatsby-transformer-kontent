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

interface KontentAssetArgs {
  fit: ImageFitModeEnum;
  format: ImageFormatEnum;
  quality: number;
}

interface KontentAssetFixed {
  aspectRatio: number;
  base64: string!;
  height: number;
  src: string;
  srcSet: string;
  width: number;
}

interface KontentAssetFixedArgs extends KontentAssetArgs {
  height: number;
  width: number!;
}

interface KontentAssetFluid {
  aspectRatio: number!;
  base64: string!;
  sizes: string!;
  src: string!;
  srcSet: string!;
}

interface KontentAssetFluidArgs extends KontentAssetArgs {
  maxHeight: number;
  maxWidth: number!;
  srcSetBreakpoints: number[];
}

interface KontentAssetResize {
  aspectRatio: number!;
  base64: string!;
  height: number!;
  src: string!;
  width: number!;
}

interface KontentAssetResizeArgs extends KontentAssetArgs {
  base64: boolean;
  height: number;
  width: number!;
}
