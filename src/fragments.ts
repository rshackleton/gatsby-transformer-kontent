import { graphql } from 'gatsby';

export const kontentAssetFixed = graphql`
  fragment KontentAssetFixed on KontentAssetFixed {
    base64
    height
    src
    srcSet
    width
  }
`;

export const kontentAssetFluid = graphql`
  fragment KontentAssetFluid on KontentAssetFluid {
    aspectRatio
    base64
    sizes
    src
    srcSet
  }
`;
