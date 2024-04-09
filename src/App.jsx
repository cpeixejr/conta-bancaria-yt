import { useReducer } from "react";
import "./App.css";

/*
  1 - criar um initialState
  2 - as operações de deposito, saque, pedirEmprestimo, pagarEMprestimo só podem ser
    executadas se o status estaAtivo = true
  3 - só é possível ter um empréstimo ativo
  4 - o cliente só pode fechar sua conta bancaria se ele não tiver nenhum empréstimo ativo
  e o saldo da conta tem que estar zerado
*/

const initialState = {
  saldo: 0,
  emprestimo: 0,
  estaAtiva: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "abrirConta":
      return { ...state, estaAtiva: true };
    case "depositar":
      return { ...state, saldo: state.saldo + 100 };
    case "saque":
      if (state.saldo >= 100) {
        return { ...state, saldo: state.saldo - 100 };
      } else {
        return state;
      }
    case "pedirEmprestimo":
      if (state.emprestimo > 0) {
        return state;
      } else {
        return { ...state, saldo: state.saldo + 5000, emprestimo: 5000 };
      }
    case "pagarEmprestimo":
      if (state.emprestimo == 0 || state.saldo < state.emprestimo) {
        return state;
      } else {
        return {
          ...state,
          saldo: state.saldo - state.emprestimo,
          emprestimo: 0,
        };
      }
    case "fecharConta":
      if (state.saldo == 0 && state.emprestimo == 0 && state.estaAtiva) {
        return initialState;
      } else {
        return state;
      }
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <h1>Conta Bancaria</h1>

      {state.estaAtiva && (
        <>
          <p>Saldo: {state.saldo}</p>
          <p>Emprestimo: {state.emprestimo}</p>
        </>
      )}
      <p>
        <button onClick={() => dispatch({ type: "abrirConta" })}>
          Abrir conta
        </button>
      </p>

      <p>
        <button
          onClick={() => dispatch({ type: "depositar" })}
          disabled={!state.estaAtiva}
        >
          Depositar
        </button>
      </p>

      <p>
        <button
          onClick={() => dispatch({ type: "saque" })}
          disabled={!state.estaAtiva}
        >
          Saque
        </button>
      </p>

      <p>
        <button
          onClick={() => dispatch({ type: "pedirEmprestimo" })}
          disabled={!state.estaAtiva}
        >
          Pedir emprestimo
        </button>
      </p>

      <p>
        <button
          onClick={() => dispatch({ type: "pagarEmprestimo" })}
          disabled={!state.estaAtiva}
        >
          Pagar emprestimo
        </button>
      </p>

      <p>
        <button
          onClick={() => dispatch({ type: "fecharConta" })}
          disabled={!state.estaAtiva}
        >
          Fechar a conta
        </button>
      </p>
    </>
  );
}

export default App;
