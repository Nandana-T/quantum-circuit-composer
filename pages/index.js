import dynamic from 'next/dynamic';
import { CircuitProvider } from '../context/CircuitContext';
import { div } from 'three/tsl';

// Dynamically import CircuitComposer with SSR disabled
const CircuitComposer = dynamic(() => import('../components/CircuitComposer'), {
  ssr: false, // Disable server-side rendering
});

export default function Home() {
  return (
    <div style={{backgroundColor:'#F2EFE7'}}>
      <CircuitProvider >
      <CircuitComposer />
    </CircuitProvider>
    </div>
    
  );
}