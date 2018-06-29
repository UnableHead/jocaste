import React, {Component} from "react";
import ReactTooltip from "react-tooltip";
import ReactLoading from "react-loading";
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
    this.handleActionInstall = this.handleActionInstall.bind(this);
    this.handleActionDownload = this.handleActionDownload.bind(this);
  }

  static getDerivedStateFromProps(props, state){
    return Item.computeState(props, state);
  }

  static computeState(props, state){
    const view = props.focus
      ? (state.view === _.viewEnum.image ? _.viewEnum.classic : state.view || _.viewEnum.classic)
      : _.viewEnum.image;
    return {
      imgURL: query.getFileURL(props.image_name),
      view: view,
      previousView: state.view !== view ? state.view : state.previousView || _.viewEnum.image,
      installPercent: state.installPercent || 0
    };
  }

  handleSliderClick(){
    ReactTooltip.rebuild();
    this.setState({
      view: this.state.view === _.viewEnum.action ? _.viewEnum.classic : _.viewEnum.action
    });
  }

  handleActionInstall(){
    if(0 < this.state.installPercent && this.state.installPercent < 100){
      return;
    }
    let installPercent = 1;
    const step = () => {
      this.setState({
        installPercent: ++installPercent
      });
      if(installPercent < 100){
        setTimeout(step, Math.random() * 200);
      }
    };
    step();
  }

  handleActionDownload(){
    query.downloadFile(this.props.fim_name);
  }

  render(){
    let imgButton = imgButtonUp;
    let classImg = "";
    let classDescrition = "Item-description";
    let classAction = "Item-action";
    let classSlider = "Item-but-slider";
    switch(this.state.view){
      case _.viewEnum.classic:
        if(this.state.previousView === _.viewEnum.image){
          classImg += " Item-img-fadeLittle";
          classSlider += " Item-but-slider-fadeIn";
        }else{
          classAction += " Item-description-fadeOut";
        }
        classDescrition += " Item-description-fadeIn";
        break;
      case _.viewEnum.action:
        classImg += " Item-img-fadeLittle";
        classDescrition += " Item-description-fadeOut";
        imgButton = imgButtonDown;
        classSlider += " Item-but-slider-fadeIn";
        classAction += " Item-description-fadeIn";
        break;
      case _.viewEnum.image:
      default:
        classImg += " Item-img-fadeBig";
        if(this.state.previousView === _.viewEnum.classic){
          classDescrition += " Item-description-fadeOut";
          classSlider += " Item-but-slider-fadeOut";
        }else if(this.state.previousView === _.viewEnum.action){
          classAction += " Item-description-fadeOut";
          classSlider += " Item-but-slider-fadeOut";
        }
        break;
    }
    let classInstallInfo = "Item-action-install-info";
    if(0 < this.state.installPercent && this.state.installPercent < 100){
      classInstallInfo += " Item-action-install-fadeIn";
    }else if(this.state.installPercent >= 100){
      classInstallInfo += " Item-action-install-fadeOut";
    }

    return (
      <div className="Item">
        <h3>{this.props.name}</h3>
        <img className={classImg} src={this.state.imgURL} alt={this.props.image_name}/>
        <div className={classDescrition} ref={(input) => this.domDescription = input}>{this.props.description}</div>
        <div className={classSlider} onClick={this.handleSliderClick}>
          <div/><img src={imgButton} alt={imgButton}/><div/>
        </div>
        <div className={classAction}>
          <div className="Item-action-install-container" >
            <div className="Item-action-install" data-tip="Installation direct sur votre serveur" onClick={this.handleActionInstall}>Installation</div>
            <div className={classInstallInfo}>
              <div className="Item-action-install-info-text">Installation...{this.state.installPercent}%</div>
              <ReactLoading className="Item-action-install-loader" type="cylon" color="#581D74" width={100} height={80}/>
            </div>
          </div>
          <h3>Achat</h3>
          <div className="Item-action-download" data-tip="Télécharger le module pour l'injecter sur votre serveur" onClick={this.handleActionDownload}>Télécharger</div>
        </div>
      </div>
    );
  }
}

export default Item;