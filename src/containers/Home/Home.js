import React, { Component } from 'react';
import classes from './Home.module.scss';
import * as actionCreators from '../../store/actions/index';

import { connect } from 'react-redux';

import BookCard from '../../components/BookCard/BookCard';
import Modal from '../../components/UI/Modal/Modal';
import Button from '../../components/UI/Button/Button';

import Quantity from '../../components/Quantity/Quantity';

import Loading from '../../components/UI/Loading/Loading';

class Home extends Component {

  state = {
    qNum: 1
  }

  componentDidMount(){
    this.props.fetchHomeBooksData();        
  }

  bookCardClicked = (index) => {    
    this.props.selectBook(index);
  }

  closeModalHandler = () => {
    this.props.deselectBook();
    this.setState({
      qNum: 1
    })
  }

  addToCartHandler = (selectedBook) => {    
    this.props.addToCart(selectedBook);
    this.props.deselectBook();
    this.setState({
      qNum: 1
    })
  }

  addQuantityHandler = () => {    
    this.setState(prevState => {
      return {
        qNum: prevState.qNum+=1
      }
    })
  }

  subQuantityHandler = () => {
    this.setState(prevState => {
      return {
        qNum: prevState.qNum > 1 ? prevState.qNum-=1 : 1
      }
    })
  }

  render() {    
      
    let modal = null;
    if(this.props.selectedBook !== null){
      modal = (
        <Modal closeModal={this.closeModalHandler}>

          <p><strong>Title</strong> : {this.props.books[this.props.selectedBook].title}</p>
          <p><strong>Author</strong> : {this.props.books[this.props.selectedBook].author}</p>
          <p><strong>Country</strong> : {this.props.books[this.props.selectedBook].country}</p>
          <p><strong>Language</strong> : {this.props.books[this.props.selectedBook].language}</p>
          <p><strong>Year</strong> : {this.props.books[this.props.selectedBook].year}</p>

          <div className={classes.addToCartFunc}>

            <h3><strong>PRICE</strong> : {this.props.books[this.props.selectedBook].price}</h3>
            <Quantity qNum={this.state.qNum} addQuantity={this.addQuantityHandler} subQuantity={this.subQuantityHandler}/>            
            <Button btnType="Button--Success" clicked={() => this.addToCartHandler({item: this.props.books[this.props.selectedBook], number: this.state.qNum})}>add to cart</Button>

          </div>

        </Modal>
      )
    }
    return (
        <div className={classes.Home}>   
            {modal}
            <h1>Welcome to online book store</h1>
            <h2>newest titles</h2>            
            <div className={classes.Home__something}>
                {
                  this.props.books ? this.props.books.map((el, i) => <BookCard 
                      selected={() => this.bookCardClicked(i)}
                      key={el.title} 
                      name={el.title}
                      author={el.author}
                      />
                      ) : <Loading />
                }
            </div>
        </div>
    );
  }
}

const mapStateToProps = state => {
    return {
        books: state.home.homeData,
        selectedBook: state.home.selected
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchHomeBooksData: () => dispatch(actionCreators.fetchHomeData()),
        selectBook: (i) => dispatch(actionCreators.selectBook(i)),
        deselectBook: () => dispatch(actionCreators.deselectBook()),
        addToCart: (selectedBook) => dispatch(actionCreators.addToCart(selectedBook))
    }
}   

export default connect(mapStateToProps, mapDispatchToProps)(Home);