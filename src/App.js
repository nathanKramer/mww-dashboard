import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import './App.css';


const CustomTable = withStyles(theme => ({
  root: {
    borderWidth: "8px",
    borderStyle:  "solid",
    borderColor: "#222222",
    borderRadius: "8px",
    borderCollapse: "separate"
  }
}))(Table);


const CustomTableCell = withStyles(theme => ({
  root: {
    background: "#282c34",
    color: theme.palette.common.white
  }
}))(TableCell);

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { servers: [] };
  }

  componentDidMount() {
    fetch('https://mww-reborn-api.herokuapp.com/v1/servers')
    .then(response => response.json())
      .then(data => this.setState({ servers: data }));
  }

  renderServers() {
    if (!this.state.servers) {
      return null;
    }

    return this.state.servers.map(server => {
      return (
        <TableRow key={server.name}>
          <CustomTableCell key={`${server.name}-name`}>{server.name}</CustomTableCell>
          <CustomTableCell key={`${server.name}-players`}>{server.players}</CustomTableCell>
          <CustomTableCell key={`${server.name}-join`}><a href={`steam://connect/${server.server_addr}`}>join on steam...</a></CustomTableCell>
        </TableRow>
      )
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>MWW Reborn</h1>
          <ul>
            <li><a href="http://steamcommunity.com/sharedfiles/filedetails/?id=904845972">Getting started guide</a></li>
            <li><a href="https://timer00.github.io/ReviveWizardWars/Releases/mww-client-installer-2.4.0.exe">Latest Client Installer</a></li>
          </ul>
          <CustomTable className="server-table">
            <TableHead>
              <TableRow>
                <CustomTableCell>Name</CustomTableCell>
                <CustomTableCell>Players</CustomTableCell>
                <CustomTableCell>Join Link</CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.renderServers()}
            </TableBody>
          </CustomTable>
        </header>
      </div>
    );
  }
}

export default App;
