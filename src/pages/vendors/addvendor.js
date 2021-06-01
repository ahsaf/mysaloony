import React, { Component } from "react";

import Rodal from "rodal";
import "rodal/lib/rodal.css";
import { FlotingInput, Tost, get_error_string } from "mycomponent/general";
import { Add_btn, Btn_loading,MpickerWithHeader } from "mycomponent/general";
import { Add_Vendor } from "../../actions/vendor";
import { connect } from "react-redux";
import { Get_goeloacation } from "actions/services";

class Addvendor extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      top_loading: false,
      show: false,

      v_name: "",
      place: "",
      email: "",
      e_email: "",
      password1: "",
      e_pass1: "",
      e_pass2: "",
      password2: "",
      e_v_name: "",
      s_name: "",
      e_s_name: "",
      type: "ALL",
      phone: "",
      latitude: "",
      longitude: "",
      add_1: "",
      add_2: "",
      id: false,
    };
  }
  onChangeText = (name, txt) => {
    this.setState({ [name]: txt, msg: "" });
  };
  componentDidMount() {
    // eslint-disable-next-line react/prop-types
    if (this.props.show) {
      // eslint-disable-next-line react/prop-types
      this.props.show(this.show);
    }
  }
  show = (item) => {
    if (item) {
      this.setState({
        show: true,
        v_name: item.vendor_name,
        e_v_name: "",
        s_name: item.Saloon_name,
        e_s_name: "",
        type: item.Type,
        phone: item.contact_number,
        latitude: item.Location ? item.Location.latitude : "",
        longitude: item.Location ? item.Location.longitude : "",
        add_1: item.address_line_1,
        add_2: item.address_line_2,
        place: item.place,
        email: item.email,
        password1: item.password,
        password2: item.password,
        id: item.id,
      });
    } else {
      this.setState({
        show: true,
        v_name: "",
        e_v_name: "",
        s_name: "",
        e_s_name: "",
        type: "ALL",
        phone: "",
        latitude: "",
        longitude: "",
        add_1: "",
        add_2: "",
        id: false,
        email: "",
        password1: "",
        password2: "",
      });
    }
  };
  onClose = () => {
    this.setState({ show: false });
  };
  onAddVendor = () => {
    const s = this.state;
    let e_v_name = get_error_string(s.v_name, "Vendor Name", 1);
    let e_s_name = get_error_string(s.s_name, "Saloon Name", 1);
    let e_email = get_error_string(s.email, "Email", 4);
    let e_pass1 = get_error_string(s.password1, "Password", 6);
    if (e_v_name || e_s_name || e_email || e_pass1) {
      this.setState({ e_v_name, e_s_name, e_pass1, e_email });
    } else if (s.password1 !== s.password2) {
      this.setState({ e_pass2: "Passwords not match" });
    } else if (!s.loading) {
      this.setState({ loading: true });
      const post = {
        Saloon_name: s.s_name,
        email: s.email,
        password: s.password1,
        place: s.place,
        Type: s.type,
        address_line_1: s.add_1,
        address_line_2: s.add_2,
        contact_number: s.phone,
        vendor_name: s.v_name,
        status: false,
      };
      if (s.latitude && s.longitude) {
        post.Location = Get_goeloacation(s.latitude, s.longitude);
      }

      // eslint-disable-next-line react/prop-types
      this.props.Add_Vendor(post, s.id, (res) => {
        if (res) {
          if (s.id) {
            this.Show_tost("Vendor updated successfully");
            this.onClose();
          } else {
            this.Show_tost("Vendor added successfully");
          }
          this.setState({
            v_name: "",
            e_v_name: "",
            s_name: "",
            e_s_name: "",
            type: "ALL",
            phone: "",
            latitude: "",
            longitude: "",
            add_1: "",
            add_2: "",
            place: "",
            email: "",
            e_email: "",
            password1: "",
            e_pass1: "",
            e_pass2: "",
            password2: "",
            loading: false,
          });
        } else {
          this.Show_tost("Invalid Email Address");
          this.setState({
            e_email: "Invalid Email",

            loading: false,
          });
        }
      });
    }
  };

  render() {
    const s = this.state;
    const p = this.props;
    return (
      <div>
        <Rodal
          visible={s.show}
          onClose={this.onClose}
          width={800}
          height={s.id ? 460 : 540}
        >
            <div 
            onClick={this.onClose}
            style={{cursor:'pointer',width:30,height:30,position:'absolute',right:10}} />
          <h4 style={{ textAlign: "left", margin: 6 }}>Add Vendor</h4>
        
          <div style={{ display: "flex" }}>
            <FlotingInput
              title="Vendor Name"
              fill
              length={50}
              onChangeText={this.onChangeText.bind(this, "v_name")}
              value={s.v_name}
              mr={8}
              err={s.e_v_name}
            />

            <FlotingInput
              title="Saloon Name"
              length={50}
              ml={8}
              fill
              onChangeText={this.onChangeText.bind(this, "s_name")}
              value={s.s_name}
              err={s.e_s_name}
            />
          </div>
          <div style={{ display: "flex" }}>
            {/* <FlotingInput
              title="Type"
              fill
              length={50}
              onChangeText={this.onChangeText.bind(this, "type")}
              value={s.type}
              mr={8}
            /> */}
              <MpickerWithHeader 
                style={{height:30,fontSize:14}}
                cstyle={{width:'100%',marginTop:-4}}
                title='Type'
                list={[
                  "ALL",'UNISEX',"MALE","FEMALE","KIDS"
                ]}
                value={s.type}
                onChange={(value)=> this.setState({type:value}) }
            />

            <FlotingInput
              title="Contact Number"
              length={50}
              number
              ml={8}
              fill
              onChangeText={this.onChangeText.bind(this, "phone")}
              value={s.phone}
            />
          </div>

          <div style={{ display: "flex" }}>
            <FlotingInput
              title="Latitude"
              fill
              number
              length={50}
              onChangeText={(txt) => {
                // if (!/[^0-9.]/.test(txt)) {
                if (Number(txt) > -91 && Number(txt) < 91) {
                  this.onChangeText("latitude", txt);
                }

                // }
              }}
              value={s.latitude}
              mr={8}
            />

            <FlotingInput
              title="Longitude"
              length={50}
              number
              ml={8}
              fill
              onChangeText={(txt) => {
                // if (!/[^0-9.]/.test(txt)) {
                if (Number(txt) > -181 && Number(txt) < 181) {
                  this.onChangeText("longitude", txt);
                }
                // }
              }}
              value={s.longitude}
            />
          </div>
          <div style={{ display: "flex" }}>
            <FlotingInput
              title="Address 1"
              fill
              length={50}
              onChangeText={this.onChangeText.bind(this, "add_1")}
              value={s.add_1}
              mr={8}
            />

            <FlotingInput
              title="Address 2"
              length={50}
              ml={8}
              fill
              onChangeText={this.onChangeText.bind(this, "add_2")}
              value={s.add_2}
            />
          </div>
          <div style={{ display: "flex" }}>
            <FlotingInput
              title="Place"
              fill
              length={50}
              onChangeText={this.onChangeText.bind(this, "place")}
              value={s.place}
              mr={8}
            />

            <FlotingInput
              title="Email"
              length={50}
              err={s.e_email}
              disabled={s.id}
              ml={8}
              fill
              onChangeText={this.onChangeText.bind(this, "email")}
              value={s.email}
            />
          </div>
          {s.id ? null : (
            <div style={{ display: "flex" }}>
              <FlotingInput
                title="Password"
                fill
                password
                length={50}
                err={s.e_pass1}
                onChangeText={this.onChangeText.bind(this, "password1")}
                value={s.password1}
                mr={8}
              />

              <FlotingInput
                title="Confirm Password"
                length={50}
                err={s.e_pass2}
                password
                ml={8}
                fill
                onChangeText={this.onChangeText.bind(this, "password2")}
                value={s.password2}
              />
            </div>
          )}

          <div
            className="cen-v fl"
            style={{ display: "flex", alignItems: "center" }}
          >
            <Add_btn
              disabled={s.loading}
              title="SUBMIT"
              prime
              onClick={this.onAddVendor}
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
    vendor: state.vendor,
  };
};
export default connect(mapStateToProps, { Add_Vendor })(Addvendor);
