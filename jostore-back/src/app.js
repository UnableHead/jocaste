// Active horodate on console trace functions
["info", "log", "warn", "error"].forEach((item) => {
  const fct = console[item];
  console[item] = (...display) => {
    fct(`[${(new Date()).toISOString()}]`, ...display);
  };
});


// Start Server
require("./httpserve");
