import { PluginOptions } from 'gatsby';

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

interface KontentAssetFluid {
  aspectRatio: number!;
  base64: string!;
  sizes: string!;
  src: string!;
  srcSet: string!;
}
