import CreateArtistForm from "@/components/dashboard/admin/CreateArtistForm";
import { PageToolbar } from "@/components/layout/dashboard/PageToolbar";

export default function CreateArtistPage() {
  return (
    <div className="create-artist">
      <PageToolbar 
        heading="Create Artist" 
        breadcrumbs={[
          {
            label: "Dashboard",
          }, 
          {
            label: "Artists",
          },
          {
            label: "Create",
            active: true
          }
        ]} 
      />
      <div className="card content-card">
        <div className="card-body">
          <CreateArtistForm />
        </div>
      </div>
    </div>
  )
}
