import React from 'react';

class FormGroupHasFeedbackComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: null,
      valid: false
    };
  }

  componentDidMount() {
    let target = this.refs.formControl;
    let valid = this._validate(target);
    this.setState({ valid });
  }

  handleChange({ target }) {
    let value = target.value;
    let valid = this._validate(target);
    this.setState({ value, valid });
    return false;
  }

  getCurrentValue() {
    if (this.state.value === null || typeof(this.state.value) === 'undefined') {
      return this.props.value;
    }
    return this.state.value;
  }

  _validate(target) {
    let validity = target.validity;
    let valid = validity.valid;
    return valid;
  }

  render() {
    return (
      <div className='FormGroupHasFeedbackComponent'>
        <fieldset className={`form-group has-feedback ${this.state.valid ? 'has-success' : 'has-error'}`}>
          <label className='col-sm-2 control-label' htmlFor={this.props.id}>{this.props.label}</label>
          <div className='col-sm-10'>
            <input className='form-control' id={this.props.id} name={this.props.name} onChange={this.handleChange.bind(this)} placeholder={this.props.placeholder} ref='formControl' type={this.props.type} value={this.getCurrentValue()}/>
            <span aria-hidden='true' className={`form-control-feedback glyphicon glyphicon-${this.state.valid ? 'ok' : 'remove'}`}/>
          </div>
        </fieldset>
      </div>
    );
  }
}

export default FormGroupHasFeedbackComponent;