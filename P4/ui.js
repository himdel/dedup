let setState = (_v) => {
  throw "setState: too soon";
};

export const state = v2s(getVariant());

function getVariant() {
  const url = new URL(window.location.href);

  return url.searchParams.get("variant") || "new";
}

function setVariant(v) {
  setState(v2s(v));

  const url = new URL(window.location.href);
  url.searchParams.set("variant", v);

  window.history.pushState({}, "", url);
}

export function ui_init(recompute) {
  setState = (newState) => {
    Object.assign(state, newState);
    render(recompute);
  };

  render(recompute);
}

const source_header = {
  id: "ID",
  ansible_host: "ansible_host",
  hostname: "hostname",
  product_serial: "product_serial",
  machine_id: "machine_id",
  out_host: "computed host",
  out_serial: "computed serial",
  notes: "Notes",
};

const target_header = {
  group: "Group",
  members: "Members",
  ansible_host: "ansible_host",
  hostname: "hostname",
  product_serial: "product_serial",
  machine_id: "machine_id",
  out_serial: "computed serial",
  out_host: "computed host",
  correct: "Correct",
  why: "Why",
};

const variants = {
  none: "None",
  ccsp: "CCSP",
  renewal: "Renewal",
  new: "New",
  alt: "+partials",
  alt2: "+noyes",
  pthenh: "Hostname last AND",
  pthenhalt: "+ partials",
  pthenh2: "+ OR",
};

function v2s(variant) {
  const c = { variant }; // common

  switch (variant) {
    case "none":
      return { ...c, algo: "none", doesSerial: false, doesHost: false };
    case "ccsp":
      return { ...c, algo: "hostname", doesSerial: false, doesHost: true };
    case "renewal":
      return { ...c, algo: "renewal", doesSerial: false, doesHost: false };
    case "new":
      return {
        ...c,
        algo: "composite",
        doesSerial: true,
        serialSameEmpty: false,
        doesHost: true,
      };
    case "alt":
      return {
        ...c,
        algo: "composite",
        doesSerial: true,
        serialSameEmpty: true,
        doesHost: true,
      };
    case "alt2":
      return {
        ...c,
        algo: "noyes",
        doesSerial: true,
        serialSameEmpty: false,
        doesHost: true,
      };
    case "pthenh":
      return {
        ...c,
        algo: "pthenh",
        doesSerial: true,
        serialSameEmpty: false,
        doesHost: true,
      };
    case "pthenhalt":
      return {
        ...c,
        algo: "pthenh",
        doesSerial: true,
        serialSameEmpty: true,
        doesHost: true,
      };
    case "pthenh2":
      return { ...c, algo: "pthenh2", doesSerial: false, doesHost: true };
    default:
      throw `unknown variant ${variant}`;
  }
}

function render_tabs(selector, options, active) {
  const switcher = document.querySelector(selector);
  switcher.innerHTML = "";

  Object.entries(options).forEach(([k, v]) => {
    const tab = document.createElement("button");
    tab.type = "button";
    tab.className = active === k ? "active" : "";
    tab.textContent = v;
    switcher.appendChild(tab);

    tab.onclick = () => setVariant(k);

    if (active === k) {
      const count = document.createElement("span");
      count.id = "target_count";
      tab.appendChild(document.createTextNode(" ("));
      tab.appendChild(count);
      tab.appendChild(document.createTextNode(")"));
    }
  });
}

function render_table(selector, header, body) {
  const thead = document.createElement("thead");
  const tr = document.createElement("tr");
  Object.values(header).forEach((value) => {
    const th = document.createElement("th");
    th.textContent = value;
    tr.appendChild(th);
  });
  thead.appendChild(tr);

  const tbody = document.createElement("tbody");
  body.forEach((row) => {
    const tr = document.createElement("tr");
    Object.keys(header).forEach((key) => {
      const td = document.createElement("td");
      const value = row[key];
      td.textContent = Array.isArray(value) ? JSON.stringify(value) : value;
      tr.appendChild(td);

      if (key === "correct") {
        td.style.backgroundColor =
          value === true
            ? "rgba(0, 255, 0, 0.1)"
            : value === false
              ? "rgba(255, 0, 0, 0.1)"
              : "rgba(128, 128, 128, 0.1)";
      }
    });
    tbody.appendChild(tr);
  });

  const table = document.querySelector(selector);
  table.innerHTML = "";
  table.appendChild(thead);
  table.appendChild(tbody);
}

function render(recompute) {
  render_tabs("#variant-tabs", variants, state.variant);

  window.iterations.textContent = "";
  window.source_count.textContent = "";
  window.target_count.textContent = "";
  window.target_rating.textContent = "";

  const { src, tgt, iterations } = recompute();
  render_table("#source-table", source_header, src);
  render_table("#target-table", target_header, tgt);

  const stats = Object.groupBy(tgt, ({ correct }) => correct);

  window.iterations.textContent = `comparator iterations: ${iterations}`;
  window.source_count.textContent = String(src.length);
  window.target_count.textContent = String(tgt.length);
  window.target_rating.textContent = `good: ${stats.true?.length}; bad: ${stats.false?.length}`;
}
