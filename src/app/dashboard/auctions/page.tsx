import { Auctions } from "@/components/dashboard/admin/Auctions";
import { PageToolbar } from "@/components/layout/dashboard/PageToolbar";
import React, { Suspense } from "react";
import LoadingSkeleton from "./_skeleton";

type PageProps = {
  searchParams?: {
    page?: string;
    search?: string;
  }
}

export default async function Page({ searchParams }: PageProps) {
  return(
    <>
      <PageToolbar 
        heading="Auctions"
        breadcrumbs={[
          {
            label: "Dashboard",
          }, 
          {
            label: "Auctions",
            active: true,
          }
        ]} />
      <div className="auctions-list">
        <div className="card content-card">
          <div className="card-body">
            <Suspense fallback={<LoadingSkeleton />}>
              <Auctions 
                page={searchParams && searchParams.page ? searchParams.page : "" }  
                search={searchParams && searchParams.search ? searchParams.search : ""}
                />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  )
}

