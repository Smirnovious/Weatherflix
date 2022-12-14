import React from 'react'
import {Routes, Route} from 'react-router-dom'
import FavoritesPage from './Pages/favorites/FavoritesPage'
import MainPage from './Pages/main/MainPage'
import NotFoundPage from './Pages/extra/NotFoundPage'
import WeatherFavPage from './Pages/extra/WeatherFavPage'


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/forecast/:id" element={<WeatherFavPage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes> 
     )
}

export default App