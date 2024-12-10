import Array "mo:base/Array";

actor Testament {
    private var testaments : Array.Array<Text> = Array.init<Text>(0, fn (_ : Int) { "" });

    public func createTestament(title: Text, description: Text) : async Bool {
        let newTestament = "Title: " # title # " Description: " # description;
        testaments := Array.append<Text>(testaments, Array.fromList([newTestament]));
        return true;
    };

    public query func getTestaments() : async [Text] {
        return testaments;
    };
};
