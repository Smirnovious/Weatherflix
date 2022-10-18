import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {  getSuggestionRes, resetSuggestions, setText } from '../../../redux/slices/autoCompleteSlice'
import { fetchDailyForecast, fetchCurrentWeather, setLocation, fetchDefaultLocation } from '../../../redux/slices/forecastSlice'

const API = 'AdGZ6KxmTXBUGsIxRfLV0Oi2LmjRiITG'


const SearchBar = () => {
    const dispatch = useDispatch()
    const citiesArray = useSelector(state => state.autoComplete.locations)
    const {text} = useSelector(state => state.autoComplete)
   

    const handleChange = async e => {
        const value = e.target.value
        dispatch(setText(value))
        if (value.length > 2) {
            const data = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API}&q=${value}`)
            const suggestedCities = await data.json()
            dispatch(getSuggestionRes(suggestedCities))
        } else {
            dispatch(resetSuggestions())
        }
    }

    const handleCityClick = async (city) => {
        dispatch(fetchDefaultLocation(city.LocalizedName))
        dispatch(resetSuggestions(''))
        dispatch(fetchCurrentWeather(city.Key))
        dispatch(fetchDailyForecast(city.Key))
        dispatch(setLocation({id: city.Key, name: city.LocalizedName}))
        }
    
// Render the list of suggested cities
    const renderSuggestions = () => {
        if (text > 2 && citiesArray.length === 0) {
            return (
              <ul className='absolute top-12 rounded-xl bg-white z-10 w-1/2 overflow-y-auto dark:bg-gray-400'>
                <li className='p-2'>No Cities Found</li>
              </ul>
                )
            } else {
                return (
                <ul className='absolute top-20 lg:top-12 rounded-xl bg-white z-10 w-1/2 overflow-y-auto'>
                        {citiesArray.map((suggestion, index) => (
                            <li key={index} className="hover:bg-amber-500 hover:cursor-pointer flex p-2 justify-between 
                            items-center border-b-2 dark:bg-gray-600 dark:border-b-amber-100 dark:hover:bg-white"
                            onClick={async () => await handleCityClick(suggestion)}>
                                <span className='dark:text-amber-200'>{suggestion.LocalizedName}</span> 
                                <span className='font-light text-slate-500 text-sm dark:text-amber-200'>
                                {suggestion.Country.LocalizedName}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            }

           
    
    return (
        <div className="w-full relative flex flex-row justify-center">
            <input
                className="border-none bg-slate-200 leading-10 p-2 lg:p-0 mt-4 lg:mt-0 rounded-xl mx-auto w-1/2 capitalize 
                transition-all dark:text-amber-200 dark:placeholder-amber-200
                duration-300 ease-in-out focus:outline-none focus:ring-2 
                focus:ring-blue-500 focus:ring-opacity-50 dark:bg-gray-500"
                type="text"
                placeholder="Type a city name"
                onChange={handleChange}
                value={text}
            />
            {renderSuggestions()}
        </div>
    )
}

export default SearchBar