// indexedDB.js

// Open or create an IndexedDB database

const dbName = "myDatabase";
let db;

// Function to open the database and return a promise
function openDatabase() {
    return new Promise((resolve, reject) => {
        if (db) {
            // If db is already open, resolve immediately
            resolve(db);
            return;
        }

        const request = window.indexedDB.open(dbName, 1);

        request.onerror = function(event) {
            console.error("Database error: " + event.target.errorCode);
            reject(event.target.errorCode);
        };

        request.onupgradeneeded = function(event) {
            db = event.target.result;
            if (!db.objectStoreNames.contains('data')) {
                db.createObjectStore("data", { keyPath: "id" });
            }
        };

        request.onsuccess = function(event) {
            db = event.target.result;
            resolve(db);
        };
    });
}

function storeData(key, data) {
    openDatabase().then(db => {
        const transaction = db.transaction(["data"], "readwrite");

        transaction.oncomplete = function(event) {
            console.log("Transaction completed!");
        };

        transaction.onerror = function(event) {
            console.error("Transaction error: " + event.target.errorCode);
        };

        const now = Date.now();
        const objectStore = transaction.objectStore("data");
        // Use put instead of add to update existing entries
        objectStore.put({id: key, value: data, lastUpdated: now}); // Use a unique ID for each entry
    }).catch(error => {
        console.error("Database open error: " + error);
    });
}

// Helper function to retrieve data
function readData(id, dateLimit, callback) {
    openDatabase().then(db => {
        const transaction = db.transaction(["data"]);
        const objectStore = transaction.objectStore("data");
        const request = objectStore.get(id);
    
        request.onerror = function(event) {
            console.error("Read transaction error:", event.target.errorCode);
            callback(null, event.target.error); // indicates error
        };

        request.onsuccess = function(event) {
            const result = event.target.result;
            const now = Date.now();
            if (dateLimit === null) {
                dateLimit = 2;//2 * 24 * 60 * 60 * 1000; // 2 days in milliseconds
            }

            if (result) {
                const lastUpdated = result.lastUpdated || 0;
                if (now - lastUpdated > dateLimit){
                    console.log();("Data is older than dateLimit!!");
                    callback(null, null); // return result as null
                } else {
                    console.log();("Data is less than dateLimit :)");
                    callback(result.value, null); // return result value
                }
            } else {
                callback(null, null); // return null
            }
        };
    }).catch(error => {
        console.error("Database open error: " + error);
    });
  }
