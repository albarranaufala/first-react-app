'use strict'

class ProductForm extends React.Component {
  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
    this.state = {}
  }

  submit = function(e){
    e.preventDefault()
    if(this.refs.name.value && this.refs.price.value){
      this.props.handleSubmit({
        name: this.refs.name.value,
        price: this.refs.price.value,
        qty: 0
      })
      this.refs.name.value = ''
      this.refs.price.value = ''
    }
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
    this.remove = this.remove.bind(this)
    this.state = {  }
  }

  add = function(){
    this.props.handleAdd(this.props.index)
  }

  reduce = function(){
    this.props.handleReduce(this.props.index)
  }

  remove = function(){
    this.props.handleRemove(this.props.index)
  }

  render() {
    return (
      <div>
        <p>{this.props.product.name} - ${this.props.product.price}</p>
        <button onClick={this.add}>+</button>
        <button onClick={this.reduce}>-</button>
        <button onClick={this.remove}>remove</button>
        <h3>Qty : {this.props.product.qty}</h3>
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
    this.remove = this.remove.bind(this)
    this.state = { 
      productList : [
        {
          name: 'Samsung',
          price: 120,
          qty: 0
        },
        {
          name: 'Apple',
          price: 100,
          qty: 0
        },
        {
          name: 'Xiaomi',
          price: 20,
          qty: 0
        },
      ],
    }
  }

  total = function(productList){
    let total = 0
    productList.forEach((product, i) => {
      total += product.qty * product.price
    })
    return total
  }

  add = function(index){
    this.setState({
      productList: this.state.productList.map((product, i) => {
        if(i === index){
          product.qty += 1
          return product
        }
        return product
      })
    })
  }

  reduce = function(index){
    this.setState({
      productList: this.state.productList.map((product, i) => {
        if(i === index){
          product.qty = product.qty ? product.qty - 1 : product.qty 
          return product
        }
        return product
      })
    })
  }

  submit = function(product){
    this.setState({
      productList: this.state.productList.concat(product)
    })
  }

  remove = function(index){
    this.setState({
      productList: this.state.productList.filter((item, j) => index !== j)
    })
  }

  render() {
    let component = this
    let products = this.state.productList.map((product, index) => {
      return <Product key={index} index={index} product={product} handleAdd={component.add} handleReduce={component.reduce} handleRemove={component.remove}/>
    })
    return (
      <div>
        <ProductForm handleSubmit={this.submit}/>
        {products}
        <Total total={this.total(this.state.productList)}/>
      </div>
    )
  }
}

ReactDOM.render(<ProductList/>, document.getElementById('app'))