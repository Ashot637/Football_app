// import {
//   Image,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { COLORS } from "../helpers/colors";
// import PrimaryText from "../components/PrimaryText";
// import axios from "../axios/axios";
// import { useEffect, useState } from "react";

// import stadiumIcon from "../assets/images/stadium.png";
// import SearchIcon from "../assets/images/Search.svg";
// import { useTranslation } from "react-i18next";

// const StadiumsPage = ({ navigation }) => {
//   const { t } = useTranslation();
//   const [stadiums, setStadiums] = useState([]);

//   useEffect(() => {
//     axios.get("/stadion/search").then(({ data }) => {
//       setStadiums(data);
//     });
//   }, []);

//   return (
//     <>
//       <ScrollView style={styles.background}>
//         <Text
//           style={{
//             color: "white",
//             textAlign: "center",
//             fontSize: 22,
//             fontWeight: 500,
//             marginBottom: 20,
//           }}
//         >
//           {t("common.stadiums")}
//         </Text>
//         <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
//           <TouchableOpacity
//             testID="stadiums-search-icon"
//             onPress={() => {
//               navigation.navigate("stadiums_search");
//             }}
//           >
//             <SearchIcon />
//           </TouchableOpacity>
//         </View>
//         {stadiums.map((item) => {
//           return (
//             <TouchableOpacity
//               onPress={() => {
//                 navigation.navigate("stadium_details", { id: item.id });
//               }}
//               key={item.id}
//             >
//               <View style={styles.block}>
//                 <Image
//                   source={stadiumIcon}
//                   style={{
//                     width: 25,
//                     height: 25,
//                     transform: [{ rotate: "90deg" }],
//                   }}
//                 />
//                 <Text
//                   style={{
//                     color: "white",
//                     fontSize: 16,
//                     fontWeight: 500,
//                     width: "90%",
//                   }}
//                 >
//                   {item.title}
//                 </Text>
//               </View>
//             </TouchableOpacity>
//           );
//         })}
//         <View style={{ height: 50 }}></View>
//       </ScrollView>
//     </>
//   );
// };

// export default StadiumsPage;

// const styles = StyleSheet.create({
//   background: {
//     backgroundColor: COLORS.background_blue,
//     width: "100%",
//     height: "100%",
//     paddingTop: 30,
//     paddingLeft: 20,
//     paddingRight: 20,
//   },

//   block: {
//     width: "100%",
//     backgroundColor: "#032176",
//     paddingVertical: 20,
//     marginTop: 20,
//     borderRadius: 6,
//     flexDirection: "row",
//     padding: 15,
//     alignItems: "center",
//     gap: 15,
//     borderColor: "#0CF9DD",
//     borderWidth: 1,
//   },
// });




import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../helpers/colors";
import PrimaryText from "../components/PrimaryText";
import axios from "../axios/axios";
import { useEffect, useState } from "react";

import stadiumIcon from "../assets/images/stadium.png";
import SearchIcon from "../assets/images/Search.svg";
import { useTranslation } from "react-i18next";

const StadiumsPage = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const [stadiums, setStadiums] = useState([]);

  // useEffect(() => {
  //   const fetchStadiums = async () => {
  //     // const { data } = await axios.get("/stadion/search");
  //     const { data } = await axios.get(`/stadion/search?lang=${i18n.language}`);
  //     setStadiums(data);
  //   };

  //   fetchStadiums();

  //   const handleLanguageChange = () => {
  //     fetchStadiums();
  //   };

  //   i18n.on("languageChanged", handleLanguageChange);

  //   return () => {
  //     i18n.off("languageChanged", handleLanguageChange);
  //   };
  // }, [i18n]);


  useEffect(() => {
    const fetchStadiums = async () => {
      try {
        const { data } = await axios.get(`/stadion/search?lang=${i18n.language}`);
        setStadiums(data);
      } catch (error) {
        console.error("Error fetching stadiums:", error);
      }
    };
  
    if (i18n.language) {
      fetchStadiums();
    }
  
    const handleLanguageChange = () => {
      fetchStadiums();
    };
  
    i18n.on("languageChanged", handleLanguageChange);
  
    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n.language]); 
  
  return (
    <>
      <ScrollView style={styles.background}>
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontSize: 22,
            fontWeight: 500,
            marginBottom: 20,
          }}
        >
          {t("common.stadiums")}
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <TouchableOpacity
            testID="stadiums-search-icon"
            onPress={() => {
              navigation.navigate("stadiums_search");
            }}
          >
            <SearchIcon />
          </TouchableOpacity>
        </View>
        {stadiums.map((item) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("stadium_details", { id: item.id });
              }}
              key={item.id}
            >
              <View style={styles.block}>
                <Image
                  source={stadiumIcon}
                  style={{
                    width: 25,
                    height: 25,
                    transform: [{ rotate: "90deg" }],
                  }}
                />
                <Text
                  style={{
                    color: "white",
                    fontSize: 16,
                    fontWeight: 500,
                    width: "90%",
                  }}
                >
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
        <View style={{ height: 50 }}></View>
      </ScrollView>
    </>
  );
};

export default StadiumsPage;

const styles = StyleSheet.create({
  background: {
    backgroundColor: COLORS.background_blue,
    width: "100%",
    height: "100%",
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
  },

  block: {
    width: "100%",
    backgroundColor: "#032176",
    paddingVertical: 20,
    marginTop: 20,
    borderRadius: 6,
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
    gap: 15,
    borderColor: "#0CF9DD",
    borderWidth: 1,
  },
});
