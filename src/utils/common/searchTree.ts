// @ts-nocheck
/* eslint-disable */

function helperCreateTreeFunc(handle) {
  return function (obj, iterate, options, context) {
    const opts = options || {};
    const optChildren = opts.children || 'children';
    return handle(null, obj, iterate, context, [], [], optChildren, opts);
  };
}

function searchTreeItem(
  parentAllow,
  parent,
  obj,
  iterate,
  context,
  path,
  node,
  parseChildren,
  opts
) {
  let paths, nodes, rest, isAllow, hasChild;
  const rests = [];
  const hasOriginal = opts.original;
  const sourceData = opts.data;
  const mapChildren = opts.mapChildren || parseChildren;
  if (obj) {
    obj.forEach(function (item, index) {
      paths = path.concat(['' + index]);
      nodes = node.concat([item]);
      isAllow = parentAllow || iterate.call(context, item, index, obj, paths, parent, nodes);
      hasChild = parseChildren && item[parseChildren];
      if (isAllow || hasChild) {
        if (hasOriginal) {
          rest = item;
        } else {
          rest = Object.assign({}, item);
          if (sourceData) {
            rest[sourceData] = item;
          }
        }
        rest[mapChildren] = searchTreeItem(
          isAllow,
          item,
          item[parseChildren],
          iterate,
          context,
          paths,
          nodes,
          parseChildren,
          opts
        );
        if (isAllow || rest[mapChildren].length) {
          rests.push(rest);
        }
      } else if (isAllow) {
        rests.push(rest);
      }
    });
  }
  return rests;
}

/**
 * 从树结构中根据回调查找数据
 *
 * @param {Object} obj 对象/数组
 * @param {Function} iterate(item, index, items, path, parent, nodes) 回调
 * @param {Object} options {children: 'children'}
 * @param {Object} context 上下文
 * @return {Array}
 */
export const searchTree = helperCreateTreeFunc(function (
  parent,
  obj,
  iterate,
  context,
  path,
  nodes,
  parseChildren,
  opts
) {
  return searchTreeItem(0, parent, obj, iterate, context, path, nodes, parseChildren, opts);
});
