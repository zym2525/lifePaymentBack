type TreeNodeData = {
  [key: string]: any;
};

export type TreeData = TreeNodeData[];

type TreeKey = string | number;

export declare interface TreeStoreNodesMap<T> {
  [key: TreeKey]: TreeNode<T>;
}

export type FilterNodeMethodFunction<T extends TreeNodeData> = (
  value: string,
  data: T,
  child: any
) => boolean;

type FormatListToTreeOptions = {
  nodeKey?: string;
  parentNode?: TreeNodeData;
};

export function formatListToTree<T extends { [key: string]: any }>(
  list: T[],
  parentId: string | number,
  options: FormatListToTreeOptions = {}
) {
  const { nodeKey = 'id', parentNode } = options;
  const treeNodeList: T[] = [];
  if (list.length > 0) {
    list.forEach((nodeData) => {
      const treeNode: T = nodeData;
      if (nodeData.parentId === parentId) {
        if (parentNode) {
          //@ts-ignore
          treeNode.parentNode = parentNode;
        }
        const children = formatListToTree(list, nodeData[nodeKey], {
          nodeKey,
          parentNode: treeNode,
        });
        //@ts-ignore
        treeNode.children = children;
        treeNodeList.push(treeNode);
      }
    });
  }
  return treeNodeList;
}

export interface TreeStoreOptions<T extends TreeNodeData> {
  nodeKey?: TreeKey;
  data: T[];
  filterNodeMethod?: FilterNodeMethodFunction<T>;
}

export class TreeStore<T extends TreeNodeData> {
  static formatListToTree = formatListToTree;

  //   treeData: T[];
  key: TreeKey;
  data: T[];
  nodesMap: TreeStoreNodesMap<T>;
  root: TreeNode<T>;
  filterNodeMethod: FilterNodeMethodFunction<T>;

  constructor(options: TreeStoreOptions<T>) {
    this.key = options.nodeKey || 'id';
    this.data = options.data;
    this.filterNodeMethod = options.filterNodeMethod;
    this.nodesMap = {};

    this.initialize();
  }

  initialize() {
    // this.data.forEach((item) => {

    //   //   this.root.push(treeNode);
    // });
    this.root = new TreeNode<T>({
      //@ts-ignore
      data: this.data,
      store: this,
    });
    this.root.initialize();
  }

  registerNode(node: TreeNode<T>): void {
    const key = this.key;
    if (!node || !node.data) return;

    if (!key) {
      this.nodesMap[node.id] = node;
    } else {
      const nodeKey = node.key;
      if (nodeKey !== undefined) this.nodesMap[node.key] = node;
    }
  }

  getNode(key: TreeKey) {
    return this.nodesMap[key] || null;
  }

  filter(value: string): void {
    const filterNodeMethod = this.filterNodeMethod;
    const traverse = function (node: TreeStore<T> | TreeNode<T>) {
      const childNodes = (node as TreeStore<T>).root
        ? (node as TreeStore<T>).root.childNodes
        : (node as TreeNode<T>).childNodes;

      childNodes.forEach((child) => {
        child.visible = filterNodeMethod.call(child, value, child.data, child);

        traverse(child);
      });

      if (!(node as TreeNode<T>).visible && childNodes.length) {
        let allHidden = true;
        allHidden = !childNodes.some((child) => child.visible);

        if ((node as TreeStore<T>).root) {
          (node as TreeStore<T>).root.visible = allHidden === false;
        } else {
          (node as TreeNode<T>).visible = allHidden === false;
        }
      }
      if (!value) return;
    };

    traverse(this);
  }
}

export interface TreeNodeOptions<T extends TreeNodeData> {
  data: T;
  store: TreeStore<T>;
  parent?: TreeNode<T>;
}

export class TreeNode<T extends TreeNodeData> {
  level: number;
  data: T;
  parent: TreeNode<T>;
  id: TreeKey;
  store: TreeStore<T>;
  childNodes: TreeNode<T>[];
  visible: boolean;
  constructor(options: TreeNodeOptions<T>) {
    this.level = 0;
    this.data = options.data;
    this.store = options.store;
    this.parent = options.parent;
    this.id = this.key;
    this.visible = true;

    this.childNodes = [];

    if (this.parent) {
      this.level = this.parent.level + 1;
    }
  }

  initialize() {
    const store = this.store;
    if (!store) {
      throw new Error('[Node]store is required!');
    }
    store.registerNode(this);

    this.setData(this.data);
  }

  setData(data: TreeNodeData) {
    this.data = data as any;
    this.childNodes = [];
    let children;
    if (this.level === 0 && Array.isArray(this.data)) {
      children = this.data;
    } else {
      children = this.data.children;
    }

    for (let i = 0, j = children.length; i < j; i++) {
      //@ts-ignore
      this.insertChild({ data: children[i] });
    }
  }

  insertChild(child: TreeNode<T>, index?: number) {
    if (!(child instanceof TreeNode)) {
      Object.assign(child, {
        parent: this,
        store: this.store,
      });
      child = new TreeNode(child as TreeNodeOptions<T>);
      child.initialize();
    }

    (child as TreeNode<T>).level = this.level + 1;

    if (typeof index === 'undefined' || index < 0) {
      this.childNodes.push(child as TreeNode<T>);
    } else {
      this.childNodes.splice(index, 0, child as TreeNode<T>);
    }
  }

  get key(): TreeKey {
    const nodeKey = this.store.key;
    if (this.data) return this.data[nodeKey];
    return null;
  }
}
