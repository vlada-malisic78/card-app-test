import React, {Component} from 'react';
import AddCard from './AddCard/AddCard'
import CardList from './cards/CardList';
import {Route, Switch} from 'react-router-dom';
import EditCard from './EditCard/EditCard';


class App extends Component {
  constructor(props){
    super(props);
    this.state={  
        cards: []
    }
}

componentDidMount(){
  this.getData();
}

getData = () => {  
  var cardItem =[];
      for(var key in localStorage) { 
        console.log(key)
        if(localStorage.getItem(key) !== null){
          console.log(localStorage.getItem(key))
          cardItem.push(JSON.parse(localStorage.getItem(key)))
        }     
        this.setState({cards:  cardItem})
  }

}


editCard = (id, update) => {
  if(id){
    const edit = this.state.cards.map( item => {
      if(item.id === id){
        return {...item, ...update}
      }
      return {...item}
    });
    this.setState({
      cards: edit
    })
    localStorage.setItem(id, JSON.stringify(edit))
    this.getData()
  }
 
}

  render() { 
    const cardsItem = this.state.cards.map(item => item);
    console.log(this.state.cards)
      return (
        <div className="container">
          <Switch>
            <Route exact path="/cards" render = {() => 
              <CardList cards={this.state.cards} />
            }/>
            <Route path="/cards/:id/edit" render = {() =>               
              <EditCard cards={cardsItem} editCard={this.editCard}/>
            }/>
            <Route exact path="/cards/add" render = {() => 
              <AddCard />
            } />
          </Switch>
         </div>
        );
  }
}
 
export default App;
