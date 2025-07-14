import { useState } from 'react'
import countriesService from './services/coutries';
import { useEffect } from 'react';

function App() {
  const [countries, setCountries] = useState(null);
  const [filterCountry, setFilterCountry] = useState('')
  const [filteredCountries, setFilteredCountries] = useState(null)

  const updateFilterCountries = (value) => {
    setFilterCountry(value)
    if (value == '') {
      setFilteredCountries(null)
      return
    }
    setFilteredCountries(countries.filter(country => country.name.common.toLowerCase().includes(value.toLowerCase())))
  }

  useEffect(() => {
    countriesService.getAllCountries().then(res => {
      setCountries(res.data)
    })
  }, [])

  return (
    <>
      <div>
        Find countries: &nbsp;
        <input type="text" value={filterCountry} onChange={(e) => updateFilterCountries(e.target.value)} />
        {
          filteredCountries ? 
            filteredCountries.length > 10 ? 
              <p>Too many matches. Specify another filter</p>
              : 
              filteredCountries.length == 1 ? 
                  filteredCountries.map(country => {
                    return (
                      <>
                        <h1>{country.name.common}</h1>
                        <h2>Capital:&nbsp;<span>{country.capital?.[0]}</span></h2>
                        <h2>Area:&nbsp;<span> {country.area}</span></h2>
                        <h2>Languages:&nbsp;</h2>
                        {
                          Object.values(country.languages).map(item => {
                            return (
                              <ul>
                                <li key={item}>{item}</li>
                              </ul>
                            )
                          })
                        }
                        <img src={country.flags.svg} alt={country.flags.alt} />
                      </>
                    )
                  })
                :
                filteredCountries.map(country => {
                  return (
                    <ul>
                      <li key={country.name.common}>
                        {country.name.common}
                        <button onClick={() => setFilteredCountries([country])}>Show</button>
                      </li>
                    </ul>
                  )
                })
              : ''
        }
      </div>
    </>
  )
}

export default App
