import React, {Component} from "react";
import query from "../Link/Query";
import "./Item.css";

class Item extends Component{

  constructor(props){
    super(props);
    this.state = Item.computeState(props);
  }

  static getDerivedStateFromProps(props){
    return Item.computeState(props);
  }

  static computeState(props){
    return {imgURL: query.getImageURL(props.image_name)};
  }

  render(){
    return (
      <div className="Item">
        <h3>{this.props.name}</h3>
        <img src={this.state.imgURL} alt={this.state.imgSrc}/>
        <div>{this.props.description}</div>
      </div>
    );
  }
}

export default Item;