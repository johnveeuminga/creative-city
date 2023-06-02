import DashboardSidebar from '@/components/layout/dashboard/Sidebar';
import DashboardHeader from "@/components/layout/headers/DashboardHeader"
import { Suspense } from 'react';

export default function Layout({ children }:  {
  children: React.ReactNode
}) {
  return (
    <div className='dashboard'>
      {/* @ts-expect-error Server Component */}
      <DashboardHeader />
      <div className="dashboard-content">
        {/* @ts-expect-error Server Component */}
        <DashboardSidebar />
        <main className='dashboard-main-content'>
          { children }
        </main>
      </div>
    </div>
  )
}