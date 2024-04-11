// Event listener for toggling dark mode
const toggleDarkModeButton = document.getElementById('toggleDarkMode');
toggleDarkModeButton.addEventListener('click', toggleDarkMode);

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}

// Event listener for searching members
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', searchMembers);

function searchMembers() {
  const searchTerm = searchInput.value.toLowerCase();
  fetchMembers().then(members => {
    const filteredMembers = members.filter(member =>
      member.name.toLowerCase().includes(searchTerm)
    );
    renderMembers(filteredMembers);
  });
}

// Fetch members from the json data
function fetchMembers() {
  return fetch('http://localhost:3000/members')
    .then(response => response.json())
    .catch(error => console.error('Error fetching members:', error));
}

// Render members in the UI
function renderMembers(members) {
  const memberList = document.getElementById('member-list');
  memberList.innerHTML = '';

  members.forEach(member => {
    const memberItem = document.createElement('li');
    memberItem.innerHTML = `
      <img src="${member.image}" alt="${member.name}">
      <div>
        <h3>${member.name}</h3>
        <p>Sex: ${member.sex}</p>
        <p>Occupation: ${member.occupation}</p>
        <p>Monthly Contributions: $${member.monthlyContributions}</p>
        <p>Joined Group: ${member.joinedGroup}</p>
        <p>Position: ${member.position}</p>
      </div>
    `;
    memberList.appendChild(memberItem);
  });
}

// Event listener for updating member list on page load
window.addEventListener('load', () => {
  fetchMembers().then(members => renderMembers(members));
});