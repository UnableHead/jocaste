import React, {Component} from "react";
import query from "../Link/Query";
import "./Item.css";
import imgButtonDown from "../Asset/img/ChevronDown.svg";
import imgButtonUp from "../Asset/img/ChevronUp.svg";

const _ = {
  viewEnum: {classic: 1, action: 2, image: 3}
};

class Item extends Component{

  constructor(props){
    super(props);
    this.state = Item.computeState(props, {});

    this.handleSliderClick = this.handleSliderClick.bind(this);
  }

  static getDerivedStateFromProps(props, state){
    return Item.computeState(props, state);
  }

  static computeState(props, state){
    return {
      imgURL: query.getImageURL(props.image_name),
      view: state.view || _.viewEnum.classic
    };
  }

  handleSliderClick(){
    console.log("handleSliderClick");
    const state = this.state;
    state.view = (state.view === _.viewEnum.classic) ? _.viewEnum.action : _.viewEnum.classic;
    this.setState(state);
  }

  render(){
    let imgButton;
    let classDescrition = "Item-description";
    let classAction = "Item-action";
    switch(this.state.view){
      case _.viewEnum.classic:
        imgButton = imgButtonUp;
        if(this.domDescription){
          this.domDescription.style.height = "0px";
        }
        classDescrition += " fadeIn";
        classAction += " fadeOut";
        break;
      case _.viewEnum.action:
        imgButton = imgButtonDown;
        this.domDescription.style.height = this.domDescription.clientHeight + "px";
        classDescrition += " fadeOut";
        classAction += " fadeIn";
        break;
      case _.viewEnum.image:
        break;
    }

    return (
      <div className="Item">
        <h3>{this.props.name}</h3>
        <img src={this.state.imgURL} alt={this.props.image_name}/>
        <div className={classDescrition} ref={(input) => this.domDescription = input}>{this.props.description}</div>
        <div className={"Item-but-slider"} onClick={this.handleSliderClick}>
          <div/>
          <img src={(this.state.view === _.viewEnum.classic) ? imgButtonDown : imgButtonUp}/>
          <div/>
        </div>
        <div className={classAction}>
          <div>Installation</div>
          <h3>Achat</h3>
          <div>Télécharger</div>
        </div>
      </div>
    );
  }
}

export default Item;