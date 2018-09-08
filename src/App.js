import React, { Component } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Label
} from 'reactstrap';
import './App.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  getEmployeeDetailsAction
} from './redux/app/actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deparmentDropdownOpen: false,
      employeeIDDropdownOpen: false,
      selectedDeparmentValue: '',
      selectedEmployeeValue: ''
    };
  }

  departmentToggle = () => {
    this.setState(prevState => ({
      deparmentDropdownOpen: !prevState.deparmentDropdownOpen
    }));
  };

  employeeIDToggle = () => {
    this.setState(prevState => ({
      employeeIDDropdownOpen: !prevState.employeeIDDropdownOpen
    }));
  };

  onDeparmentchange = e => {
    this.setState({
      selectedDeparmentValue: e.currentTarget.textContent
    });
  };

  onEmployeechange = e => {
    this.setState({
      selectedEmployeeValue: e.currentTarget.textContent
    });
  };

  render() {
    let departmentList = this.getDepartmentList();
    let employeeList = this.getEmployeeList();
    const departmentLabel = this.state.selectedDeparmentValue ? this.state.selectedDeparmentValue : 'Departments: ';
    const employeeLabel = this.state.selectedEmployeeValue ? this.state.selectedEmployeeValue : 'Employee Id: ';
    const employeeObj = this.props.employeeDetails || {}; 
    const name = (employeeObj.first_name || '') + ' ' +  (employeeObj.last_name || '');
    const id = employeeObj.id || '';
    const avatar = employeeObj.avatar || ''
    const isGetDetailsDisabled = (this.state.selectedDeparmentValue && this.state.selectedEmployeeValue) ? true : false;
     return (
      <div className="App">
        <div className="d-flex">
          <Dropdown
            isOpen={this.state.deparmentDropdownOpen}
            toggle={this.departmentToggle}
          >
            <DropdownToggle caret>{departmentLabel}</DropdownToggle>
            <DropdownMenu>{departmentList}</DropdownMenu>
          </Dropdown>
          <Dropdown
            className="ml-5"
            isOpen={this.state.employeeIDDropdownOpen}
            toggle={this.employeeIDToggle}
          >
            <DropdownToggle caret>{employeeLabel}</DropdownToggle>
            <DropdownMenu>{employeeList}</DropdownMenu>
          </Dropdown>
          <Button className="ml-5" color="success" onClick={this.getDetails} disabled={!isGetDetailsDisabled}>
            Get Details
          </Button>
          <Button className="ml-5" color="secondary" onClick={this.clearDetails}>
            clear
          </Button>
        </div>
        <div>
          <div>{avatar ? <img src={avatar}/> : ''}</div>
          <div><Label>ID: {id}</Label></div>
          <div><Label>Name: {name}</Label></div>
        </div>
      </div>
    );
  }

  getEmployeeList() {
    let employeeList = [];
    switch (this.state.selectedDeparmentValue) {
      case 'HR':
        ['1', '2', '3', '4', '5'].map(item =>
          employeeList.push(
            <DropdownItem onClick={this.onEmployeechange}>{item}</DropdownItem>
          )
        );
        break;
      case 'ENGINEERING':
        ['6', '7', '8', '9', '10'].map(item =>
          employeeList.push(
            <DropdownItem onClick={this.onEmployeechange}>{item}</DropdownItem>
          )
        );
        break;
      default:
        employeeList = [];
    }
    return employeeList;
  }

  getDepartmentList() {
    let departments = ['HR', 'ENGINEERING'];
    let departmentList = [];
    departments.map(item =>
      departmentList.push(
        <DropdownItem onClick={this.onDeparmentchange}>{item}</DropdownItem>
      )
    );
    return departmentList;
  }

  getDetails = () => {
    this.props.getEmployeeDetailsAction(this.state.selectedEmployeeValue);
  }

  clearDetails = () => {
    this.setState({
      selectedDeparmentValue: '',
      selectedEmployeeValue: ''
    })
  }

}

const mapStateToProps = state => ({
  fetching: state.fetching,
  employeeDetails: state.employeeReducer.employeeDetails
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getEmployeeDetailsAction }, dispatch);
};

const AppContainer = (
  connect(mapStateToProps, mapDispatchToProps)(App)
);

export default AppContainer;
