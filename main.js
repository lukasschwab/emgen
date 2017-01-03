// Generate the emails.
document.getElementById("trigger").onclick = function() {
  out = document.getElementById("out");
  out.value = "";

  first = document.getElementById("firstName").value.toLowerCase();
  last = document.getElementById("lastName").value.toLowerCase();
  domain = document.getElementById("customDomain").value.toLowerCase();
  if (first == "" || last == "" || domain == "") {
    console.log("Insufficient text entered");
    return;
  }

  domains = getDomains();
  emails = [];

  // Add all emails to box, then remove last ", ".
  for (var i = 0; i < domains.length; i++) {
    out.value += first + "@" + domains[i] + ", ";
    out.value += last + "@" + domains[i] + ", ";
    out.value += first + last + "@" + domains[i] + ", ";
    out.value += first + "." + last + "@" + domains[i] + ", ";
    out.value += last + "." + first + "@" + domains[i] + ", ";
    out.value += first + "_" + last + "@" + domains[i] + ", ";
    out.value += last + "_" + first + "@" + domains[i] + ", ";
    out.value += first[0] + last + "@" + domains[i] + ", ";
    out.value += last + first[0] + "@" + domains[i] + ", ";
  }
  out.value = out.value.slice(0, -2);

  out.focus();
  out.select();
  if (document.getElementById("autocopy").checked) {
    document.execCommand("copy");
  }
}

// Toggle the configuration div.
document.getElementById("configure").onclick = function() {
  cdiv = document.getElementById("configDiv");
  if (cdiv.style.display == "block") {
    cdiv.style.display = "none";
  } else {
    cdiv.style.display = "block";
  }
}

// Return all domains with which emails should be generated.
getDomains = function() {
  domains = [document.getElementById("customDomain").value.toLowerCase()];
  // TODO: replace with iteration over list
  if (document.getElementById("gmail").checked) {
    domains[domains.length] = "gmail.com";
  }
  if (document.getElementById("yahoo").checked) {
    domains[domains.length] = "yahoo.com";
  }
  if (document.getElementById("hotmail").checked) {
    domains[domains.length] = "hotmail.com";
  }
  if (document.getElementById("outlook").checked) {
    domains[domains.length] = "outlook.com";
  }
  return domains;
}