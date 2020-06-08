'use strict'

class ProductForm extends React.Component {
  //TODO
}

class Product extends React.Component {
  constructor(props) {
    super(props)
    this.add = this.add.bind(this)
    this.reduce = this.reduce.bind(this)
    this.state = { qty:0 }
  }

  add = function(){
    this.setState({qty: this.state.qty + 1})
    this.props.handleAdd(this.props.price)
  }

  reduce = function(){
    this.setState({qty: this.state.qty ? this.state.qty - 1 : this.state.qty})
    if(this.state.qty){
      this.props.handleReduce(this.props.price)
    }
  }

  render() {
    return (
      <div>
        <p>{this.props.name} - ${this.props.price}</p>
        <button onClick={this.add}>+</button>
        <button onClick={this.reduce}>-</button>
        <h3>Qty : {this.state.qty}</h3>
        <hr></hr>
      </div>
    )
  }
}

class Total extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  render() {
    return (
      <div>
        <h2>Total Price: {this.props.total}</h2>
      </div>
    )
  }
}

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.add = this.add.bind(this)
    this.reduce = this.reduce.bind(this)
    this.state = { 
      total : 0 
    }
  }

  add = function(price){
    this.setState({total: this.state.total + price})
  }
  reduce = function(price){
    this.setState({total: this.state.total ? this.state.total - price : this.state.total})
  }

  render() {
    return (
      <div>
        <Product name='Samsung' price={120} handleAdd={this.add} handleReduce={this.reduce}/>
        <Product name='Apple' price={100} handleAdd={this.add} handleReduce={this.reduce}/>
        <Product name='Xiaomi' price={20} handleAdd={this.add} handleReduce={this.reduce}/>
        <Total total={this.state.total}/>
      </div>
    )
  }
}

ReactDOM.render(<ProductList/>, document.getElementById('app'))