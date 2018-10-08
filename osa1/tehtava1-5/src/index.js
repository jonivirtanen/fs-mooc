import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
    return (
        <div>
            <h1>{props.kurssi}</h1>
        </div>
    )
     
}

const Sisalto = (props) => {
    return (
        <div>
            {props.osat.map((prop) => 
                <Osa osa={prop} />
            )}
        </div>
    )
}

const Osa = (props) => {
    return (
        <div>
            <p>{props.osa.nimi} {props.osa.tehtavia}</p>
        </div>
    )
}

const Yhteensa = (props) => {
    let yhteensa = 0
    
    props.osat.forEach(element => {
        yhteensa += element.tehtavia
    });

    return (  
      <div>
        <p>Yhteensä {yhteensa}</p>
      </div>
  )
}

const App = () => {
    const kurssi = {
        nimi: 'Half Stack -sovelluskehitys',
        osat: [
          {
            nimi: 'Reactin perusteet',
            tehtavia: 10
          },
          {
            nimi: 'Tiedonvälitys propseilla',
            tehtavia: 7
          },
          {
            nimi: 'Komponenttien tila',
            tehtavia: 14
          }
        ]
      }

  return (
    <div>
      <Otsikko kurssi={kurssi.nimi} />
      <Sisalto  osat={kurssi.osat}/>
      <Yhteensa osat={kurssi.osat} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
