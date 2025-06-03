const chr = (i) => String.fromCharCode(Math.floor(i));

let counter = 0;

// counts from A to Z, AA to AZ, BA ... ZZ
export function next_id() {
  const maybeFirst = counter < 26 ? "" : chr(65 + counter / 26 - 1);
  const second = chr(65 + (counter % 26));

  counter++;
  return maybeFirst + second;
}

export function reset_id() {
  counter = 0;
}
