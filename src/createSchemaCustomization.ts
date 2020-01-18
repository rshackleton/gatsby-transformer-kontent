import { CreateSchemaCustomizationArgs, GatsbyNode } from 'gatsby';

const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = (
  args: CreateSchemaCustomizationArgs,
): Promise<void> => {
  const typeDefs = `
    type KontentAssetFixed {
      aspectRatio: Float
      base64: String!
      height: Float
      src: String
      srcSet: String
      width: Float
    }
    
    type KontentAssetFluid {
      aspectRatio: Float!
      base64: String!
      sizes: String!
      src: String!
      srcSet: String!
    }
  `;

  args.actions.createTypes(typeDefs);

  return Promise.resolve();
};

export default createSchemaCustomization;
