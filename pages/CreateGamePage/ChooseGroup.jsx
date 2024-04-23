import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import Accordion from "../../components/Accordion";
import PrimaryText from "../../components/PrimaryText";
import { COLORS } from "../../helpers/colors";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCreateGame,
  setGroup,
} from "../../redux/createGameSlice/createGameSlice";

import icon from "../../assets/images/stadium.png";

const ChooseGroup = ({ accordionId, toggleAccordion, isActive, groups }) => {
  const dispatch = useDispatch();
  const { group: selectedGroup } = useSelector(selectCreateGame);

  return (
    <Accordion
      icon={icon}
      iconInverted
      title={selectedGroup?.title}
      toggleIsOpen={() => toggleAccordion(accordionId)}
      isOpen={isActive}
    >
      <View style={styles.groups}>
        <ScrollView nestedScrollEnabled>
          {groups.map((group, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  dispatch(setGroup(group));
                  toggleAccordion(accordionId);
                }}
                key={group.id}
                style={[
                  styles.group,
                  index === groups.length - 1 && { borderBottomWidth: 0 },
                ]}
              >
                <PrimaryText style={{ color: COLORS.grey }} weight={600}>
                  {group.title}
                </PrimaryText>
              </TouchableOpacity>
            );
          })}
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
    backgroundColor: "#2F4131",
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
