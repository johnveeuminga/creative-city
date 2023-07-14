import { Artists } from "@/components/dashboard/admin/Artists";
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
        heading="Artists"
        breadcrumbs={[
          {
            label: "Dashboard",
          }, 
          {
            label: "Artists",
            active: true,
          }
        ]} />
      <div className="artists-list">
        <div className="card content-card">
          <div className="card-body">
            <Suspense fallback={<LoadingSkeleton />}>
              <Artists 
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
