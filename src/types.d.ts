/**
 * The plugin options.
 */
interface PluginOptions {
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
