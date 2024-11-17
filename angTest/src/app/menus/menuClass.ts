export interface Menu {
    menuId: number;
    menuName: string;
    routerLink: string;
    hasChild: boolean;
    parentMenuId: number;
    childMenu: Menu[];
    isOpen?: boolean; // New property to track open/close state
}


export class menuService {

    buildMenuTree(menuItems: any[]): Menu[] {
        const menuMap = new Map<number, Menu>();

        // Initialize all menu items as Menu objects and store them in a map.
        menuItems.forEach(item => {
            menuMap.set(item.menuId, {
                ...item,
                childMenu: [],
            } as Menu);
        });

        const menuTree: Menu[] = [];

        // Build the hierarchy
        menuMap.forEach(menuItem => {
            if (menuItem.parentMenuId === 0) {
                // Root menu item
                menuTree.push(menuItem);
            } else {
                // Child menu item: add to its parent's childMenu array
                const parentMenu = menuMap.get(menuItem.parentMenuId);
                if (parentMenu) {
                    parentMenu.childMenu.push(menuItem);
                }
            }
        });
        return menuTree;
    }

}