import React, { Component } from 'react'
import './Card.scss'
import {Link} from 'react-router-dom'


class Card extends Component {

    handleSubmit = e => {
        e.preventDefault();      
        const {username,expire} = this.state;
        const {field1,field2, field3, field4} = this.state; 
        const first = String(field1);
        const firstNumber = first.charAt(0)
        const type = (firstNumber === '4') ? 'Visa': (firstNumber === '5' ? 'MasterCard': 'Discover');
        const card = {
            username,
            type,
            cardNumber: {
                field1,
                field2,
                field3,
                field4
            },
            expire,
        }
        this.props.editCard(this.state.id, card);
        this.setState({
            editing: false
        })
    }

    render(){
        const {username,expire,type,id} = this.props.item;
        const {cardNumber: {field1,field2,field3,field4}} = this.props.item;
        console.log(this.state)
        
        return (
            <Link to={`cards/${id}/edit`}>
                <div className="card" onClick={this.handleEdit}>  

                    <div className="logo">
                        <img className="card-image" src={`images/${type}.png`} alt={type} />
                    </div>
                    <div className="card-numbers" >
                        <span className="col">{field1}</span>
                        <span className="col">{field2}</span>
                        <span className="col">{field3}</span>
                        <span className="col">{field4}</span>
                    </div>
                    <div  className="card-name">{username}</div>
                    <div className="card-expire">{expire}</div>
                </div>
            </Link>  
            )
        }
}

export default Card;