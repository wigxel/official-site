"use client"
import { motion, useInView } from 'motion/react';
import React from 'react';

export function SplitHeading({ children }: { children: React.ReactNode[] }) {
  const ref = React.useRef<HTMLHeadingElement>(null);

  const is_in_view = useInView(ref, {
    margin: '-35%',
    once: true,
  });

  // biome-ignore lint/suspicious/noArrayIndexKey: Not necessary
  const entries = children.map((e, index) => <motion.span key={index} layoutId={`card-${index}`}>{e}</motion.span>);

  return <motion.h2 layout ref={ref} className="heading-1 !mb-0 font-heading font-medium">
    {is_in_view
      ? <div className='flex w-full justify-between'>{entries}</div>
      : <div className='flex justify-center'>{entries}</div>
    }
  </motion.h2>

}
