import LayoutWrapper from "@/components/layout-wrapper"
import { NavbarProvider } from "@/components/navbar-context"
import { CourseSidebarProvider } from "@/components/course-sidebar-context"

export default function CourseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <CourseSidebarProvider>
      <NavbarProvider>
        <LayoutWrapper>{children}</LayoutWrapper>
      </NavbarProvider>
    </CourseSidebarProvider>
  )
}
