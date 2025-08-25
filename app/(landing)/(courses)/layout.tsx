import LayoutWrapper from "@/components/layout-wrapper"
import { NavbarProvider } from "@/components/navbar-context"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function CourseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <NavbarProvider>
        <LayoutWrapper>{children}</LayoutWrapper>
      </NavbarProvider>
    </SidebarProvider>
  )
}
