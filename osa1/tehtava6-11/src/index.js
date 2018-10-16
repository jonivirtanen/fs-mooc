import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => (
  <h1>{props.otsikko}</h1>
)


const Button = ({clickHandler, text}) => (
    <button onClick={clickHandler}>
      {text}
    </button>
)

const Statistics = ( {state} ) =>  {
  let votes = state.hyva + state.neutraali + state.huono
  let points = state.hyva - state.huono
  let average = points / votes
  let positive = state.hyva / votes * 100

  if (votes !== 0) {
    return (
      <div>
        <table>
          <tbody>
          <Statistic entry="Hyvä" value={state.hyva} />
          <Statistic entry="Neutraali" value={state.neutraali} />
          <Statistic entry="Huono" value={state.huono} />
          <Statistic entry="Keskiarvo" value={average.toFixed(1)} />
          <Statistic entry="Positiivisia" value={positive.toFixed(1) + "%"} />
          </tbody>
        </table>
      </div>
      )
  }
  return (
    <div>
      <em>Ei yhtään palautetta annettu</em>
    </div>
  )  
}


const Statistic = (props) => {
  return (
    <tr>
      <td>{props.entry}</td>
      <td>{props.value}</td>
    </tr>
  )
}

class App extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
        hyva: 0,
        neutraali: 0,
        huono: 0
      }
  }

  render() {
    const increaseValue = (prop, prevState) => () => {
        this.setState({ [prop]: prevState + 1})
    }

    return (
      <div>
        <Otsikko otsikko={"Anna palautetta"} />
        <Button clickHandler={increaseValue("hyva", this.state.hyva)} text={"Hyvä"}/>
        <Button clickHandler={increaseValue("neutraali", this.state.neutraali)} text={"Neutraali"} />
        <Button clickHandler={increaseValue("huono", this.state.huono)} text={"Huono"} />
        <Otsikko otsikko={"Statistiikka"} />
        <Statistics state={this.state} />
      </div>
    )
  }
  
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
