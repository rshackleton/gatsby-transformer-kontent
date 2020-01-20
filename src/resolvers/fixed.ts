import { getAssetUrl } from '../imageUtils';
import {
  KontentAsset,
  KontentAssetFixedArgs,
  KontentAssetFixed,
} from '../types';

const fixedResolver = {
  type: `KontentAssetFixed`,
  args: {
    fit: 'String',
    format: 'String',
    height: 'Int',
    quality: 'Int',
    width: 'Int',
  },
  async resolve(
    source: KontentAsset,
    args: KontentAssetFixedArgs,
  ): Promise<KontentAssetFixed> {
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
      srcSet: `${url} 1x, ${url} 2x`,
      width,
    };
  },
};

export default fixedResolver;
