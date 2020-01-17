import * as crypto from 'crypto';
import { GatsbyNode, Node, NodeInput } from 'gatsby';

const onCreateNode: GatsbyNode['onCreateNode'] = ({
  node,
  actions,
  createNodeId,
  getNode,
}) => {
  // @todo: Would prefer to use mediaType but this is null on Kontent nodes.
  //        So instead using a partial match on the type name.
  if (!node.internal.type.startsWith('KontentItem')) {
    return;
  }

  const { createNode, createParentChildLink } = actions;

  // Create our new node's data object - separated so it can be hashed.
  const fieldData = {
    test: 'hello world!',
  };

  // Create dependant node id.
  const testNodeId: string = createNodeId(`${node.id}__TestNode`);

  // Create node input data.
  const testNodeInput: NodeInput = {
    ...fieldData,

    id: testNodeId,
    parent: node.id,
    children: [],
    internal: {
      contentDigest: crypto
        .createHash(`md5`)
        .update(JSON.stringify(fieldData))
        .digest(`hex`),
      type: 'TestNode',
    },
  };

  // Create new gatsby node.
  createNode(testNodeInput);

  // Get created node - needed to satisfy `createParentChildLink` signature.
  const testNode: Node = getNode(testNodeId);

  // Create connection between original node and new child node.
  createParentChildLink({ parent: node, child: testNode });
};

export { onCreateNode };
