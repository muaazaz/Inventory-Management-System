import { Countries, Cities } from 'countries-states-cities-service'


export const getCountries = ()=>{
    return Countries.getCountries()
}
export const getCities = (country)=>{
    return Cities.getCities({
        sort:{mode: 'asc'},
        filters:{country_code: country}
    })
}