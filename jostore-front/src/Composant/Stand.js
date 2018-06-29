import React, {Component} from "react";
import query from "../Link/Query";
import Item from "./Item";
import "./Stand.css";

class Stand extends Component{

  constructor(props){
    super(props);
    this.state = {
      itemList: []
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentWillMount(){
    query.getListModule((data) => {
      this.setState({itemList: [...data.results]});
    });
  }

  handleScroll(e){
    // console.log("Matthias", e);
  }

  render(){
    return (
      <div className="Stand" onScroll={this.handleScroll}>
        <div className="Stand-background"/>
        <div className="Stand-content">
          {this.state.itemList.map((item) => {
            return <Item key={item.id} {...item}/>;
          })}
        </div>
      </div>
    );
  }
}

export default Stand;