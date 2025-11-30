export const UserMenuItems = {
  view: { id: 'view', label: 'View User', destructive: false, accent: 'none' },
  edit: { id: 'edit', label: 'Edit Info', destructive: false, accent: 'none' },
  deactivate: {
    id: 'deactivate',
    label: 'Deactivate User',
    destructive: true,
    accent: 'red',
  },
  activate: { id: 'activate', label: 'Activate User', destructive: false, accent: 'blue' },
  approve: { id: 'approve', label: 'Approve', destructive: false, accent: 'blue' },
  reject: { id: 'reject', label: 'Reject', destructive: true, accent: 'red' },
}
