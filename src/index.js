import React from 'react';
import ReactDOM from 'react-dom';
import { useReducer } from 'react'
import "./index.css"

const initialState = {
  question: '0',
  input: 0,
  op: '',
  num1: 0,
  num2: '',
  num3: ''
};

const reducer = (state, action) => {
  console.log(state)
  switch (action.type) {
    case "action":
      if (state.num1 === 0) {
        return {
          ...state,
          question: state.num2 + action.payload,
          input: action.payload,
          op: action.payload,
          num1: state.num2,
          num2: ''
        }
      }
      if (state.num2 === '') {
        return {
          ...state,
          question: state.num1 + action.payload,
          input: action.payload,
          op: action.payload,
        }
      }
      if (state.num1 !== 0 && state.op !== '') {
        return {
          ...state,
          input: action.payload,
          op: action.payload,
          question: state.question + action.payload
        }
      }
      return {
        ...state,
        input: eval(state.num1 + state.op + state.num2),
        num2: '',
        op: action.payload,
        num1: eval(state.num1 + state.op + state.num2)
      }
    case "number":
      if (state.num2 === '' && action.payload === '.') {       // bam dau . => 0.
        return {
          ...state,
          question: '0' + action.payload,
          input: '0' + action.payload,
          num2: '0' + action.payload
        }
      } else if (state.num2 === '') {
        if (action.payload === '0') {
          return state
        }
        if (state.question === '0') {
          return {
            ...state,
            question: action.payload,
            input: action.payload,
            num2: action.payload,
          }
        } else {
          return {
            ...state,
            question: state.question + action.payload,
            input: action.payload,
            num2: action.payload,
          }
        }
      } else {
        if (action.payload === '.' && state.num2.includes('.')) {
          return state
        } else {
          return {
            ...state,
            input: state.input + action.payload,
            question: state.question + action.payload,
            num2: state.num2 + action.payload
          }
        }
      }
    case "=":
      if (state.op && state.num2) {
        return {
          ...state,
          input: eval(state.question),
          num2: '',
          num1: eval(state.num1 + state.op + state.num2),
          num3: state.num2,
          question: state.question + '=' + eval(state.question)
        }
      }
      else {
        return state
      }
    case "c":
      if (state.question.length === 2 && state.question.includes('0.')) {
        return {
          ...state,
          question: state.question.slice(0, -1),
        }
      } else if (state.question.length > 1) {
        return {
          ...state,
          question: state.question.slice(0, -1),
        }
      } else {
        return {
          ...state,
          question: '0',
        }
      }
    case "ac":
      return {
        question: '0',
        input: 0,
        op: '',
        num1: 0,
        num2: ''
      }

    default:
      return state
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <div className="calculor">
      <div className="display">
        <div> {state.question} </div>
        <div>{state.input} </div>
      </div>
      <table>
        <tr>
          <td><button className="btn btn_action" onClick={() => dispatch({ type: 'ac' })}> AC </button></td>
          <td><button className="btn btn_action" onClick={() => dispatch({ type: 'ac' })}> C </button></td>
          <td><button className="btn btn_action" onClick={() => dispatch({ type: 'action', payload: '*' })}> * </button></td>
          <td><button className="btn btn_action" onClick={() => dispatch({ type: 'action', payload: '/' })}> / </button></td>
        </tr>
        <tr>
          <td><button className="btn" onClick={() => dispatch({ type: 'number', payload: '7' })}> 7 </button></td>
          <td><button className="btn" onClick={() => dispatch({ type: 'number', payload: '8' })}> 8 </button></td>
          <td><button className="btn" onClick={() => dispatch({ type: 'number', payload: '9' })}> 9 </button></td>
          <td><button className="btn btn_action" onClick={() => dispatch({ type: 'action', payload: '+' })}> + </button></td>
        </tr>
        <tr>
          <td><button className="btn" onClick={() => dispatch({ type: 'number', payload: '4' })}> 4 </button></td>
          <td><button className="btn" onClick={() => dispatch({ type: 'number', payload: '5' })}> 5 </button></td>
          <td><button className="btn" onClick={() => dispatch({ type: 'number', payload: '6' })}> 6 </button></td>
          <td><button className="btn btn_action" onClick={() => dispatch({ type: 'action', payload: '-' })}> - </button></td>
        </tr>
        <tr>
          <td><button className="btn" onClick={() => dispatch({ type: 'number', payload: '1' })}> 1 </button></td>
          <td><button className="btn" onClick={() => dispatch({ type: 'number', payload: '2' })}> 2 </button></td>
          <td><button className="btn" onClick={() => dispatch({ type: 'number', payload: '3' })}> 3 </button></td>
          <td rowSpan = "2"><button className="btn btn_action btn_kq" onClick={() => dispatch({ type: '=' })}> = </button></td>
        </tr>
        <tr>
          <td><button className="btn " onClick={() => dispatch({ type: 'number', payload: '0' })}> 0 </button></td>
          <td colSpan="2"><button className="btn btn_cham" onClick={() => dispatch({ type: 'number', payload: '.' })}> . </button></td>
        </tr>
      </table>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
