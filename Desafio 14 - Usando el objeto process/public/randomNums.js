async function renderNums() {
  const response = await fetch("./views/randomsNums.handlebars");
  const plantilla = await response.text();

  const template = Handlebars.compile(plantilla);

  fetch(`/randoms`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((numsObj) => {
      let nums = Object.entries(numsObj);
      console.log(nums);
      const html = template({ nums });
      document.querySelector("#tableNums").innerHTML = html;
    })
    .catch((err) => {
      console.log(err);
    });
}

renderNums();
