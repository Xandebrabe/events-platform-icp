import Principal "mo:base/Principal";

public type User = {
  id : Principal;
  name : Text;
};

public type Group = {
  id : Nat;
  name : Text;
  members : [Principal];
};