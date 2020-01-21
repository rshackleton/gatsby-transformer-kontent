import { graphql } from 'gatsby';

export const KontentAssetFixed = graphql`
  fragment KontentAssetFixed on KontentAssetFixed {
    base64
    height
    src
    srcSet
    width
  }
`;

export const KontentAssetFluid = graphql`
  fragment KontentAssetFluid on KontentAssetFluid {
    aspectRatio
    base64
    sizes
    src
    srcSet
  }
`;
