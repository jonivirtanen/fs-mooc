import React from 'react'
import ReactDOM from 'react-dom'

const Kurssi = ({kurssi}) => {
    console.log(kurssi)
    return (
    <div>
        <Otsikko otsikko={kurssi.nimi} />
        <Sisalto osat={kurssi.osat} />
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
    }
  
    return (
      <div>
        <Kurssi kurssi={kurssi} />
      </div>
    )
  }
  

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
