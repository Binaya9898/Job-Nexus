import { StyleSheet } from "react-native";
import COLORS from "./COLORS";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        backgroundColor: COLORS.grey,
        paddingHorizontal: 10,
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        color: COLORS.primary,
        textAlign: "center",
        marginVertical: 10,
    },
    jobList: {
        flex: 1,
    },
    userList: {
        flex: 1,
    },
    listContainer: {
        justifyContent: "space-between",
    },
    jobCard: {
        padding: 20,
        marginVertical: 10,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        elevation: 5,
        borderWidth: 1,
        borderColor: COLORS.primary,
        alignItems: "center",
    },
    jobTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: COLORS.primary,
        textAlign: "center",
    },
    card: {
        shadowColor: "#00000021",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
        marginVertical: 10,
        backgroundColor: COLORS.white,
        flexBasis: "48%",
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 8,
    },
    cardContent: {
        marginLeft: 20,
        justifyContent: "center",
        flex: 1,
    },
    image: {
        width: 90,
        height: 90,
        borderRadius: 45,
    },
    name: {
        fontSize: 18,
        color: COLORS.primary,
        fontWeight: "bold",
    },
    position: {
        fontSize: 14,
        color: COLORS.black,
    },
    appliedFor: {
        fontSize: 14,
        color: COLORS.black,
    },
    profileButton: {
        marginTop: 10,
        height: 35,
        width: 120,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
        backgroundColor: COLORS.secondary,
    },
    profileButtonText: {
        color: COLORS.white,
        fontSize: 16,
    },
    backButton: {
        marginBottom: 10,
    },
    backButtonText: {
        color: COLORS.secondary,
        fontSize: 16,
        textAlign: "center",
    },
    popup: {
        backgroundColor: COLORS.white,
        marginHorizontal: 20,
        borderRadius: 7,
        padding: 20,
    },
    popupOverlay: {
        backgroundColor: "#00000057",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    popupContent: {
        margin: 5,
        height: 250,
    },
    popupButtons: {
        marginTop: 15,
        flexDirection: "row",
        borderTopWidth: 1,
        borderColor: COLORS.grey,
        justifyContent: "center",
    },
    btnAction: {
        flex: 1,
        height: 40,
        padding: 5,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 5,
        borderRadius: 5,
    },
    btnAccept: {
        backgroundColor: COLORS.primary,
    },
    btnReject: {
        backgroundColor: "#FF0000",
    },
    btnClose: {
        backgroundColor: COLORS.secondary,
    },
    txtAction: {
        color: COLORS.white,
    },
    txtClose: {
        color: COLORS.white,
    },
    modalInfo: {
        alignItems: "center",
        justifyContent: "center",
    },
    modalImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 15,
    },
});

export default Styles;
