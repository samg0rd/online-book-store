import React, { Component } from 'react';
import classes from './Home.module.scss';
import * as actionCreators from '../../store/actions/index';

import { connect } from 'react-redux';

import BookCard from '../../components/BookCard/BookCard';
import Modal from '../../components/UI/Modal/Modal';
import Button from '../../components/UI/Button/Button';

import Quantity from '../../components/Quantity/Quantity';

import Loading from '../../components/UI/Loading/Loading';

import bgImg from '../../assets/book1.jpg';

const bgStyles = {  
  backgroundImage: `url(${bgImg})`
};

const testBtnStyles = {
  borderColor: 'orange'
}

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
          <div className={classes.PreviewModal} style={bgStyles}>

            <div className={classes.PreviewModal__bookInfo}>
              <p><strong>Title</strong> : {this.props.books[this.props.selectedBook].title}</p>
              <p><strong>Author</strong> : {this.props.books[this.props.selectedBook].author}</p>
              <p><strong>Country</strong> : {this.props.books[this.props.selectedBook].country}</p>
              <p><strong>Language</strong> : {this.props.books[this.props.selectedBook].language}</p>
              <p><strong>Year</strong> : {this.props.books[this.props.selectedBook].year}</p>
            </div>

            <div className={classes.addToCartFunc}>

              <h3><strong>PRICE</strong> : {this.props.books[this.props.selectedBook].price}</h3>
              <Quantity qNum={this.state.qNum} addQuantity={this.addQuantityHandler} subQuantity={this.subQuantityHandler}/>            
              <Button customStyles={{fontSize: 30, color: "white"}} clicked={() => this.addToCartHandler({item: this.props.books[this.props.selectedBook], number: this.state.qNum})}>add to cart</Button>

            </div>

          </div>
        </Modal>
      )
    }
    return (
        <div className={classes.Home}>   
            {modal}            
            <h1>کتاب آنلاین</h1>
            <h2>عنوان مورد نظرت رو انتخاب کن</h2>            
            <div className={classes.Home__something}>
                {
                  this.props.books ? this.props.books.map((el, i) => <BookCard 
                      selected={() => this.bookCardClicked(i)}
                      key={el.title} 
                      name={el.title}
                      author={el.author}
                      price={el.price}
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