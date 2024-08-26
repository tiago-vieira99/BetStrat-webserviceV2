// indexedDB.js

// Open or create an IndexedDB database
var db;
var request = indexedDB.open("MyDatabase", 1);

request.onerror = function(event) {
    console.log("Error opening IndexedDB:", event);
};

request.onsuccess = function(event) {
    db = event.target.result;
};

request.onupgradeneeded = function(event) {
    db = event.target.result;
    // Create object stores if they do not exist
    var teamsStore = db.createObjectStore("teams", { keyPath: "id" });
    // Add additional object stores if necessary
};

// Helper function to add or update data
function saveToIndexedDB(storeName, data) {
    return new Promise((resolve, reject) => {
        var transaction = db.transaction([storeName], "readwrite");
        var store = transaction.objectStore(storeName);
        var request = store.put(data);

        request.onsuccess = function() {
            resolve();
        };

        request.onerror = function(event) {
            reject(event);
        };
    });
}

// Helper function to retrieve data
function getFromIndexedDB(storeName, key) {
    return new Promise((resolve, reject) => {
        var transaction = db.transaction([storeName], "readonly");
        var store = transaction.objectStore(storeName);
        var request = store.get(key);

        request.onsuccess = function(event) {
            resolve(request.result);
        };

        request.onerror = function(event) {
            reject(event);
        };
    });
}

// Helper function to delete data
function deleteFromIndexedDB(storeName, key) {
    return new Promise((resolve, reject) => {
        var transaction = db.transaction([storeName], "readwrite");
        var store = transaction.objectStore(storeName);
        var request = store.delete(key);

        request.onsuccess = function() {
            resolve();
        };

        request.onerror = function(event) {
            reject(event);
        };
    });
}

// Export functions for use in other files
//export { saveToIndexedDB, getFromIndexedDB, deleteFromIndexedDB };
