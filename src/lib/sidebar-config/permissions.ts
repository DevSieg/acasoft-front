import { Role, NavItem } from "@/types/sidebar"

const hasRole = (userRoles: Role[], required?: Role[]) => {
    if (!required || required.length === 0) return true
    return required.some(r => userRoles.includes(r))
}

export const filterNavForRoles = (nav: NavItem[], roles: Role[]) =>
    nav
        .filter(item => hasRole(roles, item.requiredRoles))
        .map(item => ({
            ...item,
            items: item.items?.filter(sub => hasRole(roles, sub.requiredRoles)),
        }))
        // si el grupo queda sin hijos, lo ocultamos (salvo que no tenga items)
        .filter(item => !item.items || item.items.length > 0)
