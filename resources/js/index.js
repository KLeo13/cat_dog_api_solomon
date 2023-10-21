import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BreedsList from './components/Home';
import PetImage from './components/PetImage';
import 'bootstrap/dist/css/bootstrap.min.css';

if (document.getElementById('main_body')) {
    ReactDOM.render(
      <Router>
        <Routes>
            <Route element={<BreedsList kind='Both'/>}/>
            <Route path='/v1' element={<BreedsList kind='Both'/>}/>
            <Route path='/v1/breeds' element={<BreedsList kind='Both'/>}/>
            <Route path='/v1/breeds?page={page}&limit={limit}' element={<BreedsList kind='Both'/>}/>
            <Route path='/v1/breeds/dog' element={<BreedsList kind='Dog'/>}/>
            <Route path='/v1/breeds/cat' element={<BreedsList kind='Cat'/>}/>
            <Route path='/v1/image/:image_id' element={<PetImage/>}/>
        </Routes>
      </Router>,
      document.getElementById('main_body')
    );
  }