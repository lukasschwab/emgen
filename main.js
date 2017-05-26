// Generate the emails.
document.getElementById("trigger").onclick = function() {
  out = document.getElementById("out");
  out.value = "";

  first = document.getElementById("firstName").value.toLowerCase();
  last = document.getElementById("lastName").value.toLowerCase();
  domain = document.getElementById("customDomain").value.toLowerCase();
  if (first == "" || last == "") {
    console.log("Insufficient text entered");
    return;
  }

  domains = getDomains();
  emails = [];
  
  // TODO: add regexes; take arbitrary regex
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
  domains = [];

  custom = document.getElementById("customDomain").value.toLowerCase();
  if (custom != "") {
    domains[0] = custom;
  }
  domains = domains.concat(parseAddlDomains());
  
  var standardDomains = ["gmail", "yahoo", "hotmail", "outlook"];
  for (var i = 0; i < standardDomains.length; i++) {
    if (document.getElementById(standardDomains[i]).checked) {
      domains[domains.length] = standardDomains[i].concat(".com")
    }
  }
  
  return domains;
}

parseAddlDomains = function() {
  var unparsed = document.getElementById("addlDomains").value.toLowerCase();
  if (unparsed.length < 1) {
    return [];
  }
  var parsed = unparsed.split(",");
  var out = [];
  for (var i = 0; i < parsed.length; i++) {
    if (parsed[i].length > 0) {
      out[out.length] = parsed[i].trim();
    }
  }
  return out;
}

