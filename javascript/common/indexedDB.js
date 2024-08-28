// indexedDB.js

// Open or create an IndexedDB database

const dbName = "myDatabase";
let db;

const request = window.indexedDB.open(dbName, 1);

request.onerror = function(event) {
  // Handle errors when opening the database
  alert(event.target.error);
  console.error("Database error: " + event.target.errorCode);
};

request.onupgradeneeded = function(event) {
  // Create an object store for this database
  db = event.target.result;
  let objectStore;

  if (!db.objectStoreNames.contains('data')) {
    objectStore = db.createObjectStore("data", {keyPath: "id"});
  }
};

request.onsuccess = function(event) {
  db = event.target.result;
  // Now you can run transactions on the database
};

// Helper function to add or update data
function storeData(key, newData) {
    const transaction = db.transaction(["data"], "readwrite");
    const objectStore = transaction.objectStore("data");
    const request = objectStore.get(key);

    request.onsuccess = function(event) {
        const now = Date.now();
        let data = event.target.result;
        const twoDaysInMs = 2 * 24 * 60 * 60 * 1000; // 2 days in milliseconds

        if (data) {
            // Update only if the last updated time is more than two days
            const lastUpdated = data.lastUpdated || 0;
            if (now - lastUpdated > twoDaysInMs){
                data.value = newData; // Your new data to store
                data.lastUpdated = now; // Update lastUpdated to current timestamp
                objectStore.put(data);
                alert("Data updated as it was older than 2 days.");
            } else {
                alert("Data is less than 2 days old and was not updated.");
            }
        } else {
            // If no existing data, add new data
            objectStore.add({ id: key, value: newData, lastUpdated: now });
            console.log("New data added.");
        }
    };

    request.onerror = function(event) {
        console.error("Could not retrieve data:", event.target.errorCode);
    };

    transaction.oncomplete = function() {
        console.log("Transaction completed successfully.");
    }

    transaction.onerror = function(event) {
        console.error("Transaction error:", event.target.errorCode);
    }
  }

// Helper function to retrieve data
function readData(id, callback) {
    const transaction = db.transaction(["data"]);
    const objectStore = transaction.objectStore("data");
    const request = objectStore.get(id);
  
    request.onerror = function(event) {
        console.error("Read transaction error:", event.target.errorCode);
        callback(null, event.target.error); // indicates error
    };

    request.onsuccess = function(event) {
        const result = event.target.result;
        callback(result ? result.value : null, null); // return result if available
    };
  }
  
