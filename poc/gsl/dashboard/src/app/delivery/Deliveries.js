import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Statuses = {
  Pending: 'pending',
  Invoiced: 'invoiced',
  InProgress: 'in-progress',
  Completed: 'completed',
  Cancelled: 'cancelled',
  Late: 'late',
};

const deliveries = [
  {
    id: 123,
    order: {
      createdAt: new Date(),
      updatedAt: new Date(),
      id: 123,
      user: { name: 'João da Silva' },
      item: {},
      total: 1000,
    },
    status: Statuses.Pending,
    paths: [{}],
  },
  {
    id: 456,
    order: {
      createdAt: new Date(),
      updatedAt: new Date(),
      id: 124,
      user: { name: 'Maria da Silva' },
      item: {},
      total: 1010,
    },
    status: Statuses.Invoiced,
    paths: [{}],
  },
  {
    id: 789,
    order: {
      createdAt: new Date(),
      updatedAt: new Date(),
      id: 125,
      user: { name: 'Pedro da Silva' },
      item: {},
      total: 2000,
    },
    status: Statuses.InProgress,
    paths: [{}],
  },
  {
    id: 111,
    order: {
      createdAt: new Date(),
      updatedAt: new Date(),
      id: 234,
      user: { name: 'Carlos Alberto de Nobrega' },
      item: {},
      total: 4500,
    },
    status: Statuses.Completed,
    paths: [{}],
  },
  {
    id: 121,
    order: {
      createdAt: new Date(),
      updatedAt: new Date(),
      id: 2343,
      user: { name: 'Robert Plant JR' },
      item: {},
      total: 14400,
    },
    status: Statuses.Cancelled,
    paths: [{}],
  },
  {
    id: 122,
    order: {
      createdAt: new Date(),
      updatedAt: new Date(),
      id: 1223,
      user: { name: 'John Paul Jones JR' },
      item: {},
      total: 154600,
    },
    status: Statuses.Late,
    paths: [{}],
  },
];

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
          {data.order.id}
        </Link>
      </td>
      <td> R${(data.order.total / 100).toFixed(2)} </td>
      <td> {data.order.createdAt.toLocaleDateString()} </td>
      <td> {data.order.updatedAt.toLocaleDateString()} </td>
      <td>
        <div className={getClassNameByStatus(data.status)}>
          {data.status.toUpperCase()}
        </div>
      </td>
      <td>
        <div className="btn-group">
          <button className="btn btn-sm btn-icon btn-outline-secondary btn-rounded">
            <Link
              to={`/registration/delivery/${data.id}?editing=true`}
              className="nav-link text-secondary"
            >
              <i className="mdi mdi-pencil btn-icon"></i>
            </Link>
          </button>
          <button className="btn btn-sm btn-icon btn-outline-danger btn-rounded">
            <i className="mdi mdi-delete btn-icon"></i>
          </button>
        </div>
      </td>
    </tr>
  );
}

export default class Deliveries extends Component {
  render() {
    return (
      <div className="row ">
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Status das Entregas</h4>
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
                    {deliveries.map((delivery) => (
                      <DeliveryItem data={delivery} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
