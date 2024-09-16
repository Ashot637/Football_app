import { Button, Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import shopImage from "../assets/images/shop.jpg";
import { COLORS } from "../helpers/colors";
import { useTranslation } from "react-i18next";

const ShopPage = () => {
  const { t } = useTranslation();

  return (
    <>
        <View style={styles.background}>
            <Text style={styles.title}>{t('shop.soon')}</Text>
        </View>
    </>
  );
};

export default ShopPage;

const styles = StyleSheet.create({
  background: {
    backgroundColor: COLORS.background_blue,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  container:{
    backgroundColor: '#1A82ED33',
    height: 65,
    width: 155,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },

  title:{
    color: 'white',
    fontSize:24,
    fontWeight: 'bold',
  }
});
