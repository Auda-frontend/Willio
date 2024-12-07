import Result "mo:base/Result";
import Principal "mo:base/Principal";

module {

    // Interface for the ckBTC ledger canister
    public type Account = { owner : Principal; subaccount : ?[Nat8] };
    public type TransferArgs = {
        from_subaccount : ?[Nat8];
        to : Account;
        amount : Nat;
        fee : ?Nat;
        memo : ?[Nat8];
        created_at_time : ?Nat64;
    };

    private let ckBTCLedger : actor {
        icrc1_transfer : (TransferArgs) -> async Result.Result<Nat, Text>;
    } = actor("mc6ru-gyaaa-aaaar-qaaaq-cai");

    public func sendBtc(targetId: Principal, amount: Nat) : async Result.Result<Nat, Text> {
        // Prepare transfer arguments
        let args : TransferArgs = {
            from_subaccount = null;
            to = {
                owner = targetId;
                subaccount = null;
            };
            amount = amount;
            fee = null;
            memo = null;
            created_at_time = null;
        };

        // Call the ckBTC ledger to transfer tokens from canister to user
        let result = await ckBTCLedger.icrc1_transfer(args);
        return result;
    }

}