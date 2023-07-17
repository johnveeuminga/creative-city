'use client'

import { ArtworkWithArtistAndMedia } from "@/types/types";
import MoneyFormat from "../MoneyFormat";
import {useEffect, useLayoutEffect, useRef, useTransition } from "react";
import { doCreateInvoice } from "@/actions/orders";
import { redirect, useRouter } from "next/navigation";

export default function ArtworkStickyDescription({ artwork }: { artwork: ArtworkWithArtistAndMedia }) {
  const div = useRef<HTMLDivElement>(null);
  const router = useRouter()
  let [isPending, startTransition] = useTransition()


  const handleOnClick = async () => {
    startTransition(async () => {
      const res = await doCreateInvoice(artwork.id.toString())
      router.push(res.redirectUrl)
    })
  }

  
  useEffect(() => {
    if(!div.current) return
    
    const divAnimate = div.current.getBoundingClientRect().top;
    const width = div.current.offsetWidth;


    const onScroll = () => {
      if(div.current) {
        if (divAnimate < (window.scrollY + 124)) {
          div.current.style.position = "fixed";
          div.current.style.top = '120px';
          div.current.style.float = 'right';
          div.current.style.width = `${width}px`;
        } else {
          div.current.style.position = "relative";
          div.current.style.top = '0';
          div.current.style.float = 'none';
        }
      }
    }

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={div} className="artwork-details">
      <h1 className="fw-semibold">{ artwork.name }</h1>
      <h5>{ artwork.artist.name }</h5>
      <p className="fs-5 py-5">{ artwork.description }</p>
      {
        artwork.inStock &&
          <div className="price d-flex align-items-center">
            <h5 className="me-3 mb-0 fw-bold"><MoneyFormat value={artwork.price?.toString() ?? "0" }/></h5>
              <button 
                disabled={isPending}
                onClick={() => handleOnClick()}
                className="btn btn-outline-primary">
                Buy Now
              </button>
          </div>
      }
      {
        !artwork.inStock &&
          <p>* Artwork not in stock</p>
      }
    </div>
  )
}