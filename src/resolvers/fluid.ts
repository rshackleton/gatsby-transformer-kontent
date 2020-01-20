import { getAssetUrl } from '../imageUtils';
import {
  KontentAsset,
  KontentAssetFluidArgs,
  KontentAssetFluid,
} from '../types';

const DEFAULT_SIZES = [0.25, 0.5, 1, 1.5, 2];

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
    const srcs = DEFAULT_SIZES.map(size => {
      const { height, url, width } = getAssetUrl(
        source,
        args.maxWidth * size,
        args.maxHeight * size,
        args,
      );

      return { height, size: args.maxWidth * size, src: url, width };
    });

    // @todo: Make sure this gets the 1x size.
    const src1x = srcs[2];

    const srcSet = srcs.map(({ size, src }) => `${src} ${size}w`).join(', ');

    return {
      aspectRatio: src1x.width / src1x.height,
      base64: '',
      sizes: `(max-width: ${args.maxWidth}px) 100vw, ${args.maxWidth}px`,
      src: src1x.src,
      srcSet: srcSet,
    };
  },
};

export default fluidResolver;
