import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import Accordion from "../../components/Accordion";
import PrimaryText from "../../components/PrimaryText";
import { COLORS } from "../../helpers/colors";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCreateGame,
  setGroup,
} from "../../redux/createGameSlice/createGameSlice";

import icon from "../../assets/images/group.png";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

const ChooseGroup = ({ accordionId, toggleAccordion, isActive, groups }) => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { group: selectedGroup } = useSelector(selectCreateGame);

  return (
    <Accordion
      icon={icon}
      title={selectedGroup?.title}
      toggleIsOpen={() => toggleAccordion(accordionId)}
      isOpen={isActive}
      testId="select-team"
    >
      <View style={styles.groups}>
        <ScrollView nestedScrollEnabled>
          {groups.map((group) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  dispatch(setGroup(group));
                  toggleAccordion(accordionId);
                }}
                key={group.id}
                style={[styles.group]}
              >
                <PrimaryText style={{ color: COLORS.grey }} weight={600}>
                  {group.title}
                </PrimaryText>
              </TouchableOpacity>
            );
          })}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("create-group", { backUrl: "create-game" })
            }
            style={[styles.group, { borderBottomWidth: 0 }]}
          >
            <PrimaryText style={{ color: COLORS.grey }} weight={600}>
              {t("group.create")}
            </PrimaryText>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Accordion>
  );
};

const styles = StyleSheet.create({
  groups: {
    height: 230,
    paddingHorizontal: 9,
    paddingRight: 5,
    backgroundColor: COLORS.blue,
    borderRadius: 16,
  },
  group: {
    paddingHorizontal: 7,
    paddingVertical: 18,
    borderBottomColor: COLORS.grey,
    borderBottomWidth: 1,
    marginRight: 6,
  },
});

export default ChooseGroup;
