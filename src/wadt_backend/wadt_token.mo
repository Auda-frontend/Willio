import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";

actor WADTToken {
  type CustomResponse = {
    message : Text;
    code : Nat;
  };

  type TokenInfo = {
    symbol : Text;
    circulatingSupplyAmount : Float;
  };

  let symbol : Text = "WADT"; // Stands for Will Autonomous Decentralized Token
  private var usersBalance = HashMap.HashMap<Principal, Float>(1, Principal.equal, Principal.hash); // Track User Token
  private stable var balanceEntry : [(Principal, Float)] = []; // for case upgrade temp var, because map cannot stable
  private stable var circulatingSupply : Float = 0;

  public query func getTokenInfo() : async TokenInfo {
    return { circulatingSupplyAmount = circulatingSupply; symbol };
  };

  public query func getBalance(principalId : Principal) : async Float {
    let balance : Float = switch (usersBalance.get(principalId)) {
      case null 0;
      case (?Float) Float;
    };

    return balance;
  };

  public query func getSymbol() : async Text {
    return symbol;
  };

  public shared (msg) func transferTo(toPrincipalId : Principal, amount : Float) : async CustomResponse {
    let ownerAmount = await getBalance(msg.caller);
    if (ownerAmount > amount) {
      let currentOwnerAmount : Float = ownerAmount - amount;
      usersBalance.put(msg.caller, currentOwnerAmount);

      let destinationUserBalance = await getBalance(toPrincipalId);
      let newDestinationUserBalance = destinationUserBalance + amount;
      usersBalance.put(toPrincipalId, newDestinationUserBalance);

      return { message = "Success!"; code = 200 };
    } else {
      return { message = "Not enough funds!"; code = 400 };
    };
  };

  public func topUp(principalId : Principal, amount : Float) : async CustomResponse {

    // update user token
    var currentAmount = await getBalance(principalId);
    var newAmount = currentAmount + amount;
    usersBalance.put(principalId, newAmount);

    // update circulating supply token
    circulatingSupply := circulatingSupply + amount;

    return { message = "Success!"; code = 200 };

  };

  public func disbtribute(principalId : Principal, amount : Float) : async CustomResponse {
    var owner : Principal = Principal.fromText("igjqa-zhtmo-qhppn-eh7lt-5viq5-4e5qj-lhl7n-qd2fz-2yzx2-oczyc-tqe");
    let ownerAmount = await getBalance(principalId);

    if (ownerAmount > amount) {

      let currentOwnerAmount : Float = ownerAmount - amount;
      usersBalance.put(principalId, currentOwnerAmount);

      // input to owner
      let destinationUserBalance = await getBalance(owner);
      let newDestinationUserBalance = destinationUserBalance + amount;
      usersBalance.put(owner, newDestinationUserBalance);

      return { message = "Success Distribute"; code = 200 };
    } else {
      return { message = "Not enough funds!"; code = 400 };
    };
  };

  public func reset() : async CustomResponse {
    // Reinitialize the usersBalance HashMap
    usersBalance := HashMap.HashMap<Principal, Float>(1, Principal.equal, Principal.hash);

    // Reset circulating supply to zero
    circulatingSupply := 0;

    // Clear the balanceEntry array
    balanceEntry := [];

    return { message = "All data has been reset!"; code = 200 };
  };

  system func preupgrade() {
    balanceEntry := Iter.toArray(usersBalance.entries());
  };

  system func postupgrade() {
    usersBalance := HashMap.fromIter<Principal, Float>(balanceEntry.vals(), 1, Principal.equal, Principal.hash);
  };

};
