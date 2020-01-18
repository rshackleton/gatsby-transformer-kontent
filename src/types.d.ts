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
