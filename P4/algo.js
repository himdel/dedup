import { next_id, reset_id } from "./id.js";
import { hosts, known_bad, known_good } from "./input.js";
import { state } from "./ui.js";

const uniq = (arr) => [...new Set(arr.filter(Boolean).sort())];

const initGroup = (row) => ({
  group: next_id(),
  members: [row.id],
  ansible_host: [row.ansible_host].filter(Boolean),
  hostname: [row.hostname].filter(Boolean),
  product_serial: [row.product_serial].filter(Boolean),
  machine_id: [row.machine_id].filter(Boolean),
  out_serial: [row.out_serial].filter(Boolean),
  out_host: [row.out_host].filter(Boolean),
});

const mergeGroup = (a, b) => ({
  group: a.group,
  members: uniq([...a.members, ...b.members]),
  ansible_host: uniq([...a.ansible_host, ...b.ansible_host]),
  hostname: uniq([...a.hostname, ...b.hostname]),
  product_serial: uniq([...a.product_serial, ...b.product_serial]),
  machine_id: uniq([...a.machine_id, ...b.machine_id]),
  out_serial: uniq([...a.out_serial, ...b.out_serial]),
  out_host: uniq([...a.out_host, ...b.out_host]),
});

export function recompute() {
  reset_id();

  const src = compute_host(compute_serial(hosts));
  const { rows, iterations } = compute_algo(src);
  const tgt = compute_rating(rows);

  return { src, tgt, iterations };
}

function compute_host(rows) {
  if (!state.doesHost) {
    return rows;
  }

  return rows.map((row) => ({
    ...row,
    out_host: row.ansible_host || row.hostname || null,
  }));
}

function compute_serial(rows) {
  if (!state.doesSerial) {
    return rows;
  }

  return rows.map((row) => {
    const hasAny = row.product_serial || row.machine_id;
    const hasBoth = row.product_serial && row.machine_id;
    const needsBoth = !state.serialSameEmpty;

    return {
      ...row,
      out_serial:
        (needsBoth && hasBoth) || (!needsBoth && hasAny)
          ? [row.product_serial, row.machine_id].join(", ")
          : null,
    };
  });
}

function compute_algo(rows) {
  const groups = [];
  rows.forEach((row) => {
    groups.push(initGroup(row));
  });

  const map = {
    none: null,
    composite: compare_composite,
    hostname: compare_hostname,
    noyes: compare_noyes,
    pthenh2: compare_pthenh2,
    pthenh: compare_pthenh,
    renewal: compare_renewal,
  };
  const comparator = map[state.algo];

  const out = {
    iterations: null,
    rows: [],
  };

  if (comparator) {
    let changes = true;
    let iter = 0;
    while (changes) {
      changes = false;
      iter++;
      groups.forEach((a, i) => {
        if (a.deleted) {
          return;
        }

        groups.slice(i + 1).forEach((b) => {
          if (b.deleted) {
            return;
          }

          if (comparator(a, b)) {
            b.deleted = true;
            Object.assign(a, mergeGroup(a, b));
            changes = true;
          }
        });
      });
    }

    out.iterations = iter - 1;
  }

  out.rows = groups.filter(({ deleted }) => !deleted);
  return out;
}

function overlaps(a, b, field) {
  const sa = new Set(a[field]);
  const sb = new Set(b[field]);
  return !!sa.intersection(sb).size;
}

function compare_hostname(a, b) {
  return overlaps(a, b, "out_host");
}

function compare_renewal(a, b) {
  let same = false;
  same ||= overlaps(a, b, "hostname");
  same ||= overlaps(a, b, "ansible_host");
  same ||= overlaps(a, b, "product_serial");
  same ||= overlaps(a, b, "machine_id");
  return same;
}

function compare_pthenh(a, b) {
  const hasSerials = a.out_serial?.length && b.out_serial?.length;
  if (hasSerials) {
    return overlaps(a, b, "out_serial");
  }

  return overlaps(a, b, "out_host");
}

function compare_pthenh2(a, b) {
  if (a.product_serial?.length && b.product_serial?.length) {
    return overlaps(a, b, "product_serial");
  }

  if (a.machine_id?.length && b.machine_id?.length) {
    return overlaps(a, b, "machine_id");
  }

  return overlaps(a, b, "out_host");
}

function compare_composite(a, b) {
  // same hostname OR...
  if (overlaps(a, b, "out_host")) {
    return true;
  }

  // ...serial AND machine
  return overlaps(a, b, "out_serial");
}

function compare_noyes(a, b) {
  // denials first

  if (!overlaps(a, b, "out_host")) {
    return false;
  }

  const hasSerials = a.out_serial?.length && b.out_serial?.length;
  if (hasSerials && !overlaps(a, b, "out_serial")) {
    return false;
  }

  return true;
}

function compute_rating(rows) {
  const map = {};
  const grouphash = (members) => members.toSorted().join(",");
  known_good.forEach(({ group, why }) => {
    map[grouphash(group)] = { correct: true, why };
  });
  known_bad.forEach(({ group, why }) => {
    map[grouphash(group)] = { correct: false, why };
  });
  const els = { correct: "?", why: "" };

  return rows.map((row) => ({
    ...row,
    ...(map[grouphash(row.members)] || els),
  }));
}
