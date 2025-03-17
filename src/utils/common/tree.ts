export function getTree(
  data: API.ModuleDto[],
  root?: string,
  idTxt = 'id',
  pidTxt = 'parentId',
  pushTxt = 'children'
) {
  // 递归方法
  function getNode(id: string | undefined) {
    const node = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i][pidTxt] === id) {
        data[i][pushTxt] = getNode(data[i][idTxt]);
        node.push(data[i] as never);
      }
    }
    if (node.length === 0) {
      return;
    } else {
      return node;
    }
  }
  // 使用根节点
  return getNode(root);
}

type FlattenTreeOptions = {
  childrenKey?: string;
};

export function flattenTree<T = any>(tree: T[], options: FlattenTreeOptions = {}) {
  const { childrenKey = 'children' } = options;

  const result: T[] = [];

  function traverse(node: T) {
    result.push(node);
    if (node[childrenKey] && node[childrenKey].length > 0) {
      node[childrenKey].forEach((child) => traverse(child));
    }
  }

  tree.forEach((node) => traverse(node));

  return result;
}
