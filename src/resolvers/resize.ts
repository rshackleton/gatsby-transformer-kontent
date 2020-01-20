import { getAssetUrl } from '../imageUtils';
import {
  KontentAsset,
  KontentAssetResizeArgs,
  KontentAssetResize,
} from '../types';

const resizeResolver = {
  type: `KontentAssetResize`,
  args: {
    base64: 'Boolean',
    height: 'Int',
    fit: 'String',
    format: 'String',
    quality: 'Int',
    width: 'Int',
  },
  async resolve(
    source: KontentAsset,
    args: KontentAssetResizeArgs,
  ): Promise<KontentAssetResize> {
    const { height, url, width } = getAssetUrl(
      source,
      args.width,
      args.height,
      args,
    );

    return {
      aspectRatio: width / height,
      base64: '',
      height,
      src: url,
      width,
    };
  },
};

export default resizeResolver;
