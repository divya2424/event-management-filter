import React, { Component } from "react";
import "./Dashboard.scss";
import { Col, Row, Container, Form,Button } from "react-bootstrap";

class DashboardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        event_name: {
          value: "",
          error: "",
          errMsg: "",
          text: "Event Name"
        },
        description: {
          value: "",
          error: "",
          errMsg: "",
          text: "Description"
        },
        venue: {
          value: "",
          error: "",
          errMsg: "",
        },
        price: {
          value: "",
          error: "",
          errMsg: "",
        },
        discount: {
          value: "",
          error: "",
          errMsg: "",
        },
      },
      buttonClass : "all"
    };
  }

  componentDidMount() {
    this.props.fetchEvent()
  }

  checkValid(){
      console.log('called')
      const { form } = this.state
      let error = false
      if(form.event_name.value === ''){
        form.event_name.errMsg = "Event Name cannot be empty"
        error = true
        console.log('hete')
        form.event_name.error = true
      }
      if(form.description.value === ''){
        form.description.errMsg = "Description cannot be empty"
        error = true
        form.description.error = true
      }
      if(form.venue.value === ''){
        form.venue.errMsg = "Venue cannot be empty"
        error = true
        form.venue.error = true
      }
      if(form.price.value === ''){
        form.price.errMsg = "Price cannot be empty"
        error = true
        form.price.error = true
      }
      if(form.discount.value === ''){
        error = true
        form.discount.errMsg = "Discount cannot be empty"
        form.discount.error = true
      }
      this.setState({
          form
      })
      return error
   
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { event_name,venue,description,price,discount} =  this.state.form
    let body = {
      "event_name" : event_name.value,
      "discount": discount.value,
      "description": description.value,
      "venue": venue.value,
      "price": price.value
    }
    if(!this.checkValid()){
      this.props.addEvent(body)
      this.clear(e)
      
    }
  };

  clear = (e) => {
    const { form } = this.state;
    e.preventDefault();
    form.event_name.value = "";
    form.event_name.error = "";
    form.event_name.errMsg = "";
    form.description.value = "";
    form.description.error = "";
    form.description.errMsg = "";
    form.venue.value = "";
    form.venue.error = "";
    form.venue.errMsg = "";
    form.discount.value = "";
    form.discount.error = "";
    form.discount.errMsg = "";
    form.price.value = "";
    form.price.error = "";
    form.price.errMsg = "";
    this.setState({
      form,
    });
  };


  displayTableData = ()=>{
    const {event} = this.props;
   
    let eventArr = event.event
    console.log('eventArr',event)
    return eventArr && eventArr.map((val)=>{
      return (
        <tr>
        <td>{val.event_name}</td>
        <td>{val.description}</td>
        <td>{val.venue}</td>
        <td>{val.price}</td>
        <td>{val.discount}</td>
        </tr>
      )
    })
  }

  onInputChange = (e) => {
    const { form } = this.state;
    form[e.target.name].value = e.target.value;
    form[e.target.name].error = false;
    form[e.target.name].errMsg = "";
    this.setState({ form });
  };

  showFilteredData(e,value) {
    const { filterDiscount,fetchEvent} = this.props;
    this.setState({
      buttonClass : value
    })
    if(value === 'all'){
      fetchEvent()
    }
    else{
      filterDiscount({discount : value })
    }
  }

  render() {
    const {event,} = this.props;
    const { buttonClass} = this.state
    const { event_name, description, venue, discount, price } = this.state.form;
    return (
      <div>
      <Form onSubmit={this.handleSubmit} >
        <Form.Group>
          <Form.Label>Event Name*</Form.Label>
          <Form.Control
            type={"text"}
            // className={props.class}
            name={"event_name"}
            placeholder={"Event Name"}
            onChange={(e) => this.onInputChange(e)}
            value={event_name.value}
          />
          {event_name.error ? (
            <div className="error-message">{event_name.errMsg}</div>
          ) : null}
        </Form.Group>

        <Form.Group>
          <Form.Label>Description*</Form.Label>
          <Form.Control
            as="textarea" rows="3"
            // className={props.class}
            name={"description"}
            placeholder={"Description"}
            onChange={(e) => this.onInputChange(e)}
            value={description.value}
          />
          {description.error ? (
            <div className="error-message">{description.errMsg}</div>
          ) : null}
        </Form.Group>

        <Form.Group>
          <Form.Label>Discount*</Form.Label>
          <Form.Control
            as={"select"}
            // className={props.class}
            name={"discount"}
            placeholder={"Discount"}
            onChange={(e) => this.onInputChange(e)}
            value={discount.value}
          >
            <option value="">---------------Select Discount------------------------</option>
            <option value="Free">Free</option>
            <option value="Discount">Discount</option>
            <option value="No Discount">No Discount</option>
          </Form.Control>
          {discount.error ? (
            <div className="error-message">{discount.errMsg}</div>
          ) : null}
        </Form.Group>

        <Form.Group>
          <Form.Label>Venue*</Form.Label>
          <Form.Control
            type={"text"}
            // className={props.class}
            name={"venue"}
            placeholder={"Venue"}
            onChange={(e) => this.onInputChange(e)}
            value={venue.value}
          />
          {venue.error ? (
            <div className="error-message">{venue.errMsg}</div>
          ) : null}
        </Form.Group>

        <Form.Group>
          <Form.Label>Price*</Form.Label>
          <Form.Control
            type={"number"}
            // className={props.class}
            name={"price"}
            placeholder={"Price"}

            onChange={(e) => this.onInputChange(e)}
            value={price.value}
          />
          {price.error ? (
            <div className="error-message">{price.errMsg}</div>
          ) : null}
        </Form.Group>
        <span>
        <Form.Group className="text-center">
        <Button
            type="button"
            onClick={this.clear}
        >
            Clear
        </Button>
        </Form.Group>
        <Form.Group className="text-center">
        <Button type="submit">
        Submit
        </Button>
        </Form.Group>
        </span>
        
      </Form>
      {
        event.event && event.event.length > 0 ? <div>
          <div className="myBtnContainer">
          <button className={buttonClass === 'all' ? "btn-filter active" : "btn-filter"} onClick={(e) =>this.showFilteredData(e,'all')}> Show all</button>
          <button className={buttonClass === 'Free' ? "btn-filter active" : "btn-filter"} onClick={(e) =>this.showFilteredData(e,'Free')}> Free</button>
          <button className={buttonClass === 'No Discount' ? "btn-filter active" : "btn-filter"} onClick={(e) =>this.showFilteredData(e,'No Discount')} >No Discount</button>
          <button className={buttonClass === 'Discount' ? "btn-filter active" : "btn-filter"} onClick={(e) =>this.showFilteredData(e,'Discount')}> Discount</button>
          
        </div>
      <table>
          
        <tr>
          <th>Event Name</th>
          <th>Description</th>
          <th>Venue</th>
          <th>Price</th>
          <th>Discount</th>
        </tr>
        {
          this.displayTableData()
        }
        </table></div> : null
      }
   

    </div>
    );
  }
}

export default DashboardComponent;
