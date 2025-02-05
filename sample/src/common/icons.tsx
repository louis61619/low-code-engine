import Drag from '@iconify/icons-material-symbols/drag-indicator';
import Delete from '@iconify/icons-material-symbols/delete-sharp';
import { Icon } from '@iconify/react';

type IconProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const DragIcon: React.FC<IconProps> = ({ ...props }) => (
  <div {...props}>
    <Icon icon={Drag} />
  </div>
);

export const DeleteIcon: React.FC<IconProps> = ({ ...props }) => (
  <div {...props}>
    <Icon icon={Delete} />
  </div>
);
