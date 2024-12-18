// import React, { useState, useTransition } from "react";
// import { useTranslation } from "react-i18next";
// import {
//   Modal,
//   StyleSheet,
//   TouchableOpacity,
//   View,
//   Text,
// } from "react-native";

// const InvitationModal = () => {
//   const [showModal, setShowModal] = useState(true);
//   const { t } = useTranslation();

//   const onConfirm = () => {
//     setShowModal(false);
//     console.log("Confirm button pressed");
//   };

//   const onCancel = () => {
//     setShowModal(false);
//     console.log("Cancel button pressed");
    
//   };

//   return (
//     <Modal visible={showModal} transparent>
//       <View style={styles.overlay}>
//         <View style={styles.content}>
//           <Text style={styles.title}>{t("invitation-team.title")}</Text>
//           <Text style={styles.info}>
//           {t("invitation-team.info")}
//           </Text>
//           <View style={styles.modalBtns}>
//             <TouchableOpacity onPress={onCancel} style={{ flex: 6 }}>
//               <View style={styles.cancelBtn}>
//                 <Text style={styles.btnText}>{t("invitation-team.cancel")}</Text>
//               </View>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={onConfirm} style={{ flex: 8 }}>
//               <View style={styles.submitbtn}>
//                 <Text style={[styles.btnText, { color: "#fff" }]}>
//                 {t("invitation-team.see_more")}
//                 </Text>
//               </View>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   overlay: {
//     alignItems: "center",
//     justifyContent: "center",
//     flex: 1,
//     paddingHorizontal: 16,
//     backgroundColor: "rgba(0,0,0,0.5)",
//   },
//   content: {
//     width: "100%",
//     backgroundColor: "#041440",
//     borderRadius: 25,
//     borderWidth: 0.5,
//     borderColor: "#007EFF",
//     paddingVertical: 32,
//     paddingHorizontal: 10,
//   },
//   title: {
//     marginBottom: 24,
//     color: "#0CF9DD",
//     fontSize: 22,
//     textAlign: "center",
//   },
//   info: {
//     fontSize: 16,
//     color: "#D9D9D9", 
//     textAlign: "center",
//     marginHorizontal: 5,
//     marginBottom: 34,
//   },
//   modalBtns: {
//     flexDirection: "row",
//     columnGap: 15,
//     marginHorizontal: 20,
//   },
//   cancelBtn: {
//     backgroundColor: "#031852B2",
//     borderRadius: 15,
//     paddingVertical: 9,
//     borderColor: "#D9D9D9",
//     borderWidth: 1,
//   },
//   submitbtn: {
//     backgroundColor: "#0968CA",
//     borderRadius: 15,
//     paddingVertical: 10,
//   },
//   btnText: {
//     fontSize: 16,
//     textAlign: "center",
//     color: "#D9D9D9",
//   },
// });

// export default InvitationModal;


import { useNavigation } from "@react-navigation/native";
import React, { useState, useTransition } from "react";
import { useTranslation } from "react-i18next";
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "../../redux/authSlice/authSlice";


const InvitationModal = () => {
    const navigation = useNavigation();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { user } = useSelector(selectAuth);
    const [invitations, setInvitations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false); // Initially set to false
    const [selectedInvitationIndex, setSelectedInvitationIndex] = useState(null);

  const onConfirm = () => {
    setShowModal(false);
    console.log("Confirm button pressed");
  };

  const onCancel = () => {
    setShowModal(false);
    console.log("Cancel button pressed");
    
  };

  return (
    <Modal visible={showModal} transparent>
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>{t("invitation-team.title")}</Text>
          <Text style={styles.info}>
          {t("invitation-team.info")}
          </Text>
          <View style={styles.modalBtns}>
            <TouchableOpacity onPress={onCancel} style={{ flex: 6 }}>
              <View style={styles.cancelBtn}>
                <Text style={styles.btnText}>{t("invitation-team.cancel")}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={onConfirm} style={{ flex: 8 }}>
              <View style={styles.submitbtn}>
                <Text style={[styles.btnText, { color: "#fff" }]}>
                {t("invitation-team.see_more")}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  content: {
    width: "100%",
    backgroundColor: "#041440",
    borderRadius: 25,
    borderWidth: 0.5,
    borderColor: "#007EFF",
    paddingVertical: 32,
    paddingHorizontal: 10,
  },
  title: {
    marginBottom: 24,
    color: "#0CF9DD",
    fontSize: 22,
    textAlign: "center",
  },
  info: {
    fontSize: 16,
    color: "#D9D9D9", 
    textAlign: "center",
    marginHorizontal: 5,
    marginBottom: 34,
  },
  modalBtns: {
    flexDirection: "row",
    columnGap: 15,
    marginHorizontal: 20,
  },
  cancelBtn: {
    backgroundColor: "#031852B2",
    borderRadius: 15,
    paddingVertical: 9,
    borderColor: "#D9D9D9",
    borderWidth: 1,
  },
  submitbtn: {
    backgroundColor: "#0968CA",
    borderRadius: 15,
    paddingVertical: 10,
  },
  btnText: {
    fontSize: 16,
    textAlign: "center",
    color: "#D9D9D9",
  },
});

export default InvitationModal;
