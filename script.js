// ==========================================
// SUPABASE CONNECTION
// ==========================================

const SUPABASE_URL = "https://wqzlfjbhtcmpgwykzqsh.supabase.co";
const SUPABASE_KEY = "sb_publishable_pIJp8Tkk-a3GnVybUkApZQ_HACotzYn";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);/* =========================================
   NAVIGATION
========================================= */

function showSection(sectionId) {

    const sections = document.querySelectorAll(".page-section");

    sections.forEach(section => {
        section.classList.remove("active");
    });

    const selected = document.getElementById(sectionId);

    if (selected) {
        selected.classList.add("active");
    }


    const navItems = document.querySelectorAll(".nav-item");

    navItems.forEach(item => {
        item.classList.remove("active");
    });


    navItems.forEach(item => {

        if (
            item.getAttribute("onclick") &&
            item.getAttribute("onclick").includes(sectionId)
        ) {
            item.classList.add("active");
        }

    });


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================
   PROFILE POPUP
========================================= */

function toggleProfile() {

    const popup = document.getElementById("profilePopup");

    popup.classList.toggle("show");

}


/* =========================================
   TOAST
========================================= */

function showToast(title, message) {

    const toast = document.getElementById("toast");

    toast.innerHTML = `
        <span>✓</span>

        <div>
            <strong>${title}</strong>
            <small>${message}</small>
        </div>
    `;

    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}


/* =========================================
   RISK PROFILE
========================================= */

function changeRisk() {

    const profiles = [
        "Conservative",
        "Moderate",
        "Growth"
    ];

    const current =
        document.querySelector(".risk-score h3");

    let index =
        profiles.indexOf(current.innerText);

    index++;

    if (index >= profiles.length) {
        index = 0;
    }

    current.innerText = profiles[index];


    showToast(
        "Risk profile updated",
        `Profile changed to ${profiles[index]}`
    );

}


/* =========================================
   ADD HOLDING
========================================= */

function addHolding() {

    showToast(
        "Portfolio editor",
        "Holding input module opened"
    );

}


/* =========================================
   SIMULATED LIVE MARKET UPDATE
========================================= */

function updateMarket() {

    const priceElement =
        document.querySelector(".stock-price strong");

    if (!priceElement) return;


    let currentPrice =
        parseFloat(
            priceElement.innerText
                .replace("₹", "")
                .replace(",", "")
        );


    const movement =
        (Math.random() - 0.45) * 1.2;


    currentPrice += movement;


    priceElement.innerText =
        "₹" + currentPrice.toFixed(2);

}


/* Update simulated price every 5 seconds */

setInterval(updateMarket, 5000);


/* =========================================
   RANDOM AGENT STATUS
========================================= */

function simulateAgents() {

    const statuses =
        document.querySelectorAll(".agent-status");


    statuses.forEach(status => {

        status.innerHTML = `
            <span class="status-dot"></span>
            Complete
        `;

    });

}


/* =========================================
   AUTO SYSTEM NOTIFICATION
========================================= */

setTimeout(() => {

    showToast(
        "AI analysis complete",
        "3 agents synthesized a new market signal."
    );

}, 2500);


/* =========================================
   CLOSE PROFILE WHEN CLICKING OUTSIDE
========================================= */

document.addEventListener("click", function(event) {

    const popup =
        document.getElementById("profilePopup");

    const button =
        document.querySelector(".profile-btn");


    if (
        popup &&
        popup.classList.contains("show") &&
        !popup.contains(event.target) &&
        !button.contains(event.target)
    ) {

        popup.classList.remove("show");

    }

});


/* =========================================
   INITIALIZE
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    simulateAgents();

});

// ==========================================
// TEST SUPABASE CONNECTION
// ==========================================

async function testSupabase() {

    const { data, error } = await supabaseClient
        .from("user_profiles")
        .select("*")
        .limit(1);

    if (error) {

        console.error("❌ Supabase connection failed:");
        console.error(error);

    } else {

        console.log("✅ Supabase connected successfully!");
        console.log("User profiles:", data);

    }
}

testSupabase();
// ==========================================
// LOAD USER PROFILE
// ==========================================

async function loadUserProfile() {

    const { data, error } = await supabaseClient
        .from("user_profiles")
        .select("*")
        .limit(1)
        .single();

    if (error) {

        console.error("❌ Could not load user profile:");
        console.error(error);

        return;

    }

    console.log("✅ User profile loaded:");
    console.log(data);

}

loadUserProfile();

// ==========================================
// FINSIGHT BACKEND CONNECTION
// ==========================================

async function loadFinsightData() {

    try {

        console.log("Connecting to Finsight backend...");

        const response = await fetch(
            "http://localhost:5000/api/analyze"
        );

        if (!response.ok) {
            throw new Error("Backend request failed");
        }

        const data = await response.json();

        console.log("✅ Finsight data received:", data);


        // ==========================================
        // USER
        // ==========================================

        document.getElementById("userName").textContent =
            data.user;

        document.getElementById("profileName").textContent =
            data.user;

        document.getElementById("profileRisk").textContent =
            data.riskProfile + " Risk";


        // ==========================================
        // STOCK
        // ==========================================

        document.getElementById("companyName").textContent =
            data.company;

        document.getElementById("stockSymbol").textContent =
            data.symbol;

        document.getElementById("stockPrice").textContent =
            "₹" + data.price;


        // ==========================================
        // FINAL SIGNAL
        // ==========================================

        document.getElementById("signalAction").textContent =
            data.signal;

        document.getElementById("confidence").textContent =
            data.confidence;

        document.getElementById("aiConfidence").textContent =
            data.confidence;


        // ==========================================
        // SIGNAL TITLE
        // ==========================================

        document.getElementById("signalTitle").textContent =
            data.signal === "BULLISH"
                ? "Bullish"
                : data.signal === "BEARISH"
                ? "Bearish"
                : "Neutral";


        // ==========================================
        // AI SUMMARY
        // ==========================================

        document.getElementById("aiSummary").innerHTML =
            `Based on the combined analysis of fundamentals,
            technical indicators, and market sentiment,
            <strong>${data.company} shows a ${data.signal.toLowerCase()} setup.</strong>`;


        // ==========================================
        // AGENT SCORES
        // ==========================================

        document.getElementById("fundamentalScore").textContent =
            data.agents.fundamental.score;

        document.getElementById("technicalScore").textContent =
            data.agents.technical.score;

        document.getElementById("sentimentScore").textContent =
            data.agents.sentiment.score;

        // ==========================================
// AGENT TRACE SCORES
// ==========================================

document.getElementById("traceFundamental").textContent =
    data.agents.fundamental.score;

document.getElementById("traceTechnical").textContent =
    data.agents.technical.score;

document.getElementById("traceSentiment").textContent =
    data.agents.sentiment.score;

// ==========================================
// FULL AGENT REASONING
// ==========================================

document.getElementById("fundamentalReason").innerHTML =
    data.agents.fundamental.reasons
        .map(reason => `• ${reason}`)
        .join("<br>");

document.getElementById("technicalReason").innerHTML =
    data.agents.technical.reasons
        .map(reason => `• ${reason}`)
        .join("<br>");

document.getElementById("sentimentReason").innerHTML =
    data.agents.sentiment.reasons
        .map(reason => `• ${reason}`)
        .join("<br>");


        console.log("✅ Dashboard updated successfully");


    } catch (error) {

        console.error(
            "❌ Finsight connection error:",
            error
        );

    }

}


// ==========================================
// LOAD DATA WHEN PAGE OPENS
// ==========================================

loadFinsightData();