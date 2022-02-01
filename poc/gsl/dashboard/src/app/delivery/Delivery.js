import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Spinner from '../shared/Spinner';
import { Form } from 'react-bootstrap';
import { isAllowedTo } from '../utils/session';

const Statuses = {
  Pending: 'pending',
  Invoiced: 'invoiced',
  InProgress: 'in-progress',
  Completed: 'completed',
  Cancelled: 'cancelled',
  Late: 'late',
};

function NewUpdateForm() {
  return (
    <form className="forms-sample">
      <Form.Group>
        <label htmlFor="new-place" className="col-sm-3 col-form-label">
          Novo Local
        </label>
        <select className="form-control text-light" id="new-place">
          <option>Deposito SP</option>
          <option>Deposito MG</option>
          <option>Deposito RJ</option>
          <option>Deposito Central</option>
          <option>Endereço de Entrega</option>
        </select>
      </Form.Group>
      <Form.Group>
        <label htmlFor="new-responsible" className="col-sm-3 col-form-label">
          Novo Responsável
        </label>
        <select className="form-control text-light" id="new-responsible">
          <option>Tiborcio Pai</option>
          <option>Tiborcio Segundo</option>
          <option>Tiborcio Terceirio</option>
          <option>Franciso Roberto</option>
        </select>
      </Form.Group>
      <Form.Group>
        <label htmlFor="new-status" className="col-sm-3 col-form-label">
          Novo Status
        </label>
        <select className="form-control text-light" id="new-status">
          {Object.keys(Statuses).map((status) => (
            <option>{Statuses[status].toUpperCase()}</option>
          ))}
        </select>
      </Form.Group>
      <button type="submit" className="btn btn-primary mr-2">
        Confirmar
      </button>
    </form>
  );
}

class Delivery extends Component {
  state = {
    editing: false,
    data: {},
    loading: true,
  };

  componentDidMount() {
    this.setState({
      data: {
        id: this.props.match.params.id,
        order: {
          createdAt: new Date(),
          updatedAt: new Date(),
          id: 123,
          user: { name: 'João da Silva' },
          itens: [
            {
              name: 'Abajur de Algodão',
              price: 500,
            },
            {
              name: 'Sandalia Preta',
              price: 500,
            },
          ],
          total: 1000,
        },
        status: 'pending',
        paths: [
          {
            from: {
              alias: 'Deposito SP',
              lat: -23.56488,
              lng: -46.63818,
            },
            to: {
              alias: 'Deposito MG',
              lat: -23.56488,
              lng: -46.63818,
            },
            arrivedAt: new Date(),
            leftAt: new Date(),
            responsible: { name: 'Tiborcio Segundo' },
          },
          {
            from: {
              alias: 'Deposito MG',
              lat: -23.56488,
              lng: -46.63818,
            },
            to: {
              alias: 'Casa do João da Silva',
              lat: -23.56488,
              lng: -46.63818,
            },
            arrivedAt: new Date(),
            leftAt: new Date(),
            responsible: { name: 'Tiborcio Terceirio' },
          },
        ],
      },
      editing: this.props.location.search.includes('editing=true'),
      loading: false,
    });
  }

  getClassNameByStatus(status) {
    switch (status) {
      case Statuses.Pending:
        return 'badge badge-warning';
      case Statuses.Invoiced:
        return 'badge badge-info';
      case Statuses.InProgress:
        return 'badge badge-primary';
      case Statuses.Completed:
        return 'badge badge-success';
      case Statuses.Cancelled:
        return 'badge badge-danger';
      case Statuses.Late:
        return 'badge badge-danger';
      default:
        return 'badge badge-secondary';
    }
  }

  render() {
    const { data, loading, editing } = this.state;

    if (loading) {
      return <Spinner />;
    }

    return (
      <React.StrictMode>
        <div className="page-header">
          <h3 className="page-title"> {`Entrega ${data.id}`} </h3>
        </div>
        <div className="row">
          <div className="col-lg-6 col-md-12 grid-margin ">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Informações</h4>
                <p className="card-description">Dados sobre a entrega</p>

                <div className="text-md-center text-xl-left mb-lg-3">
                  <h6 className="mb-1">Cliente</h6>
                  <p className="text-muted mb-0">{data.order.user.name}</p>
                </div>
                <div className="text-md-center text-xl-left mb-lg-3">
                  <h6 className="mb-1">Total</h6>
                  <p className="text-muted mb-0">
                    R$ {(data.order.total / 100).toFixed(2)}
                  </p>
                </div>
                <div className="text-md-center text-xl-left mb-lg-3">
                  <h6 className="mb-1">Data do Pedido</h6>
                  <p className="text-muted mb-0">
                    {data.order.createdAt.toLocaleDateString()}
                  </p>
                </div>
                <div className="text-md-center text-xl-left mb-lg-3">
                  <h6 className="mb-1">Última Atualização</h6>
                  <p className="text-muted mb-0">
                    {data.order.updatedAt.toLocaleDateString()}
                  </p>
                </div>
                <div className="text-md-center text-xl-left mb-lg-3">
                  <h6 className="mb-1">Status</h6>
                  <div className={this.getClassNameByStatus(data.status)}>
                    {data.status.toUpperCase()}
                  </div>
                </div>
                <h4>Itens</h4>
                {data.order.itens.map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-dark d-flex d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3"
                  >
                    <div className="text-md-center text-xl-left">
                      <h6 className="mb-1">{item.name}</h6>
                    </div>
                    <div className="align-self-center flex-grow text-right text-md-center text-xl-right py-md-2 py-xl-0">
                      <h6 className="font-weight-bold mb-0">
                        R$ {(item.price / 100).toFixed(2)}
                      </h6>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Rotas</h4>
                <p className="card-description">
                  Caminho percorrido pela entrega
                </p>
                {data.paths.map((path, index) => (
                  <div
                    key={index + `path`}
                    className="bg-gray-dark d-flex d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3"
                  >
                    <div className="text-md-center text-xl-left">
                      <h6 className="mb-1">
                        {path.from.alias} -&gt; {path.to.alias}
                      </h6>
                      <p className="text-muted mb-0">
                        {'Saida as ' + path.leftAt.toLocaleDateString()}
                      </p>
                      <p className="text-muted mb-0">
                        {'Chegada as ' + path.arrivedAt.toLocaleDateString()}
                      </p>
                      <p className="text-muted mb-0">
                        {'Responsável: ' + path.responsible.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {editing && isAllowedTo('deliveries_write') && (
            <div className="col-12 grid-margin">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Atualização da Entrega</h4>
                  <p className="card-description">
                    Entrando uma nova atualização a entrega
                  </p>
                  <NewUpdateForm />
                </div>
              </div>
            </div>
          )}
        </div>
      </React.StrictMode>
    );
  }
}

export default withRouter(Delivery);
