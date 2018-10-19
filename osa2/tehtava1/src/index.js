import React from 'react'
import ReactDOM from 'react-dom'

const Kurssi = ({kurssi}) => {
    console.log(kurssi)
    return (
    <div>
        <Otsikko otsikko={kurssi.nimi} />
        <Sisalto osat={kurssi.osat} />
        <Yhteensa osat={kurssi.osat} />
    </div>
    )
}

const Otsikko = ({otsikko}) => (
    <h1>{otsikko}</h1>
)

const Sisalto = ({osat}) => {
    return(
    osat.map(osa => 
        <Osa key={osa.id} osa={osa} />
    ))
}

const Osa = ({osa}) => (<li>{osa.nimi} {osa.tehtavia}</li>)

const Yhteensa = ({osat}) => {
    let yhteensa = osat.reduce((yhteensa, osa) => yhteensa + osa.tehtavia, 0)
    
    return (  
      <div>
        <p>Yhteensä {yhteensa} tehtavaa</p>
      </div>
    )
}

const App = () => {
    const kurssit = [
        {
          nimi: 'Half Stack -sovelluskehitys',
          id: 1,
          osat: [
            {
              nimi: 'Reactin perusteet',
              tehtavia: 10,
              id: 1
            },
            {
              nimi: 'Tiedonvälitys propseilla',
              tehtavia: 7,
              id: 2
            },
            {
              nimi: 'Komponenttien tila',
              tehtavia: 14,
              id: 3
            }
          ]
        },
        {
          nimi: 'Node.js',
          id: 2,
          osat: [
            {
              nimi: 'Routing',
              tehtavia: 3,
              id: 1
            },
            {
              nimi: 'Middlewaret',
              tehtavia: 7,
              id: 2
            }
          ]
        }
    ]
  
    return (
      <div>
        {kurssit.map(kurssi => <Kurssi key={kurssi.id} kurssi={kurssi} />)}
      </div>
    )
  }
  

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
