import React, { Component } from 'react'
import './EditCard.scss'

class EditCard extends Component {
    state ={
      cards: {
            id: this.props.cards.id,
            type:this.props.cards.type,
            username:this.props.cards.username,
            cardNumber: {
                field1: this.props.cards.cardNumber.field1,
                field2: this.props.cards.cardNumber.field2,
                field3: this.props.cards.cardNumber.field3,
                field4: this.props.cards.cardNumber.field4,
            },
            expire: this.props.cards.expire,
            validateErrors:'',
            editing: this.props.cards.editing
      }
    }

    handleChange = e => {  
       
        this.setState({
            [e.target.name]: e.target.value,
        })
    }


    handleSubmit = e => {
        e.preventDefault();      
        const {username,expire,type} = this.state.cards;
        const {field1,field2, field3, field4}= this.state.cards; 

        const card = {
            username,
            type,
            cardNumber:{
                field1,
                field2,
                field3,
                field4,
            },
            expire,
        }
        this.props.editCard(this.state.cards.id, card);
        this.setState({
            cards:{
                editing:!this.state.cards.editing
            }
        })
        //this.validateForm()
        //this.dataFormat(this.state.expire);
    }

    // dataFormat = () => {
    //     const date = new Date();
    //     const year = date.getYear().toString().substr(-2);
    //     let fullMonth;
    //     const month  = Number(date.getMonth()+1);
    //      if(month<10){
    //         fullMonth ='0'+month;
    //     }              
    //     this.setState({
    //         expire: `${fullMonth}/${year}`
    //     })
    // }
    
    render(){
        console.log(this.props.cards)
        const items = this.state.cards.map(item => item)
        console.log(this.state, this.props.cards)
        //const {name, expire} = this.state.cards;
       //const {error:{field1Error}} = this.state;
       //const {field1,field2, field3, field4}= this.state.cards;

     //  const status = (!field1 || !field2 || !field3 || !field4) ? 'disabled' : '';
        return (
            <div className="container">
                <form  className="forma" onSubmit={this.handleSubmit}>
                <h3>Edit Card</h3>
                <div className="form-group">
                        <label htmlFor="username" className="">Name</label>
                        <input type="text" name="username" className="username"  value={items.username} onChange={this.handleChange} />
                        {this.props.validateErrors && <div className="text-danger">You must enter name</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="cardNumber">Card Number</label>
                    <div className="form-row">
                        <div className="col">
                            <input 
                                type="text" 
                                name="field1" 
                                value={this.state.cards.field1} 
                                onChange={this.handleChange}                                 
                            />
                        </div>
                        <div className="col">
                            <input 
                                type="text" 
                                name="field2" 
                                value={this.state.cards.field2} 
                                onChange={this.handleChange} 
                            />
                        </div>
                        <div className="col">
                            <input 
                                type="text" 
                                name="field3" 
                                value={this.state.cards.field3} 
                                onChange={this.handleChange} 
                               
                            />
                        </div>
                        <div className="col">    
                            <input 
                                type="text" 
                                name="field4" 
                                value={this.state.cards.field4} 
                                onChange={this.handleChange} 
                            />
                        </div>
                    </div>
                    <div>
                    {this.state.cards.validateErrors ? (<div  className="text-danger">Wrong card number</div>):''}
                    </div>
                </div>
                <div className="form-group">
                        <label htmlFor="expire">Expires on</label>
                        <input type="text" name="expire" value={this.state.cards.expire} onChange={this.handleChange}/>
                        {this.state.cards.expire === '' ? (<div className="text-danger">Wrong expire date</div>):''}
                </div>
                <div className="form-group">
                        <input type="submit" className="button"  name="submit"  value="Save" />
                </div>
                </form>
            </div>
        )
    }
}

export default EditCard;