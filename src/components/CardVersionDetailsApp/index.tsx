import { View } from "react-native";
import TitleOrange from "../TitleOrange";
import { COLORS } from "../../styles/styles";
import CardHashCommit from "../CardHashCommit";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import TextDetailVersionApp from "../TextDetailVersionApp";
import Feather from "@expo/vector-icons/Feather";
import { useTheme } from "../../contexts/ThemeContext";

interface CardVersionDetailsAppProps {
  version: string;
  commitHash: string;
  branch: string;
  publishedAt: string;
}

export default function CardVersionDetailsApp({
  version,
  commitHash,
  branch,
  publishedAt,
}: CardVersionDetailsAppProps) {
  const { isDarkMode } = useTheme();

  const iconColor = isDarkMode
    ? COLORS.white[100]
    : COLORS.orange[900];

  const formatPublishedAt = (date: string) => {
    const datePart = date.split("T")[0];
    const [year, month, day] = datePart.split("-");

    return `${day}/${month}/${year}`;
  };

  return (
    <View
      style={{
        gap: 4,
      }}
    >
      <TitleOrange title="Detalhes da versão" fontSize={18} />

      <View
        style={{
          paddingHorizontal: 15,
          paddingTop: 15,
          paddingBottom: 20,
          borderWidth: 1,
          borderColor: COLORS.orange[900],
          borderRadius: 10,
          boxShadow: "0px 4px 7px rgba(0, 0, 0, 0.25)",
          gap: 15,
        }}
      >
        <CardHashCommit commitHash={commitHash} />

        <View
          style={{
            gap: 15,
          }}
        >
          <TextDetailVersionApp
            icon={
              <MaterialIcons
                name="phone-iphone"
                size={24}
                color={iconColor}
              />
            }
            title="Versão"
            response={version}
          />

          <TextDetailVersionApp
            icon={
              <Feather
                name="git-branch"
                size={24}
                color={iconColor}
              />
            }
            title="Branch"
            response={branch}
          />

          <TextDetailVersionApp
            icon={
              <MaterialIcons
                name="calendar-today"
                size={24}
                color={iconColor}
              />
            }
            title="Publicado em"
            response={formatPublishedAt(publishedAt)}
          />
        </View>
      </View>
    </View>
  );
}