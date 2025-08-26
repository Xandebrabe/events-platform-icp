import Principal "mo:base/Principal";
import Array "mo:base/Array";
import Types "Types";

actor {
  stable var expenses : [Types.Expense] = [];
  stable var expenseIdGen : Nat = 1;

  func group_exists(groupId : Nat) : Bool {
    groupId >= 1 and groupId <= 4
  };

  public shared({caller}) func add_expense(
    groupId : Nat,
    amount : Nat64,
    desc : Text,
    payer : Principal,
    participants : [Principal]
  ) : async Types.Expense {
    assert group_exists(groupId);
    assert Array.size(participants) > 0;
    let expense : Types.Expense = {
      id = expenseIdGen;
      groupId;
      payer;
      amount;
      desc;
      participants;
      createdAt = Nat64.fromNat(Int.abs(Time.now()));
    };
    expenses := Array.append(expenses, [expense]);
    expenseIdGen += 1;
    return expense;
  };

  public query func list_expenses(groupId : Nat) : async [Types.Expense] {
    Array.filter<Types.Expense>(expenses, func e = e.groupId == groupId)
  };

  public shared({caller}) func remove_expense(id : Nat) : async Bool {
    let before = Array.size(expenses);
    expenses := Array.filter<Types.Expense>(expenses, func e = e.id != id);
    Array.size(expenses) < before
  };
}