import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Button,
  TouchableOpacity,
} from "react-native";

interface DebugMenuProps {
  setDatabaseToMockData: () => void;
}

/**
 * DebugMenu component, shows the debug menu.
 * @param {DebugMenuProps} props - The props for the DebugMenu component, used for linking the buttons to their functionality.
 * @returns {JSX.Element} The DebugMenu component
 */
const DebugMenu: React.FC<DebugMenuProps> = ({
  setDatabaseToMockData,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <View style={debugStyles.container}>
      {isMenuOpen && (
        <View style={debugStyles.menuContent}>
          <Button
            color={"red"}
            title="Add Mock Data to Database"
            onPress={setDatabaseToMockData}
          />
        </View>
      )}
      <TouchableOpacity style={debugStyles.burgerMenu} onPress={toggleMenu}>
        <View style={debugStyles.burgerLine} />
        <View style={debugStyles.burgerLine} />
        <View style={debugStyles.burgerLine} />
      </TouchableOpacity>
    </View>
  );
};

const debugStyles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 1000,
  },
  burgerMenu: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgb(27, 153, 165)",
    justifyContent: "center",
    alignItems: "center",
  },
  burgerLine: {
    width: 25,
    height: 3,
    backgroundColor: "#fff",
    marginVertical: 2,
    borderRadius: 2,
  },
  menuContent: {
    position: "absolute",
    bottom: 70,
    right: 0,
    backgroundColor: "#fff",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    minWidth: 200,
  },
});

export default DebugMenu;
