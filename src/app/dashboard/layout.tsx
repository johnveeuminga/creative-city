import DashboardSidebar from '@/components/layout/dashboard/Sidebar';
import DashboardHeader from "@/components/layout/headers/DashboardHeader"

export default function Layout({ children }:  {
  children: React.ReactNode
}) {
  return (
    <div className='dashboard'>
      <DashboardHeader />
      <div className="dashboard-content">
        <DashboardSidebar />
        <main className='dashboard-main-content'>
          { children }
        </main>
      </div>
    </div>
  )
}