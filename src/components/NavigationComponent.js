import React from 'react';
import { NavLink } from 'fluxible-router';

class NavigationComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }

  componentWillUnmount() {
    window.removeEventListener('click', this);
  }

  handleEvent(event) {
    if (event.target !== window && event.type !== 'click') {
      return;
    }
    this.handleClick(event);
  }

  handleClick(event) {
    window.removeEventListener('click', this);
    this.setState({ expanded: !this.state.expanded }, () => {
      if (this.state.expanded) {
        setTimeout(() => {
          window.addEventListener('click', this);
        });
      }
    });
  }

  render() {
    return (
      <div id='NavigationComponent'>
        <nav className='navbar navbar-default'>
          <div className='container'>
            <header className='navbar-header'>
              <button type='button' className={`navbar-toggle${this.state.expanded ? ' collapsed' : ''}`} data-toggle='collapse' data-target='#global-navbar' aria-expanded={this.state.expanded} onClick={this.handleClick.bind(this)}>
                <span className='sr-only'>Toggle navigation</span>
                <span className='icon-bar'></span>
                <span className='icon-bar'></span>
                <span className='icon-bar'></span>
              </button>
              <NavLink routeName='root' className='navbar-brand'>Gy</NavLink>
            </header>
            <div className={`navbar-collapse collapse${this.state.expanded ? ' in' : ''}`} id='global-navbar' aria-expanded={this.state.expanded}>
              <ul className='nav navbar-nav'>
                <li>
                  <NavLink routeName='about' activeClass='active'>About</NavLink>
                </li>
                <li>
                  <NavLink routeName='images' activeClass='active'>Images</NavLink>
                </li>
                <li>
                  <NavLink routeName='settings' activeClass='active'>Settings</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default NavigationComponent;