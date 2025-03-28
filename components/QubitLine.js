import { useDrop } from 'react-dnd';
import { useCircuit } from '../context/CircuitContext';

const QubitLine = ({ index }) => {
  const { state, dispatch } = useCircuit();
  const row = state.circuit[index];

  const handleContextMenu = (e) => {
    e.preventDefault();
    if (state.qubits > 1 && confirm(`Remove qubit ${index}?`)) {
      dispatch({ type: 'REMOVE_QUBIT' });
    }
  };

  // Make the entire qubit line a drop target
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'GATE',
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      const lineRect = document.getElementById(`qubit-line-${index}`).getBoundingClientRect();
      const x = offset.x - lineRect.left;
      const time = Math.floor(x / 50); // Assuming each time slot is 50px wide

      console.log(`Dropping ${item.type} on q[${index}] at time ${time}`);
      console.log('Current circuit state:', state.circuit);

      if (time >= 0 && time < row.length) {
        const removes = [];
        const adds = [];

        // Check for an existing gate at the current position
        const existingGate = state.circuit[index][time];
        console.log(`Existing gate at q[${index}][${time}]:`, existingGate);

        // Clear any existing gate at the current position
        if (existingGate) {
          if (existingGate.type === 'CNOT') {
            const targetQubit = existingGate.targetQubit;
            console.log(`Removing CNOT at q[${index}][${time}] and CNOT_TARGET at q[${targetQubit}][${time}]`);
            if (targetQubit !== undefined && targetQubit < state.qubits) {
              removes.push({ qubit: targetQubit, time });
            }
            removes.push({ qubit: index, time });
          } else if (existingGate.type === 'CNOT_TARGET') {
            // Find the corresponding CNOT gate
            let controlQubit = -1;
            for (let q = 0; q < state.qubits; q++) {
              const gate = state.circuit[q][time];
              if (gate?.type === 'CNOT' && gate.targetQubit === index) {
                controlQubit = q;
                break;
              }
            }
            if (controlQubit !== -1) {
              console.log(`Removing CNOT at q[${controlQubit}][${time}] and CNOT_TARGET at q[${index}][${time}]`);
              removes.push({ qubit: controlQubit, time });
            }
            removes.push({ qubit: index, time });
          } else {
            console.log(`Removing gate at q[${index}][${time}]`);
            removes.push({ qubit: index, time });
          }
        }

        // Add the new gate
        if (item.type === 'H') {
          console.log(`Adding H gate at q[${index}][${time}]`);
          adds.push({ qubit: index, time, type: 'H' });
        } else if (item.type === 'CNOT') {
          if (index < state.qubits - 1) { // Ensure there's a target qubit
            const targetQubit = index + 1;
            const targetExistingGate = state.circuit[targetQubit][time];
            console.log(`Target qubit q[${targetQubit}][${time}] has gate:`, targetExistingGate);

            // Clear any existing gate on the target qubit
            if (targetExistingGate) {
              if (targetExistingGate.type === 'CNOT') {
                const nextTargetQubit = targetExistingGate.targetQubit;
                console.log(`Removing CNOT at q[${targetQubit}][${time}] and CNOT_TARGET at q[${nextTargetQubit}][${time}]`);
                if (nextTargetQubit !== undefined && nextTargetQubit < state.qubits) {
                  removes.push({ qubit: nextTargetQubit, time });
                }
                removes.push({ qubit: targetQubit, time });
              } else if (targetExistingGate.type === 'CNOT_TARGET') {
                let controlQubit = -1;
                for (let q = 0; q < state.qubits; q++) {
                  const gate = state.circuit[q][time];
                  if (gate?.type === 'CNOT' && gate.targetQubit === targetQubit) {
                    controlQubit = q;
                    break;
                  }
                }
                if (controlQubit !== -1) {
                  console.log(`Removing CNOT at q[${controlQubit}][${time}] and CNOT_TARGET at q[${targetQubit}][${time}]`);
                  removes.push({ qubit: controlQubit, time });
                }
                removes.push({ qubit: targetQubit, time });
              } else {
                console.log(`Removing gate at q[${targetQubit}][${time}]`);
                removes.push({ qubit: targetQubit, time });
              }
            }

            // Add the new CNOT gate
            console.log(`Adding CNOT gate at q[${index}][${time}] with target q[${targetQubit}]`);
            adds.push({ qubit: index, time, type: 'CNOT', targetQubit: targetQubit });
          } else {
            console.log(`Cannot place CNOT on q[${index}] - no target qubit available`);
          }
        }

        // Dispatch all changes in a single action
        if (removes.length > 0 || adds.length > 0) {
          console.log('Dispatching UPDATE_GATE with:', { removes, adds });
          dispatch({
            type: 'UPDATE_GATE',
            payload: { removes, adds },
          });
        }
      } else {
        console.log(`Invalid time slot: ${time}`);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      onContextMenu={handleContextMenu}
      style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}
    >
      <span style={{ width: '50px' }}>q[{index}]</span>
      <div
        ref={drop}
        id={`qubit-line-${index}`}
        style={{
          position: 'relative',
          width: '260px',
          height: '50px',
          backgroundColor: isOver ? '#f0f0f0' : 'transparent',
        }}
      >
        <svg width="260" height="50">
          <line
            x1="0"
            y1="25"
            x2="260"
            y2="25"
            stroke="#006A71"
            strokeWidth="2"
            style={{ filter: 'drop-shadow(0 0 4px #006A71)' }} // Glowing effect
          />
          {row.map((gate, time) =>
            gate?.type === 'CNOT' ? (
              <line
                key={time}
                x1={time * 50 + 25}
                y1="25"
                x2={time * 50 + 25}
                y2="75"
                stroke="#48A6A7"
                strokeWidth="2"
                style={{ filter: 'drop-shadow(0 0 4px #48A6A7)' }} // Glowing effect for CNOT lines
              />
            ) : null
          )}
          {row.map((gate, time) =>
            gate ? (
              <g key={time} transform={`translate(${time * 50 + 10}, 10)`}>
                {gate.type === 'H' && (
                  <rect x="0" y="0" width="30" height="30" fill="#006A71" />
                )}
                {gate.type === 'CNOT' && (
                  <circle cx="15" cy="15" r="5" fill="black" />
                )}
                {gate.type === 'CNOT_TARGET' && (
                  <circle cx="15" cy="15" r="10" fill="none" stroke="#e94e77" strokeWidth="2" />
                )}
                <text
                  x="7"
                  y="20"
                  fontSize="12"
                  fill={gate.type === 'H' ? 'white' : 'black'}
                >
                  {gate.type === 'H' ? 'H' : gate.type === 'CNOT' ? '●' : '⊕'}
                </text>
              </g>
            ) : null
          )}
        </svg>
      </div>
    </div>
  );
};

export default QubitLine;