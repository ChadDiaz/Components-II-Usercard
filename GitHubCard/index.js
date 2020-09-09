// eslint-disable-next-line no-unused-vars
import axios from 'axios';
// import gsap from 'gsap';

const log=console.log;
/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/
// axios.get("https://api.github.com/users/ChadDiaz")
//   .then((successResponse) => {
//     log('success!' , successResponse);
//   })
//   .catch((errorResponse) => {
//     log('error!' , errorResponse);
//   })
/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3.
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/
axios.get("https://api.github.com/users/ChadDiaz")
  .then((successResponse) => {
    log('success!' , successResponse);
    document.querySelector('.cards')
    .appendChild(gitCard(successResponse.data))
  })
  .catch((errorResponse) => {
    log('error!' , errorResponse);
  })
/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

const followersArray = [];
axios.get("https://api.github.com/users/chaddiaz/followers")
  .then((firstResponse) => {
    log('firstResponse', firstResponse)
    firstResponse.data.map((item) => {
    followersArray.push(item.login);
    });
    return followersArray.concat([
      "ajablanco",
      "ORiveraJr84",
      "Jamakura",
      "sarahrosecooper"
    ]);
  })
  .then((followers) => {
    followers.map((follower) => {
      axios.get(`https://api.github.com/users/${follower}`)
        .then((secondResponse) => {
          log('secondResponse', secondResponse)
          document.querySelector(".cards")
          .appendChild(gitCard(secondResponse.data));
        })
        .catch((err) => {
          console.log(err);
        });
    });
  })
  .catch((err) => {
    log(err);
  })

/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/
const gitCard = (object) => {
  //creating elements SECTION
const card = document.createElement('div');
  const userImg = document.createElement('img');
  const cardInfo = document.createElement('div');
  const userName = document.createElement('h3');
  const userPname = document.createElement('p');
  const userLoc = document.createElement('p');
  const userProf = document.createElement('p');
  const profAtt = document.createElement('a');
  const followersP = document.createElement('p');
  const followingP = document.createElement('p');
  const biosP = document.createElement('p');

  //creating HTML structure SECTION
  card.append(userImg, cardInfo,);
  cardInfo.append(userName, userPname, userLoc, userProf, profAtt, followersP, followingP, biosP);
  userProf.append(profAtt);

  //adding classes SECTION
  card.classList.add('card');
  cardInfo.classList.add('card-info');
  userName.classList.add('name');
  userPname.classList.add('username')
  

  //adding text content SECTION
  userName.textContent = object.name;
  object.login !== null
    ? (userPname.textContent = object.login)
    : (userPname.textContent = "Not Available");
  userImg.src=object.avatar_url
    object.html_url !== null
    ? (profAtt.href = object.html_url)
    : (profAtt.href = "Not Available");
    profAtt.target = "_blank";  
  object.location !== null
    ? (userLoc.textContent = `Location: ${object.location}`)
    : (userLoc.textContent = `Location: Not Available`);
  userProf.textContent = `Profile: `;
  profAtt.target = "_blank";
  profAtt.textContent = object.html_url;
  object.html_url !== null
    ? (profAtt.href = object.html_url)
    : (profAtt.href = "Not Available");
  object.followers !== null
    ? (followersP.textContent = `Followers: ${object.followers}`)
    : (followersP.textContent = `Followers: Not Available`);
  object.followers !== null
    ? (followingP.textContent = `Following: ${object.following}`)
    : (followingP.textContent = `Following: Not Available`);
  object.bio !== null
    ? (biosP.textContent = `Bio: ${object.bio}`)
    : (biosP.textContent = `Bio: Not Available`);

return card;
}
/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/
