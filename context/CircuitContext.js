import { createContext, useContext, useReducer } from 'react';
import { create, all } from 'mathjs';

const math = create(all);

const CircuitContext = createContext();

const initialState = {
  qubits: 3,
  circuit: Array(3).fill().map(() => Array(5).fill(null)),
  history: [],
  historyIndex: -1,
  probabilities: null,
};

const circuitReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_QUBIT': {
      const newState = {
        qubits: state.qubits + 1,
        circuit: [...state.circuit, Array(5).fill(null)],
        history: state.history,
        historyIndex: state.historyIndex,
      };
      return {
        ...newState,
        history: [...state.history.slice(0, state.historyIndex + 1), { qubits: state.qubits, circuit: state.circuit }],
        historyIndex: state.historyIndex + 1,
        probabilities: simulateCircuit(newState.circuit, newState.qubits),
      };
    }
    case 'REMOVE_QUBIT': {
      if (state.qubits <= 1) return state;
      const newState = {
        qubits: state.qubits - 1,
        circuit: state.circuit.slice(0, -1),
        history: state.history,
        historyIndex: state.historyIndex,
      };
      return {
        ...newState,
        history: [...state.history.slice(0, state.historyIndex + 1), { qubits: state.qubits, circuit: state.circuit }],
        historyIndex: state.historyIndex + 1,
        probabilities: simulateCircuit(newState.circuit, newState.qubits),
      };
    }
    case 'ADD_GATE': {
      const { qubit, time, type, targetQubit } = action.payload;
      console.log('Adding gate:', { qubit, time, type, targetQubit });
      const newCircuit = state.circuit.map((row, i) =>
        i === qubit
          ? row.map((cell, j) => (j === time ? { type, targetQubit } : cell))
          : row
      );
      if (type === 'CNOT' && targetQubit !== undefined) {
        newCircuit[targetQubit][time] = { type: 'CNOT_TARGET' };
      }
      const newState = {
        qubits: state.qubits,
        circuit: newCircuit,
        history: state.history,
        historyIndex: state.historyIndex,
      };
      return {
        ...newState,
        history: [...state.history.slice(0, state.historyIndex + 1), { qubits: state.qubits, circuit: state.circuit }],
        historyIndex: state.historyIndex + 1,
        probabilities: simulateCircuit(newCircuit, state.qubits),
      };
    }
    case 'REMOVE_GATE': {
      const { qubit, time } = action.payload;
      const newCircuit = state.circuit.map((row, i) =>
        i === qubit
          ? row.map((cell, j) => (j === time ? null : cell))
          : row
      );
      const newState = {
        qubits: state.qubits,
        circuit: newCircuit,
        history: state.history,
        historyIndex: state.historyIndex,
      };
      return {
        ...newState,
        history: [...state.history.slice(0, state.historyIndex + 1), { qubits: state.qubits, circuit: state.circuit }],
        historyIndex: state.historyIndex + 1,
        probabilities: simulateCircuit(newCircuit, state.qubits),
      };
    }
    case 'UPDATE_GATE': {
      const { removes, adds } = action.payload;
      let newCircuit = state.circuit.map(row => [...row]);

      // Apply all removals
      removes.forEach(({ qubit, time }) => {
        newCircuit = newCircuit.map((row, i) =>
          i === qubit
            ? row.map((cell, j) => (j === time ? null : cell))
            : row
        );
      });

      // Apply all additions
      adds.forEach(({ qubit, time, type, targetQubit }) => {
        newCircuit = newCircuit.map((row, i) =>
          i === qubit
            ? row.map((cell, j) => (j === time ? { type, targetQubit } : cell))
            : row
        );
        if (type === 'CNOT' && targetQubit !== undefined) {
          newCircuit[targetQubit][time] = { type: 'CNOT_TARGET' };
        }
      });

      const newState = {
        qubits: state.qubits,
        circuit: newCircuit,
        history: state.history,
        historyIndex: state.historyIndex,
      };
      return {
        ...newState,
        history: [...state.history.slice(0, state.historyIndex + 1), { qubits: state.qubits, circuit: state.circuit }],
        historyIndex: state.historyIndex + 1,
        probabilities: simulateCircuit(newCircuit, state.qubits),
      };
    }
    case 'UNDO': {
      if (state.historyIndex <= -1) return state;
      const prevState = state.history[state.historyIndex];
      return {
        ...state,
        qubits: prevState.qubits,
        circuit: prevState.circuit,
        historyIndex: state.historyIndex - 1,
        probabilities: simulateCircuit(prevState.circuit, prevState.qubits),
      };
    }
    case 'REDO': {
      if (state.historyIndex >= state.history.length - 1) return state;
      const nextState = state.history[state.historyIndex + 1];
      return {
        ...state,
        qubits: nextState.qubits,
        circuit: nextState.circuit,
        historyIndex: state.historyIndex + 1,
        probabilities: simulateCircuit(nextState.circuit, nextState.qubits),
      };
    }
    default:
      return state;
  }
};

const simulateCircuit = (circuit, qubits) => {
  const dim = 1 << qubits;
  let state = math.zeros(dim, 1);
  state.subset(math.index(0, 0), 1);

  const H = math.matrix([
    [1 / Math.sqrt(2), 1 / Math.sqrt(2)],
    [1 / Math.sqrt(2), -1 / Math.sqrt(2)],
  ]);

  const CNOT = math.matrix([
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 1],
    [0, 0, 1, 0],
  ]);

  for (let time = 0; time < circuit[0].length; time++) {
    for (let qubit = 0; qubit < qubits; qubit++) {
      const gate = circuit[qubit][time];
      if (!gate) continue;

      if (gate.type === 'H') {
        const op = math.kron(
          math.identity(1 << qubit),
          math.kron(H, math.identity(1 << (qubits - qubit - 1)))
        );
        state = math.multiply(op, state);
      } else if (gate.type === 'CNOT') {
        const target = gate.targetQubit;
        if (target >= qubits) continue;

        if (target === qubit + 1) {
          const op = math.kron(
            math.identity(1 << qubit),
            math.kron(CNOT, math.identity(1 << (qubits - qubit - 2)))
          );
          state = math.multiply(op, state);
        }
      }
    }
  }

  const stateArray = state.toArray();
  const probs = {};
  for (let i = 0; i < dim; i++) {
    const basis = i.toString(2).padStart(qubits, '0');
    probs[basis] = Math.pow(math.abs(stateArray[i][0]), 2);
  }
  return probs;
};

export const CircuitProvider = ({ children }) => {
  const [state, dispatch] = useReducer(circuitReducer, {
    ...initialState,
    probabilities: simulateCircuit(initialState.circuit, initialState.qubits),
  });
  return (
    <CircuitContext.Provider value={{ state, dispatch }}>
      {children}
    </CircuitContext.Provider>
  );
};

export const useCircuit = () => useContext(CircuitContext);