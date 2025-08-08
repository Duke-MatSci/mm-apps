import { h, VNode, Slots } from 'vue';
import MdTable from './MdTable.vue';

interface ProcessedChildren {
  childNodes: VNode[];
  slots: Record<string, () => VNode>;
}

function processChildren(children: VNode[]): ProcessedChildren {
  const slotNames = ['md-table-toolbar', 'md-table-empty-state', 'md-table-pagination'];
  const nodes = Array.from(children);
  const namedSlots: Record<string, () => VNode> = {};

  function getTag(node: VNode): string | undefined {
    return node.type && typeof node.type === 'string' ? node.type : undefined;
  }

  nodes.forEach((node, index) => {
    if (node && node.type) {
      const tag = getTag(node);

      if (tag && slotNames.includes(tag)) {
        if (node.props) {
          node.props.slot = tag;
        }
        namedSlots[tag] = () => node;
        nodes.splice(index, 1);
      }
    }
  });

  return {
    childNodes: nodes,
    slots: namedSlots,
  };
}

export default {
  name: 'MdTableContainer',
  setup(props: any, { slots, attrs }: { slots: Slots; attrs: any }) {
    return () => {
      let slotChildren: VNode[] = [];
      let scopedSlots: Record<string, any> = {};

      if (slots.default) {
        const defaultSlots = slots.default();
        if (defaultSlots && Array.isArray(defaultSlots)) {
          const { childNodes, slots: namedSlots } = processChildren(defaultSlots);
          slotChildren = childNodes;
          scopedSlots = {
            ...scopedSlots,
            ...namedSlots,
          };
        }
      }

      return h(
        MdTable,
        {
          ...attrs,
          ...props,
          ...scopedSlots,
        },
        slotChildren
      );
    };
  },
};
