import React, { Component } from "react";

import Rodal from "rodal";
import "rodal/lib/rodal.css";
import { FlotingInput, Tost, get_error_string } from "mycomponent/general";
import { Add_btn, MpickerWithHeader } from "mycomponent/general";
import { Add_Coupen } from "../../actions/user";
import { connect } from "react-redux";

class Addvendor extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      top_loading: false,
      show: false,
      id: false,
      code: "",
      e_code: "",
      desc: "",
      percentage: "",
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
        code: item.code,
        e_code: "",
        desc: item.description,
        percentage: String(item.offer),
        id: item.id,
      });
    } else {
      this.setState({
        show: true,
        id: false,
        code: "",
        e_code: "",
        desc: "",
        percentage: "",
      });
    }
  };
  onClose = () => {
    this.setState({ show: false });
  };
  onSubmit = () => {
    const s = this.state;
    let e_code = get_error_string(s.code, "Coupon Code", 1);
    if (e_code) {
      this.setState({ e_code });
    } else {
      const post = {
        code: s.code,
        description: s.desc,
        offer: Number(s.percentage),
      };
      if (!s.id) {
        post.created_at = new Date();
      }
      this.props.Add_Coupen(post, s.id, () => {});
      this.Show_tost(
        s.id ? "Coupon updated successfully" : "Coupon added successfully"
      );
      this.onClose();
    }
  };

  render() {
    const s = this.state;
    const p = this.props;
    return (
      <div>
        <Rodal visible={s.show} onClose={this.onClose} width={800} height={260}>
          <h4 style={{ textAlign: "left", margin: 6 }}>
            {s.id ? "Edit" : "Add"} Coupon
          </h4>
          <div style={{ display: "flex" }}>
            <FlotingInput
              title="Coupon Code"
              fill
              length={50}
              onChangeText={this.onChangeText.bind(this, "code")}
              value={s.code}
              mr={8}
              err={s.e_code}
            />
            <FlotingInput
              title="Offer in %"
              fill
              number
              length={50}
              onChangeText={this.onChangeText.bind(this, "percentage")}
              value={s.percentage}
              mr={8}
            />
          </div>

          <FlotingInput
            title="Description"
            fill
            length={50}
            onChangeText={this.onChangeText.bind(this, "desc")}
            value={s.desc}
            mr={8}
          />

          <div className="cen-v">
            <Add_btn title="SUBMIT" prime onClick={this.onSubmit} />
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
export default connect(mapStateToProps, { Add_Coupen })(Addvendor);
