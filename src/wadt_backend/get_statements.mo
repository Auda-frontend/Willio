actor {
    stable var testaments: [Testament] = [];

    public func getTestaments(): async [Testament] {
        return testaments;
    }
};

type Testament = {
    title: Text;
    description: Text;
};
