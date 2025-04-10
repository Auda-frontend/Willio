import Array "mo:base/Array";

actor Testament {
    private var testaments : [Text] = [];

    public func createTestament(title: Text, description: Text) : async Bool {
        let newTestament = "Title: " # title # " Description: " # description;
        testaments := Array.append<Text>(testaments, [newTestament]);
        return true;
    };

    public query func getTestaments() : async [Text] {
        return testaments;
    };
};