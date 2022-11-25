import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';

import "./Header.css";

const styles = {
  menuItem: {
    alignText: "center",
    color: "pink"
  }
};

class MenuShow extends React.Component {
  componentDidMount(props) {
  }

  constructor(props) {
    super(props);
    this.state = {
      selected: ""
      // isLoggedIn: false
    };
  }

  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  render() {

    const { classes, onClose, isLoggedIn, ...other } = this.props;

    var menuStyle = {
      width: "250px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    };

    const style = {
      textAlign: "left",
      justifyContent: "center"
    };

    return (
      <Dialog
        onClose={this.handleClose}
        aria-labelledby="simple-dialog-title"
        {...other}
        max-width="md"
      >
        <div >
          <div style={menuStyle}>
            <DialogTitle id="simple-dialog-title">Menu</DialogTitle>
            {isLoggedIn==true ? (
              <List>
                <NavLink to="/">
                  <MenuItem
                    value="Home"
                    name="Home"
                    style={style}
                    onClick={() => this.handleListItemClick()}
                  >
                    Home
                  </MenuItem>
                </NavLink>
                <NavLink to="/post">
                  <MenuItem style={style} onClick={this.handleClose}>
                    profil
                  </MenuItem>
                </NavLink>
                <NavLink to="/">
                  <MenuItem style={style}  onClick={this.handleClose} >
                    logout
                  </MenuItem>
                </NavLink>
              </List>
            ) : (
              <List>
                <NavLink to="/">
                  <MenuItem
                    value="Home"
                    name="Home"
                    style={style}
                    onClick={() => this.handleListItemClick()}
                  >
                    Home
                  </MenuItem>
                </NavLink>
                <NavLink to="/post">
                  <MenuItem style={style} onClick={this.handleClose}>
                    Cities
                  </MenuItem>
                </NavLink>
                <NavLink to="/CreateAccount">
                  <MenuItem style={style} onClick={this.handleClose}>
                    Create Account
                  </MenuItem>
                </NavLink>
              </List>
            )}
          </div>
        </div>
      </Dialog>
    );
  }
}

MenuShow.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func
};

const MenuWrapped = withStyles(styles)(MenuShow);

class Menu extends React.Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({
      open: true,
      selected: ""
    });
  };

  handleClose = value => {
    this.setState({ open: false, selected: value });
  };

  render() {
    let isLoggedIn = this.props.login.isLoggedIn

    return (
      <div className="menuIn">
        <IconButton
          aria-label="More"
          aria-haspopup="true"
          onClick={this.handleClickOpen}
          id="lost"
        >
          <MenuIcon style={{ fontSize: 36, color: "#484848" }} />
        </IconButton>
        <MenuWrapped
          open={this.state.open}
          selected={this.state.selected}
          onClose={this.handleClose}
          isLoggedIn={isLoggedIn}
        />
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    auth: state.auth,
    users: state.users,
    login: state.login
  }
}

export default connect(mapStateToProps)(Menu);
