import { PurchasesTable } from "@/components/dashboard/PurchasesTable";
import { getServerSession } from "@/lib/server/auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function PurchasePage() {
  const session = await getServerSession();

  if(!session.user) 
    return redirect(`${process.env.APP_URL}/401`)    

  return (
    <div className="purchase-page">
      <div className="container-fluid">
        <h4>My Purchases</h4>
        <div className="card shadow-sm">
          <div className="card-body">
            <React.Suspense>
              <PurchasesTable user={session.user} />
            </React.Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}