import React, { Component } from 'react';
import lib from '../../lib/lib';
import swal from 'sweetalert2';

import { Link } from 'react-router-dom';
import { Card, CardImg, CardText, CardBody,
  CardTitle, Button, Col, Row } from 'reactstrap';

class Box extends Component {
  constructor() {
    super();
    
    this.state = {
      boxes: [],
      fetched: false,
    };
  }
  
  createCard(boxes) {
    return (
      <Col sm="3">
        <Card className="border-dark mb-3" key={boxes.ID}>
          <CardImg top width="100%" src="https://cdn3.bigcommerce.com/s-iwa5azhm/products/3005/images/8589/mystery_box1__25761__96670.1430944750.400.400.jpg?c=2" alt="Card image cap"/>
          <CardBody>
            <CardTitle>{boxes.name}</CardTitle>
            <CardText>{boxes.description}</CardText>
            <Link to={`/box/${boxes.ID}`} className="btn btn-outline-info btn-sm">Edit</Link>{' '}
            <Button outline size="sm" color="danger">Delete</Button>
          </CardBody>
        </Card >
      </Col>
    )
  }

  openWizard(e) {
    swal.setDefaults({
      input: 'text',
      confirmButtonText: 'Next &rarr;',
      showCancelButton: true,
      progressSteps: ['1', '2', '3']
    });

    const steps = [
      {
        title: 'Question 1',
        text: 'Chaining swal2 modals is easy'
      },
      'Question 2',
      'Question 3'
    ];

    swal.queue(steps).then((result) => {
      swal.resetDefaults();

      if (result.value) {
        swal({
          title: 'All done!',
          html:
          'Your answers: <pre>' +
          JSON.stringify(result.value) +
          '</pre>',
          confirmButtonText: 'Lovely!'
        });
      }
    });
  }

  async getBoxes() {
    this.setState({ boxes: await lib.bellbois.bellbois['@dev'].getBoxes(), fetched: true });
  }

  componentDidMount() {
    this.getBoxes();
  }

  render() {
    return (
      <div>
        <Button color="success" className="float-right" size="sm" onclick={this.openWizard}><i className="material-icons">add</i></Button>{' '}
        <Row>
        {this.state.fetched === false || this.state.boxes.length ? this.state.boxes.map(this.createCard): "You have no boxes!!!!!1!One!"}
        </Row>
      </div>

    )
  }
}

export default Box;
