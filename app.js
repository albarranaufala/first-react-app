'use strict'

class ProductForm extends React.Component {
  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
    this.state = {}
  }

  submit = function(e){
    e.preventDefault()
    this.props.handleSubmit({
      name: this.refs.name.value,
      price: this.refs.price.value
    })
    this.refs.name.value = ''
    this.refs.price.value = ''
  }

  render() {
    return (
      <form onSubmit={this.submit}>
        <input placeholder="Name" ref="name"/> - <input placeholder="price" ref="price"/>
        <button type="submit">Add Product</button>
        <hr></hr>
      </form>
    )
  }
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
    this.submit = this.submit.bind(this)
    this.state = { 
      productList : [
        {
          name: 'Samsung',
          price: 120
        },
        {
          name: 'Apple',
          price: 100
        },
        {
          name: 'Xiaomi',
          price: 20
        },
      ],
      total : 0 
    }
  }

  add = function(price){
    this.setState({total: this.state.total + price})
  }
  reduce = function(price){
    this.setState({total: this.state.total ? this.state.total - price : this.state.total})
  }
  submit = function(product){
    this.setState({productList: this.state.productList.concat(product)})
  }

  render() {
    let component = this
    let products = this.state.productList.map(function(product, index) {
      return <Product key={index} name={product.name} price={product.price} handleAdd={component.add} handleReduce={component.reduce}/>
    })
    return (
      <div>
        <ProductForm handleSubmit={this.submit}/>
        {products}
        <Total total={this.state.total}/>
      </div>
    )
  }
}

ReactDOM.render(<ProductList/>, document.getElementById('app'))