import LayoutWrapper from "../../components/LayoutWrapper";
import Header from "../../components/Header";
import CardLogo from "../../components/CardLogo";
import { ActivityIndicator, Text, View } from "react-native";
import CardVersionDetailsApp from "../../components/CardVersionDetailsApp";
import { useAppVersion } from "../../hooks/useAppVersion";
import { COLORS, FONTS } from "../../styles/styles";

const APP_VERSION = "2.0.0";

export default function AboutApplicationScreen() {
    const {
        data: appVersion,
        isLoading,
        isError
    } = useAppVersion(APP_VERSION);

    return(
        <LayoutWrapper paddingHorizontal={-1} paddingBottom={80}>
            <Header textHeader="Sobre o app"/>

            <View
                style={{
                    marginVertical: 20,
                    marginHorizontal: 15,
                    gap: 30,
                }}
            >
                {isLoading && (
                    <ActivityIndicator
                        size="large"
                        color={COLORS.orange[900]}
                    />
                )}

                {isError && (
                    <Text
                        style={{
                            fontFamily: FONTS.inter[500],
                            color: COLORS.orange[900],
                            textAlign: 'center'
                        }}
                    >
                        Não foi possível carregar os dados da versão.
                    </Text>
                )}

                {!isLoading && !isError && appVersion && (
                    <>
                        <CardLogo version={appVersion.version} />

                        <CardVersionDetailsApp
                            version={appVersion.version}
                            commitHash={appVersion.commitHash}
                            branch={appVersion.branch}
                            publishedAt={appVersion.publishedAt}
                        />
                    </>
                )}
            </View>
        </LayoutWrapper>
    )
}