const side = document.querySelector(".sidebar").querySelectorAll("a");
const sefareshDiv = document.querySelector("#sefareshat");
const nazaratDiv = document.querySelector("#nazarat");
const tasavirDiv = document.querySelector("#tasavir");
const khabarDiv = document.querySelector("#khabar");
const theH = document.querySelector("#theH");
const topText = document.querySelector("#topText");
const mainPic1 = document.querySelector("#mainPic1");
const mainPic2 = document.querySelector("#mainPic2");
const khabar1 = document.querySelector("#khabar1");
const khabar2 = document.querySelector("#khabar2");
const tablighMain = document.querySelector("#tablighMain");
const tabligh2 = document.querySelector("#tabligh2");
const demoPic1 = document.querySelector("#demoPic1");
const demoPic2 = document.querySelector("#demoPic2");
const inputs = document.querySelectorAll("input");

inputs.forEach((el) => {
  el.setAttribute("required", true);
});

// delete buttons
function sButtons() {
  const el = sefareshDiv.querySelectorAll("button");
  el.forEach((element) => {
    element.addEventListener("click", (e) => {
      const id = e.target.value;
      e.target.style.opacity = " 0.5";
      e.target.setAttribute("readonly", "");
      fetch("https://raynpakhshtest.liara.run/form1delete/" + id, {
        method: "DELETE",
      })
        .then((res) => {
          return res.text();
        })
        .then((res) => {
          alert(res);
        })
        .finally(() => {
          e.target.style.opacity = "1";
          e.target.removeAttribute("readonly");
        });
    });
  });
}

function nButtons() {
  const el = nazaratDiv.querySelectorAll("button");
  el.forEach((element) => {
    element.addEventListener("click", (e) => {
      const id = e.target.value;
      e.target.style.opacity = " 0.5";
      e.target.setAttribute("readonly", "");
      fetch("https://raynpakhshtest.liara.run/form2delete/" + id, {
        method: "DELETE",
      })
        .then((res) => {
          return res.text();
        })
        .then((res) => {
          alert(res);
        })
        .finally(() => {
          e.target.style.opacity = "1";
          e.target.removeAttribute("readonly");
        });
    });
  });
}

sefareshDiv.style.display = "none";
nazaratDiv.style.display = "none";
tasavirDiv.style.display = "none";
khabarDiv.style.display = "none";

/* panel sefareshat */
side[0].addEventListener("click", (e) => {
  e.preventDefault();
  sefareshDiv.style.display = "block";
  sefareshDiv.innerHTML = "<h2>بارگذاری ...</h2>";
  fetch("https://raynpakhshtest.liara.run/form1", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(async (res) => {
      return await res.json();
    })
    .then((res) => {
      sefareshDiv.querySelector("h2").style.display = "none";
      res.forEach((element) => {
        const div = document.createElement("div");
        div.innerHTML = `           
            <label>نام و نام خانوادگی: <span> ${element.flname} </span></label><br>
            <label> تماس : <span> ${element.phone} </span></label><br>
            <label> تاپیک : <span> ${element.title} </span></label><br>
            <label>سرویس : <span> ${element.service} </span></label><br>
            <label>توضیحات : <span> ${element.explain} </span></label><br>
            <label>ایمیل : <span> ${element.email} </span></label><br>
            <button value="${element._id}"> حذف </button>`;
        sefareshDiv.append(div);
      });
    })
    .then(sButtons);
  nazaratDiv.style.display = "none";
  tasavirDiv.style.display = "none";
  khabarDiv.style.display = "none";
  theH.style.display = "none";
});
/* panel nazarat */

side[1].addEventListener("click", (e) => {
  e.preventDefault();
  nazaratDiv.style.display = "block";
  nazaratDiv.innerHTML = "<h2>بارگذاری ...</h2>";
  fetch("https://raynpakhshtest.liara.run/form2", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(async (res) => {
      return await res.json();
    })
    .then((res) => {
      nazaratDiv.querySelector("h2").style.display = "none";
      res
        .forEach((element) => {
          const div = document.createElement("div");
          div.innerHTML = `           
            <label>id : <span> ${element._id} </span></label>
            <label>نام و نام خانوادگی: <span> ${element.flname} </span></label><br>
            <label>توضیحات : <span> ${element.opinion} </span></label><br>
            <label>ایمیل : <span> ${element.email} </span></label><br>
            <button value="${element._id}"> حذف </button>`;
          nazaratDiv.append(div);
        });
    }).then(nButtons);
  sefareshDiv.style.display = "none";
  tasavirDiv.style.display = "none";
  khabarDiv.style.display = "none";
  theH.style.display = "none";
});
/* panel ax ha */

side[2].addEventListener("click", (e) => {
  e.preventDefault();
  sefareshDiv.style.display = "none";
  nazaratDiv.style.display = "none";
  tasavirDiv.style.display = "block";
  khabarDiv.style.display = "none";
  theH.style.display = "none";
});
/* panel khabar ha */

side[3].addEventListener("click", (e) => {
  e.preventDefault();
  sefareshDiv.style.display = "none";
  nazaratDiv.style.display = "none";
  tasavirDiv.style.display = "none";
  khabarDiv.style.display = "block";
  theH.style.display = "none";
});

/* tasavir upload*/
// 1 part

topText.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = {
    text: e.target[0].value,
  };
  fetch("https://raynpakhshtest.liara.run/topText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      return res.text();
    })
    .then((res) => window.alert(res));
});

// 2 part

mainPic1.addEventListener("submit", (e) => {
  e.preventDefault();
  const file = e.target[0].files[0];
  const formData = new FormData();
  formData.append("image1", file);
  fetch("https://raynpakhshtest.liara.run/mainPic1", {
    method: "POST",
    body: formData,
  })
    .then((res) => {
      return res.text();
    })
    .then((res) => window.alert(res));
});

// 3 part

mainPic2.addEventListener("submit", (e) => {
  e.preventDefault();
  const file = e.target[0].files[0];
  const formData = new FormData();
  formData.append("image2", file);
  fetch("https://raynpakhshtest.liara.run/mainPic2", {
    method: "POST",
    body: formData,
  })
    .then((res) => {
      return res.text();
    })
    .then((res) => window.alert(res));
});

// 4 part

demoPic1.addEventListener("submit", (e) => {
  e.preventDefault();
  const file = e.target[0].files[0];
  const formData = new FormData();
  formData.append("demo1", file);
  fetch("https://raynpakhshtest.liara.run/demo1", {
    method: "POST",
    body: formData,
  })
    .then((res) => {
      return res.text();
    })
    .then((res) => window.alert(res));
});
// 5 part

demoPic2.addEventListener("submit", (e) => {
  e.preventDefault();
  const file = e.target[0].files[0];
  const formData = new FormData();
  formData.append("demo2", file);
  fetch("https://raynpakhshtest.liara.run/demo2", {
    method: "POST",
    body: formData,
  })
    .then((res) => {
      return res.text();
    })
    .then((res) => window.alert(res));
});
/* khabar upload */
// khabar 1

khabar1.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("khabar1", e.target[0].files[0]);
  formData.append("txt", e.target[1].value);
  formData.append("url", e.target[2].value);
  fetch("https://raynpakhshtest.liara.run/khabar1", {
    method: "POST",
    body: formData,
  })
    .then((res) => {
      return res.text();
    })
    .then((res) => window.alert(res));
});

// khabar 2

khabar2.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("khabar2", e.target[0].files[0]);
  formData.append("txt", e.target[1].value);
  formData.append("url", e.target[2].value);
  fetch("https://raynpakhshtest.liara.run/khabar2", {
    method: "POST",
    body: formData,
  })
    .then((res) => {
      return res.text();
    })
    .then((res) => window.alert(res));
});

// tablighMain

tablighMain.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("tablighMain", e.target[0].files[0]);
  formData.append("txt", e.target[1].value);
  formData.append("url", e.target[2].value);
  fetch("https://raynpakhshtest.liara.run/tablighMain", {
    method: "POST",
    body: formData,
  })
    .then((res) => {
      return res.text();
    })
    .then((res) => window.alert(res));
});

// tabligh 2

tabligh2.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("tabligh2", e.target[0].files[0]);
  formData.append("txt", e.target[1].value);
  formData.append("url", e.target[2].value);
  fetch("https://raynpakhshtest.liara.run/tabligh2", {
    method: "POST",
    body: formData,
  })
    .then((res) => {
      return res.text();
    })
    .then((res) => window.alert(res));
});
