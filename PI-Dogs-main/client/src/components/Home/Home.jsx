import React from "react";
import { NavLink,Link } from "react-router-dom";
import { useState,useEffect } from "react";
import{useDispatch,useSelector}from 'react-redux';
import{getDogs,byOrder,byOrderWeight,filterDogsCreated}from'../../actions/index';
import Card from'../Card/Card';
import Paged from '../Paged/Paged';
import style from './Home.module.css';
import SearchBar from '../SearchBar/SearchBar';
import image from '../../media/patitas.jpg';

export default function Home(){
    const dispatch=useDispatch();
    const allDogs=useSelector((state)=>state.dogs);
    const [currentPage, setCurrentPage]=useState(1);
    const [order,setOrder]=useState('')
    const [dogsPage,setDogPage]=useState(8);
    const indexLastDog=currentPage*dogsPage;
    const indexFirstDog=indexLastDog-dogsPage;
    const currentDog=allDogs.slice(indexFirstDog,indexLastDog);

    const pagedTotal=(numPage)=>{
        setCurrentPage(numPage)
    };

    useEffect(()=>{
        dispatch(getDogs())
    },[dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getDogs());
    };

    function handleFilter(e){
        dispatch(filterDogsCreated(e.target.value));
    };

    function handleOrder(e){
        e.preventDefault();
        dispatch(byOrder(e.target.value));
        setCurrentPage(1);
        setOrder(e.target.value)
    };
    function handleOrderByWeight(e) {
        e.preventDefault();
        dispatch(byOrderWeight(e.target.value));
        setCurrentPage(1);
        setOrder(e.target.value)
    };

    return(
           
         <div className={style.containsAll}>
             <div className={style.nav}>
                 <div className={style.head}>
                     <h1>DOoGLE</h1>
                 </div>
             <div className={style.created}>
                <Link style={{textDecoration:'none'}} to='/dog'>Add new dog</Link>
            </div>
                <button className={style.reload}
                    onClick={e=>handleClick(e)}>Refresh   
                </button><br/>
                <select
                onClick={e=>handleFilter(e)}
                className={style.selectAC} >
                    <option value='All'>All</option>
                    <option value='Created'>Created</option>
                </select>
                <div className={style.search}>
                <SearchBar/>
                </div>
                <div className={style.order}>
                <div className={style.alf}>
                <h5>Order by alphabet:</h5>
                <select onClick={e=>handleOrder}>
                    <option value='Asc' onClick={e=>handleOrder(e)}>A-Z</option>
                    <option value='Desc' onClick={e=>handleOrder(e)}>Z-A</option>
                </select>
                </div>
                <div className={style.weight}>
                    <h5>Order by weight:</h5>
                <select onClick={e=>handleOrder}>
                    <option value='Weight 1' onClick={e=>handleOrderByWeight(e)}>Small</option>
                    <option value='Weight 2' onClick={e=>handleOrderByWeight(e)}>Big</option>
                </select>
                </div>
                </div>
                <div className={style.direccion}>
                {currentDog?.map((e) =>{
                    return(
                        <div className={style.contenedor} > 
                            <NavLink style={{ textDecoration: 'none' }} to ={ '/home' + e.id }>
                            <Card name  = {e.name} 
                                image = {e.image? e.image : e.imagen}
                                temperament = {e.temperament? e.temperament : e.temperaments && e.temperaments.map(t =>t.name.concat(" "))}
                                key = {e.id}/>
                            </NavLink>
                        </div>
                    )
            })}                
            </div>
            <div className={style.pagination}>
                <Paged
                    dogsPage = {dogsPage}
                    allDogs = {allDogs.length}
                    pagedTotal = {pagedTotal}
                />
            </div> 
             <div>
            <Link to='/'><button className={style.back} >Back</button></Link>
            </div> 
             </div>
             {/* 

                <div className={style.order}>
                <button className={style.button}
                onClick={(e)=>handleOrder(e)}
                value='Asc'>A-Z</button>
                <button className={style.button} onClick={(e) => handleOrder(e)} value='Desc'>Z-A</button>
                <button className={style.button} onClick={(e) => handleOrderByWeight(e)} value= 'Weight 1'>SMALL</button>
                <button className={style.button} onClick={(e) => handleOrderByWeight(e)} value= 'Weight 2'>BIG</button>
                </div>
           
            <div className={style.direccion}>
                {currentDog?.map((e) =>{
                    return(
                        <div className={style.contenedor} > 
                            <NavLink style={{ textDecoration: 'none' }} to ={ '/home' + e.id }>
                            <Card name  = {e.name} 
                                image = {e.image? e.image : e.imagen}
                                temperament = {e.temperament? e.temperament : e.temperaments && e.temperaments.map(t =>t.name.concat(" "))}
                                key = {e.id}/>
                            </NavLink>
                        </div>
                    )
            })}                
            </div>
            <div className={style.pagination}>
                <Paged
                    dogsPage = {dogsPage}
                    allDogs = {allDogs.length}
                    pagedTotal = {pagedTotal}
                />
            </div> 
             <div>
            <Link to='/'><button className={style.back} >Back</button></Link>
            </div> 
         </div>  */}
         </div>
        
    )
}
