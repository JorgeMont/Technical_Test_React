import React, {useState, useEffect} from 'react';
import MyFact from '../Components/MyFact/MyFact';
import MyGyf from "../Components/MyGif/MyGif";
import "../SASS/styles.scss";

const RandomCats = () => {
    const [catFact, setCatFact] = useState('');
    const[gifInfo, setGifInfo] = useState('');
    const[search, setSearch] = useState('');

    const gifAPI = `https://api.giphy.com/v1/gifs/random?api_key=UZsgMskUv2xfGUiFX9E42H3uUm0kLQ1V&q=${search}&limit=1&offset=0&rating=pg-13&lang=esp`;
    const factAPI = 'https://catfact.ninja/fact';

    useEffect(
        ()=>{
            async function getFact(){
                const res = await fetch(factAPI);
                const data = await res.json();
                setCatFact(data.fact);
            }

            async function getGIF(){
                const res = await fetch(gifAPI);
                const data = await res.json();
                setGifInfo(data.data.images.original.url);
            }

            function getSearch(text){
                setSearch(text.split(' ').slice(0,3).join(' '))
            }

            getFact();
            getSearch(catFact);
            getGIF();
        }
        ,[]);

  return (
      (catFact !== '' && gifInfo !== '') ?
    <section className="container">
      <div className="container__GIF">
        <MyGyf imgURL={gifInfo}/>
      </div>
      <div className="container__Fact">
        <MyFact fact={catFact}/>
      </div>
    </section>
      : 
      <p>Loading...</p>  
      
  );
};

export default RandomCats;
