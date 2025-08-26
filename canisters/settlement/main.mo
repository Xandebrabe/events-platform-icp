import Principal "mo:base/Principal";
import Array "mo:base/Array";
import Int "mo:base/Int";
import Nat64 "mo:base/Nat64";
import Types "Types";

stable var expenses : [Types.Expense] = [];
stable var snapshotIdGen : Nat = 1;

func get_group_expenses(groupId : Nat) : [Types.Expense] {
  Array.filter<Types.Expense>(expenses, func e = e.groupId == groupId)
};

// Calcula o saldo líquido de cada participante
public query func compute_balances(groupId : Nat) : async [Types.Balance] {
  let exps = get_group_expenses(groupId);
  var userMap : [(Principal, Int64)] = [];
  for (e in exps.vals()) {
    let share = Int64.fromNat64(e.amount) / Int64.fromNat(Array.size(e.participants));
    for (p in e.participants.vals()) {
      userMap := Array.append(userMap, [(p, -share)]);
    };
    userMap := Array.append(userMap, [(e.payer, Int64.fromNat64(e.amount))]);
  };
  // Agrupa por usuário
  var result : [(Principal, Int64)] = [];
  for ((u, v) in userMap.vals()) {
    let idx = Array.indexOf(result, func (x) = x.0 == u);
    if (idx == null) {
      result := Array.append(result, [(u, v)]);
    } else {
      let i = idx!;
      result[i] := (u, result[i].1 + v);
    }
  };
  Array.map(result, func ((user, net)) = { user; net })
};

// Algoritmo guloso: credores x devedores
public query func suggest_settlements(groupId : Nat) : async [Types.Transfer] {
  let balances = await compute_balances(groupId);
  var debtors = Array.filter(balances, func b = b.net < 0);
  var creditors = Array.filter(balances, func b = b.net > 0);
  var transfers : [Types.Transfer] = [];
  var i = 0; var j = 0;
  while (i < Array.size(debtors) and j < Array.size(creditors)) {
    let d = debtors[i];
    let c = creditors[j];
    let pay = Nat64.fromNat(Int.abs(Int.min(-d.net, c.net)));
    if (pay > 0) {
      transfers := Array.append(transfers, [{
        from = d.user; to = c.user; amount = pay
      }]);
      debtors[i].net += Int64.fromNat64(pay);
      creditors[j].net -= Int64.fromNat64(pay);
    };
    if (debtors[i].net == 0) { i += 1 };
    if (creditors[j].net == 0) { j += 1 };
  };
  transfers
};

// Simula saldo com despesa extra
public query func simulate_with_extra(groupId : Nat, expense : Types.Expense) : async [Types.Balance] {
  let exps = Array.append(get_group_expenses(groupId), [expense]);
  // Repete lógica de compute_balances
  var userMap : [(Principal, Int64)] = [];
  for (e in exps.vals()) {
    let share = Int64.fromNat64(e.amount) / Int64.fromNat(Array.size(e.participants));
    for (p in e.participants.vals()) {
      userMap := Array.append(userMap, [(p, -share)]);
    };
    userMap := Array.append(userMap, [(e.payer, Int64.fromNat64(e.amount))]);
  };
  var result : [(Principal, Int64)] = [];
  for ((u, v) in userMap.vals()) {
    let idx = Array.indexOf(result, func (x) = x.0 == u);
    if (idx == null) {
      result := Array.append(result, [(u, v)]);
    } else {
      let i = idx!;
      result[i] := (u, result[i].1 + v);
    }
  };
  Array.map(result, func ((user, net)) = { user; net })
};

public shared({caller}) func snapshot_and_persist(groupId : Nat) : async Types.Snapshot {
  let balances = await compute_balances(groupId);
  let settlements = await suggest_settlements(groupId);
  let snap : Types.Snapshot = {
    id = snapshotIdGen;
    groupId;
    balances;
    settlements;
    createdAt = Nat64.fromNat(Int.abs(Time.now()));
  };
  snapshotIdGen += 1;
  snap
};