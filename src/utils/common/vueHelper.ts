import { VNode, VNodeArrayChildren, Fragment, isVNode } from 'vue';
import { isArray } from 'lodash';

export function isFragment(node: VNode): boolean;
export function isFragment(node: unknown): node is VNode;
export function isFragment(node: unknown): node is VNode {
  return isVNode(node) && node.type === Fragment;
}

export function isComment(node: VNode): boolean;
export function isComment(node: unknown): node is VNode;
export function isComment(node: unknown): node is VNode {
  return isVNode(node) && node.type === Comment;
}

export function isValidElementNode(node: VNode): boolean;
export function isValidElementNode(node: unknown): node is VNode;
export function isValidElementNode(node: unknown): node is VNode {
  return isVNode(node) && !isFragment(node) && !isComment(node);
}

export function extractChildren(
  children: VNodeArrayChildren,
  parentKey = '',
  extractedChildren: VNode[] = []
) {
  children.forEach((child) => {
    if (isFragment(child)) {
      if (isArray(child.children)) {
        child.children.forEach((nested, key) => {
          if (isFragment(nested) && isArray(nested.children)) {
            extractChildren(nested.children, `${parentKey + key}-`, extractedChildren);
          } else {
            extractedChildren.push(nested as any);
          }
        });
      }
    } else if (isValidElementNode(child)) {
      extractedChildren.push(child);
    }
  });

  return extractedChildren;
}
