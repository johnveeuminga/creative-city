import { PageToolbar } from "@/components/layout/dashboard/PageToolbar";

export default async function CreateAuctionPage() {
  return (
    <div className="create-auction">
      <PageToolbar 
        heading="Create Auction" 
        breadcrumbs={[
          {
            label: "Dashboard",
          }, 
          {
            label: "Auctions",
          },
          {
            label: "Create",
            active: true
          }
        ]} 
      />
      <div className="card content-card">
        <div className="card-body">
          <p>Create Auction</p>
        </div>
      </div>
    </div>
  )
}