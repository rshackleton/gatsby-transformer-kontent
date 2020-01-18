import { CreateResolversArgs, GatsbyNode } from 'gatsby';
import { createRemoteFileNode, FileSystemNode } from 'gatsby-source-filesystem';
import { ImageUrlBuilder, ImageFitModeEnum } from '@kentico/kontent-delivery';

import { resolveOptions } from './resolveOptions';
import {
  CustomPluginOptions,
  KontentAsset,
  KontentAssetFixed,
  KontentAssetFixedArgs,
  KontentAssetFluid,
  KontentAssetResize,
  KontentAssetResizeArgs,
  KontentAssetFluidArgs,
} from './types';

/**
 * Add custom field resolvers to the GraphQL schema.
 * @param args
 * @param pluginOptions
 * @see https://www.gatsbyjs.org/docs/node-apis/#createResolvers
 */
const createResolvers: GatsbyNode['createResolvers'] = (
  args: CreateResolversArgs,
  pluginOptions: CustomPluginOptions,
): Promise<void> => {
  const {
    actions,
    cache,
    createNodeId,
    createResolvers,
    store,
    reporter,
  } = args;

  const options = resolveOptions(pluginOptions);

  // Extend `KontentAsset` type with fields for Gatsby Image.
  createResolvers({
    KontentAsset: {
      fixed: {
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
          const { width, height } = calculateAdjustedSize({
            fit: args.fit || ImageFitModeEnum.Clip,
            originalHeight: source.height,
            originalWidth: source.width,
            targetHeight: args.height,
            targetWidth: args.width,
          });

          let builder = new ImageUrlBuilder(source.url)
            .withWidth(width)
            .withHeight(height);

          if (args.fit) {
            builder = builder.withFitMode(args.fit);
          }

          if (args.format) {
            builder = builder.withFormat(args.format);
          }

          if (args.quality) {
            builder = builder.withQuality(args.quality);
          }

          const src = builder.getUrl();

          return {
            aspectRatio: width / height,
            base64: '',
            height: height,
            src: src,
            srcSet: src,
            width: width,
          };
        },
      },
      fluid: {
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
          throw new Error('"fluid" is currently unsupported.');
          return {
            aspectRatio: 0,
            base64: '',
            sizes: '',
            src: '',
            srcSet: '',
          };
        },
      },
      resize: {
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
          const { width, height } = calculateAdjustedSize({
            fit: args.fit || ImageFitModeEnum.Clip,
            originalHeight: source.height,
            originalWidth: source.width,
            targetHeight: args.height,
            targetWidth: args.width,
          });

          let builder = new ImageUrlBuilder(source.url)
            .withWidth(width)
            .withHeight(height);

          if (args.fit) {
            builder = builder.withFitMode(args.fit);
          }

          if (args.format) {
            builder = builder.withFormat(args.format);
          }

          if (args.quality) {
            builder = builder.withQuality(args.quality);
          }

          const src = builder.getUrl();

          return {
            aspectRatio: width / height,
            base64: '',
            height: height,
            src: src,
            width: width,
          };
        },
      },
    },
  });

  // Extend `KontentAsset` type with field for local `File` node.
  if (options.local) {
    const { createNode } = actions;

    createResolvers({
      KontentAsset: {
        localFile: {
          type: `File`,
          resolve(source: KontentAsset): Promise<FileSystemNode> {
            return createRemoteFileNode({
              url: source.url,
              store,
              cache,
              createNode,
              createNodeId,
              reporter,
            });
          },
        },
      },
    });
  }

  return Promise.resolve();
};

export default createResolvers;

function calculateAdjustedSize({
  fit,
  originalHeight,
  originalWidth,
  targetHeight,
  targetWidth,
}: {
  fit: ImageFitModeEnum;
  originalHeight: number;
  originalWidth: number;
  targetHeight: number;
  targetWidth: number;
}): { width: number; height: number } {
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
