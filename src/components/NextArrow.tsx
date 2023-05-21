import React from 'react';

export default function NextArrow({ className, onClick, icon, extraClass }: {
  className?: any,
  onClick?: any,
  icon?: any,
  extraClass?: string
}) {
  return (
    <div
      className={`${extraClass ? extraClass : className} slick-arrow`}
      onClick={onClick}
    >
      <i className={icon ? icon : "ti-arrow-right"}></i>
    </div>
  );
}
