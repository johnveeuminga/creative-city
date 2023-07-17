// // 'use client'

// // import { Artist, User } from "@prisma/client";
// // import Link from "next/link";

// // interface ArtistWithUser extends Artist {
// //     user: User;
// // }

// // // This is your ArtistCard component
// // export default function ArtistCard({ artist }: { artist: ArtistWithUser }) {
// //   return (
// //     <Link href={`/artists/${artist.id}`}>
// //       <div className="artist-card card">
// //         <div className="card-body">
// //           <h5 className="card-title">{artist.nickname}</h5>
// //           <p className="artist-card__nickname">Nickname: {artist.nickname || 'N/A'}</p>
// //           <p className="artist-card__story">Story: {artist.myStory || 'N/A'}</p>
// //           <p className="artist-card__bio">Bio: {artist.myBio || 'N/A'}</p>
// //           <p className="artist-card__status">Status: {artist.status}</p>
// //           {/* Add more artist details here as needed */}
// //         </div>
// //       </div>
// //     </Link>
// //   )
// // }
// import { Artist, User } from "@prisma/client";
// import Link from "next/link";

// interface ArtistWithUser extends Artist {
//     user: User;
// }

// export default function ArtistCard({ artist }: { artist: ArtistWithUser }) {
//   return (
//     <Link href={`/artists/${artist.id}`}>
//       <div className="category-item category-item-two mb-25 wow fadeInUp" data-wow-delay=".2s">
//         <div className="category-img">
//           <img src="assets/images/category/cat-1.jpg" alt="Category Image" />
//           <div className="category-overlay">
//             <div className="category-content">
//               <Link href="/index-2" legacyBehavior>
//                 <i className="ti-link" />
//               </Link>
//             </div>
//           </div>
//         </div>
//         <div className="info">
//           <div className="icon">
//             <i className="flaticon-avatar" />
//           </div>
//           <h3 className="title">
//             <a href="#">{artist.nickname}</a>
//           </h3>

//           <div className="artist-details">
//             <p className="listing">15 Listing</p>
//             <p className="listing">{artist.myBio}</p>
//           </div>
          
//           {/* <span className="listing">15 Listing</span>
//           <span className="listing">{artist.myBio}</span> */}
//         </div>
//       </div>
//     </Link>
//   );
// }


// START - new implementation

import { Artist, User } from "@prisma/client";
import Link from "next/link";

interface ArtistWithUser extends Artist {
  user: User;
}

export default function ArtistCard({ artist }: { artist: ArtistWithUser }) {
  return (
    <Link href={`/artists/${artist.id}`}>
      <div className="category-item category-item-two mb-25 wow fadeInUp" data-wow-delay=".2s">
        <div className="category-img">
          <img src="assets/images/category/cat-1.jpg" alt="Category Image" />
          <div className="category-overlay">
            <div className="category-content">
              <Link href="/index-2" legacyBehavior>
                <i className="ti-link" />
              </Link>
            </div>
          </div>
        </div>
        <div className="info">
          <div className="icon">
            <i className="flaticon-avatar" />
          </div>
          <h3 className="title">
            <a href="#">{artist.nickname}</a>
          </h3>

          <div className="artist-details">
            <p className="listing">15 Listing</p>
            <p className="listing">{artist.myBio}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
