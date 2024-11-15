export type SidebarType = {
  _id: number;
  title: string;
  path?: string;
  subList?: SidebarType[];
};
