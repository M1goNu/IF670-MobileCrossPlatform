import { StyleSheet } from "react-native";

export const addPostStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f5f5",
    },
    heading: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#1976D2",
        marginBottom: 24,
        marginTop: 10,
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        color: "#333",
        marginBottom: 6,
    },
    input: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 12,
        fontSize: 14,
        marginBottom: 16,
        color: "#222",
    },
    textArea: {
        height: 120,
        textAlignVertical: "top",
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
        gap: 12,
    },
    cancelButton: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#1976D2",
        alignItems: "center",
    },
    cancelText: {
        color: "#1976D2",
        fontWeight: "bold",
        fontSize: 15,
    },
    submitButton: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 8,
        backgroundColor: "#1976D2",
        alignItems: "center",
    },
    submitText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 15,
    },
    disabled: {
        backgroundColor: "#90CAF9",
    },
});

export const Indexstyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 100,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 14,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    postNumber: {
        fontSize: 12,
        color: "#888",
        marginBottom: 4,
    },
    postTitle: {
        fontSize: 15,
        fontWeight: "bold",
        marginBottom: 4,
        color: "#222",
    },
    postBody: {
        fontSize: 13,
        color: "#555",
    },

    // Floating Action Button
    fab: {
        position: "absolute",
        bottom: 30,
        right: 20,
        backgroundColor: "#1976D2",
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 30,
        shadowColor: "#1976D2",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 6,
        elevation: 8,
    },
    fabText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 15,
    },
});

export const postDetailStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        padding: 16,
    },
    postCard: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 16,
        marginBottom: 12,
        elevation: 2,
    },
    postTitle: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        color: "#1976D2",
        marginBottom: 10,
        textTransform: "capitalize",
    },
    postBody: {
        fontSize: 14,
        textAlign: "center",
        color: "#555",
        lineHeight: 22,
    },
    authorCard: {
        backgroundColor: "#E3F2FD",
        borderRadius: 10,
        padding: 14,
        marginBottom: 20,
    },
    authorHeading: {
        fontWeight: "bold",
        fontSize: 14,
        color: "#1565C0",
        marginBottom: 6,
    },
    authorInfo: {
        fontSize: 14,
        color: "#333",
        marginBottom: 2,
    },
    commentsHeading: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 12,
    },
    commentCard: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 12,
        marginBottom: 10,
        borderLeftWidth: 3,
        borderLeftColor: "#1976D2",
        elevation: 1,
    },
    commentName: {
        fontWeight: "bold",
        fontSize: 13,
        color: "#1976D2",
        marginBottom: 2,
        textTransform: "capitalize",
    },
    commentEmail: {
        fontSize: 12,
        color: "#888",
        marginBottom: 6,
    },
    commentBody: {
        fontSize: 13,
        color: "#444",
        lineHeight: 20,
    },
});