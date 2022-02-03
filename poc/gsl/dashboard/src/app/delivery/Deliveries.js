import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getDeliveries } from '../api/delivery';
import Spinner from '../shared/Spinner';
import { isAllowedTo } from '../utils/session';

const Statuses = {
  Pending: 'pending',
  Invoiced: 'invoiced',
  InProgress: 'in-progress',
  Completed: 'completed',
  Cancelled: 'cancelled',
  Late: 'late',
};

function DeliveryItem({ data }) {
  function getClassNameByStatus(status) {
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

  function getTotal() {
    return (
      data.order.items.reduce((total, item) => total + item.price, 0) / 100
    ).toFixed(2);
  }

  return (
    <tr>
      <td>
        <div className="d-flex">
          <img
            src={`https://picsum.photos/200/300.jpg?random=${data.id}`}
            alt="face"
          />
          <span className="pl-2">{data.order.user.name}</span>
        </div>
      </td>
      <td>
        <Link
          to={`/registration/delivery/${data.id}`}
          className="nav-link text-secondary"
        >
          {data.id}
        </Link>
      </td>
      <td> R$ {getTotal(data)} </td>
      <td> {new Date(data.order.createdAt).toLocaleDateString()} </td>
      <td> {new Date(data.order.updatedAt).toLocaleDateString()} </td>
      <td>
        <div className={getClassNameByStatus(data.status)}>
          {data.status.toUpperCase()}
        </div>
      </td>
      <td>
        <div className="btn-group">
          {isAllowedTo('deliveries_write') && (
            <button className="btn btn-sm btn-icon btn-outline-secondary btn-rounded">
              <Link
                to={`/registration/delivery/${data.id}?editing=true`}
                className="nav-link text-secondary"
              >
                <i className="mdi mdi-pencil btn-icon"></i>
              </Link>
            </button>
          )}
          <button className="btn btn-sm btn-icon btn-outline-danger btn-rounded">
            <i className="mdi mdi-delete btn-icon"></i>
          </button>
        </div>
      </td>
    </tr>
  );
}

export default class Deliveries extends Component {
  state = {
    loading: true,
    deliveries: [],
  };

  async componentDidMount() {
    const { data: deliveries } = await getDeliveries();

    this.setState({ deliveries, loading: false });
  }

  render() {
    return (
      <div className="row ">
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Status das Entregas</h4>
              {this.state.loading ? (
                <Spinner />
              ) : (
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th> Cliente </th>
                        <th> # Pedido </th>
                        <th> Total </th>
                        <th> Data do Pedido </th>
                        <th> Última Atualização </th>
                        <th> Status </th>
                        <th> Ações </th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.deliveries.map((delivery) => (
                        <DeliveryItem data={delivery} key={delivery.id} />
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
