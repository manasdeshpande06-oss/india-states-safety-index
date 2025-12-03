"use client";

import React, { ReactNode } from 'react';

interface TooltipProps {
  children: ReactNode;
  text: string;
  id?: string;
}

export default function Tooltip({ children, text, id }: TooltipProps) {
  return (
    <span className="tooltip-wrapper" tabIndex={0} aria-describedby={id}>
      {children}
      <span role="tooltip" id={id} className="tooltip">
        {text}
      </span>
    </span>
  );
}
