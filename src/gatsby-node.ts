import { CreateResolversArgs } from 'gatsby';
import { createRemoteFileNode, FileSystemNode } from 'gatsby-source-filesystem';

const DEFAULT_OPTIONS: PluginOptions = {
  local: false,
};

const createResolvers = (
  args: CreateResolversArgs,
  pluginOptions: PluginOptions,
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

  if (options.local) {
    const { createNode } = actions;

    createResolvers({
      KontentAsset: {
        imageFile: {
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

export { createResolvers };

/**
 * Combine plugin options with default options.
 * @param options The combined options.
 */
function resolveOptions(options: PluginOptions): PluginOptions {
  return {
    ...DEFAULT_OPTIONS,
    ...options,
  };
}
