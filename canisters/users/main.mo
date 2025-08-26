import Principal "mo:base/Principal";
import Array "mo:base/Array";
import Types "Types";

actor {
  stable var users : [Types.User] = [];
  stable var groups : [Types.Group] = [];
  stable var groupIdGen : Nat = 1;

  public shared({caller}) func register_user(name : Text) : async Types.User {
    let user : Types.User = { id = caller; name };
    if (Array.find<Types.User>(users, func u = u.id == caller) == null) {
      users := Array.append(users, [user]);
    };
    return user;
  };

  public shared({caller}) func get_me() : async ?Types.User {
    Array.find<Types.User>(users, func u = u.id == caller)
  };

  public shared({caller}) func create_group(name : Text, members : [Principal]) : async Types.Group {
    let group : Types.Group = { id = groupIdGen; name; members };
    groups := Array.append(groups, [group]);
    groupIdGen += 1;
    return group;
  };

  public query func list_groups() : async [Types.Group] {
    groups
  };

  public query func list_users() : async [Types.User] {
    users
  };
}

