import React, {Component} from "react";
import query from "../Link/Query";
import Item from "./Item";
import "./Stand.css";

class Stand extends Component{

  constructor(props){
    super(props);
    this.state = {
      itemList: [],
      focusedItem: this.computeFocusedItem()
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentWillMount(){
    query.getListModule((data) => {
      this.setState({itemList: [...data.results]});
    });
  }

  computeFocusedItem(){
    let focusedItem = 0;
    if(this.itemContainer){
      const currentScroll = this.itemContainer.scrollLeft;
      const boundLast = this.itemContainer.children[this.itemContainer.children.length - 1].getBoundingClientRect();
      const maxSize = this.itemContainer.scrollLeft + boundLast.x + boundLast.width - this.itemContainer.getBoundingClientRect().width;
      focusedItem = Math.floor((this.state.itemList.length - 1) * currentScroll / maxSize);
    }
    return focusedItem;
  }

  handleScroll(){
    this.setState({
      focusedItem: this.computeFocusedItem()
    });
  }

  render(){
    return (
      <div className="Stand" onScroll={this.handleScroll}>
        <div className="Stand-background"/>
        <div className="Stand-content" ref={(input) => this.itemContainer = input}>
          {this.state.itemList.map((item, index) => {
            return <Item key={item.id} {...item} focus={this.state.focusedItem === index}/>;
          })}
        </div>
      </div>
    );
  }
}

export default Stand;