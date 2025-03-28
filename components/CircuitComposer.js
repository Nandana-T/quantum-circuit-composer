import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useCircuit } from '../context/CircuitContext';
import QubitLine from './QubitLine';
import Gate from './Gate';
import ProbabilityChart from './ProbabilityChart';
import dynamic from 'next/dynamic';

const QSphere = dynamic(() => import('./Qsphere'), {
  ssr: true,
});

const CircuitComposer = () => {
  const { state, dispatch } = useCircuit();
  const qubitLines = Array.from({ length: state.qubits }, (_, i) => (
    <QubitLine key={i} index={i} />
  ));

  const hasCNOT = state.circuit.some(row => row.some(gate => gate?.type === 'CNOT'));
  const hasH = state.circuit.some(row => row.some(gate => gate?.type === 'H'));

  const generateOpenQASM = () => {
    let qasm = 'OPENQASM 2.0;\n';
    qasm += 'include "qelib1.inc";\n';
    qasm += `qreg q[${state.qubits}];\n`;
    qasm += `creg c[${state.qubits}];\n`;

    for (let time = 0; time < state.circuit[0].length; time++) {
      for (let qubit = 0; qubit < state.qubits; qubit++) {
        const gate = state.circuit[qubit][time];
        if (gate) {
          if (gate.type === 'H') {
            qasm += `h q[${qubit}];\n`;
          } else if (gate.type === 'CNOT') {
            qasm += `cx q[${qubit}],q[${gate.targetQubit}];\n`;
          }
        }
      }
    }

    return qasm;
  };

  return (
    <DndProvider backend={HTML5Backend} style={{ backgroundColor: '#F2EFE7' }}>
      <div style={{ justifyItems: 'center', backgroundColor: '#F2EFE7', padding: '10px', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', width: '1000px', height: '45px', boxShadow: '0 4px 8px rgb(0, 106, 113)' }}>
          Quantum Circuit Composer
        </h1>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
        <Gate type="H" />
        <Gate type="CNOT" />
        <button onClick={() => dispatch({ type: 'ADD_QUBIT' })} style={{ 
          backgroundColor: '#F2EFE7', 
          color: '#006A71', 
          padding: '8px 16px', 
          border: '2px solid #006A71', 
          borderRadius: '5px', 
          fontSize: '16px', 
          fontWeight: 'bold', 
          cursor: 'pointer' 
        }}>
          Add Qubit
        </button>
        <button onClick={() => dispatch({ type: 'UNDO' })} style={{ 
          backgroundColor: '#F2EFE7', 
          color: '#006A71', 
          padding: '8px 16px', 
          border: '2px solid #006A71', 
          borderRadius: '5px', 
          fontSize: '16px', 
          fontWeight: 'bold', 
          cursor: 'pointer' 
        }}>
          Undo
        </button>
        <button onClick={() => dispatch({ type: 'REDO' })} style={{ 
          backgroundColor: '#F2EFE7', 
          color: '#006A71', 
          padding: '8px 16px', 
          border: '2px solid #006A71', 
          borderRadius: '5px', 
          fontSize: '16px', 
          fontWeight: 'bold', 
          cursor: 'pointer' 
        }}>
          Redo
        </button>
      </div>


        <div>{qubitLines}</div>
        <div style={{ marginTop: '20px', padding: '10px', width: '1000px', background: '#48A6A7', borderRadius: '4px' }}>
          <h3>Circuit Explanation</h3>
          <p>
            {hasH && !hasCNOT && 'This circuit uses the Hadamard (H) gate to create superposition.'}
            {hasCNOT && 'This circuit uses the CNOT gate to entangle qubits.'}
            {!hasH && !hasCNOT && 'Drop gates onto the qubit lines to build your quantum circuit!'}
            {hasH && hasCNOT && 'This circuit creates superposition and entanglement, a foundation for quantum computing!'}
          </p>
        </div>
        <div className="visualization-section" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: '20px', marginTop: '20px' }}>
          <ProbabilityChart probabilities={state.probabilities} />
          <QSphere probabilities={state.probabilities} />
        </div>
        <div className="openqasm-box" style={{ background: '#48A6A7', width: '1000px', boxShadow: '0 8px 12px rgb(0, 106, 113)' }}>
          <h3>OpenQASM 2.0</h3>
          <pre>{generateOpenQASM()}</pre>
        </div>
      </div>
    </DndProvider>
  );
};

export default CircuitComposer;