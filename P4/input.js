export const hosts = [
  {
    id: "H1",
    ansible_host: "192.168.1.10",
    hostname: "app01",
    product_serial: "ABC123",
    machine_id: "MID100",
    notes: "Production app server",
  },
  {
    id: "H2",
    ansible_host: null,
    hostname: "container01",
    product_serial: null,
    machine_id: null,
    notes: "Docker container (ephemeral)",
  },
  {
    id: "H3",
    ansible_host: "192.168.1.11",
    hostname: "app02",
    product_serial: "ABC124",
    machine_id: "MID101",
    notes: "Production app server 2",
  },
  {
    id: "H4",
    ansible_host: "192.168.1.10",
    hostname: "app01-alt",
    product_serial: "ABC125",
    machine_id: "MID100",
    notes: "Clone of app01 with updated serial",
  },
  {
    id: "H5",
    ansible_host: null,
    hostname: "db01",
    product_serial: "XYZ999",
    machine_id: "MID200",
    notes: "Primary database",
  },
  {
    id: "H6",
    ansible_host: "192.168.1.12",
    hostname: "db02",
    product_serial: "XYZ999",
    machine_id: "MID200",
    notes: "Secondary DB clone",
  },
  {
    id: "H7",
    ansible_host: null,
    hostname: "cache01",
    product_serial: null,
    machine_id: null,
    notes: "Cache service container",
  },
  {
    id: "H8",
    ansible_host: "10.0.0.20",
    hostname: "baremetal01",
    product_serial: "BM-001",
    machine_id: "MID500",
    notes: "Bare-metal host",
  },
  {
    id: "H9",
    ansible_host: "10.0.0.21",
    hostname: "baremetal01-backup",
    product_serial: "BM-002",
    machine_id: "MID500",
    notes: "Backup bare-metal host",
  },
  {
    id: "H10",
    ansible_host: "10.0.0.22",
    hostname: "baremetal01-reinstall",
    product_serial: "BM-001",
    machine_id: "MID500",
    notes: "Reinstalled bare-metal for reprovision",
  },
  {
    id: "H11",
    ansible_host: "203.0.113.5",
    hostname: "iot01",
    product_serial: "SN500",
    machine_id: "MID600",
    notes: "IoT device behind NAT",
  },
  {
    id: "H12",
    ansible_host: "203.0.113.5",
    hostname: "iot02",
    product_serial: "SN501",
    machine_id: "MID601",
    notes: "Another IoT device behind same IP",
  },
  {
    id: "H13",
    ansible_host: "192.168.2.20",
    hostname: "tempvm01",
    product_serial: "SN700",
    machine_id: "MID700",
    notes: "Snapshot-cloned VM #1",
  },
  {
    id: "H14",
    ansible_host: "192.168.2.21",
    hostname: "tempvm02",
    product_serial: "SN700",
    machine_id: "MID701",
    notes: "Snapshot-cloned VM #2",
  },
  {
    id: "H17",
    ansible_host: "172.16.0.5",
    hostname: "uat01",
    product_serial: "SN800",
    machine_id: null,
    notes: "UAT VM with only product-serial",
  },
  {
    id: "H18",
    ansible_host: "172.16.0.6",
    hostname: "uat01-alt",
    product_serial: "SN800",
    machine_id: null,
    notes: "Clone of H17 (same serial; no ID)",
  },
  {
    id: "H19",
    ansible_host: null,
    hostname: "generic",
    product_serial: null,
    machine_id: null,
    notes: "Ephemeral host with generic name",
  },
  {
    id: "H20",
    ansible_host: null,
    hostname: "generic",
    product_serial: null,
    machine_id: null,
    notes: "Another ephemeral 'generic'",
  },
  {
    id: "H21",
    ansible_host: "lb.example.com",
    hostname: "app-load1",
    product_serial: "LB123",
    machine_id: "MID900",
    notes: "Front-end host behind LB DNS",
  },
  {
    id: "H22",
    ansible_host: "lb.example.com",
    hostname: "app-load2",
    product_serial: "LB124",
    machine_id: "MID901",
    notes: "Another front-end behind same DNS",
  },
  {
    id: "H25",
    ansible_host: null,
    hostname: "machine",
    product_serial: null,
    machine_id: "MID902",
    notes: "Has machine_id but not product_serial",
  },
  {
    id: "H26",
    ansible_host: null,
    hostname: "machine-alt",
    product_serial: null,
    machine_id: "MID902",
    notes: "Has machine_id but not product_serial",
  },
  {
    id: "H31",
    ansible_host: null,
    hostname: "host1",
    product_serial: null,
    machine_id: null,
    notes: "Seed host1",
  },
  {
    id: "H32",
    ansible_host: "10.0.0.1",
    hostname: "host2",
    product_serial: "S1",
    machine_id: null,
    notes: "Seed S1",
  },
  {
    id: "H33",
    ansible_host: null,
    hostname: "host3",
    product_serial: "S2",
    machine_id: null,
    notes: "Seed S2",
  },
  {
    id: "H34",
    ansible_host: "10.0.0.4",
    hostname: "host4",
    product_serial: "S3",
    machine_id: null,
    notes: "Seed S3",
  },
  {
    id: "H35",
    ansible_host: null,
    hostname: "host5",
    product_serial: "S4",
    machine_id: null,
    notes: "Seed S4",
  },
  {
    id: "H36",
    ansible_host: "host1",
    hostname: "host1-alt",
    product_serial: "S1",
    machine_id: null,
    notes: "Links H31 & H32 on host1 & S1",
  },
  {
    id: "H37",
    ansible_host: "host2",
    hostname: "host2-alt",
    product_serial: "S2",
    machine_id: null,
    notes: "Links H32 & H33 on host2 & S2",
  },
  {
    id: "H38",
    ansible_host: "host3",
    hostname: "host3-alt",
    product_serial: "S3",
    machine_id: null,
    notes: "Links H33 & H34 on host3 & S3",
  },
  {
    id: "H39",
    ansible_host: "host4",
    hostname: "host4-alt",
    product_serial: "S4",
    machine_id: null,
    notes: "Links H34 & H35 on host4 & S4",
  },
];
validate_ids(hosts);

export const known_good = [
  {
    group: ["H1", "H4"],
    why: "same ansible_host",
  },
  {
    group: ["H5", "H6"],
    why: "same composite serial (DB clone)",
  },
  { group: ["H2"], why: "no match" },
  { group: ["H7"], why: "no match" },
  {
    group: ["H3"],
    why: "unique by both host and serial",
  },
  {
    group: ["H8", "H10"],
    why: "same composite serial (post-restore)",
  },
  { group: ["H9"], why: "unique backup host" },
];

export const known_bad = [
  {
    group: ["H11", "H12"],
    why: "false positive: shared NAT'd IP groups distinct IoT devices",
  },
  {
    group: ["H13"],
    why: "false negative: shares product-serial SN700 but differing machine-IDs → no grouping",
  },
  {
    group: ["H14"],
    why: "same as H13: should group on product-serial alone but doesn't",
  },
  {
    group: ["H19", "H20"],
    why: "false positive: both get root\_host=`generic` → unrelated ephemeral hosts grouped",
  },
  {
    group: ["H21", "H22"],
    why: "false positive: shared DNS name groups two distinct front-ends",
  },
];

function validate_ids(body) {
  const map = {};
  body.forEach(({ id }) => {
    if (map[id]) {
      throw `Duplicate ID ${id}`;
    }

    map[id] = true;
  });
}
