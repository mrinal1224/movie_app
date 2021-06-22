import React, { Component } from 'react'
import {getMovies} from './MoviesService'
export default class Movies extends Component {
    constructor(props)
    {
        super(props);
        this.state={
            movies:getMovies(),
            currSearchText:'',

        }
    }

    onDelete=(id)=>{
        let filterArr = this.state.movies.filter(movieObj=>{
            return movieObj._id!==id
        }
        )
        this.setState({
            movies:filterArr
        })
    }
    handleChange=(e)=>{
        let val = e.target.value;
        this.setState({
            currSearchText:val
        })
        
    }

     sortByRatings = (e) => {
        let className = e.target.className;
        // console.log(className);
        let sortedArr = [];
        if (className === 'fas fa-sort-up') {
            //ascending order m sort
            sortedArr = this.state.movies.sort((movieA, movieB) => {
                return movieA.dailyRentalRate - movieB.dailyRentalRate
            });
        }
        else {
            //descending order
            sortedArr = this.state.movies.sort((movieA, movieB) => {
                return movieB.dailyRentalRate - movieA.dailyRentalRate
            })
        }
        this.setState({
            movies: sortedArr
        });

    }


    sortBystocks=(e)=>{
     let className= e.target.className;

     let sortedArr=[]

     if(className==='fas fa-sort-up'){
       sortedArr= this.state.movies.sort((movieA, movieB)=>{
           return movieA.numberInStock-movieB.numberInStock
       })
     }
     else{
          sortedArr= this.state.movies.sort((movieA, movieB)=>{
           return movieB.numberInStock-movieA.numberInStock
       })
     }

     this.setState({
         movies:sortedArr
        })
    }
    render() {
        
        let {movies,currSearchText}=this.state;
        let filterMovies =[];
        if(currSearchText!=='')
        {
            filterMovies = movies.filter(movieObj=>{
                    let title = movieObj.title.trim().toLowerCase();
                    // console.log(title);
                    return title.includes(currSearchText.toLowerCase());
                })
        }
        else
        {
            filterMovies=movies;
        }


        
        return (
            <div className='container'>
            <div className='row'>
                <div className='col-3'>
                    <h1>Movies List App</h1>
                </div>
                <div className='col-9'>
                   <input onChange={this.handleChange} type='text'></input>
                   <table className="table">
  <thead>
    <tr>
      
      <th scope="col">Title</th>
      <th scope="col">Genre</th>
      <th scope="col">
          <i className="fas fa-sort-up" onClick={this.sortBystocks}></i>
          Stock
          <i className="fas fa-sort-down" onClick={this.sortBystocks}></i>
          </th>
      <th scope="col">
          <i className="fas fa-sort-up" onClick={this.sortByRatings}></i>
          Rate
          <i className="fas fa-sort-down" onClick={this.sortByRatings}></i>
          </th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    {
        filterMovies.map(movieObj=>(
            <tr scope='row' key={movieObj._id} >
              <td>{movieObj.title}</td>
              <td>{movieObj.genre.name}</td>
              
              <td>
                  {movieObj.numberInStock}
                </td>
              <td>{movieObj.dailyRentalRate}</td>
              <td><button onClick={()=>this.onDelete(movieObj._id)} type="button" className="btn btn-danger">Delete</button></td>  
            </tr>
        ))
    }
  </tbody>
</table> 
                </div>
            </div>
            </div>
        )
    }
}