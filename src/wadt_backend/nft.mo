import Principal "mo:base/Principal";

actor class NFT(name : Text, owner : Principal, imageContent : [Nat8]) = this {
    private let itemName = name;
    private var nftOwner = owner;
    private let imageBytes = imageContent;

    public query func getCanisterId() : async Principal {
        return Principal.fromActor(this);
    };

    public shared ({ caller }) func transferOwnership(newOwner : Principal) : async Text {
        if (nftOwner == caller) {
            nftOwner := newOwner;
            return "Success";
        } else {
            return "NFT not owned by owner";
        };
    };

    public query func getName() : async Text {
        return itemName;
    };
    public query func getOwner() : async Principal {
        return owner;
    };
    public query func getImages() : async [Nat8] {
        return imageBytes;
    };
};
