import React, { Component } from "react";

import Rodal from "rodal";
import "rodal/lib/rodal.css";
import { FlotingInput, Tost, get_error_string } from "mycomponent/general";
import { Add_btn, MpickerWithHeader } from "mycomponent/general";
import { Add_Banner } from "../../actions/user";
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
    let e_title = get_error_string(s.title, "Caption", 1);
    if (e_title) {
      this.setState({ e_title });
    } else {
      if (s.id && !s.banner) {
        const post = {
          caption: s.title,
        };
        this.props.Add_Banner(post, s.id, () => {});
        this.Show_tost("Banner updated successfully");
        this.onClose();
      } else if (!s.banner) {
      } else {
        let img_post = {
          folder: "Banners",
          name: String(Math.random()),
          image: s.banner,
        };
        Upload_Image(img_post, (res) => {
          // Get_image(res, (imguri) => {
          const post = {
            image: res,
            caption: s.title,
            image_ref: `Banners/${img_post.name}`,
          };
          if (s.id && s.old_image_ref) {
            Delete_Image(s.old_image_ref, () => {});
          } else {
            post.created_at = new Date();
          }
          this.props.Add_Banner(post, s.id, () => {});
          // });
        });
        this.Show_tost(
          s.id ? "Banner updated successfully" : "Banner added successfully"
        );
        this.onClose();
      }
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
        <Rodal visible={s.show} onClose={this.onClose} width={800} height={240}>
          <h4 style={{ textAlign: "left", margin: 6 }}>
            {s.id ? "Edit" : "Add"} Banner
          </h4>
          <div style={{ display: "flex" }}>
            <FlotingInput
              title="Caption"
              fill
              length={50}
              onChangeText={this.onChangeText.bind(this, "title")}
              value={s.title}
              mr={8}
              err={s.e_title}
            />
          </div>

          <div style={{ margin: "8px 0px" }}>
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
export default connect(mapStateToProps, { Add_Banner })(Addvendor);
