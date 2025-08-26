import Principal "mo:base/Principal";

public type Expense = {
  id : Nat;
  groupId : Nat;
  payer : Principal;
  amount : Nat64;
  desc : Text;
  participants : [Principal];
  createdAt : Nat64;
};