import React, { useEffect, useState } from "react";
import CustomInput from "components/CustomInput/CustomInput.js";
import { makeStyles } from "@material-ui/core/styles";
import { CheckCircle } from "@material-ui/icons";
import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle.js";
import Button from "components/CustomButtons/Button.js";
import GridItem from "components/Grid/GridItem";
import Snackbar from "components/Snackbar/Snackbar";
import { Switch } from "@material-ui/core";
import Ask_Confirm from "./askconfirm";
import { CircularProgress } from "@material-ui/core";
import Moment from "moment";

const useStyles = makeStyles(styles);

export { Ask_Confirm };

export const Mpicker = (p) => {
  return (
    <select
      style={{
        borderRadius: 3,
        padding: 4,
        marginTop: p.mt ? p.mt : 0,
        marginLeft: p.ml ? p.ml : 0,
        marginRight: p.mr ? p.mr : 0,
        marginBottom: p.mb ? p.mb : 0,
        ...p.style,
      }}
      value={p.value}
      onChange={(e) => {
        p.onChange(e.target.value);
      }}
    >
      {p.list
        ? p.list.map((it) => {
            return <option>{it}</option>;
          })
        : null}
    </select>
  );
};
export const MpickerWithHeader = (p) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        ...p.cstyle,
      }}
    >
      <lavel style={{ fontSize: 12 }}>{p.title}</lavel>
      <select
        style={{
          borderRadius: 3,
          padding: 4,
          marginTop: p.mt ? p.mt : 0,
          marginLeft: p.ml ? p.ml : 0,
          marginRight: p.mr ? p.mr : 0,
          marginBottom: p.mb ? p.mb : 0,
          ...p.style,
        }}
        value={p.value}
        onChange={(e) => {
          p.onChange(e.target.value);
        }}
      >
        {p.add_all ? <option>All</option> : null}
        {p.list
          ? p.list.map((it) => {
              let label_v = it;
              if (p.FR_LIST) {
                label_v = it.data()[p.field];
                return <option value={it.id}>{label_v}</option>;
              } else {
                return <option>{label_v}</option>;
              }
            })
          : null}
      </select>
    </div>
  );
};

export const Txt = (p) => {
  return (
    <label
      style={{
        cursor: p.p ? "pointer" : "none",
        color:
          p.c === "w"
            ? "#fff"
            : p.c === "b"
            ? "#000"
            : p.c === "r"
            ? "red"
            : "#444",
        fontSize: p.s ? p.s : 14,
        fontWeight: p.w ? p.w : 400,
        marginTop: p.mt ? p.mt : 0,
        marginLeft: p.ml ? p.ml : 0,
        marginRight: p.mr ? p.mr : 0,
        marginBottom: p.mb ? p.mb : 0,
        padding: 0,
      }}
    >
      {p.children}
    </label>
  );
};

export const TextInput = (p) => {
  const classes = useStyles();
  return (
    <CustomInput
      formControlProps={{
        className: classes.margin + " " + classes.search,
      }}
      value={"asdasdasd"}
      inputProps={{
        placeholder: "Search",
        inputProps: {
          "aria-label": "Search",
        },
        value: p.value,
        onChange: (e) => {
          p.onChangeText(e.target.value);
        },
      }}
    />
  );
};

export const ActionBtn = (p) => {
  return (
    <div
      onClick={p.onClick}
      style={{
        border: "solid #444444 1px",
        padding: "1px 4px",
        marginRight: 4,
        cursor: "pointer",
      }}
    >
      <Txt s={12} p>
        {p.name}
      </Txt>
    </div>
  );
};

export const Add_btn = (p) => {
  return (
    <Button
      onClick={p.onClick}
      disabled={p.disabled}
      style={{ marginLeft: 6, height: 32 }}
      color={
        p.prime
          ? "primary"
          : p.bg === "danger"
          ? "danger"
          : p.bg === "secondary"
          ? "secondary"
          : "white"
      }
      aria-label="edit"
    >
      {p.title}
    </Button>
  );
};

export const FlotingInput = (p) => {
  return (
    <div
      style={{
        marginTop: p.mt ? p.mt : 0,
        marginLeft: p.ml ? p.ml : 0,
        marginRight: p.mr ? p.mr : 0,
        marginBottom: p.mb ? p.mb : 0,
        width: "100%",
        height: 70,
        ...p.style,
      }}
    >
      <CustomInput
        error={p.err}
        labelText={p.title}
        id="first-name"
        inputProps={{
          value: p.value,
          type: p.password
            ? "password"
            : p.number
            ? "number"
            : p.date
            ? "date"
            : "text",
        }}
        formControlProps={{
          fullWidth: true,
          onChange: (e) => {
            p.onChangeText(e.target.value);
          },
          disabled: p.disabled,
          style: { margin: 0, padding: 0 },
        }}
      />
      {p.err && p.err !== "" ? (
        <Txt s={12} c="r">
          {p.err}
        </Txt>
      ) : null}
    </div>
  );
};

export const Tost = (p) => {
  const [tc, SetTc] = useState(false);
  const [msg, setMsg] = useState("");
  useEffect(() => {
    if (p.show) {
      p.show((pmsg) => {
        SetTc(true);
        setMsg(pmsg);
        let time1a = setTimeout(() => {
          SetTc(false);
          setMsg("");
        }, 3000);
      });
    }
  }, []);
  return (
    <Snackbar
      place="tc"
      color="success"
      icon={CheckCircle}
      message={msg}
      open={tc}
      closeNotification={() => SetTc(false)}
      close
    />
  );
};

export const get_error_string = (str, label, min) => {
  if (str) {
    if (str === "") {
      return `${label} required`;
    } else {
      if (str.length < min) {
        return `${label} should be minimum ${min} character`;
      } else {
        return false;
      }
    }
  } else {
    return `${label} required`;
  }
};

export const CSwitch = (p) => {
  const [svalue, Setsvalue] = useState(false);
  const Switched = () => {
    if (p.switched) {
      p.switched(!svalue);
    }
    Setsvalue((prev) => !prev);
  };
  useEffect(() => {
    Setsvalue(p.value);
  }, [p.value]);
  return (
    <Switch size="small" color="primary" checked={svalue} onChange={Switched} />
  );
};

export const Get_date = (date, format) => {
  return Moment(date).format(format);
};

export const Loading = () => {
  return (
    <div
      style={{
        position: "fixed",
        zIndex: 100,
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.2)",
      }}
    >
      <CircularProgress style={{ color: "#f368e0" }} />
    </div>
  );
};

export const Btn_loading = (p) => {
  return (
    <div
      style={{
        marginTop: p.mt ? p.mt : 0,
        marginLeft: p.ml ? p.ml : 0,
        marginRight: p.mr ? p.mr : 0,
        marginBottom: p.mb ? p.mb : 0,
        ...p.style,
      }}
    >
      <CircularProgress size={20} style={{ color: "#f368e0" }} />
    </div>
  );
};
