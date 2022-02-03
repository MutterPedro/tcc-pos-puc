import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { login } from '../api/login';

export class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMessage: '',
  };

  _login(evt) {
    evt.preventDefault();

    const { username, password } = this.state;

    login(username, password)
      .then((res) => {
        window.localStorage.setItem('session_token', res.session_token);
        window.localStorage.setItem('user_id', res.user_id);
        window.localStorage.setItem(
          'permissions',
          JSON.stringify(res.permissions),
        );
        window.location.href = '/';
      })
      .catch((err) => {
        console.error(err);
        this.setState({ errorMessage: err.message });
      });
  }

  render() {
    return (
      <div>
        <div className="d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="card text-left py-5 px-4 px-sm-5">
                <div className="brand-logo">
                  <h2>GSL - Gestão de Serviços de Logística</h2>
                </div>
                <h4>Olá! seja bem-vindo ao GSL</h4>
                <h6 className="font-weight-light">
                  Faça login para continuar.
                </h6>
                <Form className="pt-3">
                  <Form.Group className="d-flex search-field">
                    <Form.Control
                      type="text"
                      placeholder="Username"
                      size="lg"
                      className="h-auto"
                      value={this.state.username}
                      onChange={(evt) =>
                        this.setState({ username: evt.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="d-flex search-field">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      size="lg"
                      className="h-auto"
                      value={this.state.password}
                      onChange={(evt) =>
                        this.setState({ password: evt.target.value })
                      }
                    />
                  </Form.Group>
                  <div className="mt-3">
                    {this.state.errorMessage && (
                      <p className="text-lg text-danger">
                        {this.state.errorMessage}
                      </p>
                    )}
                    <button
                      className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                      onClick={(evt) => this._login(evt)}
                    >
                      LOGIN
                    </button>
                  </div>
                  <div className="my-2 d-flex justify-content-between align-items-center">
                    <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input type="checkbox" className="form-check-input" />
                        <i className="input-helper"></i>
                        Manter conectado
                      </label>
                    </div>
                    <a
                      href="!#"
                      onClick={(event) => event.preventDefault()}
                      className="auth-link text-muted"
                    >
                      Esqueceu a senha?
                    </a>
                  </div>
                  <div className="text-center mt-4 font-weight-light">
                    Não possui conta?{' '}
                    <Link to="/user-pages/register" className="text-primary">
                      Criar
                    </Link>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
