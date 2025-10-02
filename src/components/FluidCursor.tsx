'use client';
import useFluidCursor from '@/hooks/useFluidCursor';
import { useEffect } from 'react';

const FluidCursor = () => {
  useEffect(() => {
    useFluidCursor();
  }, []);

  return (
    <div className="fixed top-0 left-0 z-0 ">
      <canvas id="fluid" className="h-screen w-screen" />
    </div>
  );
};
export default FluidCursor;
