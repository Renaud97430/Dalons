    let users = [];
    const app = document.querySelector(".app");
    
    function getUsers() {
      fetch("https://randomuser.me/api/?results=20 ")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          users = data.results;
          displayUsers(users);
        });
    }
    
    function displayUsers(users) {
      users
        .sort((a, b) => {
          const today = new Date();
          const aRegistered = new Date(a.registered.date);
          const bRegistered = new Date(b.registered.date);
    
          const aDiff = today - aRegistered;
          const bDiff = today - bRegistered;
    
          return bDiff - aDiff;
        })
        .map((user) => {
          const card = document.createElement("div");
          card.className = "card";
    
          const genderIcon = document.createElement("i");
          if (user.gender === "male") {
            genderIcon.className = "fa-solid fa-mars male";
          } else {
            genderIcon.className = "fa-solid fa-venus female";
          }
          card.appendChild(genderIcon);
    
          const img = document.createElement("img");
          img.src = `${user.picture.large}`;
          card.appendChild(img);
    
          const details = document.createElement("div");
          details.className = "details";
    
          const firstname = document.createElement("span");
          firstname.className = "firstname";
          firstname.textContent = user.name.first + " ";
          details.appendChild(firstname);
    
          const lastname = document.createElement("span");
          lastname.className = "lastname";
          lastname.textContent = user.name.last.toUpperCase();
          details.appendChild(lastname);
    
          const email = document.createElement("a");
          email.className = "email";
          email.textContent = user.email;
          details.appendChild(email);
    
          const registered = document.createElement("div");
          registered.className = "registered";
          const dateRegistered = new Date(user.registered.date);
          const today = new Date();
          const dateDiff = today - dateRegistered; // en milliseconds
    
          registered.textContent = `Inscrit depuis ${Math.floor(
            dateDiff / (1000 * 60 * 60 * 24)
          )} jours`;
          details.appendChild(registered);
    
          card.appendChild(details);
    
          app.appendChild(card);
        });
    }
    
    getUsers();
