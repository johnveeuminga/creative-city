import React from "react";

// export default function PrevArrow({ className, onClick, icon, extraClass }: {
//   className: any,
//   onClick: any,
//   icon: any,
//   extraClass: string
// }) {
export default function PrevArrow({
  extraClass,
  className,
  onClick,
  icon,
}: {
  extraClass?: string,
  className?: any,
  onClick?: any,
  icon?: any
}) {
  return (
    <div
      className={`${extraClass ? extraClass : className} slick-arrow`}
      onClick={onClick}
    >
      <i className={icon ? icon : "ti-arrow-left"}></i>
    </div>
  );
}
