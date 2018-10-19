import React from 'react'

const Kurssi = ({kurssi}) => {
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

export default Kurssi