import firebase from "firebase";
import { firebaseConfig } from "./firebase_config";

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();

// import storage from '@react-native-firebase/storage';

export const Login_email_password = (post, cb) => {
  auth
    .createUserWithEmailAndPassword(post.email, post.password)
    .then((res) => {
      cb(res);
    })
    .catch((err) => {
      cb(false);
    });
};
export const Crete_unknow_user = () => {
  auth
    .signInAnonymously()
    .then((res) => {})
    .catch((err) => {});
};

export const Delete_user = (post, cb) => {
  auth
    .signInWithEmailAndPassword(post.email, post.password)
    .then((res) => {
      var user = firebase.auth().currentUser;
      user
        .delete()
        .then(function () {
          // User deleted.
          cb(true);
        })
        .catch(function (error) {
          // An error happened.
          cb(false);
          console.log("on dlete 2 error", error);
        });
    })
    .catch((err) => {
      cb(false);
      console.log("delete error", err);
    });
};

export const Get_goeloacation = (lati, longi) => {
  return new firebase.firestore.GeoPoint(lati, longi);
};

export const Create = (collection, data, cb) => {
  firestore
    .collection(collection)
    .add(data)
    .then((res) => {
      cb(res.id);
    });
};

export const Create_with_id = (collection, id, data, cb) => {
  firestore
    .collection(collection)
    .doc(id)
    .set(data)
    .then(() => {
      cb();
    })
    .catch((err) => {
      console.log("fire base attat err:", err);
    });
};

export const Update = (collection, id, data, cb) => {
  firestore
    .collection(collection)
    .doc(id)
    .update(data)
    .then(() => {
      cb();
    });
};

export const get_user = async (cb) => {
  // try {
  //     // const jsonValue = await AsyncStorage.getItem('user')
  //     cb(jsonValue != null ? JSON.parse(jsonValue) : null);
  //   } catch(e) {
  //     cb(false)
  //   }
};

export const Get_data_by_id = (collection, id, cb) => {
  firestore
    .collection(collection)
    .doc(id)
    .get()
    .then((res) => {
      cb({ ...res.data(), id: res.id });
    });
};

export const Get_data_by_filter = (collection, id, cb) => {
  firestore
    .collection(collection)
    .where(...id)
    .get()
    .then((res) => {
      cb(res.docs);
    });
};

export const Get_data_by_filter_double = (collection, id, id2, cb) => {
  firestore
    .collection(collection)
    .where(...id)
    .where(...id2)
    .get()
    .then((res) => {
      cb(res.docs);
    });
};
export const Get_data_by_filter_double_limit = (
  collection,
  id,
  id2,
  limit,
  cb
) => {
  firestore
    .collection(collection)
    .where(...id)
    .where(...id2)
    .limit()
    .get()
    .then((res) => {
      cb(res.docs);
    });
};
export const Get_all = (collection, cb) => {
  firestore
    .collection(collection)
    .get()
    .then((res) => {
      cb(res.docs);
    });
};

export const Check_Duplicate = (post, cb) => {
  Get_data_by_filter_double(
    post.collection,
    [post.keyone, "==", post.dataone],
    [post.keytwo, "==", post.datatwo],
    (res) => {
      if (res.length > 0) {
        if (post.id) {
          if (res[0].id === post.id) {
            cb(false);
          } else {
            cb(true);
          }
        } else {
          cb(true);
        }
      } else {
        cb(false);
      }
    }
  );
};
export const Check_Duplicate_Single = (post, cb) => {
  Get_data_by_filter(
    post.collection,
    [post.keyone, "==", post.dataone],
    (res) => {
      if (res.length > 0) {
        if (post.id) {
          if (res[0].id === post.id) {
            cb(false);
          } else {
            cb(true);
          }
        } else {
          cb(true);
        }
      } else {
        cb(false);
      }
    }
  );
};

export const Get_Doc_Ref = (collection, id) => {
  return firestore.collection(collection).doc(id);
};
export const Get_Doc_Ref_double = (collection1, id, collection2, id2) => {
  return firestore
    .collection(collection1)
    .doc(id)
    .collection(collection2)
    .doc(id2);
};

// export const  Get_image = async (id,cb)=>{
//       const url = await storage()
//               .ref(id)
//               .getDownloadURL();
//         //  this.setState({img:{uri:url}})
//       cb(url)
// }

export const Inc_Count = (collection, id, filed, count, cb) => {
  Get_Doc_Ref(collection, id)
    .update({
      [`${filed}`]: firebase.firestore.FieldValue.increment(count),
    })
    .then(() => {
      cb();
    });
};
export const Create_Inside_Doc = (collection1, id, collection2, data, cb) => {
  firestore
    .collection(collection1)
    .doc(id)
    .collection(collection2)
    .add(data)
    .then((res) => {
      cb(res.id);
    });
};
export const Delete_Doc = (collection, id, cb) => {
  firestore
    .collection(collection)
    .doc(id)
    .delete()
    .then((res) => {
      cb(res);
    });
};
export const Delete_inside_Doc = (collection1, id1, collection, id2, cb) => {
  firestore
    .collection(collection1)
    .doc(id1)
    .collection(collection)
    .doc(id2)
    .delete()
    .then((res) => {
      cb(res);
    });
};

export const Get_all_docs_inside_doc = (
  collection1,
  id,
  collection2,
  orderBy,
  cb
) => {
  firestore
    .collection(collection1)
    .doc(id)
    .collection(collection2)
    .orderBy(...orderBy)
    .get()
    .then((res) => {
      cb(res.docs);
    });
};

export const Get_doc_inside_doc = (collection1, id, collection2, id2, cb) => {
  firestore
    .collection(collection1)
    .doc(id)
    .collection(collection2)
    .doc(id2)
    .get()
    .then((res) => {
      cb(res);
    });
};

export const Get_Doc_from_ref = (ref, cb) => {
  firestore(ref)
    .get()
    .then((res) => {
      cb(res);
    });
};

export const Get_live_Orders = (uid, cb) => {
  firestore
    .collection("Orders")
    .where("status", "==", "ongoing")
    .where("uid", "==", uid)
    .onSnapshot((documentSnapshot) => {
      cb(documentSnapshot.docs);
    });
};

export const Get_filter_data_obj = (p, cb) => {
  let limit = p.limit ? p.limit : 500;
  if (p.orderBy2) {
    if (p.data) {
      const last = p.data[p.data.length - 1];
      if (p.filter5) {
        firestore
          .collection(p.collection)
          .where(...p.filter1)
          .where(...p.filter2)
          .where(...p.filter3)
          .where(...p.filter4)
          .where(...p.filter5)
          .orderBy(...p.orderBy)
          .orderBy(...p.orderBy2)
          .startAfter(last.data()[p.orderBy[0]])
          .limit(limit)
          .get()
          .then((res) => {
            cb(res.docs, res);
          });
      } else if (p.filter4) {
        firestore
          .collection(p.collection)
          .where(...p.filter1)
          .where(...p.filter2)
          .where(...p.filter3)
          .where(...p.filter4)
          .orderBy(...p.orderBy)
          .orderBy(...p.orderBy2)
          .startAfter(last.data()[p.orderBy[0]])
          .limit(limit)
          .get()
          .then((res) => {
            cb(res.docs, res);
          });
      } else if (p.filter3) {
        firestore
          .collection(p.collection)
          .where(...p.filter1)
          .where(...p.filter2)
          .where(...p.filter3)
          .orderBy(...p.orderBy)
          .orderBy(...p.orderBy2)
          .startAfter(last.data()[p.orderBy[0]])
          .limit(limit)
          .get()
          .then((res) => {
            cb(res.docs, res);
          });
      } else if (p.filter2) {
        firestore
          .collection(p.collection)
          .where(...p.filter1)
          .where(...p.filter2)
          .orderBy(...p.orderBy)
          .orderBy(...p.orderBy2)
          .startAfter(last.data()[p.orderBy[0]])
          .limit(limit)
          .get()
          .then((res) => {
            cb(res.docs, res);
          });
      } else if (p.filter1) {
        firestore
          .collection(p.collection)
          .where(...p.filter1)
          .orderBy(...p.orderBy)
          .orderBy(...p.orderBy2)
          .startAfter(last.data()[p.orderBy[0]])
          .limit(limit)
          .get()
          .then((res) => {
            cb(res.docs, res);
          });
      } else {
        firestore
          .collection(p.collection)
          .orderBy(...p.orderBy)
          .orderBy(...p.orderBy2)
          .startAfter(last.data()[p.orderBy[0]])
          .limit(limit)
          .get()
          .then((res) => {
            cb(res.docs, res);
          });
      }
    } else {
      if (p.filter5) {
        firestore
          .collection(p.collection)
          .where(...p.filter1)
          .where(...p.filter2)
          .where(...p.filter3)
          .where(...p.filter4)
          .where(...p.filter5)
          .orderBy(...p.orderBy)
          .orderBy(...p.orderBy2)
          .limit(limit)
          .get()
          .then((res) => {
            cb(res.docs, res);
          });
      } else if (p.filter4) {
        firestore
          .collection(p.collection)
          .where(...p.filter1)
          .where(...p.filter2)
          .where(...p.filter3)
          .where(...p.filter4)
          .orderBy(...p.orderBy)
          .orderBy(...p.orderBy2)
          .limit(limit)
          .get()
          .then((res) => {
            cb(res.docs, res);
          });
      } else if (p.filter3) {
        firestore
          .collection(p.collection)
          .where(...p.filter1)
          .where(...p.filter2)
          .where(...p.filter3)
          .orderBy(...p.orderBy)
          .orderBy(...p.orderBy2)
          .limit(limit)
          .get()
          .then((res) => {
            cb(res.docs, res);
          });
      } else if (p.filter2) {
        firestore
          .collection(p.collection)
          .where(...p.filter1)
          .where(...p.filter2)
          .orderBy(...p.orderBy)
          .orderBy(...p.orderBy2)
          .limit(limit)
          .get()
          .then((res) => {
            cb(res.docs, res);
          });
      } else if (p.filter1) {
        firestore
          .collection(p.collection)
          .where(...p.filter1)
          .orderBy(...p.orderBy)
          .orderBy(...p.orderBy2)
          .limit(limit)
          .get()
          .then((res) => {
            cb(res.docs, res);
          });
      } else {
        firestore
          .collection(p.collection)
          .orderBy(...p.orderBy)
          .orderBy(...p.orderBy2)
          .limit(limit)
          .get()
          .then((res) => {
            cb(res.docs, res);
          });
      }
    }
  } else if (p.orderBy) {
    if (p.data) {
      const last = p.data[p.data.length - 1];
      if (p.filter5) {
        firestore
          .collection(p.collection)
          .where(...p.filter1)
          .where(...p.filter2)
          .where(...p.filter3)
          .where(...p.filter4)
          .where(...p.filter5)
          .orderBy(...p.orderBy)
          .startAfter(last.data()[p.orderBy[0]])
          .limit(limit)
          .get()
          .then((res) => {
            cb(res.docs, res);
          });
      } else if (p.filter4) {
        firestore
          .collection(p.collection)
          .where(...p.filter1)
          .where(...p.filter2)
          .where(...p.filter3)
          .where(...p.filter4)
          .orderBy(...p.orderBy)
          .startAfter(last.data()[p.orderBy[0]])
          .limit(limit)
          .get()
          .then((res) => {
            cb(res.docs, res);
          });
      } else if (p.filter3) {
        firestore
          .collection(p.collection)
          .where(...p.filter1)
          .where(...p.filter2)
          .where(...p.filter3)
          .orderBy(...p.orderBy)
          .startAfter(last.data()[p.orderBy[0]])
          .limit(limit)
          .get()
          .then((res) => {
            cb(res.docs, res);
          });
      } else if (p.filter2) {
        firestore
          .collection(p.collection)
          .where(...p.filter1)
          .where(...p.filter2)
          .orderBy(...p.orderBy)
          .startAfter(last.data()[p.orderBy[0]])
          .limit(limit)
          .get()
          .then((res) => {
            cb(res.docs, res);
          });
      } else if (p.filter1) {
        firestore
          .collection(p.collection)
          .where(...p.filter1)
          .orderBy(...p.orderBy)
          .startAfter(last.data()[p.orderBy[0]])
          .limit(limit)
          .get()
          .then((res) => {
            cb(res.docs, res);
          });
      } else {
        firestore
          .collection(p.collection)
          .orderBy(...p.orderBy)
          .startAfter(last.data()[p.orderBy[0]])
          .limit(limit)
          .get()
          .then((res) => {
            cb(res.docs, res);
          });
      }
    } else {
      if (p.filter5) {
        firestore
          .collection(p.collection)
          .where(...p.filter1)
          .where(...p.filter2)
          .where(...p.filter3)
          .where(...p.filter4)
          .where(...p.filter5)
          .orderBy(...p.orderBy)
          .limit(limit)
          .get()
          .then((res) => {
            cb(res.docs, res);
          });
      } else if (p.filter4) {
        firestore
          .collection(p.collection)
          .where(...p.filter1)
          .where(...p.filter2)
          .where(...p.filter3)
          .where(...p.filter4)
          .orderBy(...p.orderBy)
          .limit(limit)
          .get()
          .then((res) => {
            cb(res.docs, res);
          });
      } else if (p.filter3) {
        firestore
          .collection(p.collection)
          .where(...p.filter1)
          .where(...p.filter2)
          .where(...p.filter3)
          .orderBy(...p.orderBy)
          .limit(limit)
          .get()
          .then((res) => {
            cb(res.docs, res);
          });
      } else if (p.filter2) {
        firestore
          .collection(p.collection)
          .where(...p.filter1)
          .where(...p.filter2)
          .orderBy(...p.orderBy)
          .limit(limit)
          .get()
          .then((res) => {
            cb(res.docs, res);
          });
      } else if (p.filter1) {
        firestore
          .collection(p.collection)
          .where(...p.filter1)
          .orderBy(...p.orderBy)
          .limit(limit)
          .get()
          .then((res) => {
            cb(res.docs, res);
          });
      } else {
        firestore
          .collection(p.collection)
          .orderBy(...p.orderBy)
          .limit(limit)
          .get()
          .then((res) => {
            cb(res.docs, res);
          });
      }
    }
  } else {
    if (p.filter5) {
      firestore
        .collection(p.collection)
        .where(...p.filter1)
        .where(...p.filter2)
        .where(...p.filter3)
        .where(...p.filter4)
        .where(...p.filter5)
        .limit(limit)
        .get()
        .then((res) => {
          cb(res.docs, res);
        });
    } else if (p.filter4) {
      firestore
        .collection(p.collection)
        .where(...p.filter1)
        .where(...p.filter2)
        .where(...p.filter3)
        .where(...p.filter4)
        .limit(limit)
        .get()
        .then((res) => {
          cb(res.docs, res);
        });
    } else if (p.filter3) {
      firestore
        .collection(p.collection)
        .where(...p.filter1)
        .where(...p.filter2)
        .where(...p.filter3)
        .limit(limit)
        .get()
        .then((res) => {
          cb(res.docs, res);
        });
    } else if (p.filter2) {
      firestore
        .collection(p.collection)
        .where(...p.filter1)
        .where(...p.filter2)
        .limit(limit)
        .get()
        .then((res) => {
          cb(res.docs, res);
        });
    } else if (p.filter1) {
      firestore
        .collection(p.collection)
        .where(...p.filter1)
        .limit(limit)
        .get()
        .then((res) => {
          cb(res.docs, res);
        });
    } else {
      firestore
        .collection(p.collection)
        .limit(limit)
        .get()
        .then((res) => {
          cb(res.docs, res);
        });
    }
  }
};

export const Get_filter_data_obj_with_start = (p, cb) => {
  let limit = p.limit ? p.limit : 500;
  if (p.filter5) {
    firestore
      .collection(p.collection)
      .where(...p.filter1)
      .where(...p.filter2)
      .where(...p.filter3)
      .where(...p.filter4)
      .where(...p.filter5)
      .orderBy(...p.orderBy)
      .startAt(p.start)
      .limit(limit)
      .get()
      .then((res) => {
        cb(res.docs, res);
      });
  } else if (p.filter4) {
    firestore
      .collection(p.collection)
      .where(...p.filter1)
      .where(...p.filter2)
      .where(...p.filter3)
      .where(...p.filter4)
      .orderBy(...p.orderBy)
      .startAt(p.start)
      .limit(limit)
      .get()
      .then((res) => {
        cb(res.docs, res);
      });
  } else if (p.filter3) {
    firestore
      .collection(p.collection)
      .where(...p.filter1)
      .where(...p.filter2)
      .where(...p.filter3)
      .orderBy(...p.orderBy)
      .startAt(p.start)
      .limit(limit)
      .get()
      .then((res) => {
        cb(res.docs, res);
      });
  } else if (p.filter2) {
    firestore
      .collection(p.collection)
      .where(...p.filter1)
      .where(...p.filter2)
      .orderBy(...p.orderBy)
      .startAt(p.start)
      .limit(limit)
      .get()
      .then((res) => {
        cb(res.docs, res);
      });
  } else if (p.filter1) {
    firestore
      .collection(p.collection)
      .where(...p.filter1)
      .orderBy(...p.orderBy)
      .startAt(p.start)
      .limit(limit)
      .get()
      .then((res) => {
        cb(res.docs, res);
      });
  } else {
    firestore
      .collection(p.collection)
      .orderBy(...p.orderBy)
      .startAt(p.start)
      .limit(limit)
      .get()
      .then((res) => {
        cb(res.docs, res);
      });
  }
};

export const Get_filter_data_obj_live = (p, cb) => {
  let limit = p.limit ? p.limit : 500;
  if (p.orderBy) {
    if (p.filter3) {
      firestore
        .collection(p.collection)
        .where(...p.filter1)
        .where(...p.filter2)
        .where(...p.filter3)
        .orderBy(...p.orderBy)
        .limit(limit)
        .onSnapshot((documentSnapshot) => {
          cb(documentSnapshot.docs);
        });
    } else if (p.filter2) {
      firestore
        .collection(p.collection)
        .where(...p.filter1)
        .where(...p.filter2)
        .orderBy(...p.orderBy)
        .limit(limit)
        .onSnapshot((documentSnapshot) => {
          cb(documentSnapshot.docs);
        });
    } else if (p.filter1) {
      firestore
        .collection(p.collection)
        .where(...p.filter1)
        .orderBy(...p.orderBy)
        .limit(limit)
        .onSnapshot((documentSnapshot) => {
          cb(documentSnapshot.docs);
        });
    } else {
      firestore
        .collection(p.collection)
        .orderBy(...p.orderBy)
        .limit(limit)
        .onSnapshot((documentSnapshot) => {
          cb(documentSnapshot.docs);
        });
    }
  } else {
    if (p.filter3) {
      firestore
        .collection(p.collection)
        .where(...p.filter1)
        .where(...p.filter2)
        .where(...p.filter3)
        .limit(limit)
        .onSnapshot((documentSnapshot) => {
          cb(documentSnapshot.docs);
        });
    } else if (p.filter2) {
      firestore
        .collection(p.collection)
        .where(...p.filter1)
        .where(...p.filter2)
        .limit(limit)
        .onSnapshot((documentSnapshot) => {
          cb(documentSnapshot.docs);
        });
    } else if (p.filter1) {
      firestore
        .collection(p.collection)
        .where(...p.filter1)
        .limit(limit)
        .onSnapshot((documentSnapshot) => {
          cb(documentSnapshot.docs);
        });
    } else {
      firestore
        .collection(p.collection)
        .limit(limit)
        .onSnapshot((documentSnapshot) => {
          cb(documentSnapshot.docs);
        });
    }
  }
};

export const Add_to_Array = (doc_ref, filed, value, cb) => {
  doc_ref
    .update({
      [`${filed}`]: firestore.FieldValue.arrayUnion(value),
    })
    .then(() => {
      cb();
    });
};
export const Remove_From_Array = (doc_ref, filed, value, cb) => {
  doc_ref
    .update({
      [`${filed}`]: firestore.FieldValue.arrayRemove(value),
    })
    .then(() => {
      cb();
    });
};

export const Upload_Image = (post, cb) => {
  const uploadTask = storage.ref(`${post.folder}/${post.name}`).put(post.image);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // progrss function ....
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      // this.setState({progress});
    },
    (error) => {
      // error function ....
      console.log(error);
    },
    () => {
      storage
        .ref(post.folder)
        .child(post.name)
        .getDownloadURL()
        .then((url) => {
          cb(url);
        });
    }
  );

  // let reference = storage.ref(`/${post.folder}/${post.name}`);
  // let task = reference.put(post.image);
  // task
  //   .then((ress) => {
  //     // cb(ress.metadata.fullPath);
  //     cb();
  //   })
  //   .catch((e) => {
  //     console.log("uploading image error => ", e);
  //     cb(false);
  //   });
};
export const Delete_Image = (id, cb) => {
  let reference = storage.ref(id);
  let task = reference.delete();
  task
    .then(() => {
      cb(true);
    })
    .catch((e) => {
      console.log("uploading image error => ", e);
      cb(false);
    });
};

export const Get_image = async (id, cb) => {
  const url = await storage.ref(id).getDownloadURL();
  //  this.setState({img:{uri:url}})
  cb(url);
};

export const Login_user = (post, cb) => {
  Get_data_by_id("General", "Admin_login", (res) => {
    if (res.username === post.username && res.password === post.password) {
      cb(true);
    } else {
      cb(false);
    }
  });
};
