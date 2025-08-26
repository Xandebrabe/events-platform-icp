import Types "Types";
import Array "mo:base/Array";

actor {
  stable var snapshots : [Types.Snapshot] = [];

  public shared({caller}) func save_snapshot(s : Types.Snapshot) : async Types.Snapshot {
    snapshots := Array.append(snapshots, [s]);
    s
  };

  public query func list_snapshots(groupId : Nat) : async [Types.Snapshot] {
    Array.filter<Types.Snapshot>(snapshots, func s = s.groupId == groupId)
  };

  public query func get_snapshot(id : Nat) : async ?Types.Snapshot {
    Array.find<Types.Snapshot>(snapshots, func s = s.id == id)
  };
}