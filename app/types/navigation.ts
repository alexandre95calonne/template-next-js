export interface NavigationItem {
  name: string;
  href: string;
  description?: string;
  icon?: string;
}

export interface NavigationSection {
  title: string;
  items: NavigationItem[];
}

export interface FooterNavigation {
  main: NavigationItem[];
  social: NavigationItem[];
  resources: NavigationItem[];
}
