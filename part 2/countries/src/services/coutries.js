import axios from 'axios';
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAllCountries = () => {
    return axios.get(`${baseUrl}/all`)
}

const getCountryByName = (name) => {
    return axios.get(`${baseUrl}/name/${name}`)
}

export default {
    getAllCountries,
    getCountryByName
}