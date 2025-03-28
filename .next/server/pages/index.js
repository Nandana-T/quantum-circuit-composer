"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/index";
exports.ids = ["pages/index"];
exports.modules = {

/***/ "(pages-dir-node)/./context/CircuitContext.js":
/*!***********************************!*\
  !*** ./context/CircuitContext.js ***!
  \***********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   CircuitProvider: () => (/* binding */ CircuitProvider),\n/* harmony export */   useCircuit: () => (/* binding */ useCircuit)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var mathjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mathjs */ \"mathjs\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([mathjs__WEBPACK_IMPORTED_MODULE_2__]);\nmathjs__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\nconst math = (0,mathjs__WEBPACK_IMPORTED_MODULE_2__.create)(mathjs__WEBPACK_IMPORTED_MODULE_2__.all);\nconst CircuitContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)();\nconst initialState = {\n    qubits: 3,\n    circuit: Array(3).fill().map(()=>Array(5).fill(null)),\n    history: [],\n    historyIndex: -1,\n    probabilities: null\n};\nconst circuitReducer = (state, action)=>{\n    switch(action.type){\n        case 'ADD_QUBIT':\n            {\n                const newState = {\n                    qubits: state.qubits + 1,\n                    circuit: [\n                        ...state.circuit,\n                        Array(5).fill(null)\n                    ],\n                    history: state.history,\n                    historyIndex: state.historyIndex\n                };\n                return {\n                    ...newState,\n                    history: [\n                        ...state.history.slice(0, state.historyIndex + 1),\n                        {\n                            qubits: state.qubits,\n                            circuit: state.circuit\n                        }\n                    ],\n                    historyIndex: state.historyIndex + 1,\n                    probabilities: simulateCircuit(newState.circuit, newState.qubits)\n                };\n            }\n        case 'REMOVE_QUBIT':\n            {\n                if (state.qubits <= 1) return state;\n                const newState = {\n                    qubits: state.qubits - 1,\n                    circuit: state.circuit.slice(0, -1),\n                    history: state.history,\n                    historyIndex: state.historyIndex\n                };\n                return {\n                    ...newState,\n                    history: [\n                        ...state.history.slice(0, state.historyIndex + 1),\n                        {\n                            qubits: state.qubits,\n                            circuit: state.circuit\n                        }\n                    ],\n                    historyIndex: state.historyIndex + 1,\n                    probabilities: simulateCircuit(newState.circuit, newState.qubits)\n                };\n            }\n        case 'ADD_GATE':\n            {\n                const { qubit, time, type, targetQubit } = action.payload;\n                console.log('Adding gate:', {\n                    qubit,\n                    time,\n                    type,\n                    targetQubit\n                });\n                const newCircuit = state.circuit.map((row, i)=>i === qubit ? row.map((cell, j)=>j === time ? {\n                            type,\n                            targetQubit\n                        } : cell) : row);\n                if (type === 'CNOT' && targetQubit !== undefined) {\n                    newCircuit[targetQubit][time] = {\n                        type: 'CNOT_TARGET'\n                    };\n                }\n                const newState = {\n                    qubits: state.qubits,\n                    circuit: newCircuit,\n                    history: state.history,\n                    historyIndex: state.historyIndex\n                };\n                return {\n                    ...newState,\n                    history: [\n                        ...state.history.slice(0, state.historyIndex + 1),\n                        {\n                            qubits: state.qubits,\n                            circuit: state.circuit\n                        }\n                    ],\n                    historyIndex: state.historyIndex + 1,\n                    probabilities: simulateCircuit(newCircuit, state.qubits)\n                };\n            }\n        case 'REMOVE_GATE':\n            {\n                const { qubit, time } = action.payload;\n                const newCircuit = state.circuit.map((row, i)=>i === qubit ? row.map((cell, j)=>j === time ? null : cell) : row);\n                const newState = {\n                    qubits: state.qubits,\n                    circuit: newCircuit,\n                    history: state.history,\n                    historyIndex: state.historyIndex\n                };\n                return {\n                    ...newState,\n                    history: [\n                        ...state.history.slice(0, state.historyIndex + 1),\n                        {\n                            qubits: state.qubits,\n                            circuit: state.circuit\n                        }\n                    ],\n                    historyIndex: state.historyIndex + 1,\n                    probabilities: simulateCircuit(newCircuit, state.qubits)\n                };\n            }\n        case 'UPDATE_GATE':\n            {\n                const { removes, adds } = action.payload;\n                let newCircuit = state.circuit.map((row)=>[\n                        ...row\n                    ]);\n                // Apply all removals\n                removes.forEach(({ qubit, time })=>{\n                    newCircuit = newCircuit.map((row, i)=>i === qubit ? row.map((cell, j)=>j === time ? null : cell) : row);\n                });\n                // Apply all additions\n                adds.forEach(({ qubit, time, type, targetQubit })=>{\n                    newCircuit = newCircuit.map((row, i)=>i === qubit ? row.map((cell, j)=>j === time ? {\n                                type,\n                                targetQubit\n                            } : cell) : row);\n                    if (type === 'CNOT' && targetQubit !== undefined) {\n                        newCircuit[targetQubit][time] = {\n                            type: 'CNOT_TARGET'\n                        };\n                    }\n                });\n                const newState = {\n                    qubits: state.qubits,\n                    circuit: newCircuit,\n                    history: state.history,\n                    historyIndex: state.historyIndex\n                };\n                return {\n                    ...newState,\n                    history: [\n                        ...state.history.slice(0, state.historyIndex + 1),\n                        {\n                            qubits: state.qubits,\n                            circuit: state.circuit\n                        }\n                    ],\n                    historyIndex: state.historyIndex + 1,\n                    probabilities: simulateCircuit(newCircuit, state.qubits)\n                };\n            }\n        case 'UNDO':\n            {\n                if (state.historyIndex <= -1) return state;\n                const prevState = state.history[state.historyIndex];\n                return {\n                    ...state,\n                    qubits: prevState.qubits,\n                    circuit: prevState.circuit,\n                    historyIndex: state.historyIndex - 1,\n                    probabilities: simulateCircuit(prevState.circuit, prevState.qubits)\n                };\n            }\n        case 'REDO':\n            {\n                if (state.historyIndex >= state.history.length - 1) return state;\n                const nextState = state.history[state.historyIndex + 1];\n                return {\n                    ...state,\n                    qubits: nextState.qubits,\n                    circuit: nextState.circuit,\n                    historyIndex: state.historyIndex + 1,\n                    probabilities: simulateCircuit(nextState.circuit, nextState.qubits)\n                };\n            }\n        default:\n            return state;\n    }\n};\nconst simulateCircuit = (circuit, qubits)=>{\n    const dim = 1 << qubits;\n    let state = math.zeros(dim, 1);\n    state.subset(math.index(0, 0), 1);\n    const H = math.matrix([\n        [\n            1 / Math.sqrt(2),\n            1 / Math.sqrt(2)\n        ],\n        [\n            1 / Math.sqrt(2),\n            -1 / Math.sqrt(2)\n        ]\n    ]);\n    const CNOT = math.matrix([\n        [\n            1,\n            0,\n            0,\n            0\n        ],\n        [\n            0,\n            1,\n            0,\n            0\n        ],\n        [\n            0,\n            0,\n            0,\n            1\n        ],\n        [\n            0,\n            0,\n            1,\n            0\n        ]\n    ]);\n    for(let time = 0; time < circuit[0].length; time++){\n        for(let qubit = 0; qubit < qubits; qubit++){\n            const gate = circuit[qubit][time];\n            if (!gate) continue;\n            if (gate.type === 'H') {\n                const op = math.kron(math.identity(1 << qubit), math.kron(H, math.identity(1 << qubits - qubit - 1)));\n                state = math.multiply(op, state);\n            } else if (gate.type === 'CNOT') {\n                const target = gate.targetQubit;\n                if (target >= qubits) continue;\n                if (target === qubit + 1) {\n                    const op = math.kron(math.identity(1 << qubit), math.kron(CNOT, math.identity(1 << qubits - qubit - 2)));\n                    state = math.multiply(op, state);\n                }\n            }\n        }\n    }\n    const stateArray = state.toArray();\n    const probs = {};\n    for(let i = 0; i < dim; i++){\n        const basis = i.toString(2).padStart(qubits, '0');\n        probs[basis] = Math.pow(math.abs(stateArray[i][0]), 2);\n    }\n    return probs;\n};\nconst CircuitProvider = ({ children })=>{\n    const [state, dispatch] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useReducer)(circuitReducer, {\n        ...initialState,\n        probabilities: simulateCircuit(initialState.circuit, initialState.qubits)\n    });\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(CircuitContext.Provider, {\n        value: {\n            state,\n            dispatch\n        },\n        children: children\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\elang\\\\OneDrive\\\\Desktop\\\\quantum_computing\\\\context\\\\CircuitContext.js\",\n        lineNumber: 214,\n        columnNumber: 5\n    }, undefined);\n};\nconst useCircuit = ()=>(0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(CircuitContext);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL2NvbnRleHQvQ2lyY3VpdENvbnRleHQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBOEQ7QUFDekI7QUFFckMsTUFBTUssT0FBT0YsOENBQU1BLENBQUNDLHVDQUFHQTtBQUV2QixNQUFNRSwrQkFBaUJOLG9EQUFhQTtBQUVwQyxNQUFNTyxlQUFlO0lBQ25CQyxRQUFRO0lBQ1JDLFNBQVNDLE1BQU0sR0FBR0MsSUFBSSxHQUFHQyxHQUFHLENBQUMsSUFBTUYsTUFBTSxHQUFHQyxJQUFJLENBQUM7SUFDakRFLFNBQVMsRUFBRTtJQUNYQyxjQUFjLENBQUM7SUFDZkMsZUFBZTtBQUNqQjtBQUVBLE1BQU1DLGlCQUFpQixDQUFDQyxPQUFPQztJQUM3QixPQUFRQSxPQUFPQyxJQUFJO1FBQ2pCLEtBQUs7WUFBYTtnQkFDaEIsTUFBTUMsV0FBVztvQkFDZlosUUFBUVMsTUFBTVQsTUFBTSxHQUFHO29CQUN2QkMsU0FBUzsyQkFBSVEsTUFBTVIsT0FBTzt3QkFBRUMsTUFBTSxHQUFHQyxJQUFJLENBQUM7cUJBQU07b0JBQ2hERSxTQUFTSSxNQUFNSixPQUFPO29CQUN0QkMsY0FBY0csTUFBTUgsWUFBWTtnQkFDbEM7Z0JBQ0EsT0FBTztvQkFDTCxHQUFHTSxRQUFRO29CQUNYUCxTQUFTOzJCQUFJSSxNQUFNSixPQUFPLENBQUNRLEtBQUssQ0FBQyxHQUFHSixNQUFNSCxZQUFZLEdBQUc7d0JBQUk7NEJBQUVOLFFBQVFTLE1BQU1ULE1BQU07NEJBQUVDLFNBQVNRLE1BQU1SLE9BQU87d0JBQUM7cUJBQUU7b0JBQzlHSyxjQUFjRyxNQUFNSCxZQUFZLEdBQUc7b0JBQ25DQyxlQUFlTyxnQkFBZ0JGLFNBQVNYLE9BQU8sRUFBRVcsU0FBU1osTUFBTTtnQkFDbEU7WUFDRjtRQUNBLEtBQUs7WUFBZ0I7Z0JBQ25CLElBQUlTLE1BQU1ULE1BQU0sSUFBSSxHQUFHLE9BQU9TO2dCQUM5QixNQUFNRyxXQUFXO29CQUNmWixRQUFRUyxN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S0FBS2dELFFBQVEsQ0FBQyxLQUFNN0MsU0FBU2UsUUFBUTtvQkFFdkROLFFBQVFaLEtBQUtpRCxRQUFRLENBQUNILElBQUlsQztnQkFDNUI7WUFDRjtRQUNGO0lBQ0Y7SUFFQSxNQUFNdUMsYUFBYXZDLE1BQU13QyxPQUFPO0lBQ2hDLE1BQU1DLFFBQVEsQ0FBQztJQUNmLElBQUssSUFBSTNCLElBQUksR0FBR0EsSUFBSVUsS0FBS1YsSUFBSztRQUM1QixNQUFNNEIsUUFBUTVCLEVBQUU2QixRQUFRLENBQUMsR0FBR0MsUUFBUSxDQUFDckQsUUFBUTtRQUM3Q2tELEtBQUssQ0FBQ0MsTUFBTSxHQUFHWixLQUFLZSxHQUFHLENBQUN6RCxLQUFLMEQsR0FBRyxDQUFDUCxVQUFVLENBQUN6QixFQUFFLENBQUMsRUFBRSxHQUFHO0lBQ3REO0lBQ0EsT0FBTzJCO0FBQ1Q7QUFFTyxNQUFNTSxrQkFBa0IsQ0FBQyxFQUFFQyxRQUFRLEVBQUU7SUFDMUMsTUFBTSxDQUFDaEQsT0FBT2lELFNBQVMsR0FBR2hFLGlEQUFVQSxDQUFDYyxnQkFBZ0I7UUFDbkQsR0FBR1QsWUFBWTtRQUNmUSxlQUFlTyxnQkFBZ0JmLGFBQWFFLE9BQU8sRUFBRUYsYUFBYUMsTUFBTTtJQUMxRTtJQUNBLHFCQUNFLDhEQUFDRixlQUFlNkQsUUFBUTtRQUFDQyxPQUFPO1lBQUVuRDtZQUFPaUQ7UUFBUztrQkFDL0NEOzs7Ozs7QUFHUCxFQUFFO0FBRUssTUFBTUksYUFBYSxJQUFNcEUsaURBQVVBLENBQUNLLGdCQUFnQiIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxlbGFuZ1xcT25lRHJpdmVcXERlc2t0b3BcXHF1YW50dW1fY29tcHV0aW5nXFxjb250ZXh0XFxDaXJjdWl0Q29udGV4dC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVDb250ZXh0LCB1c2VDb250ZXh0LCB1c2VSZWR1Y2VyIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBjcmVhdGUsIGFsbCB9IGZyb20gJ21hdGhqcyc7XHJcblxyXG5jb25zdCBtYXRoID0gY3JlYXRlKGFsbCk7XHJcblxyXG5jb25zdCBDaXJjdWl0Q29udGV4dCA9IGNyZWF0ZUNvbnRleHQoKTtcclxuXHJcbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcclxuICBxdWJpdHM6IDMsXHJcbiAgY2lyY3VpdDogQXJyYXkoMykuZmlsbCgpLm1hcCgoKSA9PiBBcnJheSg1KS5maWxsKG51bGwpKSxcclxuICBoaXN0b3J5OiBbXSxcclxuICBoaXN0b3J5SW5kZXg6IC0xLFxyXG4gIHByb2JhYmlsaXRpZXM6IG51bGwsXHJcbn07XHJcblxyXG5jb25zdCBjaXJjdWl0UmVkdWNlciA9IChzdGF0ZSwgYWN0aW9uKSA9PiB7XHJcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xyXG4gICAgY2FzZSAnQUREX1FVQklUJzoge1xyXG4gICAgICBjb25zdCBuZXdTdGF0ZSA9IHtcclxuICAgICAgICBxdWJpdHM6IHN0YXRlLnF1Yml0cyArIDEsXHJcbiAgICAgICAgY2lyY3VpdDogWy4uLnN0YXRlLmNpcmN1aXQsIEFycmF5KDUpLmZpbGwobnVsbCldLFxyXG4gICAgICAgIGhpc3Rvcnk6IHN0YXRlLmhpc3RvcnksXHJcbiAgICAgICAgaGlzdG9yeUluZGV4OiBzdGF0ZS5oaXN0b3J5SW5kZXgsXHJcbiAgICAgIH07XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgLi4ubmV3U3RhdGUsXHJcbiAgICAgICAgaGlzdG9yeTogWy4uLnN0YXRlLmhpc3Rvcnkuc2xpY2UoMCwgc3RhdGUuaGlzdG9yeUluZGV4ICsgMSksIHsgcXViaXRzOiBzdGF0ZS5xdWJpdHMsIGNpcmN1aXQ6IHN0YXRlLmNpcmN1aXQgfV0sXHJcbiAgICAgICAgaGlzdG9yeUluZGV4OiBzdGF0ZS5oaXN0b3J5SW5kZXggKyAxLFxyXG4gICAgICAgIHByb2JhYmlsaXRpZXM6IHNpbXVsYXRlQ2lyY3VpdChuZXdTdGF0ZS5jaXJjdWl0LCBuZXdTdGF0ZS5xdWJpdHMpLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgY2FzZSAnUkVNT1ZFX1FVQklUJzoge1xyXG4gICAgICBpZiAoc3RhdGUucXViaXRzIDw9IDEpIHJldHVybiBzdGF0ZTtcclxuICAgICAgY29uc3QgbmV3U3RhdGUgPSB7XHJcbiAgICAgICAgcXViaXRzOiBzdGF0ZS5xdWJpdHMgLSAxLFxyXG4gICAgICAgIGNpcmN1aXQ6IHN0YXRlLmNpcmN1aXQuc2xpY2UoMCwgLTEpLFxyXG4gICAgICAgIGhpc3Rvcnk6IHN0YXRlLmhpc3RvcnksXHJcbiAgICAgICAgaGlzdG9yeUluZGV4OiBzdGF0ZS5oaXN0b3J5SW5kZXgsXHJcbiAgICAgIH07XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgLi4ubmV3U3RhdGUsXHJcbiAgICAgICAgaGlzdG9yeTogWy4uLnN0YXRlLmhpc3Rvcnkuc2xpY2UoMCwgc3RhdGUuaGlzdG9yeUluZGV4ICsgMSksIHsgcXViaXRzOiBzdGF0ZS5xdWJpdHMsIGNpcmN1aXQ6IHN0YXRlLmNpcmN1aXQgfV0sXHJcbiAgICAgICAgaGlzdG9yeUluZGV4OiBzdGF0ZS5oaXN0b3J5SW5kZXggKyAxLFxyXG4gICAgICAgIHByb2JhYmlsaXRpZXM6IHNpbXVsYXRlQ2lyY3VpdChuZXdTdGF0ZS5jaXJjdWl0LCBuZXdTdGF0ZS5xdWJpdHMpLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgY2FzZSAnQUREX0dBVEUnOiB7XHJcbiAgICAgIGNvbnN0IHsgcXViaXQsIHRpbWUsIHR5cGUsIHRhcmdldFF1Yml0IH0gPSBhY3Rpb24ucGF5bG9hZDtcclxuICAgICAgY29uc29sZS5sb2coJ0FkZGluZyBnYXRlOicsIHsgcXViaXQsIHRpbWUsIHR5cGUsIHRhcmdldFF1Yml0IH0pO1xyXG4gICAgICBjb25zdCBuZXdDaXJjdWl0ID0gc3RhdGUuY2lyY3VpdC5tYXAoKHJvdywgaSkgPT5cclxuICAgICAgICBpID09PSBxdWJpdFxyXG4gICAgICAgICAgPyByb3cubWFwKChjZWxsLCBqKSA9PiAoaiA9PT0gdGltZSA/IHsgdHlwZSwgdGFyZ2V0UXViaXQgfSA6IGNlbGwpKVxyXG4gICAgICAgICAgOiByb3dcclxuICAgICAgKTtcclxuICAgICAgaWYgKHR5cGUgPT09ICdDTk9UJyAmJiB0YXJnZXRRdWJpdCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgbmV3Q2lyY3VpdFt0YXJnZXRRdWJpdF1bdGltZV0gPSB7IHR5cGU6ICdDTk9UX1RBUkdFVCcgfTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBuZXdTdGF0ZSA9IHtcclxuICAgICAgICBxdWJpdHM6IHN0YXRlLnF1Yml0cyxcclxuICAgICAgICBjaXJjdWl0OiBuZXdDaXJjdWl0LFxyXG4gICAgICAgIGhpc3Rvcnk6IHN0YXRlLmhpc3RvcnksXHJcbiAgICAgICAgaGlzdG9yeUluZGV4OiBzdGF0ZS5oaXN0b3J5SW5kZXgsXHJcbiAgICAgIH07XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgLi4ubmV3U3RhdGUsXHJcbiAgICAgICAgaGlzdG9yeTogWy4uLnN0YXRlLmhpc3Rvcnkuc2xpY2UoMCwgc3RhdGUuaGlzdG9yeUluZGV4ICsgMSksIHsgcXViaXRzOiBzdGF0ZS5xdWJpdHMsIGNpcmN1aXQ6IHN0YXRlLmNpcmN1aXQgfV0sXHJcbiAgICAgICAgaGlzdG9yeUluZGV4OiBzdGF0ZS5oaXN0b3J5SW5kZXggKyAxLFxyXG4gICAgICAgIHByb2JhYmlsaXRpZXM6IHNpbXVsYXRlQ2lyY3VpdChuZXdDaXJjdWl0LCBzdGF0ZS5xdWJpdHMpLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgY2FzZSAnUkVNT1ZFX0dBVEUnOiB7XHJcbiAgICAgIGNvbnN0IHsgcXViaXQsIHRpbWUgfSA9IGFjdGlvbi5wYXlsb2FkO1xyXG4gICAgICBjb25zdCBuZXdDaXJjdWl0ID0gc3RhdGUuY2lyY3VpdC5tYXAoKHJvdywgaSkgPT5cclxuICAgICAgICBpID09PSBxdWJpdFxyXG4gICAgICAgICAgPyByb3cubWFwKChjZWxsLCBqKSA9PiAoaiA9PT0gdGltZSA/IG51bGwgOiBjZWxsKSlcclxuICAgICAgICAgIDogcm93XHJcbiAgICAgICk7XHJcbiAgICAgIGNvbnN0IG5ld1N0YXRlID0ge1xyXG4gICAgICAgIHF1Yml0czogc3RhdGUucXViaXRzLFxyXG4gICAgICAgIGNpcmN1aXQ6IG5ld0NpcmN1aXQsXHJcbiAgICAgICAgaGlzdG9yeTogc3RhdGUuaGlzdG9yeSxcclxuICAgICAgICBoaXN0b3J5SW5kZXg6IHN0YXRlLmhpc3RvcnlJbmRleCxcclxuICAgICAgfTtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICAuLi5uZXdTdGF0ZSxcclxuICAgICAgICBoaXN0b3J5OiBbLi4uc3RhdGUuaGlzdG9yeS5zbGljZSgwLCBzdGF0ZS5oaXN0b3J5SW5kZXggKyAxKSwgeyBxdWJpdHM6IHN0YXRlLnF1Yml0cywgY2lyY3VpdDogc3RhdGUuY2lyY3VpdCB9XSxcclxuICAgICAgICBoaXN0b3J5SW5kZXg6IHN0YXRlLmhpc3RvcnlJbmRleCArIDEsXHJcbiAgICAgICAgcHJvYmFiaWxpdGllczogc2ltdWxhdGVDaXJjdWl0KG5ld0NpcmN1aXQsIHN0YXRlLnF1Yml0cyksXHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgICBjYXNlICdVUERBVEVfR0FURSc6IHtcclxuICAgICAgY29uc3QgeyByZW1vdmVzLCBhZGRzIH0gPSBhY3Rpb24ucGF5bG9hZDtcclxuICAgICAgbGV0IG5ld0NpcmN1aXQgPSBzdGF0ZS5jaXJjdWl0Lm1hcChyb3cgPT4gWy4uLnJvd10pO1xyXG5cclxuICAgICAgLy8gQXBwbHkgYWxsIHJlbW92YWxzXHJcbiAgICAgIHJlbW92ZXMuZm9yRWFjaCgoeyBxdWJpdCwgdGltZSB9KSA9PiB7XHJcbiAgICAgICAgbmV3Q2lyY3VpdCA9IG5ld0NpcmN1aXQubWFwKChyb3csIGkpID0+XHJcbiAgICAgICAgICBpID09PSBxdWJpdFxyXG4gICAgICAgICAgICA/IHJvdy5tYXAoKGNlbGwsIGopID0+IChqID09PSB0aW1lID8gbnVsbCA6IGNlbGwpKVxyXG4gICAgICAgICAgICA6IHJvd1xyXG4gICAgICAgICk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gQXBwbHkgYWxsIGFkZGl0aW9uc1xyXG4gICAgICBhZGRzLmZvckVhY2goKHsgcXViaXQsIHRpbWUsIHR5cGUsIHRhcmdldFF1Yml0IH0pID0+IHtcclxuICAgICAgICBuZXdDaXJjdWl0ID0gbmV3Q2lyY3VpdC5tYXAoKHJvdywgaSkgPT5cclxuICAgICAgICAgIGkgPT09IHF1Yml0XHJcbiAgICAgICAgICAgID8gcm93Lm1hcCgoY2VsbCwgaikgPT4gKGogPT09IHRpbWUgPyB7IHR5cGUsIHRhcmdldFF1Yml0IH0gOiBjZWxsKSlcclxuICAgICAgICAgICAgOiByb3dcclxuICAgICAgICApO1xyXG4gICAgICAgIGlmICh0eXBlID09PSAnQ05PVCcgJiYgdGFyZ2V0UXViaXQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgbmV3Q2lyY3VpdFt0YXJnZXRRdWJpdF1bdGltZV0gPSB7IHR5cGU6ICdDTk9UX1RBUkdFVCcgfTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgY29uc3QgbmV3U3RhdGUgPSB7XHJcbiAgICAgICAgcXViaXRzOiBzdGF0ZS5xdWJpdHMsXHJcbiAgICAgICAgY2lyY3VpdDogbmV3Q2lyY3VpdCxcclxuICAgICAgICBoaXN0b3J5OiBzdGF0ZS5oaXN0b3J5LFxyXG4gICAgICAgIGhpc3RvcnlJbmRleDogc3RhdGUuaGlzdG9yeUluZGV4LFxyXG4gICAgICB9O1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIC4uLm5ld1N0YXRlLFxyXG4gICAgICAgIGhpc3Rvcnk6IFsuLi5zdGF0ZS5oaXN0b3J5LnNsaWNlKDAsIHN0YXRlLmhpc3RvcnlJbmRleCArIDEpLCB7IHF1Yml0czogc3RhdGUucXViaXRzLCBjaXJjdWl0OiBzdGF0ZS5jaXJjdWl0IH1dLFxyXG4gICAgICAgIGhpc3RvcnlJbmRleDogc3RhdGUuaGlzdG9yeUluZGV4ICsgMSxcclxuICAgICAgICBwcm9iYWJpbGl0aWVzOiBzaW11bGF0ZUNpcmN1aXQobmV3Q2lyY3VpdCwgc3RhdGUucXViaXRzKSxcclxuICAgICAgfTtcclxuICAgIH1cclxuICAgIGNhc2UgJ1VORE8nOiB7XHJcbiAgICAgIGlmIChzdGF0ZS5oaXN0b3J5SW5kZXggPD0gLTEpIHJldHVybiBzdGF0ZTtcclxuICAgICAgY29uc3QgcHJldlN0YXRlID0gc3RhdGUuaGlzdG9yeVtzdGF0ZS5oaXN0b3J5SW5kZXhdO1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIC4uLnN0YXRlLFxyXG4gICAgICAgIHF1Yml0czogcHJldlN0YXRlLnF1Yml0cyxcclxuICAgICAgICBjaXJjdWl0OiBwcmV2U3RhdGUuY2lyY3VpdCxcclxuICAgICAgICBoaXN0b3J5SW5kZXg6IHN0YXRlLmhpc3RvcnlJbmRleCAtIDEsXHJcbiAgICAgICAgcHJvYmFiaWxpdGllczogc2ltdWxhdGVDaXJjdWl0KHByZXZTdGF0ZS5jaXJjdWl0LCBwcmV2U3RhdGUucXViaXRzKSxcclxuICAgICAgfTtcclxuICAgIH1cclxuICAgIGNhc2UgJ1JFRE8nOiB7XHJcbiAgICAgIGlmIChzdGF0ZS5oaXN0b3J5SW5kZXggPj0gc3RhdGUuaGlzdG9yeS5sZW5ndGggLSAxKSByZXR1cm4gc3RhdGU7XHJcbiAgICAgIGNvbnN0IG5leHRTdGF0ZSA9IHN0YXRlLmhpc3Rvcnlbc3RhdGUuaGlzdG9yeUluZGV4ICsgMV07XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgLi4uc3RhdGUsXHJcbiAgICAgICAgcXViaXRzOiBuZXh0U3RhdGUucXViaXRzLFxyXG4gICAgICAgIGNpcmN1aXQ6IG5leHRTdGF0ZS5jaXJjdWl0LFxyXG4gICAgICAgIGhpc3RvcnlJbmRleDogc3RhdGUuaGlzdG9yeUluZGV4ICsgMSxcclxuICAgICAgICBwcm9iYWJpbGl0aWVzOiBzaW11bGF0ZUNpcmN1aXQobmV4dFN0YXRlLmNpcmN1aXQsIG5leHRTdGF0ZS5xdWJpdHMpLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgZGVmYXVsdDpcclxuICAgICAgcmV0dXJuIHN0YXRlO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IHNpbXVsYXRlQ2lyY3VpdCA9IChjaXJjdWl0LCBxdWJpdHMpID0+IHtcclxuICBjb25zdCBkaW0gPSAxIDw8IHF1Yml0cztcclxuICBsZXQgc3RhdGUgPSBtYXRoLnplcm9zKGRpbSwgMSk7XHJcbiAgc3RhdGUuc3Vic2V0KG1hdGguaW5kZXgoMCwgMCksIDEpO1xyXG5cclxuICBjb25zdCBIID0gbWF0aC5tYXRyaXgoW1xyXG4gICAgWzEgLyBNYXRoLnNxcnQoMiksIDEgLyBNYXRoLnNxcnQoMildLFxyXG4gICAgWzEgLyBNYXRoLnNxcnQoMiksIC0xIC8gTWF0aC5zcXJ0KDIpXSxcclxuICBdKTtcclxuXHJcbiAgY29uc3QgQ05PVCA9IG1hdGgubWF0cml4KFtcclxuICAgIFsxLCAwLCAwLCAwXSxcclxuICAgIFswLCAxLCAwLCAwXSxcclxuICAgIFswLCAwLCAwLCAxXSxcclxuICAgIFswLCAwLCAxLCAwXSxcclxuICBdKTtcclxuXHJcbiAgZm9yIChsZXQgdGltZSA9IDA7IHRpbWUgPCBjaXJjdWl0WzBdLmxlbmd0aDsgdGltZSsrKSB7XHJcbiAgICBmb3IgKGxldCBxdWJpdCA9IDA7IHF1Yml0IDwgcXViaXRzOyBxdWJpdCsrKSB7XHJcbiAgICAgIGNvbnN0IGdhdGUgPSBjaXJjdWl0W3F1Yml0XVt0aW1lXTtcclxuICAgICAgaWYgKCFnYXRlKSBjb250aW51ZTtcclxuXHJcbiAgICAgIGlmIChnYXRlLnR5cGUgPT09ICdIJykge1xyXG4gICAgICAgIGNvbnN0IG9wID0gbWF0aC5rcm9uKFxyXG4gICAgICAgICAgbWF0aC5pZGVudGl0eSgxIDw8IHF1Yml0KSxcclxuICAgICAgICAgIG1hdGgua3JvbihILCBtYXRoLmlkZW50aXR5KDEgPDwgKHF1Yml0cyAtIHF1Yml0IC0gMSkpKVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgc3RhdGUgPSBtYXRoLm11bHRpcGx5KG9wLCBzdGF0ZSk7XHJcbiAgICAgIH0gZWxzZSBpZiAoZ2F0ZS50eXBlID09PSAnQ05PVCcpIHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSBnYXRlLnRhcmdldFF1Yml0O1xyXG4gICAgICAgIGlmICh0YXJnZXQgPj0gcXViaXRzKSBjb250aW51ZTtcclxuXHJcbiAgICAgICAgaWYgKHRhcmdldCA9PT0gcXViaXQgKyAxKSB7XHJcbiAgICAgICAgICBjb25zdCBvcCA9IG1hdGgua3JvbihcclxuICAgICAgICAgICAgbWF0aC5pZGVudGl0eSgxIDw8IHF1Yml0KSxcclxuICAgICAgICAgICAgbWF0aC5rcm9uKENOT1QsIG1hdGguaWRlbnRpdHkoMSA8PCAocXViaXRzIC0gcXViaXQgLSAyKSkpXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgc3RhdGUgPSBtYXRoLm11bHRpcGx5KG9wLCBzdGF0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdCBzdGF0ZUFycmF5ID0gc3RhdGUudG9BcnJheSgpO1xyXG4gIGNvbnN0IHByb2JzID0ge307XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaW07IGkrKykge1xyXG4gICAgY29uc3QgYmFzaXMgPSBpLnRvU3RyaW5nKDIpLnBhZFN0YXJ0KHF1Yml0cywgJzAnKTtcclxuICAgIHByb2JzW2Jhc2lzXSA9IE1hdGgucG93KG1hdGguYWJzKHN0YXRlQXJyYXlbaV1bMF0pLCAyKTtcclxuICB9XHJcbiAgcmV0dXJuIHByb2JzO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IENpcmN1aXRQcm92aWRlciA9ICh7IGNoaWxkcmVuIH0pID0+IHtcclxuICBjb25zdCBbc3RhdGUsIGRpc3BhdGNoXSA9IHVzZVJlZHVjZXIoY2lyY3VpdFJlZHVjZXIsIHtcclxuICAgIC4uLmluaXRpYWxTdGF0ZSxcclxuICAgIHByb2JhYmlsaXRpZXM6IHNpbXVsYXRlQ2lyY3VpdChpbml0aWFsU3RhdGUuY2lyY3VpdCwgaW5pdGlhbFN0YXRlLnF1Yml0cyksXHJcbiAgfSk7XHJcbiAgcmV0dXJuIChcclxuICAgIDxDaXJjdWl0Q29udGV4dC5Qcm92aWRlciB2YWx1ZT17eyBzdGF0ZSwgZGlzcGF0Y2ggfX0+XHJcbiAgICAgIHtjaGlsZHJlbn1cclxuICAgIDwvQ2lyY3VpdENvbnRleHQuUHJvdmlkZXI+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCB1c2VDaXJjdWl0ID0gKCkgPT4gdXNlQ29udGV4dChDaXJjdWl0Q29udGV4dCk7Il0sIm5hbWVzIjpbImNyZWF0ZUNvbnRleHQiLCJ1c2VDb250ZXh0IiwidXNlUmVkdWNlciIsImNyZWF0ZSIsImFsbCIsIm1hdGgiLCJDaXJjdWl0Q29udGV4dCIsImluaXRpYWxTdGF0ZSIsInF1Yml0cyIsImNpcmN1aXQiLCJBcnJheSIsImZpbGwiLCJtYXAiLCJoaXN0b3J5IiwiaGlzdG9yeUluZGV4IiwicHJvYmFiaWxpdGllcyIsImNpcmN1aXRSZWR1Y2VyIiwic3RhdGUiLCJhY3Rpb24iLCJ0eXBlIiwibmV3U3RhdGUiLCJzbGljZSIsInNpbXVsYXRlQ2lyY3VpdCIsInF1Yml0IiwidGltZSIsInRhcmdldFF1Yml0IiwicGF5bG9hZCIsImNvbnNvbGUiLCJsb2ciLCJuZXdDaXJjdWl0Iiwicm93IiwiaSIsImNlbGwiLCJqIiwidW5kZWZpbmVkIiwicmVtb3ZlcyIsImFkZHMiLCJmb3JFYWNoIiwicHJldlN0YXRlIiwibGVuZ3RoIiwibmV4dFN0YXRlIiwiZGltIiwiemVyb3MiLCJzdWJzZXQiLCJpbmRleCIsIkgiLCJtYXRyaXgiLCJNYXRoIiwic3FydCIsIkNOT1QiLCJnYXRlIiwib3AiLCJrcm9uIiwiaWRlbnRpdHkiLCJtdWx0aXBseSIsInRhcmdldCIsInN0YXRlQXJyYXkiLCJ0b0FycmF5IiwicHJvYnMiLCJiYXNpcyIsInRvU3RyaW5nIiwicGFkU3RhcnQiLCJwb3ciLCJhYnMiLCJDaXJjdWl0UHJvdmlkZXIiLCJjaGlsZHJlbiIsImRpc3BhdGNoIiwiUHJvdmlkZXIiLCJ2YWx1ZSIsInVzZUNpcmN1aXQiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(pages-dir-node)/./context/CircuitContext.js\n");

/***/ }),

/***/ "(pages-dir-node)/./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES&page=%2F&preferredRegion=&absolutePagePath=.%2Fpages%5Cindex.js&absoluteAppPath=private-next-pages%2F_app&absoluteDocumentPath=private-next-pages%2F_document&middlewareConfigBase64=e30%3D!":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES&page=%2F&preferredRegion=&absolutePagePath=.%2Fpages%5Cindex.js&absoluteAppPath=private-next-pages%2F_app&absoluteDocumentPath=private-next-pages%2F_document&middlewareConfigBase64=e30%3D! ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   config: () => (/* binding */ config),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   getServerSideProps: () => (/* binding */ getServerSideProps),\n/* harmony export */   getStaticPaths: () => (/* binding */ getStaticPaths),\n/* harmony export */   getStaticProps: () => (/* binding */ getStaticProps),\n/* harmony export */   reportWebVitals: () => (/* binding */ reportWebVitals),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   unstable_getServerProps: () => (/* binding */ unstable_getServerProps),\n/* harmony export */   unstable_getServerSideProps: () => (/* binding */ unstable_getServerSideProps),\n/* harmony export */   unstable_getStaticParams: () => (/* binding */ unstable_getStaticParams),\n/* harmony export */   unstable_getStaticPaths: () => (/* binding */ unstable_getStaticPaths),\n/* harmony export */   unstable_getStaticProps: () => (/* binding */ unstable_getStaticProps)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_pages_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/pages/module.compiled */ \"(pages-dir-node)/./node_modules/next/dist/server/route-modules/pages/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_pages_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_pages_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(pages-dir-node)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/build/templates/helpers */ \"(pages-dir-node)/./node_modules/next/dist/build/templates/helpers.js\");\n/* harmony import */ var private_next_pages_document__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! private-next-pages/_document */ \"(pages-dir-node)/./node_modules/next/dist/pages/_document.js\");\n/* harmony import */ var private_next_pages_document__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(private_next_pages_document__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var private_next_pages_app__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! private-next-pages/_app */ \"(pages-dir-node)/./node_modules/next/dist/pages/_app.js\");\n/* harmony import */ var private_next_pages_app__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(private_next_pages_app__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _pages_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pages\\index.js */ \"(pages-dir-node)/./pages/index.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_pages_index_js__WEBPACK_IMPORTED_MODULE_5__]);\n_pages_index_js__WEBPACK_IMPORTED_MODULE_5__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\n// Import the app and document modules.\n\n\n// Import the userland code.\n\n// Re-export the component (should be the default export).\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_index_js__WEBPACK_IMPORTED_MODULE_5__, 'default'));\n// Re-export methods.\nconst getStaticProps = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_index_js__WEBPACK_IMPORTED_MODULE_5__, 'getStaticProps');\nconst getStaticPaths = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_index_js__WEBPACK_IMPORTED_MODULE_5__, 'getStaticPaths');\nconst getServerSideProps = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_index_js__WEBPACK_IMPORTED_MODULE_5__, 'getServerSideProps');\nconst config = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_index_js__WEBPACK_IMPORTED_MODULE_5__, 'config');\nconst reportWebVitals = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_index_js__WEBPACK_IMPORTED_MODULE_5__, 'reportWebVitals');\n// Re-export legacy methods.\nconst unstable_getStaticProps = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_index_js__WEBPACK_IMPORTED_MODULE_5__, 'unstable_getStaticProps');\nconst unstable_getStaticPaths = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_index_js__WEBPACK_IMPORTED_MODULE_5__, 'unstable_getStaticPaths');\nconst unstable_getStaticParams = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_index_js__WEBPACK_IMPORTED_MODULE_5__, 'unstable_getStaticParams');\nconst unstable_getServerProps = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_index_js__WEBPACK_IMPORTED_MODULE_5__, 'unstable_getServerProps');\nconst unstable_getServerSideProps = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_index_js__WEBPACK_IMPORTED_MODULE_5__, 'unstable_getServerSideProps');\n// Create and export the route module that will be consumed.\nconst routeModule = new next_dist_server_route_modules_pages_module_compiled__WEBPACK_IMPORTED_MODULE_0__.PagesRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.PAGES,\n        page: \"/index\",\n        pathname: \"/\",\n        // The following aren't used in production.\n        bundlePath: '',\n        filename: ''\n    },\n    components: {\n        // default export might not exist when optimized for data only\n        App: (private_next_pages_app__WEBPACK_IMPORTED_MODULE_4___default()),\n        Document: (private_next_pages_document__WEBPACK_IMPORTED_MODULE_3___default())\n    },\n    userland: _pages_index_js__WEBPACK_IMPORTED_MODULE_5__\n});\n\n//# sourceMappingURL=pages.js.map\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL25vZGVfbW9kdWxlcy9uZXh0L2Rpc3QvYnVpbGQvd2VicGFjay9sb2FkZXJzL25leHQtcm91dGUtbG9hZGVyL2luZGV4LmpzP2tpbmQ9UEFHRVMmcGFnZT0lMkYmcHJlZmVycmVkUmVnaW9uPSZhYnNvbHV0ZVBhZ2VQYXRoPS4lMkZwYWdlcyU1Q2luZGV4LmpzJmFic29sdXRlQXBwUGF0aD1wcml2YXRlLW5leHQtcGFnZXMlMkZfYXBwJmFic29sdXRlRG9jdW1lbnRQYXRoPXByaXZhdGUtbmV4dC1wYWdlcyUyRl9kb2N1bWVudCZtaWRkbGV3YXJlQ29uZmlnQmFzZTY0PWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXdGO0FBQ2hDO0FBQ0U7QUFDMUQ7QUFDeUQ7QUFDVjtBQUMvQztBQUM4QztBQUM5QztBQUNBLGlFQUFlLHdFQUFLLENBQUMsNENBQVEsWUFBWSxFQUFDO0FBQzFDO0FBQ08sdUJBQXVCLHdFQUFLLENBQUMsNENBQVE7QUFDckMsdUJBQXVCLHdFQUFLLENBQUMsNENBQVE7QUFDckMsMkJBQTJCLHdFQUFLLENBQUMsNENBQVE7QUFDekMsZUFBZSx3RUFBSyxDQUFDLDRDQUFRO0FBQzdCLHdCQUF3Qix3RUFBSyxDQUFDLDRDQUFRO0FBQzdDO0FBQ08sZ0NBQWdDLHdFQUFLLENBQUMsNENBQVE7QUFDOUMsZ0NBQWdDLHdFQUFLLENBQUMsNENBQVE7QUFDOUMsaUNBQWlDLHdFQUFLLENBQUMsNENBQVE7QUFDL0MsZ0NBQWdDLHdFQUFLLENBQUMsNENBQVE7QUFDOUMsb0NBQW9DLHdFQUFLLENBQUMsNENBQVE7QUFDekQ7QUFDTyx3QkFBd0Isa0dBQWdCO0FBQy9DO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxhQUFhLCtEQUFXO0FBQ3hCLGtCQUFrQixvRUFBZ0I7QUFDbEMsS0FBSztBQUNMLFlBQVk7QUFDWixDQUFDOztBQUVELGlDIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGFnZXNSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvcGFnZXMvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBob2lzdCB9IGZyb20gXCJuZXh0L2Rpc3QvYnVpbGQvdGVtcGxhdGVzL2hlbHBlcnNcIjtcbi8vIEltcG9ydCB0aGUgYXBwIGFuZCBkb2N1bWVudCBtb2R1bGVzLlxuaW1wb3J0ICogYXMgZG9jdW1lbnQgZnJvbSBcInByaXZhdGUtbmV4dC1wYWdlcy9fZG9jdW1lbnRcIjtcbmltcG9ydCAqIGFzIGFwcCBmcm9tIFwicHJpdmF0ZS1uZXh0LXBhZ2VzL19hcHBcIjtcbi8vIEltcG9ydCB0aGUgdXNlcmxhbmQgY29kZS5cbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIuL3BhZ2VzXFxcXGluZGV4LmpzXCI7XG4vLyBSZS1leHBvcnQgdGhlIGNvbXBvbmVudCAoc2hvdWxkIGJlIHRoZSBkZWZhdWx0IGV4cG9ydCkuXG5leHBvcnQgZGVmYXVsdCBob2lzdCh1c2VybGFuZCwgJ2RlZmF1bHQnKTtcbi8vIFJlLWV4cG9ydCBtZXRob2RzLlxuZXhwb3J0IGNvbnN0IGdldFN0YXRpY1Byb3BzID0gaG9pc3QodXNlcmxhbmQsICdnZXRTdGF0aWNQcm9wcycpO1xuZXhwb3J0IGNvbnN0IGdldFN0YXRpY1BhdGhzID0gaG9pc3QodXNlcmxhbmQsICdnZXRTdGF0aWNQYXRocycpO1xuZXhwb3J0IGNvbnN0IGdldFNlcnZlclNpZGVQcm9wcyA9IGhvaXN0KHVzZXJsYW5kLCAnZ2V0U2VydmVyU2lkZVByb3BzJyk7XG5leHBvcnQgY29uc3QgY29uZmlnID0gaG9pc3QodXNlcmxhbmQsICdjb25maWcnKTtcbmV4cG9ydCBjb25zdCByZXBvcnRXZWJWaXRhbHMgPSBob2lzdCh1c2VybGFuZCwgJ3JlcG9ydFdlYlZpdGFscycpO1xuLy8gUmUtZXhwb3J0IGxlZ2FjeSBtZXRob2RzLlxuZXhwb3J0IGNvbnN0IHVuc3RhYmxlX2dldFN0YXRpY1Byb3BzID0gaG9pc3QodXNlcmxhbmQsICd1bnN0YWJsZV9nZXRTdGF0aWNQcm9wcycpO1xuZXhwb3J0IGNvbnN0IHVuc3RhYmxlX2dldFN0YXRpY1BhdGhzID0gaG9pc3QodXNlcmxhbmQsICd1bnN0YWJsZV9nZXRTdGF0aWNQYXRocycpO1xuZXhwb3J0IGNvbnN0IHVuc3RhYmxlX2dldFN0YXRpY1BhcmFtcyA9IGhvaXN0KHVzZXJsYW5kLCAndW5zdGFibGVfZ2V0U3RhdGljUGFyYW1zJyk7XG5leHBvcnQgY29uc3QgdW5zdGFibGVfZ2V0U2VydmVyUHJvcHMgPSBob2lzdCh1c2VybGFuZCwgJ3Vuc3RhYmxlX2dldFNlcnZlclByb3BzJyk7XG5leHBvcnQgY29uc3QgdW5zdGFibGVfZ2V0U2VydmVyU2lkZVByb3BzID0gaG9pc3QodXNlcmxhbmQsICd1bnN0YWJsZV9nZXRTZXJ2ZXJTaWRlUHJvcHMnKTtcbi8vIENyZWF0ZSBhbmQgZXhwb3J0IHRoZSByb3V0ZSBtb2R1bGUgdGhhdCB3aWxsIGJlIGNvbnN1bWVkLlxuZXhwb3J0IGNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IFBhZ2VzUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLlBBR0VTLFxuICAgICAgICBwYWdlOiBcIi9pbmRleFwiLFxuICAgICAgICBwYXRobmFtZTogXCIvXCIsXG4gICAgICAgIC8vIFRoZSBmb2xsb3dpbmcgYXJlbid0IHVzZWQgaW4gcHJvZHVjdGlvbi5cbiAgICAgICAgYnVuZGxlUGF0aDogJycsXG4gICAgICAgIGZpbGVuYW1lOiAnJ1xuICAgIH0sXG4gICAgY29tcG9uZW50czoge1xuICAgICAgICAvLyBkZWZhdWx0IGV4cG9ydCBtaWdodCBub3QgZXhpc3Qgd2hlbiBvcHRpbWl6ZWQgZm9yIGRhdGEgb25seVxuICAgICAgICBBcHA6IGFwcC5kZWZhdWx0LFxuICAgICAgICBEb2N1bWVudDogZG9jdW1lbnQuZGVmYXVsdFxuICAgIH0sXG4gICAgdXNlcmxhbmRcbn0pO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1wYWdlcy5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(pages-dir-node)/./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES&page=%2F&preferredRegion=&absolutePagePath=.%2Fpages%5Cindex.js&absoluteAppPath=private-next-pages%2F_app&absoluteDocumentPath=private-next-pages%2F_document&middlewareConfigBase64=e30%3D!\n");

/***/ }),

/***/ "(pages-dir-node)/./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Home)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dynamic */ \"(pages-dir-node)/./node_modules/next/dynamic.js\");\n/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_dynamic__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _context_CircuitContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../context/CircuitContext */ \"(pages-dir-node)/./context/CircuitContext.js\");\n/* harmony import */ var three_tsl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three/tsl */ \"three/tsl\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_context_CircuitContext__WEBPACK_IMPORTED_MODULE_2__, three_tsl__WEBPACK_IMPORTED_MODULE_3__]);\n([_context_CircuitContext__WEBPACK_IMPORTED_MODULE_2__, three_tsl__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n\n// Dynamically import CircuitComposer with SSR disabled\nconst CircuitComposer = next_dynamic__WEBPACK_IMPORTED_MODULE_1___default()(()=>Promise.all(/*! import() */[__webpack_require__.e(\"vendor-chunks/recharts\"), __webpack_require__.e(\"_pages-dir-node_components_CircuitComposer_js\")]).then(__webpack_require__.bind(__webpack_require__, /*! ../components/CircuitComposer */ \"(pages-dir-node)/./components/CircuitComposer.js\")), {\n    loadableGenerated: {\n        modules: [\n            \"pages\\\\index.js -> \" + \"../components/CircuitComposer\"\n        ]\n    },\n    ssr: false\n});\nfunction Home() {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        style: {\n            backgroundColor: '#F2EFE7'\n        },\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_context_CircuitContext__WEBPACK_IMPORTED_MODULE_2__.CircuitProvider, {\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(CircuitComposer, {}, void 0, false, {\n                fileName: \"C:\\\\Users\\\\elang\\\\OneDrive\\\\Desktop\\\\quantum_computing\\\\pages\\\\index.js\",\n                lineNumber: 14,\n                columnNumber: 7\n            }, this)\n        }, void 0, false, {\n            fileName: \"C:\\\\Users\\\\elang\\\\OneDrive\\\\Desktop\\\\quantum_computing\\\\pages\\\\index.js\",\n            lineNumber: 13,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\elang\\\\OneDrive\\\\Desktop\\\\quantum_computing\\\\pages\\\\index.js\",\n        lineNumber: 12,\n        columnNumber: 5\n    }, this);\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL3BhZ2VzL2luZGV4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQW1DO0FBQ3lCO0FBQzVCO0FBRWhDLHVEQUF1RDtBQUN2RCxNQUFNRyxrQkFBa0JILG1EQUFPQSxDQUFDLElBQU0sa1NBQXVDOzs7Ozs7SUFDM0VJLEtBQUs7O0FBR1EsU0FBU0M7SUFDdEIscUJBQ0UsOERBQUNIO1FBQUlJLE9BQU87WUFBQ0MsaUJBQWdCO1FBQVM7a0JBQ3BDLDRFQUFDTixvRUFBZUE7c0JBQ2hCLDRFQUFDRTs7Ozs7Ozs7Ozs7Ozs7O0FBS1AiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcZWxhbmdcXE9uZURyaXZlXFxEZXNrdG9wXFxxdWFudHVtX2NvbXB1dGluZ1xccGFnZXNcXGluZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkeW5hbWljIGZyb20gJ25leHQvZHluYW1pYyc7XHJcbmltcG9ydCB7IENpcmN1aXRQcm92aWRlciB9IGZyb20gJy4uL2NvbnRleHQvQ2lyY3VpdENvbnRleHQnO1xyXG5pbXBvcnQgeyBkaXYgfSBmcm9tICd0aHJlZS90c2wnO1xyXG5cclxuLy8gRHluYW1pY2FsbHkgaW1wb3J0IENpcmN1aXRDb21wb3NlciB3aXRoIFNTUiBkaXNhYmxlZFxyXG5jb25zdCBDaXJjdWl0Q29tcG9zZXIgPSBkeW5hbWljKCgpID0+IGltcG9ydCgnLi4vY29tcG9uZW50cy9DaXJjdWl0Q29tcG9zZXInKSwge1xyXG4gIHNzcjogZmFsc2UsIC8vIERpc2FibGUgc2VydmVyLXNpZGUgcmVuZGVyaW5nXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gSG9tZSgpIHtcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBzdHlsZT17e2JhY2tncm91bmRDb2xvcjonI0YyRUZFNyd9fT5cclxuICAgICAgPENpcmN1aXRQcm92aWRlciA+XHJcbiAgICAgIDxDaXJjdWl0Q29tcG9zZXIgLz5cclxuICAgIDwvQ2lyY3VpdFByb3ZpZGVyPlxyXG4gICAgPC9kaXY+XHJcbiAgICBcclxuICApO1xyXG59Il0sIm5hbWVzIjpbImR5bmFtaWMiLCJDaXJjdWl0UHJvdmlkZXIiLCJkaXYiLCJDaXJjdWl0Q29tcG9zZXIiLCJzc3IiLCJIb21lIiwic3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(pages-dir-node)/./pages/index.js\n");

/***/ }),

/***/ "@react-three/drei":
/*!************************************!*\
  !*** external "@react-three/drei" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("@react-three/drei");

/***/ }),

/***/ "@react-three/fiber":
/*!*************************************!*\
  !*** external "@react-three/fiber" ***!
  \*************************************/
/***/ ((module) => {

module.exports = require("@react-three/fiber");

/***/ }),

/***/ "clsx":
/*!***********************!*\
  !*** external "clsx" ***!
  \***********************/
/***/ ((module) => {

module.exports = import("clsx");;

/***/ }),

/***/ "eventemitter3":
/*!********************************!*\
  !*** external "eventemitter3" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("eventemitter3");

/***/ }),

/***/ "lodash/every":
/*!*******************************!*\
  !*** external "lodash/every" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("lodash/every");

/***/ }),

/***/ "lodash/find":
/*!******************************!*\
  !*** external "lodash/find" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("lodash/find");

/***/ }),

/***/ "lodash/flatMap":
/*!*********************************!*\
  !*** external "lodash/flatMap" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("lodash/flatMap");

/***/ }),

/***/ "lodash/get":
/*!*****************************!*\
  !*** external "lodash/get" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("lodash/get");

/***/ }),

/***/ "lodash/isBoolean":
/*!***********************************!*\
  !*** external "lodash/isBoolean" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("lodash/isBoolean");

/***/ }),

/***/ "lodash/isEqual":
/*!*********************************!*\
  !*** external "lodash/isEqual" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("lodash/isEqual");

/***/ }),

/***/ "lodash/isFunction":
/*!************************************!*\
  !*** external "lodash/isFunction" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("lodash/isFunction");

/***/ }),

/***/ "lodash/isNaN":
/*!*******************************!*\
  !*** external "lodash/isNaN" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("lodash/isNaN");

/***/ }),

/***/ "lodash/isNil":
/*!*******************************!*\
  !*** external "lodash/isNil" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("lodash/isNil");

/***/ }),

/***/ "lodash/isNumber":
/*!**********************************!*\
  !*** external "lodash/isNumber" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("lodash/isNumber");

/***/ }),

/***/ "lodash/isObject":
/*!**********************************!*\
  !*** external "lodash/isObject" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("lodash/isObject");

/***/ }),

/***/ "lodash/isPlainObject":
/*!***************************************!*\
  !*** external "lodash/isPlainObject" ***!
  \***************************************/
/***/ ((module) => {

module.exports = require("lodash/isPlainObject");

/***/ }),

/***/ "lodash/isString":
/*!**********************************!*\
  !*** external "lodash/isString" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("lodash/isString");

/***/ }),

/***/ "lodash/last":
/*!******************************!*\
  !*** external "lodash/last" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("lodash/last");

/***/ }),

/***/ "lodash/mapValues":
/*!***********************************!*\
  !*** external "lodash/mapValues" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("lodash/mapValues");

/***/ }),

/***/ "lodash/max":
/*!*****************************!*\
  !*** external "lodash/max" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("lodash/max");

/***/ }),

/***/ "lodash/memoize":
/*!*********************************!*\
  !*** external "lodash/memoize" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("lodash/memoize");

/***/ }),

/***/ "lodash/min":
/*!*****************************!*\
  !*** external "lodash/min" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("lodash/min");

/***/ }),

/***/ "lodash/range":
/*!*******************************!*\
  !*** external "lodash/range" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("lodash/range");

/***/ }),

/***/ "lodash/some":
/*!******************************!*\
  !*** external "lodash/some" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("lodash/some");

/***/ }),

/***/ "lodash/sortBy":
/*!********************************!*\
  !*** external "lodash/sortBy" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("lodash/sortBy");

/***/ }),

/***/ "lodash/throttle":
/*!**********************************!*\
  !*** external "lodash/throttle" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("lodash/throttle");

/***/ }),

/***/ "lodash/uniqBy":
/*!********************************!*\
  !*** external "lodash/uniqBy" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("lodash/uniqBy");

/***/ }),

/***/ "lodash/upperFirst":
/*!************************************!*\
  !*** external "lodash/upperFirst" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("lodash/upperFirst");

/***/ }),

/***/ "mathjs":
/*!*************************!*\
  !*** external "mathjs" ***!
  \*************************/
/***/ ((module) => {

module.exports = import("mathjs");;

/***/ }),

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react-dnd":
/*!****************************!*\
  !*** external "react-dnd" ***!
  \****************************/
/***/ ((module) => {

module.exports = import("react-dnd");;

/***/ }),

/***/ "react-dnd-html5-backend":
/*!******************************************!*\
  !*** external "react-dnd-html5-backend" ***!
  \******************************************/
/***/ ((module) => {

module.exports = import("react-dnd-html5-backend");;

/***/ }),

/***/ "react-smooth":
/*!*******************************!*\
  !*** external "react-smooth" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("react-smooth");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ "recharts-scale":
/*!*********************************!*\
  !*** external "recharts-scale" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("recharts-scale");

/***/ }),

/***/ "three/tsl":
/*!****************************!*\
  !*** external "three/tsl" ***!
  \****************************/
/***/ ((module) => {

module.exports = import("three/tsl");;

/***/ }),

/***/ "tiny-invariant":
/*!*********************************!*\
  !*** external "tiny-invariant" ***!
  \*********************************/
/***/ ((module) => {

module.exports = import("tiny-invariant");;

/***/ }),

/***/ "victory-vendor/d3-scale":
/*!******************************************!*\
  !*** external "victory-vendor/d3-scale" ***!
  \******************************************/
/***/ ((module) => {

module.exports = require("victory-vendor/d3-scale");

/***/ }),

/***/ "victory-vendor/d3-shape":
/*!******************************************!*\
  !*** external "victory-vendor/d3-shape" ***!
  \******************************************/
/***/ ((module) => {

module.exports = require("victory-vendor/d3-shape");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@swc"], () => (__webpack_exec__("(pages-dir-node)/./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES&page=%2F&preferredRegion=&absolutePagePath=.%2Fpages%5Cindex.js&absoluteAppPath=private-next-pages%2F_app&absoluteDocumentPath=private-next-pages%2F_document&middlewareConfigBase64=e30%3D!")));
module.exports = __webpack_exports__;

})();