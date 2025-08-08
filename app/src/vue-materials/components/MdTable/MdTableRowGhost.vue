<script>
import { useSlots, h, VNode } from 'vue';

export default {
  name: 'MdTableRowGhost',
  props: {
    mdIndex: [String, Number],
    mdId: [String, Number],
    mdItem: [Array, Object],
  },
  setup(props) {
    const slots = useSlots();

    const render = () => {
      const defaultSlot = slots.default?.();
      if (!defaultSlot || !defaultSlot[0]) {
        return null;
      }

      const slotVNode = defaultSlot[0];
      if (slotVNode.props) {
        slotVNode.props.mdIndex = props.mdIndex;
        slotVNode.props.mdId = props.mdId;
        slotVNode.props.mdItem = props.mdItem;
      }

      return slotVNode;
    };

    return {
      render,
    };
  },
};
</script>
