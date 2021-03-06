import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse, Dropdown } from 'react-bootstrap';
import { Trans } from 'react-i18next';
import { isAllowedTo } from '../utils/session';

function MenuItem({
  title,
  subItems = [],
  expanded,
  onClick,
  isPathActive,
  icon,
  path,
}) {
  return (
    <li
      className={
        isPathActive(path)
          ? 'nav-item menu-items active'
          : 'nav-item menu-items'
      }
    >
      <div
        className={expanded ? 'nav-link menu-expanded' : 'nav-link'}
        onClick={onClick}
        data-toggle="collapse"
      >
        <span className="menu-icon">
          <i className={`mdi ${icon}`}></i>
        </span>
        <span className="menu-title">
          <Trans>{title}</Trans>
        </span>
        <i className="menu-arrow"></i>
      </div>
      {subItems.length > 0 && (
        <Collapse in={expanded}>
          <div>
            <ul className="nav flex-column sub-menu">
              {subItems.map((subItem) => (
                <li className="nav-item">
                  {' '}
                  <Link
                    className={
                      isPathActive(subItem.path)
                        ? 'nav-link active'
                        : 'nav-link'
                    }
                    to={subItem.path}
                  >
                    <Trans>{subItem.title}</Trans>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Collapse>
      )}
    </li>
  );
}

class Sidebar extends Component {
  state = {};

  toggleMenuState(menuState) {
    if (this.state[menuState]) {
      this.setState({ [menuState]: false });
    } else if (Object.keys(this.state).length === 0) {
      this.setState({ [menuState]: true });
    } else {
      Object.keys(this.state).forEach((i) => {
        this.setState({ [i]: false });
      });
      this.setState({ [menuState]: true });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    document.querySelector('#sidebar').classList.remove('active');
    Object.keys(this.state).forEach((i) => {
      this.setState({ [i]: false });
    });

    const dropdownPaths = [
      { path: '/client-services', state: 'clientServices' },
      { path: '/registration', state: 'registrationInfo' },
      { path: '/management', state: 'management' },
      { path: '/data-science', state: 'dataScience' },
    ];

    dropdownPaths.forEach((obj) => {
      if (this.isPathActive(obj.path)) {
        this.setState({ [obj.state]: true });
      }
    });
  }

  render() {
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
          <a className="sidebar-brand brand-logo" href="index.html">
            GSL
          </a>
          <a className="sidebar-brand brand-logo-mini" href="index.html">
            G
          </a>
        </div>
        <ul className="nav">
          <li className="nav-item profile">
            <div className="profile-desc">
              <div className="profile-pic">
                <div className="count-indicator">
                  <img
                    className="img-xs rounded-circle "
                    src={require('../../assets/images/faces/face15.jpg')}
                    alt="profile"
                  />
                  <span className="count bg-success"></span>
                </div>
                <div className="profile-name">
                  <h5 className="mb-0 font-weight-normal">
                    <Trans>Henry Klein</Trans>
                  </h5>
                  <span>
                    <Trans>Gold Member</Trans>
                  </span>
                </div>
              </div>
              <Dropdown alignRight>
                <Dropdown.Toggle as="a" className="cursor-pointer no-caret">
                  <i className="mdi mdi-dots-vertical"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu className="sidebar-dropdown preview-list">
                  <a
                    href="!#"
                    className="dropdown-item preview-item"
                    onClick={(evt) => evt.preventDefault()}
                  >
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-dark rounded-circle">
                        <i className="mdi mdi-settings text-primary"></i>
                      </div>
                    </div>
                    <div className="preview-item-content">
                      <p className="preview-subject ellipsis mb-1 text-small">
                        <Trans>Account settings</Trans>
                      </p>
                    </div>
                  </a>
                  <div className="dropdown-divider"></div>
                  <a
                    href="!#"
                    className="dropdown-item preview-item"
                    onClick={(evt) => evt.preventDefault()}
                  >
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-dark rounded-circle">
                        <i className="mdi mdi-onepassword  text-info"></i>
                      </div>
                    </div>
                    <div className="preview-item-content">
                      <p className="preview-subject ellipsis mb-1 text-small">
                        <Trans>Change Password</Trans>
                      </p>
                    </div>
                  </a>
                  <div className="dropdown-divider"></div>
                  <a
                    href="!#"
                    className="dropdown-item preview-item"
                    onClick={(evt) => evt.preventDefault()}
                  >
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-dark rounded-circle">
                        <i className="mdi mdi-calendar-today text-success"></i>
                      </div>
                    </div>
                    <div className="preview-item-content">
                      <p className="preview-subject ellipsis mb-1 text-small">
                        <Trans>To-do list</Trans>
                      </p>
                    </div>
                  </a>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </li>
          <li className="nav-item nav-category">
            <span className="nav-link">
              <Trans>Navigation</Trans>
            </span>
          </li>
          {isAllowedTo('client_service') && (
            <MenuItem
              expanded={this.state.clientServices}
              title={'Servi??os ao Cliente'}
              onClick={() => this.toggleMenuState('clientServices')}
              path="/client-services"
              isPathActive={(path) => this.isPathActive(path)}
              icon="mdi-account-multiple"
              subItems={[
                { path: '/client-services/draw', title: 'Desenhar Fluxo' },
                { path: '/client-services/analyze', title: 'Analisar Fluxo' },
              ]}
            />
          )}
          {isAllowedTo('registration') && (
            <MenuItem
              expanded={this.state.registrationInfo}
              title={'Info Cadastrais'}
              onClick={() => this.toggleMenuState('registrationInfo')}
              isPathActive={(path) => this.isPathActive(path)}
              icon="mdi-account-search"
              path="/registration"
              subItems={[
                { path: '/registration/delivery', title: 'Entregas' },
                { path: '/registration/client', title: 'Clientes' },
                { path: '/registration/provider', title: 'Fornecedores' },
                { path: '/registration/warehouse', title: 'Dep??sitos' },
                { path: '/registration/product', title: 'Mercadorias' },
              ]}
            />
          )}
          {isAllowedTo('management') && (
            <MenuItem
              expanded={this.state.management}
              title={'Gest??o e Estrat??gia'}
              onClick={() => this.toggleMenuState('management')}
              isPathActive={(path) => this.isPathActive(path)}
              icon="mdi-tie"
              path="/management"
              subItems={[
                { path: '/management/cockpit', title: 'Cockpit' },
                { path: '/management/metrics', title: 'M??tricas' },
              ]}
            />
          )}
          {isAllowedTo('data_science') && (
            <MenuItem
              expanded={this.state.dataScience}
              title={'Ci??ncia de Dados'}
              onClick={() => this.toggleMenuState('dataScience')}
              isPathActive={(path) => this.isPathActive(path)}
              icon="mdi-laptop"
              path="/data-science"
              subItems={[
                { path: '/data-science/settings', title: 'Configura????es' },
              ]}
            />
          )}
        </ul>
      </nav>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }

  componentDidMount() {
    this.onRouteChanged();
    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector('body');
    document.querySelectorAll('.sidebar .nav-item').forEach((el) => {
      el.addEventListener('mouseover', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }
}

export default withRouter(Sidebar);
