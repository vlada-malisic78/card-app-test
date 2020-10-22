import React, { Component } from 'react'
import './CardList.scss'
import {Link} from 'react-router-dom'
import Card from './Card';

class CardList extends Component {

    render(){
        console.log(this.props.cards)
        const cardItems = this.props.cards.map((item) =>
            <Card key={item} item={item} editCard={this.props.editCard}/>
        )
        return (
            <div className="container">                    
                    <Link to="/cards/">{cardItems}</Link>
                   <Link to="/cards/add" className="add-card">+</Link>
            </div>
        )
    }
}

export default CardList;