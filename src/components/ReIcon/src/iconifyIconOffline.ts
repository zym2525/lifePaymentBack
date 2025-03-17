import { h, defineComponent } from 'vue';
import {
  Icon as IconifyIcon,
  addIcon,
  IconifyIcon as IconifyIconType,
} from '@iconify/vue/dist/offline';
import type { PropType } from 'vue';

// element-plus icon
import Tickets from '@iconify-icons/ep/tickets';
import RefreshRight from '@iconify-icons/ep/refresh-right';
import ArrowDown from '@iconify-icons/ep/arrow-down';
import CloseBold from '@iconify-icons/ep/close-bold';
import Delete from '@iconify-icons/ep/delete';
import Search from '@iconify-icons/ep/search';
import UserFilled from '@iconify-icons/ep/user-filled';
import Lock from '@iconify-icons/ep/lock';
import Plus from '@iconify-icons/ep/plus';

// remixicon
import arrowRightSLine from '@iconify-icons/ri/arrow-right-s-line';
import arrowLeftSLine from '@iconify-icons/ri/arrow-left-s-line';
import logoutCircleRLine from '@iconify-icons/ri/logout-circle-r-line';

const IconMap: Record<string, IconifyIconType> = {
  tickets: Tickets,
  'refresh-right': RefreshRight,
  'arrow-down': ArrowDown,
  'close-bold': CloseBold,
  delete: Delete,
  search: Search,
  'arrow-right-s-line': arrowRightSLine,
  'arrow-left-s-line': arrowLeftSLine,
  'logout-circle-r-line': logoutCircleRLine,
  userFilled: UserFilled,
  lock: Lock,
  plus: Plus,
};

for (const iconName in IconMap) {
  addIcon(iconName, IconMap[iconName]);
}

// Iconify Icon在Vue里离线使用（用于内网环境）https://docs.iconify.design/icon-components/vue/offline.html
export default defineComponent({
  name: 'IconifyIcon',
  components: { IconifyIcon },
  props: {
    icon: {
      type: String as PropType<keyof typeof IconMap>,
      required: true,
    },
  },
  render() {
    const attrs = this.$attrs;
    return h(
      IconifyIcon,
      {
        icon: `${this.icon}`,
        ...attrs,
      },
      {
        default: () => [],
      }
    );
  },
});
