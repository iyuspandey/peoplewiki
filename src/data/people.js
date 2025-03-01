// ...existing code...

async function fetchData() {
  try {
    const response = await fetch('http://localhost:4000/api/people');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    processFetchedData(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function processFetchedData(data) {
  // Process the fetched data
  console.log(data);
  // ...existing code to handle the data...
}

fetchData();

// ...existing code...
