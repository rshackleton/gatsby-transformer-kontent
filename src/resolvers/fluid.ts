import { getAssetUrl } from '../imageUtils';
import {
  KontentAsset,
  KontentAssetFluidArgs,
  KontentAssetFluid,
} from '../types';

const fluidResolver = {
  type: `KontentAssetFluid`,
  args: {
    maxWidth: 'Int',
    maxHeight: 'Int',
    srcSetBreakpoints: '[Int!]',
  },
  async resolve(
    source: KontentAsset,
    args: KontentAssetFluidArgs,
  ): Promise<KontentAssetFluid> {
    const { height, url, width } = getAssetUrl(
      source,
      args.maxWidth,
      args.maxHeight,
      args,
    );

    return {
      aspectRatio: width / height,
      base64: '',
      sizes: '',
      src: url,
      srcSet: `${url} 1x, ${url} 2x`,
    };
  },
};

export default fluidResolver;
