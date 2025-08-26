import Principal "mo:base/Principal";

public type Balance = {
  user : Principal;
  net : Int64;
};

public type Transfer = {
  from : Principal;
  to : Principal;
  amount : Nat64;
};

public type Expense = {
  id : Nat;
  groupId : Nat;
  payer : Principal;
  amount : Nat64;
  desc : Text;
  participants : [Principal];
  createdAt : Nat64;
};

public type Snapshot = {
  id : Nat;
  groupId : Nat;
  balances : [Balance];
  settlements : [Transfer];
  createdAt : Nat64;
};