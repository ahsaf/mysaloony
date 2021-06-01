import React, { Component } from "react";
import "./material-kit.css";
import { Login_user, Crete_unknow_user } from "actions/services";
import { Loading } from "mycomponent/general";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      password: "",
      username: "",
      e_msg: "",
      loading: false,
    };
  }
  componentDidMount() {
    let token = localStorage.getItem("asd");
    if (token) {
      if (token === "qweasdzxc") {
        this.props.history.push("/admin");
      }
    }
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, e_msg: "" });
  };
  _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      this.onSubmit();
    }
  };
  onSubmit = () => {
    const s = this.state;
    if (s.username === "" || s.password === "") {
      this.setState({ e_msg: "Enter your username and password" });
    } else {
      const post = {
        username: s.username,
        password: s.password,
      };
      this.setState({ loading: true });
      Login_user(post, (res) => {
        if (res) {
          this.setState({ loading: false });
          Crete_unknow_user();
          localStorage.setItem("asd", "qweasdzxc");
          this.props.history.push("/admin");
        } else {
          this.setState({
            e_msg: "Invalid Username or Password",
            loading: false,
          });
        }
      });
    }
  };

  render() {
    const s = this.state;

    return (
      <>
        {s.loading ? <Loading /> : null}
        <div style={{ display: "flex", alignItems: "center", height: "100vh" }}>
          <link
            rel="stylesheet"
            type="text/css"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:400,700|Material+Icons"
          />
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css"
          ></link>
          <div className="container">
            <div className="row">
              <div className="col-lg-4 ml-auto mr-auto">
                <div className="card card-login" style={{ height: 270 }}>
                  {/* <form onSubmit={()=> alert('asdasda form')} class="form" method="" action=""> */}
                  <div
                    className="card-header card-header-primary text-center"
                    style={{ background: "#f368e0" }}
                  >
                    <h4 className="card-title">My Salony</h4>
                  </div>
                  <div className="card-body">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="material-icons">face</i>
                        </span>
                      </div>
                      <input
                        onChange={this.onChange}
                        value={s.username}
                        onKeyDown={this._handleKeyDown}
                        name="username"
                        type="text"
                        className="form-control"
                        placeholder="Username"
                      />
                    </div>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="material-icons">lock_outline</i>
                        </span>
                      </div>
                      <input
                        onChange={this.onChange}
                        value={s.password}
                        onKeyDown={this._handleKeyDown}
                        name="password"
                        type="password"
                        className="form-control"
                        placeholder="Password"
                      />
                    </div>
                    {s.e_msg && s.e_msg !== "" ? (
                      <span style={{ color: "red", marginLeft: 50 }}>
                        {s.e_msg}
                      </span>
                    ) : null}
                  </div>
                  <div className="footer text-center">
                    <a
                      onClick={this.onSubmit}
                      className="btn btn-primary btn-link btn-wd btn-lg"
                      style={{ color: "#f368e0" }}
                    >
                      LOGIN
                    </a>
                  </div>

                  {/* </form> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Login;
