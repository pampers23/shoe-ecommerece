import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  BarChart3, 
  Settings,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { NavLink, useLocation } from "react-router-dom"


const navigationItems = [
    { title: "Dashboard", url: "/", icon: LayoutDashboard },
    { title: "Products", url: "/products", icon: Package },
    { title: "Categories", url: "/categories", icon: ShoppingBag },
    { title: "Analytics", url: "/analytics", icon: BarChart3 },
]

const settingsItems = [
    { title: "Settings", url: "/settings", icon: Settings }
]


const AppSidebar = () => {
    const { state } = useSidebar()
    const location = useLocation()
    const currentPath = location.pathname
    const collapsed = state === "collapsed"

    const isActive = (path: string) => {
        if (path === "/") return currentPath === "/"
        return currentPath.startsWith(path)
    }

    const getNavClassName = (path: string) => {
        const baseClasses = "transition-colors duration-200 flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium"
        return isActive(path)
            ? `${baseClasses} bg-primary text-primary-foreground shadow-soft`
            : `${baseClasses} text-muted-foreground hover:-muted hover:text-foreground`
    }


  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarContent className="bg-gradient-surface border-r">
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Package className="w-4 h-4 text-white" />
            </div>
          {
            !collapsed && (
              <div>
                <h2 className="text-lg font-semibold">ShoeAdmin</h2>
                <p className="text-xs text-muted-foreground">Product Management</p>
              </div>
            )
          }
          </div>
        </div>

        {/* navigation */}
        <SidebarGroup className="px-4">
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            {!collapsed && "Navigation"}
          </SidebarGroupLabel>
          <SidebarContent>
            <SidebarMenu className="space-y-1">
              {
                navigationItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url} className={getNavClassName(item.url)}>
                        <item.icon className="w-4 h-4 flex-shrink-0" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              }
            </SidebarMenu>
          </SidebarContent>
        </SidebarGroup>

        {/* settings */}
        <SidebarGroup className="px-4 mt-auto">
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            {!collapsed && "Settings"}
          </SidebarGroupLabel>
          <SidebarMenu>
            {
              settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClassName(item.url)}>
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))
            }
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default AppSidebar
