import React, { Component } from "react";

const initialState = {
  wage: "",
  wageShown: 0,
  calculated: 0,
  savings: 0,
  remainder: 0
};

class Form extends Component {
  state = initialState;

  taxCalculation = wage => {
    const net = wage * 12 - 16500;
    if (net < 28500) {
      return (net * 0.075) / 12;
    } else {
      const lowRate = (28500 * 0.075) / 12;
      const highRate = ((net - 28500) * 0.325) / 12;
      return highRate + lowRate;
    }
  };

  handleSubmit = e => {
    const { wage } = this.state;
    e.preventDefault();

    const taxes = this.taxCalculation(wage);
    const save = (wage - this.taxCalculation(wage)) * 0.1;
    const net = wage - taxes - save;

    this.setState({
      calculated: taxes,
      wageShown: wage,
      savings: save,
      remainder: net,
      wage: ""
    });
    this.resetForm();
  };

  clearForm = () => {
    this.setState(initialState);
    this.resetForm();
  };

  resetForm = () => {
    this.taxForm.reset();
  };

  updateSum = e => {
    this.setState({
      wage: e.target.value
    });
  };

  saveUp = () => {
    const increment = this.state.savings * 0.1 + this.state.savings;
    const newNet = this.state.remainder - this.state.savings * 0.1;
    this.setState({
      savings: increment,
      remainder: newNet
    });
  };

  render() {
    const { wageShown, calculated, wage, savings, remainder } = this.state;
    return (
      <form onSubmit={this.handleSubmit} ref={el => (this.taxForm = el)}>
        <div className="card">
          <div className="section">
            <div className="form-row">
              <label className="form-label" htmlFor="wage">
                Enter your monthly income
              </label>
              <input
                className="form-el input"
                type="text"
                id="wage"
                placeholder="e.g. 2000"
                onChange={this.updateSum}
                pattern="^([0-9]\d*|0)(\.\d{1,2})?$"
              />
            </div>
            <div className="form-row">
              <button
                className="form-el btn"
                type="submit"
                disabled={wage !== "" ? false : true}
              >
                Calculate
              </button>
              <a
                className="form-el btn secondary mini"
                href="#"
                onClick={this.clearForm}
              >
                Clear
              </a>
            </div>
          </div>
          <div className="section">
            <div className="form-row">
              <p>
                <span className="label">Income this month:</span>
                <span className={`tag ${wageShown < 1 ? "off" : ""}`}>
                  {wageShown}
                </span>
                <small>{wageShown * 12} year</small>
              </p>
              <p>
                <span className="label">Save for taxes:</span>
                <span className={`tag ${wageShown < 1 ? "off" : ""}`}>
                  {calculated.toFixed(2)}
                </span>
                <small>{calculated.toFixed(2) * 12} year</small>
              </p>
              <p>
                <span className="label">To save (10%):</span>
                <span className={`tag ${wageShown < 1 ? "off" : ""}`}>
                  {savings.toFixed(2)}
                </span>
                <a
                  className="form-el btn secondary mini"
                  href="#"
                  onClick={this.saveUp}
                >
                  <small>+ 10%</small>
                </a>
              </p>
              <p>
                <span className="label">Remainder:</span>
                <span className={`tag ${wageShown < 1 ? "off" : ""}`}>
                  {remainder.toFixed(2)}
                </span>
              </p>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default Form;
