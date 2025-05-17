// Update these with your actual GitHub username and repo name
const GITHUB_USERNAME = 'imrutunjaya';
const GITHUB_REPO = 'repository';

// This function fetches the content file for a given subject and topic key
function fetchTopicContent(subject, topicKey) {
  const fileExtension = '.md'; // or '.html' depending on your files
  const url = `https://${GITHUB_USERNAME}.github.io/${GITHUB_REPO}/${subject}/${topicKey}${fileExtension}`;

  return fetch(url)
    .then(response => {
      if (!response.ok) throw new Error('Failed to fetch topic content.');
      return response.text();
    });
}

// Modify your selectTopic function to fetch and display content dynamically
function selectTopic(subject, topicKey, title) {
  const contentContainer = document.getElementById('readingContent');
  const header = document.getElementById('appHeader');
  header.textContent = `${subject.charAt(0).toUpperCase() + subject.slice(1)} - ${title}`;
  // Show loading state
  contentContainer.innerHTML = 'Loading content...';

  fetchTopicContent(subject, topicKey)
    .then(content => {
      // If your files are markdown, parse to HTML using marked.js or similar
      if (fileExtension === '.md' && window.marked) {
        contentContainer.innerHTML = marked.parse(content);
      } else {
        contentContainer.innerHTML = content;
      }
      showReadingPage();
    })
    .catch(error => {
      contentContainer.innerHTML = `<p style="color:red;">${error.message}</p>`;
      showReadingPage();
    });
}

// Function to show the reading view and hide topic list
function showReadingPage() {
  document.getElementById('topicList').style.display = 'none';
  document.getElementById('readingPage').style.display = 'block';
}

// Function to go back to topic list and hide reading view
function showTopicList() {
  document.getElementById('readingPage').style.display = 'none';
  document.getElementById('topicList').style.display = 'block';
}
