// SidebarSkeleton.tsx
import { Skeleton } from '@/components/ui/skeleton';
import { Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarRail } from '@/components/ui/sidebar';

const TeamSwitcherSkeleton = () => (
    <div className="flex items-center gap-2 px-2 py-2">
        <Skeleton className="h-8 w-8 rounded-md" />
        <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-16" />
        </div>
    </div>
);

const NavMainSkeleton = () => (
    <div className="space-y-1 px-2 py-2">
        {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-3 px-2 py-2">
                <Skeleton className="h-5 w-5 rounded" />
                <Skeleton className="h-4 w-32" />
            </div>
        ))}
    </div>
);

const NavUserSkeleton = () => (
    <div className="flex items-center gap-2 px-2 py-2">
        <Skeleton className="h-8 w-8 rounded-full" />
        <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-32" />
        </div>
    </div>
);

export const SidebarSkeleton = ({ ...props }: React.ComponentProps<typeof Sidebar>) => (
    <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
            <TeamSwitcherSkeleton />
        </SidebarHeader>
        <SidebarContent>
            <div className="px-2 py-2">
                <Skeleton className="h-4 w-16 mb-3" />
                <NavMainSkeleton />
            </div>
        </SidebarContent>
        <SidebarFooter>
            <NavUserSkeleton />
        </SidebarFooter>
        <SidebarRail />
    </Sidebar>
);