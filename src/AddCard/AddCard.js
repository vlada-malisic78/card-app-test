import React, { Component } from 'react'
import {Redirect}from 'react-router-dom'
import './AddCard.scss'
import uuid from 'react-uuid';

class AddCard extends Component {
    state ={
            id:'',
            type: '',
            username:'',
            field1:'',
            field2:'',
            field3:'',
            field4:'',
            expire: '',
            validateErrors:'',
            submit: false
    }

    handleChange = e => {         
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    // validateForm = () =>{
    //     const {name, type, cardNumber:{field1, field2, field3, field4}, expire, validateErrors} = this.state;      
    //     const errors = {}
    //     const expireDate = expire;
    //     const expDate = expireDate.getMiliseconds();
    //     const date = new Date.now();
    //     if(date >expDate){
    //         errors['expire']= 'Date is not valid'
    //     }


    //     let fieldName=name.length <3;
    //     let cardNumber = /^\d{4}$/g;
       
        
    //     if(!fieldName){
    //         errors['name']='You must enter your name';
    //     }
    //     if(!field1){
    //         errors['field']='Wrong card number'
    //     }
    //     if(!expire){
    //         errors['expire'] ='Wrong date'
    //     }
    //     this.setState({
    //         validateErrors: errors
    //     })
    //     return Object.keys(errors).length === 0;
    // }

    handleSubmit = e => {
        e.preventDefault();      
        const {username,expire} = this.state;
        const {field1,field2, field3, field4}= this.state; 
        const first = String(field1);
        const firstNumber = first.charAt(0)
        const type = (firstNumber === '4') ? 'Visa': (firstNumber === '5' ? 'MasterCard': 'Discover');
        const card = {
            id: uuid(),
            type,
            username,
            cardNumber: {
                field1,
                field2,
                field3,
                field4
            },
            expire,
        }
       localStorage.setItem(uuid(), JSON.stringify(card))
        console.log(card)
        this.setState({submit: true})
    }

    dataFormat = () => {
        const date = new Date();
        const year = date.getYear().toString().substr(-2);
        let fullMonth;
        const month  = Number(date.getMonth()+1);
         if(month<10){
            fullMonth ='0'+month;
        }              
        this.setState({
            expire: `${fullMonth}/${year}`
        })
    }
    
    render(){
        console.log(this.state)
       
        return (
            <div className="container">
                <h1>New Card</h1>
                <form  className="forma" onSubmit={this.handleSubmit}>                              
                <div className="form-group">
                        <label htmlFor="username" className="">Name</label>
                        <input type="text" name="username" className="username"  value={this.state.username} onChange={this.handleChange} />
                        {this.state.validateErrors.username  && <div className="text-danger">You must enter name</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="cardNumber">Card Number</label>
                    <div className="form-row">
                        <div className="col">
                            <input 
                                type="text" 
                                name="field1" 
                                value={this.state.field1} 
                                onChange={this.handleChange} 
                                
                            />
                        </div>
                        <div className="col">
                            <input 
                                type="text" 
                                name="field2" 
                                value={this.state.field2} 
                                onChange={this.handleChange} 
                            />
                        </div>
                        <div className="col">
                            <input 
                                type="text" 
                                name="field3" 
                                value={this.state.field3} 
                                onChange={this.handleChange} 
                               
                            />
                        </div>
                        <div className="col">    
                            <input 
                                type="text" 
                                name="field4" 
                                value={this.state.field4} 
                                onChange={this.handleChange} 
                            />
                        </div>
                    </div>
                    <div>
                    {this.state.validateErrors.field ? (<div  className="text-danger">Wrong card number</div>):''}
                    </div>
                </div>
                <div className="form-group">
                        <label htmlFor="expire">Expires on</label>
                        <input type="text" name="expire" value={this.state.expire} onChange={this.handleChange}/>
                        {this.state.expire.length === '' ? (<div className="text-danger">Wrong expire date</div>):''}
                </div>
                <div className="form-group">
                        <input type="submit" className="button"  name="submit"  value="Save" />
                </div>
                </form>
                {this.state.submit && <Redirect to="/cards"/>}
            
            </div>
        )
    }
}

export default AddCard;