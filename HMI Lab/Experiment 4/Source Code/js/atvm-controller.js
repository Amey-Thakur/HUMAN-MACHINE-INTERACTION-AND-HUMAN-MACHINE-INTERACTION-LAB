/*
    Experiment 4: ATVM Interface Design
    Author: Amey Thakur
    Batch: B3
    Roll No: 50
    Subject: Human Machine Interaction (CSL801)
    Date: 18/02/2022

    This AngularJS controller manages the state and logic for the ATVM.
    
    Functionality:
    - State Management: Tracks source station, destination, passenger count, and journey type.
    - Cost Calculation: Computes ticket price based on selected stations and passengers.
    - Localization: Includes a utility to transliterate numbers to Hindi.
    - Data Model: Contains a comprehensive list of Mumbai Metro stations with cost/time matrices.
*/

/**
 * Converts a number to its Hindi digit representation.
 * @param {number} num - The number to convert.
 * @returns {string} - The string representation in Hindi digits.
 */
function num2hindi(num) {
    var hnum = "०१२३४५६७८९";
    var trans = "";
    var copy = num;
    while (copy > 0.5) {
        var temp = copy % 10;
        trans = hnum.charAt(temp) + trans;
        copy = copy / 10;
    }
    return trans;
}

/**
 * Main Controller for the ATVM Application
 * @param {Object} $scope - The AngularJS scope object.
 */
function atvmController($scope) {
    // Initial State
    $scope.source = 5; // Default source station index (e.g., Andheri)
    $scope.noOfAdults = 1;
    $scope.noOfChildren = 0;
    $scope.selectedStation = 0;
    $scope.selectedMainStation = 0; // Default selected destination category

    $scope.title = "Mumbai Metro";
    $scope.returnTicket = false;

    // Utility: Create array of size N for ng-repeat (to show icons)
    $scope.range = function (num) {
        return new Array(num);
    }

    // Styling Helper: Gray out the source station in the list
    $scope.getSelectedStationStyle = function (index) {
        if ($scope.source == index) {
            return "grayed";
        } else {
            return "";
        }
    }

    // Styling Helper for Primary buttons (Groups)
    $scope.getSelectedStationStylePrimary = function (index) {
        if ($scope.source == index) {
            return "grayed";
        } else if ($scope.selectedStation == index) {
            return "btn-success";
        } else {
            return "";
        }
    }

    // Data Accessor
    $scope.getStation = function (index) {
        return $scope.stations[index].name;
    }

    // Action: Set destination station
    $scope.setSelectedStation = function (index) {
        // Find which 'Main Station' group this index belongs to
        for (var i = 0; i < $scope.mainStations.length; i++) {
            if ($scope.mainStations[i + 1] > index) {
                $scope.selectedMainStation = i;
                break;
            }
        }
        $scope.selectedStation = index;
    }

    // Action: Set main station group
    $scope.setSelectedMainStation = function (index) {
        $scope.selectedMainStation = index;
        $scope.selectedStation = $scope.mainStations[index];
    }

    // Helper: Dynamic subset of stations for the middle panel
    $scope.getSubstations = function (index) {
        var startIndex = $scope.mainStations[index];
        var endIndex = 0;
        // Determine end index based on next main station
        if (index + 1 == $scope.mainStations.length) {
            endIndex = -1; // Last group
        } else {
            endIndex = $scope.mainStations[index + 1] - 1;
        }

        if (endIndex == -1) {
            return [[$scope.stations[startIndex].name, startIndex]];
        } else {
            // Build array of [Name, Index] pairs
            var arr = new Array();
            for (var i = startIndex; i <= endIndex; i++) {
                arr.push([$scope.stations[i].name, i])
            }
            return arr;
        }
    }

    // Styling logic for Ticket Preview (Single/Return opacity)
    $scope.getSingleClass = function () {
        if (!$scope.returnTicket)
            return "";
        else
            return "opaque";
    }

    $scope.getReturnClass = function () {
        if (!$scope.returnTicket)
            return "opaque";
        else
            return "";
    }

    // Styling logic for visualized passengers
    $scope.getPersonClass = function (index, number) {
        if (index < number) {
            return "";
        } else {
            return "opaque";
        }
    }

    // State Modifiers
    $scope.setNoOfAdults = function (num) {
        $scope.noOfAdults = num;
    }
    $scope.setNoOfChildren = function (num) {
        $scope.noOfChildren = num;
    }

    // UI Helpers (Increment/Decrement)
    $scope.addAdult = function (val) {
        var newValue = $scope.noOfAdults + val;
        if (newValue >= 1 && newValue <= 10) { // Limit reasonable passengers
            $scope.noOfAdults = newValue;
        }
    }

    $scope.addChild = function (val) {
        var newValue = $scope.noOfChildren + val;
        if (newValue >= 0 && newValue <= 10) {
            $scope.noOfChildren = newValue;
        }
    }

    // Core Logic: Calculate Total Cost
    $scope.getCost = function () {
        // Use cost matrix: stations[source].costs[destination]
        var unitCost = $scope.stations[$scope.source].costs[$scope.selectedStation];
        if ($scope.returnTicket) {
            // Example logic: Return might be double or discounted, assuming simple double here if not specified differently
            // But usually return is unitCost * 2
            unitCost = unitCost * 2;
        }
        return unitCost;
        // Logic for total display including passengers is handled in HTML binding or separate formatted function
    }

    $scope.printTicket = function () {
        alert("Ticket Printed Successfully! \nDestination: " + $scope.stations[$scope.selectedStation].name + "\nCost: " + ($scope.getCost() * ($scope.noOfAdults + $scope.noOfChildren)) + " Rs");
    }

    // Total Display Helper (with Hindi translation)
    $scope.getTotal = function (dest, ret, ad, ch) {
        var total = 0;
        total = $scope.stations[$scope.source].costs[dest];
        if (ret) {
            total = total * 2;
        }
        total = total * ad + total * ch * 0.5; // Children half price logic? (From original code likely)
        return total + " (= " + num2hindi(total) + ")";
    }

    // Main hub indices for grouping UI
    $scope.mainStations = [0, 5, 9, 12, 16, 20];

    // Data: Stations, Hindi names, Cost Matrix, Time Matrix
    $scope.stations = [
        {
            "name": "Borivali",
            "devng": "बोरिवली",
            "costs": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
            "time": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
        },
        {
            "name": "Kandivali",
            "devng": "कांदिवली",
            "costs": [1, 0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
            "time": [1, 0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
        },
        {
            "name": "Malad",
            "devng": "मालाड",
            "costs": [1, 2, 0, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
            "time": [1, 2, 0, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
        },
        {
            "name": "Goregaon",
            "devng": "गोरेगाव",
            "costs": [1, 2, 3, 0, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
            "time": [1, 2, 3, 0, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 2]
        },
        {
            "name": "Jogeshwari",
            "devng": "जोगेश्वरी",
            "costs": [1, 2, 3, 4, 0, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
            "time": [1, 2, 3, 4, 0, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
        },
        {
            "name": "Andheri",
            "devng": "अंधेरी",
            "costs": [1, 2, 3, 4, 5, 0, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
            "time": [1, 2, 3, 4, 5, 0, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
        },
        {
            "name": "Vile Parle",
            "devng": "विले पार्ले",
            "costs": [1, 2, 3, 4, 5, 6, 0, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
            "time": [1, 2, 3, 4, 5, 6, 0, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
        },
        {
            "name": "Santacruz",
            "devng": "सांताक्रुज़",
            "costs": [0, 1, 2, 3, 4, 5, 6, 7, 0, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
            "time": [0, 1, 2, 3, 4, 5, 6, 7, 0, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
        },
        {
            "name": "Khar Road",
            "devng": "खार रोड",
            "costs": [1, 2, 3, 4, 5, 6, 7, 8, 0, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
            "time": [1, 2, 3, 4, 5, 6, 7, 8, 0, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
        },
        {
            "name": "Bandra",
            "devng": "बान्दरा",
            "costs": [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
            "time": [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
        },
        {
            "name": "Mahim",
            "devng": "माहिम",
            "costs": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 0, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
            "time": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 0, 11, 12, 13, 14, 15, 16, 17, 18, 19, 2]
        },
        {
            "name": "Matunga",
            "devng": "माहिम",
            "costs": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 12, 13, 14, 15, 16, 17, 18, 19, 20],
            "time": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 12, 13, 14, 15, 16, 17, 18, 19, 20]
        },
        {
            "name": "Dadar",
            "devng": "दादर",
            "costs": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 0, 13, 14, 15, 16, 17, 18, 19, 20],
            "time": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 0, 13, 14, 15, 16, 17, 18, 19, 20]
        },
        {
            "name": "Elphinstone Road",
            "devng": "एल्फिन्स्टन रोड",
            "costs": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 0, 14, 15, 16, 17, 18, 19, 20],
            "time": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 0, 14, 15, 16, 17, 18, 19, 20]
        },
        {
            "name": "Lower Parel",
            "devng": "लोअर परेल",
            "costs": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 0, 15, 16, 17, 18, 19, 20],
            "time": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 0, 15, 16, 17, 18, 19, 20]
        },
        {
            "name": "Mahalakshmi",
            "devng": "महालक्ष्मी",
            "costs": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0, 16, 17, 18, 19, 20],
            "time": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0, 16, 17, 18, 19, 2]
        },
        {
            "name": "Mumbai Cent",
            "devng": "मुम्बई सेंट्रल",
            "costs": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 0, 17, 18, 19, 20],
            "time": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 0, 17, 18, 19, 20]
        },
        {
            "name": "Grant Road",
            "devng": "ग्रँट रोड",
            "costs": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 0, 18, 19, 20],
            "time": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 0, 18, 19, 20]
        },
        {
            "name": "Charni Road",
            "devng": "चर्नी रोड",
            "costs": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 0, 19, 20],
            "time": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 0, 19, 2]
        },
        {
            "name": "Marine Lines",
            "devng": "मरीन लाइन्स",
            "costs": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 0, 20],
            "time": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 0, 20]
        },
        {
            "name": "Churchgate",
            "devng": "चर्चगेट",
            "costs": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 0],
            "time": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 0]
        }

    ];
}