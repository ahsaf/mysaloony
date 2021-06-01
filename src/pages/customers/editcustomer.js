import React, { Component } from "react";

import Rodal from "rodal";
import "rodal/lib/rodal.css";
import { FlotingInput, Tost, get_error_string } from "mycomponent/general";
import { Add_btn, MpickerWithHeader, Btn_loading } from "mycomponent/general";
import { Edit_Customer } from "../../actions/user";
import { connect } from "react-redux";

class Addvendor extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      top_loading: false,
      show: false,
      name: "",
      e_name: "",
      place: "",
      mobile: "",
      gender: true,
      id: false,
    };
  }
  onChangeText = (name, txt) => {
    this.setState({ [name]: txt, msg: "" });
  };
  componentDidMount() {
    if (this.props.show) {
      this.props.show(this.show);
    }
  }
  show = (item) => {
    if (item) {
      this.setState({
        show: true,
        name: item.name,
        e_name: "",
        place: item.city_name,
        mobile: item.mobile_number,
        gender: item.gender,
        id: item.id,
      });
    } else {
      this.setState({
        show: true,
        id: false,
        name: "",
        e_name: "",
        place: "",
        mobile: "",
        gender: true,
      });
    }
  };
  onClose = () => {
    this.setState({ show: false });
  };
  onSubmit = () => {
    const s = this.state;
    let e_name = get_error_string(s.name, "Name", 1);
    if (e_name) {
      this.setState({ e_name });
    } else {
      const post = {
        city_name: s.place,
        gender: s.gender,
        mobile_number: s.mobile,
        name: s.name,
      };
      this.props.Edit_Customer(post, s.id);
      this.Show_tost("Customer updated successfully");
      this.onClose();
    }
  };

  render() {
    const s = this.state;
    const p = this.props;
    return (
      <div>
        <Rodal visible={s.show} onClose={this.onClose} width={800} height={260}>
          <h4 style={{ textAlign: "left", margin: 6 }}>Edit Customer</h4>
          <div style={{ display: "flex" }}>
            <FlotingInput
              title="Name"
              fill
              length={50}
              onChangeText={this.onChangeText.bind(this, "name")}
              value={s.name}
              mr={8}
              err={s.e_name}
            />
            <FlotingInput
              title="Place"
              length={50}
              ml={8}
              fill
              onChangeText={this.onChangeText.bind(this, "place")}
              value={s.place}
            />
          </div>
          <div style={{ display: "flex" }}>
            <MpickerWithHeader
              style={{}}
              cstyle={{ width: "100%" }}
              title="Gender"
              list={["Male", "Female"]}
              value={s.gender ? "Male" : "Female"}
              onChange={(value) =>
                this.setState({ gender: value === "Male" ? true : false })
              }
            />

            <FlotingInput
              title="Contact Number"
              length={50}
              ml={8}
              fill
              onChangeText={this.onChangeText.bind(this, "mobile")}
              value={s.mobile}
            />
          </div>

          <div
            className="cen-v"
            style={{ display: "flex", alignItems: "center" }}
          >
            <Add_btn
              disabled={s.loading}
              title="SUBMIT"
              prime
              onClick={this.onSubmit}
            />
            {s.loading ? <Btn_loading ml={16} /> : null}
            {s.msg && s.msg !== "" ? (
              <p style={{ color: "red", marginLeft: 10, marginTop: 10 }}>
                {s.msg}
              </p>
            ) : null}
          </div>
        </Rodal>

        <Tost show={(call) => (this.Show_tost = call)} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    general: state.general,
  };
};
export default connect(mapStateToProps, { Edit_Customer })(Addvendor);
