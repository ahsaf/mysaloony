import React, { Component } from "react";

import Rodal from "rodal";
import "rodal/lib/rodal.css";
import { FlotingInput, Tost, get_error_string } from "mycomponent/general";
import { Add_btn, MpickerWithHeader } from "mycomponent/general";
import { Add_Offer } from "../../actions/user";
import { Delete_Image, Get_image, Upload_Image } from "../../actions/services";
import { connect } from "react-redux";

class Addvendor extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      top_loading: false,
      show: false,
      title: "",
      e_title: "",
      banner: null,
      e_banner: "",
      id: false,
      old_image_ref: "",
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
        title: item.caption,
        e_title: "",
        id: item.id,
        banner: null,
        old_image_ref: item.image_ref,
      });
    } else {
      this.setState({
        show: true,
        id: false,
        title: "",
        e_title: "",
        banner: null,
        old_image_ref: "",
      });
    }
  };
  onClose = () => {
    this.setState({ show: false });
  };
  onSubmit = () => {
    const s = this.state;
    if (s.banner) {
      let img_post = {
        folder: "Offers",
        name: String(Math.random()),
        image: s.banner,
      };

      Upload_Image(img_post, (res) => {
        // Get_image(res, (imguri) => {
        const post = {
          imageUrl: res,
          image_ref: `Offers/${img_post.name}`,
          created_at: new Date(),
        };
        this.props.Add_Offer(post, false, () => {});
        // });
      });
      this.Show_tost("Offer image added successfully");
      this.onClose();
    }
  };

  onChooseImage = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      if (event.target.files[0].size > 5097152) {
        alert("File should be lessthan 5MB");
      } else {
        this.setState({ banner: event.target.files[0] });
      }
    }
  };

  render() {
    const s = this.state;
    const p = this.props;
    return (
      <div>
        <Rodal visible={s.show} onClose={this.onClose} width={800} height={180}>
          <h4 style={{ textAlign: "left", margin: 6 }}>
            {s.id ? "Edit" : "Add"} Offer Image
          </h4>
          {/* <div style={{display:'flex'}}>
            <FlotingInput
                    title='Caption'
                    fill
                    length={50} 
                    onChangeText={this.onChangeText.bind(this,'title')}
                    value={s.title}
                    mr={8}
                    err={s.e_title}
                 
                  />
                
            </div> */}

          <div style={{ margin: "8px 0px", marginTop: 32 }}>
            <label>Banner: </label>
            <input name="image" type="file" onChange={this.onChooseImage} />
          </div>

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
export default connect(mapStateToProps, { Add_Offer })(Addvendor);
