document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('filter-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const minFollowers = parseInt(document.getElementById('min-followers').value) || 0;
        const maxFollowers = parseInt(document.getElementById('max-followers').value) || Infinity;
        const keyword = document.getElementById('keyword').value.toLowerCase();

        fetch('user_info.json')
            .then(response => response.json())
            .then(data => {
                const filteredResults = data.filter(item => {
                    const followers = item.user_profile.tiktok_followers;
                    const bio = item.user_profile.tiktok_bio.toLowerCase();

                    return followers >= minFollowers &&
                           followers <= maxFollowers &&
                           (keyword === '' || bio.includes(keyword));
                });
                displayResults(filteredResults);
            })
            .catch(error => console.error('Error fetching JSON:', error));
    });
});

function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>No results found.</p>';
        return;
    }

    results.forEach(item => {
        const profileElement = document.createElement('div');
        profileElement.classList.add('profile');
        profileElement.innerHTML = `
            <h3>${item.user_profile.name}</h3>
            <p>Followers: ${item.user_profile.tiktok_followers}</p>
            <p>Bio: ${item.user_profile.tiktok_bio}</p>
        `;
        resultsContainer.appendChild(profileElement);
    });
}