import shareIcon from '@/assets/icons/share.svg'
import editIcon from '@/assets/icons/edit.svg'
import reportRedIcon from '@/assets/icons/report-red.svg'
import reportBlueIcon from '@/assets/icons/report-blue.svg'

const redColor = '#E94135'
const blueColor = '#4285F4'

export const UserMenuItems: Record<
  'view' | 'edit' | 'deactivate' | 'activate' | 'approve' | 'reject',
  {
    id: string
    label: string
    icon?: string
    accent?: string
  }
> = {
  view: {
    id: 'view',
    label: 'View User',
    icon: shareIcon,
  },
  edit: {
    id: 'edit',
    label: 'Edit Info',
    icon: editIcon,
  },
  deactivate: {
    id: 'deactivate',
    label: 'Deactivate User',
    icon: reportRedIcon,
    accent: redColor,
  },
  activate: {
    id: 'activate',
    label: 'Activate User',
    icon: reportBlueIcon,
    accent: blueColor,
  },
  approve: {
    id: 'approve',
    label: 'Approve',
  },
  reject: {
    id: 'reject',
    label: 'Reject',
    accent: redColor,
  },
}
