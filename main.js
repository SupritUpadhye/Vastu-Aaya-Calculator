// Hiding Inspect
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

// Disable keys for inspect
document.onkeydown = function(e) {
    if (e.keyCode == 123) { // F12
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false; // Ctrl+Shift+I
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false; // Ctrl+Shift+J
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false; // Ctrl+U
    }
}
  


// Loader animation
document.addEventListener("DOMContentLoaded", function() {
    const loader = document.getElementById("loader");
    
    const content1 = document.getElementById("first-page-content");
    const content2 = document.getElementById('content-to-print');
    const content3 = document.getElementById('grah-melan-chart');
    const content4 = document.getElementById('ghatit-info');

    const footer = document.getElementById("footer");

    function hideLoaderAndShowContent() {
        loader.classList.add("d-none"); // Hide the loader
        content1.classList.remove("d-none"); // Show the main content
        content2.classList.remove("d-none");
        content3.classList.remove("d-none");
        content4.classList.remove("d-none");
        footer.classList.remove("d-none");

        // Load the main background image after content is displayed
        const mainBgImage = new Image();
        mainBgImage.src = 'images/vastushastra-bannner2.jpg';
        mainBgImage.onload = function() {
            document.body.classList.add('bg-loaded'); // Add the main background image
        };
    }

    function showLoaderForMinimumTime() {
        const minimumLoaderTime = 500; // 2 seconds
        const start = Date.now();

        window.addEventListener("load", function() {
            const elapsed = Date.now() - start;
            const remainingTime = Math.max(minimumLoaderTime - elapsed, 0);

            setTimeout(hideLoaderAndShowContent, remainingTime);
        });
    }

    // Initially hide content and show loader
    content1.classList.add("d-none");
    content2.classList.add("d-none");
    content3.classList.add("d-none");
    content4.classList.add("d-none");
    footer.classList.add("d-none");

    showLoaderForMinimumTime();
});

// Function to set date and time 
function displayDateTime(){
    let currentDate = new Date()
    
    document.getElementById('date').innerText = currentDate.toDateString()
    document.getElementById('time').innerText = currentDate.toLocaleTimeString()

}

setInterval(displayDateTime, 1000);
displayDateTime();


// Formula and calculations
function parseFeetInches(value) {
    const parts = value.split('.');
    const feet = parseFloat(parts[0]);
    const inches = parts.length > 1 ? parseFloat(parts[1]) : 0;

    return feet + (inches / 12);
}

function isValidInput(value) {
    const regex = /^\d+(\.\d+)?$/;
    return regex.test(value);
}

function calculateArea(event) {
    event.preventDefault();

    const length = document.getElementById('length').value.trim();
    const width = document.getElementById('width').value.trim();

    if (!isValidInput(length) || !isValidInput(width)) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please enter valid numeric values for length and width.",
        });
        return;
    }

    const lengthInFeet = parseFeetInches(length);
    const widthInFeet = parseFeetInches(width);

    const area = lengthInFeet * widthInFeet;
    const roundArea = Math.ceil(area);

    document.getElementById('area').innerText = area.toFixed(2);

    calculatePind(roundArea);
}

// Event listener for the form submission
document.querySelector('form').addEventListener('submit', calculateArea);

// Calculate Pind
function calculatePind(roundArea) {

    const pindAaya = roundArea * 9
    const pindVaar = roundArea * 9

    const pindDhan = roundArea * 8
    const pindTithi = roundArea * 8
    const pindNakshatra = roundArea * 8
    const pindAayu = roundArea * 8

    const pindRoon = roundArea * 3
    const pindYog = roundArea * 4
    const pindAnsh = roundArea * 6

    document.getElementById('pind-aaya').innerHTML = pindAaya
    document.getElementById('pind-vaar').innerHTML = pindVaar

    document.getElementById('pind-dhan').innerHTML = pindDhan
    document.getElementById('pind-tithi').innerHTML = pindTithi
    document.getElementById('pind-nakshatra').innerHTML = pindNakshatra
    document.getElementById('pind-aayu').innerHTML = pindAayu


    document.getElementById('pind-roon').innerHTML = pindRoon
    document.getElementById('pind-yog').innerHTML = pindYog
    document.getElementById('pind-ansh').innerHTML = pindAnsh

    calculateVargSankhya(pindAaya, pindVaar, pindDhan, pindTithi, pindNakshatra, pindAayu, pindRoon, pindYog, pindAnsh);
}

// Calculate Varg
function calculateVargSankhya(pindAaya, pindVaar, pindDhan, pindTithi, pindNakshatra, pindAayu, pindRoon, pindYog, pindAnsh) {
    const vargAaya = pindAaya % 8
    const vargVaar = pindVaar % 7

    const vargDhan = pindDhan % 12
    const vargTithi = pindTithi % 15
    const vargNakshatra = pindNakshatra % 27
    const vargAayu = pindAayu % 120

    const vargRoon = pindRoon % 8
    const vargYog = pindYog % 27
    const vargAnsh = pindAnsh % 9

    document.getElementById('varg-aaya').innerHTML = vargAaya;
    document.getElementById('varg-vaar').innerHTML = vargVaar;

    document.getElementById('varg-dhan').innerHTML = vargDhan;
    document.getElementById('varg-tithi').innerHTML = vargTithi;
    document.getElementById('varg-nakshatra').innerHTML = vargNakshatra;
    document.getElementById('varg-aayu').innerHTML = vargAayu;


    document.getElementById('varg-roon').innerHTML = vargRoon;
    document.getElementById('varg-yog').innerHTML = vargYog;
    document.getElementById('varg-ansh').innerHTML = vargAnsh;

    calculateAayadi(vargAaya, vargVaar, vargDhan, vargTithi, vargNakshatra, vargRoon, vargYog, vargAnsh);
    checkShubhashubh(vargAaya, vargVaar, vargDhan, vargTithi, vargNakshatra, vargRoon, vargYog, vargAnsh, vargAayu)
}

// Calculate Aayadi
//using objects for mapping through each parameter 
let nakshatraName;

function calculateAayadi(vargAaya, vargVaar, vargDhan, vargTithi, vargNakshatra, vargRoon, vargYog, vargAnsh) {
    // Mapping objects for each category
    const aayaMap = {
        0: "काक", 1: "ध्वज", 2: "धूम", 3: "सिंह",
        4: "श्वान", 5: "वृषभ", 6: "खर", 7: "गज"
    };

    const dhanMap = {
        0: 12, 1: 1, 2: 2, 3: 3, 4: 4, 5: 0, 6: 6,
        7: 7, 8: 8, 9: 9, 10: 10, 11: 11
    };

    const roonMap = {
        0: 8, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7
    };

    const vaarMap = {
        0: "शनिवार", 1: "रविवार", 2: "सोमवार", 3: "मंगळवार",
        4: "बुधवार", 5: "गुरुवार", 6: "शुक्रवार"
    };

    const tithiMap = {
        0: "पोर्णिमा",
        1: "प्रतिपदा",
        2: "द्वितीया",
        3: "तृतीया",
        4: "चतुर्थी",
        5: "पंचमी",
        6: "षष्ठी",
        7: "सप्तमी",
        8: "अष्टमी",
        9: "नवमी",
        10: "दशमी",
        11: "एकादशी",
        12: "द्वादशी",
        13: "त्रयोदशी",
        14: "चतुर्दशी"
    };


    const nakshatraMap = {
        0: "रेवती", 1: "अश्विनी", 2: "भरणी", 3: "कृतिका", 4: "रोहिणी",
        5: "मृग", 6: "आर्द्रा", 7: "पुनर्वसू", 8: "पुष्य", 9: "आश्लेषा",
        10: "मघा", 11: "पूर्वा", 12: "उत्तरा", 13: "हस्त", 14: "चित्रा",
        15: "स्वाती", 16: "विशाखा", 17: "अनुराधा", 18: "जेष्ठा", 19: "मूळ",
        20: "पूर्वाषाढा", 21: "उत्तराषाढा", 22: "श्रवण", 23: "धनिष्ठा",
        24: "शततारका", 25: "पूर्वा भाद्रपदा", 26: "उत्तरा भाद्रपदा"
    };

    const yogMap = {
        0: "वैधृती", 1: "विष्कम्भ", 2: "प्रीति", 3: "आयुष्यमान", 4: "सौभाग्य",
        5: "शोभन", 6: "अतिगंड", 7: "सुकर्मा", 8: "धृति", 9: "शूल",
        10: "गंड", 11: "वृद्धी", 12: "ध्रुव", 13: "व्याघात", 14: "हर्षण",
        15: "वज्र", 16: "सिद्धी", 17: "व्यतिपात", 18: "वरीयान", 19: "परीघ",
        20: "शिव", 21: "सिद्ध", 22: "साध्य", 23: "शुभ", 24: "शुक्ल",
        25: "ब्रम्हा", 26: "ऐंद्र"
    };

    const anshMap = {
        0: "शुक्र", 1: "सूर्य", 2: "चंद्र", 3: "मंगळ", 4: "राहू",
        5: "गुरु", 6: "शनि", 7: "बुध", 8: "केतू"
    };

    // Update elements with corresponding values from the maps
    document.getElementById('aayadi-aaya').innerHTML = aayaMap[vargAaya] || '';
    document.getElementById('aayadi-dhan').innerHTML = dhanMap[vargDhan] || '';
    document.getElementById('aayadi-roon').innerHTML = roonMap[vargRoon] || '';
    document.getElementById('aayadi-vaar').innerHTML = vaarMap[vargVaar] || '';
    document.getElementById('aayadi-tithi').innerHTML = tithiMap[vargTithi] || '';
    document.getElementById('aayadi-nakshatra').innerHTML = nakshatraMap[vargNakshatra] || '';
    document.getElementById('aayadi-yog').innerHTML = yogMap[vargYog] || '';
    document.getElementById('aayadi-ansh').innerHTML = anshMap[vargAnsh] || '';


    document.querySelectorAll('.gruh-nakshatra').forEach(element => {
        element.innerHTML = nakshatraMap[vargNakshatra] || '';
    });

    nakshatraName = nakshatraMap[vargNakshatra];
   
    grahNakshatra(nakshatraName);
}


// caculate shubh and ashubh fal
function checkShubhashubh(vargAaya, vargVaar, vargDhan, vargTithi, vargNakshatra, vargRoon, vargYog, vargAnsh, vargAayu) {
    let aayaElement = document.getElementById('shubhashubh-aaya');
    let dhanElement = document.getElementById('shubhashubh-dhan');
    let vaarElement = document.getElementById('shubhashubh-vaar');
    let tithiElement = document.getElementById('shubhashubh-tithi');
    let nakshatraElement = document.getElementById('shubhashubh-nakshatra');
    let yogElement = document.getElementById('shubhashubh-yog');
    let anshElement = document.getElementById('shubhashubh-ansh');
    let aayuElement = document.getElementById('shubhashubh-aayu');

    function updateElement(element, condition, positiveClasses, negativeClasses, positiveText, negativeText) {
        element.classList.remove(...positiveClasses.split(' '), ...negativeClasses.split(' '));
        if (condition) {
            element.innerHTML = positiveText;
            element.classList.add(...positiveClasses.split(' '));
        } else {
            element.innerHTML = negativeText;
            element.classList.add(...negativeClasses.split(' '));
        }
    }

    // Update Aaya
    updateElement(
        aayaElement,
        vargAaya % 2 !== 0,
        'text-success',
        'text-danger',
        "शुभ",
        "अशुभ"
    );

    // Update Dhan
    updateElement(
        dhanElement,
        vargDhan > vargRoon || vargDhan === 0,
        'text-success',
        'text-danger',
        "Income",
        "Loss"
    );

    // Update Vaar
    updateElement(
        vaarElement,
        vargVaar == 1 || vargVaar == 3 || vargVaar == 0,
        'text-danger',
        'text-success',
        "अशुभ",
        "शुभ"
    );

    // Update Tithi
    updateElement(
        tithiElement,
        vargTithi == 4 || vargTithi == 9 || vargTithi == 14,
        'text-danger',
        'text-success',
        "अशुभ",
        "शुभ"
    );

    // Update Nakshatra
    updateElement(
        nakshatraElement,
        vargNakshatra == 3 || vargNakshatra == 9 || vargNakshatra == 16 || vargNakshatra == 18 || vargNakshatra == 19,
        'text-danger',
        'text-success',
        "अशुभ",
        "शुभ"
    );

    // Update Yog
    updateElement(
        yogElement,
        vargYog == 1 || vargYog == 6 || vargYog == 9 || vargYog == 10 || vargYog == 13 || vargYog == 15 || vargYog == 17 || vargYog == 0,
        'text-danger',
        'text-success',
        "अशुभ",
        "शुभ"
    );

    // Update Ansh
    updateElement(
        anshElement,
        vargAnsh == 1 || vargAnsh == 3 || vargAnsh == 4 || vargAnsh == 6 || vargAnsh == 8,
        'text-danger',
        'text-success',
        "अशुभ",
        "शुभ"
    );

    //update aayu
    updateElement(
        aayuElement,
        vargAayu < 40,
        'text-danger',
        'text-warning',
        'अशुभ',
        vargAayu < 80 ? 'मध्यम' : 'उत्तम'
    );

    if (vargAayu >= 80) {
        aayuElement.innerHTML = 'उत्तम';
        aayuElement.classList.remove('text-danger', 'text-warning');
        aayuElement.classList.add('text-success');
    }
}


// Client Nakshatra - Options and display यजमान
// declaring global variables to access globally
let clientNadi;
let yoni;
let gan;
let rashi;
let swami;
let grahNakshatraValue;
function clientNakshatra() {
    const options = [
        "जन्म नक्षत्र निवडा", "अश्विनी", "भरणी", "कृतिका 1", "कृतिका 2-3-4", "रोहिणी", "मृग 1-2", "मृग 3-4",
        "आर्द्रा", "पुनर्वसू 1-2-3", "पुनर्वसू 4", "पुष्य", "आश्लेषा", "मघा", "पूर्वा फा.",
        "उत्तरा फा. 1", "उत्तरा फा. 2-3-4", "हस्त", "चित्रा 1-2", "चित्रा 3-4", "स्वाती",
        "विशाखा 1-2-3", "विशाखा 4", "अनुराधा", "जेष्ठा", "मूळ", "पूर्वाषाढा", "उत्तराषाढा 1",
        "उत्तराषाढा 2-3-4", "श्रवण", "धनिष्ठा 1-2", "धनिष्ठा 3-4", "शततारका", "पूर्वा भाद्रपदा 1-2-3",
        "पूर्वा भाद्रपदा 4", "उत्तरा भाद्रपदा", "रेवती"
    ];

    const nakshatraData = {
        "अश्विनी": {
            "नाडी": "आद्य",
            "योनि": "अश्व",
            "गण": "देव",
            "राशी": "मेष",
            "स्वामी": "मंगळ",
            "क्र": 1
        },
        "भरणी": {
            "नाडी": "मध्य",
            "योनि": "गज",
            "गण": "मनुष्य",
            "राशी": "मेष",
            "स्वामी": "मंगळ",
            "क्र": 2
        },
        "कृतिका 1": {
            "नाडी": "अंत्य",
            "योनि": "मेष",
            "गण": "राक्षस",
            "राशी": "मेष",
            "स्वामी": "मंगळ",
            "क्र": 3
        },
        "कृतिका 2-3-4": {
            "नाडी": "अंत्य",
            "योनि": "मेष",
            "गण": "राक्षस",
            "राशी": "वृषभ",
            "स्वामी": "शुक्र",
            "क्र": 3
        },
        "रोहिणी": {
            "नाडी": "अंत्य",
            "योनि": "सर्प",
            "गण": "मनुष्य",
            "राशी": "वृषभ",
            "स्वामी": "शुक्र",
            "क्र": 4
        },
        "मृग 1-2": {
            "नाडी": "मध्य",
            "योनि": "सर्प",
            "गण": "देव",
            "राशी": "वृषभ",
            "स्वामी": "शुक्र",
            "क्र": 5
        },
        "मृग 3-4": {
            "नाडी": "मध्य",
            "योनि": "सर्प",
            "गण": "देव",
            "राशी": "मिथुन",
            "स्वामी": "बुध",
            "क्र": 5
        },
        "आर्द्रा": {
            "नाडी": "आद्य",
            "योनि": "श्वान",
            "गण": "मनुष्य",
            "राशी": "मिथुन",
            "स्वामी": "बुध",
            "क्र": 6
        },
        "पुनर्वसू 1-2-3": {
            "नाडी": "आद्य",
            "योनि": "मार्जार",
            "गण": "देव",
            "राशी": "मिथुन",
            "स्वामी": "बुध",
            "क्र": 7
        },
        "पुनर्वसू 4": {
            "नाडी": "आद्य",
            "योनि": "मार्जार",
            "गण": "देव",
            "राशी": "कर्क",
            "स्वामी": "चंद्र",
            "क्र": 7
        },
        "पुष्य": {
            "नाडी": "मध्य",
            "योनि": "मेष",
            "गण": "देव",
            "राशी": "कर्क",
            "स्वामी": "चंद्र",
            "क्र": 8
        },
        "आश्लेषा": {
            "नाडी": "अंत्य",
            "योनि": "मार्जार",
            "गण": "राक्षस",
            "राशी": "कर्क",
            "स्वामी": "चंद्र",
            "क्र": 9
        },
        "मघा": {
            "नाडी": "अंत्य",
            "योनि": "उंदीर",
            "गण": "राक्षस",
            "राशी": "सिंह",
            "स्वामी": "सूर्य",
            "क्र": 10
        },
        "पूर्वा फा.": {
            "नाडी": "मध्य",
            "योनि": "उंदीर",
            "गण": "मनुष्य",
            "राशी": "सिंह",
            "स्वामी": "सूर्य",
            "क्र": 11
        },
        "उत्तरा फा. 1": {
            "नाडी": "आद्य",
            "योनि": "गो",
            "गण": "मनुष्य",
            "राशी": "सिंह",
            "स्वामी": "सूर्य",
            "क्र": 12
        },
        "उत्तरा फा. 2-3-4": {
            "नाडी": "आद्य",
            "योनि": "गो",
            "गण": "मनुष्य",
            "राशी": "कन्या",
            "स्वामी": "बुध",
            "क्र": 12
        },
        "हस्त": {
            "नाडी": "आद्य",
            "योनि": "महिषी",
            "गण": "देव",
            "राशी": "कन्या",
            "स्वामी": "बुध",
            "क्र": 13
        },
        "चित्रा 1-2": {
            "नाडी": "मध्य",
            "योनि": "व्याघ्र",
            "गण": "राक्षस",
            "राशी": "कन्या",
            "स्वामी": "बुध",
            "क्र": 14
        },
        "चित्रा 3-4": {
            "नाडी": "मध्य",
            "योनि": "व्याघ्र",
            "गण": "राक्षस",
            "राशी": "तुळ",
            "स्वामी": "शुक्र",
            "क्र": 14
        },
        "स्वाती": {
            "नाडी": "अंत्य",
            "योनि": "महिषी",
            "गण": "देव",
            "राशी": "तुळ",
            "स्वामी": "शुक्र",
            "क्र": 15
        },
        "विशाखा 1-2-3": {
            "नाडी": "अंत्य",
            "योनि": "व्याघ्र",
            "गण": "राक्षस",
            "राशी": "तुळ",
            "स्वामी": "शुक्र",
            "क्र": 16
        },
        "विशाखा 4": {
            "नाडी": "अंत्य",
            "योनि": "व्याघ्र",
            "गण": "राक्षस",
            "राशी": "वृश्चिक",
            "स्वामी": "मंगळ",
            "क्र": 16
        },
        "अनुराधा": {
            "नाडी": "मध्य",
            "योनि": "मृग",
            "गण": "देव",
            "राशी": "वृश्चिक",
            "स्वामी": "मंगळ",
            "क्र": 17
        },
        "जेष्ठा": {
            "नाडी": "आद्य",
            "योनि": "मृग",
            "गण": "राक्षस",
            "राशी": "वृश्चिक",
            "स्वामी": "मंगळ",
            "क्र": 18
        },
        "मूळ": {
            "नाडी": "आद्य",
            "योनि": "श्वान",
            "गण": "राक्षस",
            "राशी": "धनु",
            "स्वामी": "गुरु",
            "क्र": 19
        },
        "पूर्वाषाढा": {
            "नाडी": "मध्य",
            "योनि": "वानर",
            "गण": "मनुष्य",
            "राशी": "धनु",
            "स्वामी": "गुरु",
            "क्र": 20
        },
        "उत्तराषाढा 1": {
            "नाडी": "अंत्य",
            "योनि": "मुंगुस",
            "गण": "मनुष्य",
            "राशी": "धनु",
            "स्वामी": "गुरु",
            "क्र": 21
        },
        "उत्तराषाढा 2-3-4": {
            "नाडी": "अंत्य",
            "योनि": "मुंगुस",
            "गण": "मनुष्य",
            "राशी": "मकर",
            "स्वामी": "शनि",
            "क्र": 21
        },
        "श्रवण": {
            "नाडी": "अंत्य",
            "योनि": "वानर",
            "गण": "देव",
            "राशी": "मकर",
            "स्वामी": "शनि",
            "क्र": 22
        },
        "धनिष्ठा 1-2": {
            "नाडी": "मध्य",
            "योनि": "सिंह",
            "गण": "राक्षस",
            "राशी": "मकर",
            "स्वामी": "शनि",
            "क्र": 23
        },
        "धनिष्ठा 3-4": {
            "नाडी": "मध्य",
            "योनि": "सिंह",
            "गण": "राक्षस",
            "राशी": "कुंभ",
            "स्वामी": "शनि",
            "क्र": 23
        },
        "शततारका": {
            "नाडी": "आद्य",
            "योनि": "अश्व",
            "गण": "राक्षस",
            "राशी": "कुंभ",
            "स्वामी": "शनि",
            "क्र": 24
        },
        "पूर्वा भाद्रपदा 1-2-3": {
            "नाडी": "आद्य",
            "योनि": "सिंह",
            "गण": "मनुष्य",
            "राशी": "कुंभ",
            "स्वामी": "शनि",
            "क्र": 25
        },
        "पूर्वा भाद्रपदा 4": {
            "नाडी": "आद्य",
            "योनि": "सिंह",
            "गण": "मनुष्य",
            "राशी": "मीन",
            "स्वामी": "गुरु",
            "क्र": 25
        },
        "उत्तरा भाद्रपदा": {
            "नाडी": "मध्य",
            "योनि": "गो",
            "गण": "मनुष्य",
            "राशी": "मीन",
            "स्वामी": "गुरु",
            "क्र": 26
        },
        "रेवती": {
            "नाडी": "अंत्य",
            "योनि": "गज",
            "गण": "देव",
            "राशी": "मीन",
            "स्वामी": "गुरु",
            "क्र": 27
        }
    };
    
    const selectElement = document.getElementById("janm-nakshatra");
    const displayElement = document.getElementById("janm-nakshatra-display");
    

    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.textContent = option;
        optionElement.value = option;
        selectElement.appendChild(optionElement);
    });

    function updateDisplay() {
        grahNakshatraValue = selectElement.value;

        const values = nakshatraData[grahNakshatraValue] || {};

        clientNadi = values["नाडी"] || '';
        yoni = values["योनि"] || '';
        gan = values["गण"] || '';
        rashi = values["राशी"] || '';
        swami = values["स्वामी"] || '';

        document.getElementById('nadi').textContent = clientNadi;
        document.getElementById('yoni').textContent = yoni;
        document.getElementById('gan').textContent = gan;
        document.getElementById('rashi').textContent = rashi;
        document.getElementById('swami').textContent = swami;

        clientGrahNum = parseInt(values["क्र"]) || 0;
        
        displayElement.textContent = grahNakshatraValue;
        
        return { clientGrahNum, clientNadi };
    }

    selectElement.addEventListener('change', () => {
        const { clientGrahNum, clientNadi } = updateDisplay();
        const selectedNakshatra = selectElement.value;

        grahNakshatra(selectedNakshatra, clientGrahNum, clientNadi);
    });

    updateDisplay(); 
}
clientNakshatra();


// calculate गृह घटीत 
let grahNadi;
let grahYoni;
let grahGan;
let grahRashi;
let grahSwami;
let grahNakshatraKey;

function grahNakshatra(vargNakshatra){
    const grahnakshatraData = {
        "अश्विनी": {
            "नाडी": "आद्य",
            "योनि": "अश्व",
            "गण": "देव",
            "राशी": "मेष",
            "स्वामी": "मंगळ",
            "गृह-क्र": 1
        },
        "भरणी": {
            "नाडी": "मध्य",
            "योनि": "गज",
            "गण": "मनुष्य",
            "राशी": "मेष",
            "स्वामी": "मंगळ",
            "गृह-क्र": 2
        },
        "कृतिका": {
            "नाडी": "अंत्य",
            "योनि": "मेष",
            "गण": "राक्षस",
            "राशी": "मेष",
            "स्वामी": "मंगळ",
            "गृह-क्र": 3
        },
        "रोहिणी": {
            "नाडी": "अंत्य",
            "योनि": "सर्प",
            "गण": "मनुष्य",
            "राशी": "वृषभ",
            "स्वामी": "शुक्र",
            "गृह-क्र": 4
        },
        "मृग": {
            "नाडी": "मध्य",
            "योनि": "सर्प",
            "गण": "देव",
            "राशी": "वृषभ",
            "स्वामी": "शुक्र",
            "गृह-क्र": 5
        },
        "आर्द्रा": {
            "नाडी": "आद्य",
            "योनि": "श्वान",
            "गण": "मनुष्य",
            "राशी": "मिथुन",
            "स्वामी": "बुध",
            "गृह-क्र": 6
        },
        "पुनर्वसू": {
            "नाडी": "आद्य",
            "योनि": "मार्जार",
            "गण": "देव",
            "राशी": "मिथुन",
            "स्वामी": "बुध",
            "गृह-क्र": 7
        },
        "पुष्य": {
            "नाडी": "मध्य",
            "योनि": "मेष",
            "गण": "देव",
            "राशी": "कर्क",
            "स्वामी": "चंद्र",
            "गृह-क्र": 8
        },
        "आश्लेषा": {
            "नाडी": "अंत्य",
            "योनि": "मार्जार",
            "गण": "राक्षस",
            "राशी": "कर्क",
            "स्वामी": "चंद्र",
            "गृह-क्र": 9
        },
        "मघा": {
            "नाडी": "अंत्य",
            "योनि": "उंदीर",
            "गण": "राक्षस",
            "राशी": "सिंह",
            "स्वामी": "सूर्य",
            "गृह-क्र": 10
        },
        "पूर्वा": {
            "नाडी": "मध्य",
            "योनि": "उंदीर",
            "गण": "मनुष्य",
            "राशी": "सिंह",
            "स्वामी": "सूर्य",
            "गृह-क्र": 11
        },
        "उत्तरा": {
            "नाडी": "आद्य",
            "योनि": "गो",
            "गण": "मनुष्य",
            "राशी": "सिंह",
            "स्वामी": "सूर्य",
            "गृह-क्र": 12
        },
        "हस्त": {
            "नाडी": "आद्य",
            "योनि": "महिषी",
            "गण": "देव",
            "राशी": "कन्या",
            "स्वामी": "बुध",
            "गृह-क्र": 13
        },
        "चित्रा": {
            "नाडी": "मध्य",
            "योनि": "व्याघ्र",
            "गण": "राक्षस",
            "राशी": "कन्या",
            "स्वामी": "बुध",
            "गृह-क्र": 14
        },
        "स्वाती": {
            "नाडी": "अंत्य",
            "योनि": "महिषी",
            "गण": "देव",
            "राशी": "तुळ",
            "स्वामी": "शुक्र",
            "गृह-क्र": 15
        },
        "विशाखा": {
            "नाडी": "अंत्य",
            "योनि": "व्याघ्र",
            "गण": "राक्षस",
            "राशी": "तुळ",
            "स्वामी": "शुक्र",
            "गृह-क्र": 16
        },
        "अनुराधा": {
            "नाडी": "मध्य",
            "योनि": "मृग",
            "गण": "देव",
            "राशी": "वृश्चिक",
            "स्वामी": "मंगळ",
            "गृह-क्र": 17
        },
        "जेष्ठा": {
            "नाडी": "आद्य",
            "योनि": "मृग",
            "गण": "राक्षस",
            "राशी": "वृश्चिक",
            "स्वामी": "मंगळ",
            "गृह-क्र": 18
        },
        "मूळ": {
            "नाडी": "आद्य",
            "योनि": "श्वान",
            "गण": "राक्षस",
            "राशी": "धनु",
            "स्वामी": "गुरु",
            "गृह-क्र": 19
        },
        "पूर्वाषाढा": {
            "नाडी": "मध्य",
            "योनि": "वानर",
            "गण": "मनुष्य",
            "राशी": "धनु",
            "स्वामी": "गुरु",
            "गृह-क्र": 20
        },
        "उत्तराषाढा": {
            "नाडी": "अंत्य",
            "योनि": "मुंगुस",
            "गण": "मनुष्य",
            "राशी": "धनु",
            "स्वामी": "गुरु",
            "गृह-क्र": 21
        },
        "श्रवण": {
            "नाडी": "अंत्य",
            "योनि": "वानर",
            "गण": "देव",
            "राशी": "मकर",
            "स्वामी": "शनि",
            "गृह-क्र": 22
        },
        "धनिष्ठा": {
            "नाडी": "मध्य",
            "योनि": "सिंह",
            "गण": "राक्षस",
            "राशी": "मकर",
            "स्वामी": "शनि",
            "गृह-क्र": 23
        },
        "शततारका": {
            "नाडी": "आद्य",
            "योनि": "अश्व",
            "गण": "राक्षस",
            "राशी": "कुंभ",
            "स्वामी": "शनि",
            "गृह-क्र": 24
        },
        "पूर्वा भाद्रपदा": {
            "नाडी": "आद्य",
            "योनि": "सिंह",
            "गण": "मनुष्य",
            "राशी": "कुंभ",
            "स्वामी": "शनि",
            "गृह-क्र": 25
        },
        "उत्तरा भाद्रपदा": {
            "नाडी": "मध्य",
            "योनि": "गो",
            "गण": "मनुष्य",
            "राशी": "मीन",
            "स्वामी": "गुरु",
            "गृह-क्र": 26
        },
        "रेवती": {
            "नाडी": "अंत्य",
            "योनि": "गज",
            "गण": "देव",
            "राशी": "मीन",
            "स्वामी": "गुरु",
            "गृह-क्र": 27
        }
    };

    const selectedNakshatraData = grahnakshatraData[vargNakshatra];

    if (selectedNakshatraData) {
        grahNadi = selectedNakshatraData['नाडी'];
        grahYoni = selectedNakshatraData['योनि'];
        grahGan = selectedNakshatraData['गण'];
        grahRashi = selectedNakshatraData['राशी'];
        grahSwami = selectedNakshatraData['स्वामी'];

        document.getElementById('grah-nadi').innerHTML = grahNadi;
        document.getElementById('grah-yoni').innerHTML = grahYoni;
        document.getElementById('grah-gan').innerHTML = grahGan;
        document.getElementById('grah-rashi').innerHTML = grahRashi;
        document.getElementById('grah-swami').innerHTML = grahSwami;

        const grahNum = parseInt(selectedNakshatraData["गृह-क्र"]);

        const clientTaraValue = (clientGrahNum + 28) - (grahNum || 0);
        const grahTaraValue = (grahNum + 28) - (clientGrahNum)

        const clientTaraResult = (grahTaraValue % 9)
        document.getElementById('client-tara').innerHTML = clientTaraResult
    
        const grahTaraResult = (clientTaraValue % 9)
        document.getElementById('grah-tara').innerHTML = grahTaraResult

        grahGhatitFal(clientTaraResult);
    
    }
    return null; 
}

function grahGhatitFal(clientTaraResult){

    if (grahNakshatraValue && nakshatraName) {
        const filteredGrahNakshtra = grahNakshatraValue.match(new RegExp('^[^\\d\\s\\.\\-]+'))[0];
        console.log(filteredGrahNakshtra);
        const filteredNakshtraname = nakshatraName.match(new RegExp('^[^\\d\\s\\.\\-]+'))[0];
        console.log(filteredNakshtraname);
        

        if (filteredGrahNakshtra == filteredNakshtraname) {
            document.getElementById('nakshatra-fal').innerHTML = "अशुभ";
            document.getElementById('nakshatra-fal').classList.remove('text-success');
            document.getElementById('nakshatra-fal').classList.add('text-danger');
        }
        else{
            document.getElementById('nakshatra-fal').innerHTML = "शुभ";
            document.getElementById('nakshatra-fal').classList.remove('text-danger');
            document.getElementById('nakshatra-fal').classList.add('text-success');
        }
    }
    

    let nadiVal = 0;
    let nadiFal = "अति शुभ";

    if(clientNadi != grahNadi ){
        nadiVal = 8;
        nadiFal = "शुभ";
    }
    document.getElementById('nadi-fal').innerHTML = nadiFal;
    document.getElementById('nadi-fal').classList.toggle('text-success', nadiFal == "शुभ" || nadiFal == "अति शुभ" );

    // Tara Fal 
    if(clientTaraResult == "3" || clientTaraResult == "5" || clientTaraResult == "7"){
        document.getElementById('tara-fal').innerHTML = "अशुभ";
        document.getElementById('tara-fal').classList.remove('text-success');
        document.getElementById('tara-fal').classList.add('text-danger');
    }
    else{
        document.getElementById('tara-fal').innerHTML = "शुभ";
        document.getElementById('tara-fal').classList.remove('text-danger');
        document.getElementById('tara-fal').classList.add('text-success');
    }
    

    // Rashi Fal
    const rashiRelations = {
        "मेष": ["मिथुन", "कर्क", "तुळ", "कुंभ", "मकर"],
        "वृषभ": ["कर्क", "सिंह", "वृश्चिक", "कुंभ", "मीन"],
        "मिथुन": ["मेष", "सिंह", "कन्या", "धनु", "मीन"],
        "कर्क": ["मेष", "वृषभ", "कन्या", "तुळ", "मकर"],
        "सिंह": ["वृषभ", "मिथुन", "तुळ", "वृश्चिक", "कुंभ"],
        "कन्या": ["मिथुन", "कर्क", "वृश्चिक", "धनु", "मीन"],
        "तुळ": ["मेष", "कर्क", "सिंह", "धनु", "मकर"],
        "वृश्चिक": ["वृषभ", "सिंह", "कन्या", "मकर", "कुंभ"],
        "धनु": ["मिथुन", "कन्या", "तुळ", "मीन", "कुंभ"],
        "मकर": ["मेष", "कर्क", "तुळ", "वृश्चिक", "मीन"],
        "कुंभ": ["मेष", "वृषभ", "सिंह", "वृश्चिक", "धनु"],
        "मीन": ["वृषभ", "मिथुन", "कन्या", "धनु", "मकर"]
    };

    // Additional conditions for 'मध्यम' category
    const midConditions = {
        "मेष": ["सिंह", "मीन", "वृश्चिक", "धनु"],
        "वृषभ": ["मिथुन", "कन्या", "तुळ", "मकर"],
        "मिथुन": ["वृषभ", "तुळ", "मकर"],
        "कर्क": ["सिंह", "धनु"],
        "सिंह": ["मेष", "कर्क", "कन्या", "धनु", "मीन"],
        "कन्या": ["वृषभ", "सिंह", "तुळ", "कुंभ"],
        "तुळ": ["वृषभ", "मिथुन", "कन्या", "कुंभ"],
        "वृश्चिक": ["मेष", "धनु", "मीन"],
        "धनु": ["मेष", "सिंह", "कर्क", "वृश्चिक"],
        "मकर": ["वृषभ", "मिथुन", "कुंभ"],
        "कुंभ": ["कन्या", "तुळ", "मकर"],
        "मीन": ["मेष", "सिंह", "वृश्चिक"]
    };

    let rashiVal = 0;
    let rashiFal = "अशुभ";
    
    if (rashi === grahRashi || (rashiRelations[rashi] && rashiRelations[rashi].includes(grahRashi))) {
        rashiVal = 7;
        rashiFal = "शुभ";
    } else if (midConditions[rashi] && midConditions[rashi].includes(grahRashi)) {
        rashiVal = 3;
        rashiFal = "शुभ";
    }
    
    const rashiFalElement = document.getElementById('rashi-fal');
    rashiFalElement.innerHTML = rashiFal;
    rashiFalElement.classList.toggle('text-success', rashiFal === "शुभ");
    rashiFalElement.classList.toggle('text-danger', rashiFal !== "शुभ");


    // Grah Maitri Fal

    let grahMaitriVal = 0;
    let grahMaitriFal;

    if ((swami == grahSwami) || (
        (swami == "सूर्य" && (grahSwami == "चंद्र" || grahSwami == "मंगळ" || grahSwami == "गुरु")) ||
        (swami == "चंद्र" && (grahSwami == "सूर्य")) ||
        (swami == "मंगळ" && (grahSwami == "सूर्य" || grahSwami == "गुरु")) ||
        (swami == "बुध" && (grahSwami == "शुक्र")) ||
        (swami == "गुरु" && (grahSwami == "सूर्य" || grahSwami == "मंगळ")) ||
        (swami == "शुक्र" && (grahSwami == "बुध" || grahSwami == "शनि")) ||
        (swami == "शनि" && (grahSwami == "शुक्र"))
    )) {
        grahMaitriVal = 5;
        grahMaitriFal = "शुभ";
    }
    else if(
        (swami == "सूर्य" && (grahSwami == "बुध")) ||
        (swami == "चंद्र" && (grahSwami == "मंगळ" || grahSwami == "गुरु" )) ||
        (swami == "मंगळ" && (grahSwami == "चंद्र")) ||
        (swami == "बुध" && (grahSwami == "सूर्य" || grahSwami == "शनि")) ||
        (swami == "गुरु" && (grahSwami == "चंद्र")) ||
        (swami == "शनि" && (grahSwami == "बुध"))
    ){
        grahMaitriVal = 4;
        grahMaitriFal = "शुभ";
    }
    else if(
        (swami == "मंगळ" && (grahSwami == "शुक्र")) ||
        (swami == "गुरु" && (grahSwami == "शनि")) ||
        (swami == "शुक्र" && (grahSwami == "मंगळ")) ||
        (swami == "शनि" && (grahSwami == "गुरु"))
    ){
        grahMaitriVal = 3;
        grahMaitriFal = "मध्यम";
    }
    else if(
        (swami == "चंद्र" && (grahSwami == "बुध")) ||
        (swami == "बुध" && (grahSwami == "चंद्र")) 
    ){
        grahMaitriVal = 1;
        grahMaitriFal = "शुभ";
    }
    else if(
        (swami == "सूर्य" && (grahSwami == "शुक्र" || grahSwami == "शनि")) ||
        ((swami == "शुक्र" || swami == "शनि") && (grahSwami == "सूर्य"))
    ){
        grahMaitriVal = 0;
        grahMaitriFal = "अशुभ";
    }
    else{
        grahMaitriVal = 0.5;
        grahMaitriFal = "अशुभ";
    }

    if (grahMaitriVal === 0.5 || grahMaitriVal === 0 ) {
        document.getElementById('grah-fal').innerHTML = grahMaitriFal;
        document.getElementById('grah-fal').classList.remove('text-success', 'text-warning');
        document.getElementById('grah-fal').classList.add('text-danger');
    }
    else if(grahMaitriVal === 3){
        document.getElementById('grah-fal').innerHTML = grahMaitriFal;
        document.getElementById('grah-fal').classList.remove('text-danger', 'text-success');
        document.getElementById('grah-fal').classList.add('text-warning');
    }
    else{
        document.getElementById('grah-fal').innerHTML = grahMaitriFal;
        document.getElementById('grah-fal').classList.remove('text-danger', 'text-warning');
        document.getElementById('grah-fal').classList.add('text-success');
    }

    // gan Fal
    let ganVal = 0;
    let ganfal;
    if ((gan == grahGan) || (gan == "मनुष्य" && grahGan == "देव")) {
        ganVal = 6;
        ganfal = "शुभ";
        document.getElementById('gan-fal').innerHTML = ganfal;
        document.getElementById('gan-fal').classList.remove('text-danger', 'text-warning');
        document.getElementById('gan-fal').classList.add('text-success');
    }
    else if(gan == "देव" && grahGan == "मनुष्य"){
        ganVal = 5;
        ganfal = "शुभ";
    }
    else if((gan == "देव" && grahGan == "राक्षस") || (gan == "राक्षस" && grahGan == "देव")){
        ganVal = 1;
        ganfal = "मध्यम";
    }
    else{
        ganfal = "अशुभ";
    }

    if(ganVal == 1){
        document.getElementById('gan-fal').innerHTML = ganfal;
        document.getElementById('gan-fal').classList.remove('text-success', 'text-danger');
        document.getElementById('gan-fal').classList.add('text-warning');
    }
    else if(ganVal == 0){
        document.getElementById('gan-fal').innerHTML = ganfal;
        document.getElementById('gan-fal').classList.remove('text-success', 'text-warning');
        document.getElementById('gan-fal').classList.add('text-danger');
    }
    else{
        document.getElementById('gan-fal').innerHTML = ganfal;
        document.getElementById('gan-fal').classList.remove('text-danger', 'text-warning');
        document.getElementById('gan-fal').classList.add('text-success');
    }
    
    // Yoni Fal
    let yoniVal = 0;
    let yoniFal;

    if (yoni == grahYoni) {
        yoniVal = 4;
        yoniFal = "शुभ";
    }
    else if(
        (yoni == "अश्व" && (grahYoni == "सर्प" || grahYoni == "मृग" || grahYoni == "वानर"))||
        (yoni == "गज" && (grahYoni == "मेष" || grahYoni == "सर्प" || grahYoni == "महिषी" || grahYoni == "वानर"))||
        (yoni == "मेष" && (grahYoni == "गज" || grahYoni == "गो" || grahYoni == "महिषी" || grahYoni == "मुंगुस"))||
        (yoni == "सर्प" && (grahYoni == "अश्व" || grahYoni == "गज"))||
        (yoni == "मार्जार" && (grahYoni == "मृग" || grahYoni == "वानर"))||
        (yoni == "गो" && (grahYoni == "मेष" || grahYoni == "महिषी" || grahYoni == "मृग"))||
        (yoni == "महिषी" && (grahYoni == "गज" || grahYoni == "मेष" || grahYoni == "गो"))||
        (yoni == "मृग" && (grahYoni == "अश्व" || grahYoni == "मार्जार" || grahYoni == "गो"))||
        (yoni == "वानर" && (grahYoni == "अश्व" || grahYoni == "गज" || grahYoni == "मार्जार" || grahYoni == "मुंगुस"))||
        (yoni == "मुंगुस" && (grahYoni == "मेष" || grahYoni == "वानर"))        
    ){
        yoniVal = 3;
        yoniFal = "शुभ";
    }
    else if(
        (yoni == "अश्व" && (grahYoni == "गो" || grahYoni == "व्याघ्र" || grahYoni == "सिंह"))||    
        (yoni == "गज" && grahYoni == "व्याघ्र")||
        (yoni == "मेष" && (grahYoni == "श्वान" || grahYoni == "उंदीर" || grahYoni == "व्याघ्र" || grahYoni == "सिंह"))||
        (yoni == "सर्प" && (grahYoni == "मार्जार" || grahYoni == "उंदीर" || grahYoni == "गो" || grahYoni == "महिषी"))||
        (yoni == "श्वान" && (grahYoni == "मेष" || grahYoni == "उंदीर" || grahYoni == "व्याघ्र" || grahYoni == "मुंगुस" || grahYoni == "सिंह"))||
        (yoni == "मार्जार" && (grahYoni == "सर्प" || grahYoni == "व्याघ्र" || grahYoni == "सिंह"))||
        (yoni == "उंदीर" && (grahYoni == "मेष" || grahYoni == "सर्प" || grahYoni == "श्वान" || grahYoni == "मुंगुस"))||
        (yoni == "गो" && (grahYoni == "सिंह" || grahYoni == "सर्प" || grahYoni == "अश्व"))||
        (yoni == "महिषी" && (grahYoni == "सर्प" || grahYoni == "सिंह" || grahYoni == "व्याघ्र"))||
        (yoni == "व्याघ्र" && (grahYoni == "अश्व" || grahYoni == "गज" || grahYoni == "मेष" || grahYoni == "श्वान" || grahYoni == "मार्जार" || grahYoni == "महिषी" || grahYoni == "मृग" || grahYoni == "वानर" || grahYoni == "सिंह"))||
        (yoni == "मृग" && (grahYoni == "व्याघ्र" || grahYoni == "सिंह"))||
        (yoni == "वानर" && grahYoni == "व्याघ्र")||
        (yoni == "मुंगुस" && (grahYoni == "श्वान" || grahYoni == "उंदीर")) ||        
        (yoni == "सिंह" && (grahYoni == "अश्व" || grahYoni == "मेष" || grahYoni == "श्वान" || grahYoni == "मार्जार" || grahYoni == "गो" || grahYoni == "महिषी" || grahYoni == "व्याघ्र" || grahYoni == "मृग"))        
    ){
        yoniVal = 1;
        yoniFal = "शुभ";
    }
    else if(
        (yoni == "अश्व" && grahYoni == "महिषी")||    
        (yoni == "गज" && grahYoni == "सिंह")||
        (yoni == "मेष" && grahYoni == "श्वानर")||
        (yoni == "सर्प" && grahYoni == "मुंगुस")||
        (yoni == "श्वान" && grahYoni == "मृग")||
        (yoni == "मार्जार" && grahYoni == "उंदीर")||
        (yoni == "उंदीर" && grahYoni == "मार्जार")||
        (yoni == "गो" && grahYoni == "व्याघ्र")||
        (yoni == "महिषी" && grahYoni == "अश्व")||
        (yoni == "व्याघ्र" && grahYoni == "गो")||
        (yoni == "मृग" && grahYoni == "श्वान")||
        (yoni == "वानर" && grahYoni == "मेष")||
        (yoni == "मुंगुस" && grahYoni == "सर्प") ||        
        (yoni == "सिंह" && grahYoni == "गज")        
    ){
        yoniVal = 0;
        yoniFal = "अशुभ";
    }
    else{
        yoniVal = 2;
        yoniFal = "शुभ";
    }

    if (yoniVal == 0) {
        document.getElementById('yoni-fal').innerHTML = yoniFal;
        document.getElementById('yoni-fal').classList.remove('text-success');
        document.getElementById('yoni-fal').classList.add('text-danger');
    }
    else{
        document.getElementById('yoni-fal').innerHTML = yoniFal;
        document.getElementById('yoni-fal').classList.remove('text-danger');
        document.getElementById('yoni-fal').classList.add('text-success');
    }

}
grahGhatitFal()


// convertting to pdf 

document.getElementById('downloadBtn').addEventListener('click', () => {
    const buttons = document.querySelectorAll('#download-pdf, #other-button');
    const info = document.querySelector('#creater-info');

    const navbar = document.querySelector('#first-page-content'); 
    const contentToPrint1 = document.querySelector('#content-to-print');
    const contentToPrint2 = document.querySelector('#grah-melan-chart'); 
    const contentToPrint3 = document.querySelector('#ghatit-info');
    const footer = document.getElementById('footer');

    // Hide buttons
    buttons.forEach(button => button.classList.add('d-none'));

    // Hide the first page content and footer
    if (navbar) {
        navbar.style.display = 'none';
    }
    if (footer) {
        footer.style.display = 'none';
    }

    // Ensure the content to print is visible
    contentToPrint1.classList.remove('d-none');
    contentToPrint2.classList.remove('d-none');
    contentToPrint3.classList.remove('d-none');

    // Display brand name and name information for PDF
    info.classList.remove('d-none');

    // Trigger the print dialog
    window.print();

    // Restore the visibility after printing
    setTimeout(() => {
        if (navbar) {
            navbar.style.display = ''; 
        }
        if (footer) {
            footer.style.display = '';
        }
        info.classList.add('d-none');
        buttons.forEach(button => button.classList.remove('d-none'));
    }, 1000);
});






