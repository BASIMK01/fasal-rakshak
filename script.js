// Krishi Mitra - Smart Farming Assistant
// Main Application Logic

// Global Variables
let currentLanguage = 'en';
let weatherData = null;
let farmProfile = null;
let weatherChart = null;
let currentUser = null;

// Language Translations
const translations = {
    en: {
        app_name: "Krishi Mitra",
        nav_dashboard: "Dashboard",
        nav_farm: "My Farm",
        nav_insights: "Insights",
        nav_market: "Market",
        get_location: "Get Location",
        login: "Login",
        register: "Register",
        logout: "Logout",
        profile: "Profile",
        settings: "Settings",
        full_name: "Full Name",
        email: "Email",
        phone: "Phone Number",
        password: "Password",
        confirm_password: "Confirm Password",
        dashboard_title: "Farm Dashboard",
        temperature: "Temperature",
        humidity: "Humidity",
        productivity: "Productivity",
        soil_moisture: "Soil Moisture",
        weather_irrigation: "Weather & Irrigation Planning",
        ai_recommendations: "AI-Powered Recommendations",
        farm_management: "Farm Management",
        farm_profile: "Farm Profile",
        crop_type: "Crop Type",
        crop_rice: "Rice",
        crop_wheat: "Wheat",
        crop_maize: "Maize",
        crop_cotton: "Cotton",
        crop_tomato: "Tomato",
        crop_potato: "Potato",
        farm_area: "Farm Area",
        area_unit: "Unit",
        acres: "Acres",
        hectares: "Hectares",
        soil_type: "Soil Type",
        soil_loamy: "Loamy",
        soil_clay: "Clay",
        soil_sandy: "Sandy",
        soil_silt: "Silt",
        planting_date: "Planting Date",
        location_coords: "Location Coordinates",
        save_profile: "Save Profile",
        fetch_data: "Fetch Weather Data",
        yield_calculator: "Yield Calculator",
        expected_yield: "Expected Yield",
        estimated_revenue: "Estimated Revenue",
        productivity_gain: "Productivity Gain",
        calculate_yield: "Calculate Yield",
        detailed_insights: "Detailed Insights",
        irrigation_schedule: "Irrigation Schedule",
        fertilizer_recommendations: "Fertilizer Recommendations",
        pest_disease_alerts: "Pest & Disease Alerts",
        market_trends: "Market Price Trends",
        market_prices: "Market Prices",
        search_crops: "Search crops...",
        all_markets: "All Markets",
        crop_name: "Crop",
        current_price: "Current Price",
        price_change: "Change",
        market_location: "Market",
        last_updated: "Last Updated",
        contact_support: "Contact & Support",
        footer_desc: "Empowering farmers with AI-driven insights for sustainable and productive farming.",
        all_rights_reserved: "All rights reserved."
    },
    hi: {
        app_name: "कृषि मित्र",
        nav_dashboard: "डैशबोर्ड",
        nav_farm: "मेरा खेत",
        nav_insights: "अंतर्दृष्टि",
        nav_market: "बाजार",
        get_location: "स्थान प्राप्त करें",
        login: "लॉगिन",
        register: "रजिस्टर",
        logout: "लॉगआउट",
        profile: "प्रोफाइल",
        settings: "सेटिंग्स",
        full_name: "पूरा नाम",
        email: "ईमेल",
        phone: "फोन नंबर",
        password: "पासवर्ड",
        confirm_password: "पासवर्ड की पुष्टि करें",
        dashboard_title: "फार्म डैशबोर्ड",
        temperature: "तापमान",
        humidity: "आर्द्रता",
        productivity: "उत्पादकता",
        soil_moisture: "मिट्टी की नमी",
        weather_irrigation: "मौसम और सिंचाई योजना",
        ai_recommendations: "एआई-संचालित सुझाव",
        farm_management: "फार्म प्रबंधन",
        farm_profile: "फार्म प्रोफाइल",
        crop_type: "फसल का प्रकार",
        crop_rice: "धान",
        crop_wheat: "गेहूं",
        crop_maize: "मक्का",
        crop_cotton: "कपास",
        crop_tomato: "टमाटर",
        crop_potato: "आलू",
        farm_area: "खेत का क्षेत्रफल",
        area_unit: "इकाई",
        acres: "एकड़",
        hectares: "हेक्टेयर",
        soil_type: "मिट्टी का प्रकार",
        soil_loamy: "दोमट",
        soil_clay: "चिकनी",
        soil_sandy: "रेतीली",
        soil_silt: "गाद",
        planting_date: "बुवाई की तारीख",
        location_coords: "स्थान निर्देशांक",
        save_profile: "प्रोफाइल सहेजें",
        fetch_data: "मौसम डेटा प्राप्त करें",
        yield_calculator: "उपज कैलकुलेटर",
        expected_yield: "अपेक्षित उपज",
        estimated_revenue: "अनुमानित आय",
        productivity_gain: "उत्पादकता लाभ",
        calculate_yield: "उपज की गणना करें",
        detailed_insights: "विस्तृत अंतर्दृष्टि",
        irrigation_schedule: "सिंचाई अनुसूची",
        fertilizer_recommendations: "उर्वरक सुझाव",
        pest_disease_alerts: "कीट और रोग अलर्ट",
        market_trends: "बाजार मूल्य रुझान",
        market_prices: "बाजार भाव",
        search_crops: "फसलें खोजें...",
        all_markets: "सभी बाजार",
        crop_name: "फसल",
        current_price: "वर्तमान मूल्य",
        price_change: "बदलाव",
        market_location: "बाजार",
        last_updated: "अंतिम अपडेट",
        contact_support: "संपर्क और सहायता",
        footer_desc: "टिकाऊ और उत्पादक खेती के लिए एआई-संचालित अंतर्दृष्टि के साथ किसानों को सशक्त बनाना।",
        all_rights_reserved: "सर्वाधिकार सुरक्षित।"
    }
};

// Crop Database with Agricultural Parameters
const cropDatabase = {
    rice: {
        baseYield: 4.5, // tons/hectare
        waterRequirement: 1500, // mm/season
        growthDays: 120,
        optimalTemp: { min: 20, max: 35 },
        soilMultiplier: { loamy: 1.0, clay: 1.2, sandy: 0.7, silt: 0.9 },
        marketPrice: 3200, // ₹/quintal
        fertilizerNPK: { N: 120, P: 60, K: 40 }
    },
    wheat: {
        baseYield: 3.2,
        waterRequirement: 450,
        growthDays: 150,
        optimalTemp: { min: 15, max: 25 },
        soilMultiplier: { loamy: 1.2, clay: 0.9, sandy: 0.8, silt: 1.0 },
        marketPrice: 2050,
        fertilizerNPK: { N: 120, P: 60, K: 40 }
    },
    maize: {
        baseYield: 5.5,
        waterRequirement: 600,
        growthDays: 100,
        optimalTemp: { min: 20, max: 30 },
        soilMultiplier: { loamy: 1.1, clay: 0.8, sandy: 1.0, silt: 0.9 },
        marketPrice: 1800,
        fertilizerNPK: { N: 150, P: 75, K: 40 }
    },
    cotton: {
        baseYield: 2.0,
        waterRequirement: 800,
        growthDays: 180,
        optimalTemp: { min: 20, max: 35 },
        soilMultiplier: { loamy: 1.0, clay: 1.1, sandy: 0.9, silt: 0.8 },
        marketPrice: 5200,
        fertilizerNPK: { N: 100, P: 50, K: 50 }
    },
    tomato: {
        baseYield: 25.0,
        waterRequirement: 400,
        growthDays: 90,
        optimalTemp: { min: 18, max: 29 },
        soilMultiplier: { loamy: 1.2, clay: 0.8, sandy: 1.1, silt: 1.0 },
        marketPrice: 2500,
        fertilizerNPK: { N: 200, P: 100, K: 200 }
    },
    potato: {
        baseYield: 20.0,
        waterRequirement: 500,
        growthDays: 90,
        optimalTemp: { min: 15, max: 25 },
        soilMultiplier: { loamy: 1.1, clay: 0.7, sandy: 1.3, silt: 1.0 },
        marketPrice: 1800,
        fertilizerNPK: { N: 150, P: 75, K: 200 }
    }
};

// Market Data
const marketData = [
    { crop: 'Wheat', price: 2050, change: '+2.5%', changeType: 'positive', market: 'Delhi', updated: '2 hours ago' },
    { crop: 'Rice', price: 3200, change: '-1.2%', changeType: 'negative', market: 'Mumbai', updated: '1 hour ago' },
    { crop: 'Tomato', price: 2500, change: '+5.8%', changeType: 'positive', market: 'Bangalore', updated: '30 min ago' },
    { crop: 'Potato', price: 1800, change: '+1.5%', changeType: 'positive', market: 'Hyderabad', updated: '45 min ago' },
    { crop: 'Maize', price: 1800, change: '-0.8%', changeType: 'negative', market: 'Delhi', updated: '1 hour ago' },
    { crop: 'Cotton', price: 5200, change: '+4.1%', changeType: 'positive', market: 'Mumbai', updated: '2 hours ago' }
];

// User Authentication Class
class UserAuth {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('krishiMitra_users') || '[]');
        this.currentUser = JSON.parse(localStorage.getItem('krishiMitra_currentUser') || 'null');
    }

    register(userData) {
        // Check if user already exists
        const existingUser = this.users.find(user => user.email === userData.email);
        if (existingUser) {
            throw new Error('User with this email already exists');
        }

        // Validate password confirmation
        if (userData.password !== userData.confirmPassword) {
            throw new Error('Passwords do not match');
        }

        // Create new user
        const newUser = {
            id: Date.now().toString(),
            name: userData.name,
            email: userData.email,
            phone: userData.phone,
            password: userData.password, // In real app, this should be hashed
            createdAt: new Date().toISOString(),
            farmProfile: null
        };

        this.users.push(newUser);
        localStorage.setItem('krishiMitra_users', JSON.stringify(this.users));
        
        return newUser;
    }

    login(email, password) {
        const user = this.users.find(u => u.email === email && u.password === password);
        if (!user) {
            throw new Error('Invalid email or password');
        }

        this.currentUser = user;
        localStorage.setItem('krishiMitra_currentUser', JSON.stringify(user));
        return user;
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('krishiMitra_currentUser');
    }

    isLoggedIn() {
        return this.currentUser !== null;
    }

    getCurrentUser() {
        return this.currentUser;
    }

    updateUser(userData) {
        if (!this.currentUser) return;

        const userIndex = this.users.findIndex(u => u.id === this.currentUser.id);
        if (userIndex !== -1) {
            this.users[userIndex] = { ...this.users[userIndex], ...userData };
            this.currentUser = this.users[userIndex];
            localStorage.setItem('krishiMitra_users', JSON.stringify(this.users));
            localStorage.setItem('krishiMitra_currentUser', JSON.stringify(this.currentUser));
        }
    }
}

// Initialize User Authentication
const userAuth = new UserAuth();

// Application Initialization
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    setupAuthenticationEvents();
    loadStoredData();
    updateMarketDisplay();
    updateAuthUI();
});

function initializeApp() {
    // Set initial language
    const savedLang = localStorage.getItem('krishiMitra_language') || 'en';
    document.getElementById('languageSelect').value = savedLang;
    changeLanguage(savedLang);
    
    // Initialize navigation
    setupNavigation();
    
    // Load initial data
    updateDashboardStats();
}

function setupEventListeners() {
    // Language selector
    document.getElementById('languageSelect').addEventListener('change', function(e) {
        changeLanguage(e.target.value);
    });
    
    // Location button
    document.getElementById('locationBtn').addEventListener('click', getCurrentLocation);
    
    // Farm form
    document.getElementById('farmForm').addEventListener('submit', saveFarmProfile);
    
    // Fetch data button
    document.getElementById('fetchDataBtn').addEventListener('click', fetchWeatherData);
    
    // Calculate yield button
    document.getElementById('calculateYieldBtn').addEventListener('click', calculateYield);
    
    // Market search and filter
    document.getElementById('searchCrop').addEventListener('input', filterMarketData);
    document.getElementById('marketLocation').addEventListener('change', filterMarketData);
}

function setupAuthenticationEvents() {
    const loginModal = document.getElementById('loginModal');
    const loginBtn = document.getElementById('loginBtn');
    const closeModal = document.getElementById('closeModal');
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const logoutBtn = document.getElementById('logoutBtn');

    // Show login modal
    loginBtn.addEventListener('click', () => {
        loginModal.style.display = 'block';
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        loginModal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
        }
    });

    // Tab switching
    loginTab.addEventListener('click', () => {
        switchTab('login');
    });

    registerTab.addEventListener('click', () => {
        switchTab('register');
    });

    // Login form submission
    loginForm.addEventListener('submit', handleLogin);

    // Register form submission
    registerForm.addEventListener('submit', handleRegister);

    // Logout
    logoutBtn.addEventListener('click', handleLogout);
}

function switchTab(tab) {
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const modalTitle = document.getElementById('modalTitle');

    if (tab === 'login') {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
        modalTitle.textContent = translations[currentLanguage].login || 'Login';
    } else {
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        registerForm.classList.add('active');
        loginForm.classList.remove('active');
        modalTitle.textContent = translations[currentLanguage].register || 'Register';
    }
}

function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const user = userAuth.login(email, password);
        currentUser = user;
        
        // Update UI
        updateAuthUI();
        document.getElementById('loginModal').style.display = 'none';
        
        // Load user's farm profile if exists
        if (user.farmProfile) {
            farmProfile = user.farmProfile;
            populateFarmForm();
            calculateYield();
        }
        
        alert('Login successful! Welcome back, ' + user.name);
        
        // Reset form
        document.getElementById('loginForm').reset();
        
    } catch (error) {
        alert('Login failed: ' + error.message);
    }
}

function handleRegister(e) {
    e.preventDefault();
    
    const userData = {
        name: document.getElementById('registerName').value,
        email: document.getElementById('registerEmail').value,
        phone: document.getElementById('registerPhone').value,
        password: document.getElementById('registerPassword').value,
        confirmPassword: document.getElementById('confirmPassword').value
    };

    try {
        const user = userAuth.register(userData);
        
        alert('Registration successful! Please login to continue.');
        
        // Switch to login tab
        switchTab('login');
        
        // Reset form
        document.getElementById('registerForm').reset();
        
    } catch (error) {
        alert('Registration failed: ' + error.message);
    }
}

function handleLogout() {
    userAuth.logout();
    currentUser = null;
    farmProfile = null;
    
    // Clear UI
    updateAuthUI();
    document.getElementById('farmForm').reset();
    document.getElementById('expectedYield').textContent = '-- tons';
    document.getElementById('estimatedRevenue').textContent = '₹ --';
    
    alert('You have been logged out successfully.');
}

function updateAuthUI() {
    const loginBtn = document.getElementById('loginBtn');
    const userProfile = document.getElementById('userProfile');
    const userName = document.getElementById('userName');

    if (userAuth.isLoggedIn()) {
        const user = userAuth.getCurrentUser();
        loginBtn.classList.add('hidden');
        userProfile.classList.remove('hidden');
        userName.textContent = user.name;
    } else {
        loginBtn.classList.remove('hidden');
        userProfile.classList.add('hidden');
    }
}

function requireAuth() {
    if (!userAuth.isLoggedIn()) {
        alert('Please login to access this feature.');
        document.getElementById('loginModal').style.display = 'block';
        return false;
    }
    return true;
}

function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            // Check if user is logged in for protected sections
            if ((targetId === 'farm' || targetId === 'insights') && !requireAuth()) {
                return;
            }
            
            // Update active states
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            this.classList.add('active');
            document.getElementById(targetId).classList.add('active');
        });
    });
}

function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('krishiMitra_language', lang);
    
    // Update all translatable elements
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Update placeholders
    document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        if (translations[lang] && translations[lang][key]) {
            element.placeholder = translations[lang][key];
        }
    });
}

function getCurrentLocation() {
    if (!navigator.geolocation) {
        alert('Geolocation is not supported by this browser.');
        return;
    }
    
    const locationBtn = document.getElementById('locationBtn');
    locationBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Getting Location...';
    
    navigator.geolocation.getCurrentPosition(
        function(position) {
            document.getElementById('latitude').value = position.coords.latitude.toFixed(6);
            document.getElementById('longitude').value = position.coords.longitude.toFixed(6);
            locationBtn.innerHTML = '<i class="fas fa-check"></i> Location Found';
            
            setTimeout(() => {
                locationBtn.innerHTML = '<i class="fas fa-map-marker-alt"></i> <span data-translate="get_location">Get Location</span>';
                changeLanguage(currentLanguage);
            }, 2000);
        },
        function(error) {
            alert('Error getting location: ' + error.message);
            locationBtn.innerHTML = '<i class="fas fa-map-marker-alt"></i> <span data-translate="get_location">Get Location</span>';
            changeLanguage(currentLanguage);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
}

function saveFarmProfile(e) {
    e.preventDefault();
    
    if (!requireAuth()) return;
    
    farmProfile = {
        cropType: document.getElementById('cropType').value,
        farmArea: parseFloat(document.getElementById('farmArea').value) || 0,
        areaUnit: document.getElementById('areaUnit').value,
        soilType: document.getElementById('soilType').value,
        plantingDate: document.getElementById('plantingDate').value,
        latitude: parseFloat(document.getElementById('latitude').value) || 0,
        longitude: parseFloat(document.getElementById('longitude').value) || 0
    };
    
    // Save to user profile
    userAuth.updateUser({ farmProfile: farmProfile });
    
    // Also save to localStorage for backward compatibility
    localStorage.setItem('krishiMitra_farmProfile', JSON.stringify(farmProfile));
    
    alert('Farm profile saved successfully!');
    
    // Auto-calculate yield after saving profile
    calculateYield();
}

function loadStoredData() {
    // If user is logged in, load their profile
    if (userAuth.isLoggedIn()) {
        const user = userAuth.getCurrentUser();
        if (user.farmProfile) {
            farmProfile = user.farmProfile;
            populateFarmForm();
            calculateYield();
            return;
        }
    }
    
    // Fallback to localStorage
    const storedProfile = localStorage.getItem('krishiMitra_farmProfile');
    if (storedProfile) {
        farmProfile = JSON.parse(storedProfile);
        populateFarmForm();
        calculateYield();
    }
}

function populateFarmForm() {
    if (!farmProfile) return;
    
    document.getElementById('cropType').value = farmProfile.cropType || 'rice';
    document.getElementById('farmArea').value = farmProfile.farmArea || '';
    document.getElementById('areaUnit').value = farmProfile.areaUnit || 'acres';
    document.getElementById('soilType').value = farmProfile.soilType || 'loamy';
    document.getElementById('plantingDate').value = farmProfile.plantingDate || '';
    document.getElementById('latitude').value = farmProfile.latitude || '';
    document.getElementById('longitude').value = farmProfile.longitude || '';
}

async function fetchWeatherData() {
    if (!requireAuth()) return;
    
    if (!farmProfile || !farmProfile.latitude || !farmProfile.longitude) {
        alert('Please save your farm profile with location first.');
        return;
    }
    
    const fetchBtn = document.getElementById('fetchDataBtn');
    fetchBtn.innerHTML = '<div class="loading"></div> Fetching Data...';
    fetchBtn.disabled = true;
    
    try {
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${farmProfile.latitude}&longitude=${farmProfile.longitude}&hourly=temperature_2m,relative_humidity_2m,precipitation,soil_moisture_0_to_7cm&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,et0_fao_evapotranspiration&forecast_days=7&timezone=auto`
        );
        
        if (!response.ok) throw new Error('Weather data fetch failed');
        
        weatherData = await response.json();
        updateWeatherDisplay();
        updateRecommendations();
        updateInsights();
        
        alert('Weather data updated successfully!');
    } catch (error) {
        console.error('Weather fetch error:', error);
        alert('Failed to fetch weather data. Please check your internet connection.');
    } finally {
        fetchBtn.innerHTML = '<span data-translate="fetch_data">Fetch Weather Data</span>';
        fetchBtn.disabled = false;
        changeLanguage(currentLanguage);
    }
}

function updateWeatherDisplay() {
    if (!weatherData) return;
    
    const current = weatherData.hourly;
    const today = 0;
    
    document.getElementById('currentTemp').textContent = 
        `${Math.round(current.temperature_2m[today] || 0)}°C`;
    document.getElementById('humidity').textContent = 
        `${Math.round(current.relative_humidity_2m[today] || 0)}%`;
    document.getElementById('soilMoisture').textContent = 
        `${Math.round((current.soil_moisture_0_to_7cm[today] || 0) * 100)}%`;
    
    updateWeatherChart();
}

function updateWeatherChart() {
    if (!weatherData) return;
    
    const ctx = document.getElementById('weatherChart');
    const daily = weatherData.daily;
    
    if (weatherChart) {
        weatherChart.destroy();
    }
    
    weatherChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: daily.time.slice(0, 7),
            datasets: [
                {
                    type: 'bar',
                    label: 'Precipitation (mm)',
                    data: daily.precipitation_sum.slice(0, 7),
                    backgroundColor: 'rgba(33, 150, 243, 0.6)',
                    borderColor: 'rgba(33, 150, 243, 1)',
                    borderWidth: 1,
                    yAxisID: 'y'
                },
                {
                    type: 'line',
                    label: 'ET0 (mm)',
                    data: daily.et0_fao_evapotranspiration.slice(0, 7),
                    borderColor: 'rgba(76, 175, 80, 1)',
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    tension: 0.4,
                    yAxisID: 'y'
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'mm/day'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true
                    }
                }
            }
        }
    });
}

function calculateYield() {
    if (!requireAuth()) return;
    
    if (!farmProfile) {
        alert('Please save your farm profile first.');
        return;
    }
    
    const crop = cropDatabase[farmProfile.cropType];
    if (!crop) return;
    
    let areaHa = farmProfile.farmArea;
    if (farmProfile.areaUnit === 'acres') {
        areaHa = farmProfile.farmArea * 0.404686;
    }
    
    const soilMultiplier = crop.soilMultiplier[farmProfile.soilType] || 1.0;
    const expectedYieldPerHa = crop.baseYield * soilMultiplier;
    const totalYield = expectedYieldPerHa * areaHa;
    
    const totalQuintals = totalYield * 10;
    const estimatedRevenue = totalQuintals * crop.marketPrice;
    const productivityGain = 12;
    
    document.getElementById('expectedYield').textContent = `${totalYield.toFixed(2)} tons`;
    document.getElementById('estimatedRevenue').textContent = `₹${estimatedRevenue.toLocaleString('en-IN')}`;
    document.getElementById('productivityGain').textContent = `+${productivityGain}%`;
    document.getElementById('productivity').textContent = `+${productivityGain}%`;
}

function updateRecommendations() {
    const recommendations = [
        {
            icon: 'fas fa-tint',
            title: 'Irrigation Alert',
            description: 'Based on soil moisture and weather forecast, consider irrigating your field in the next 2 days.'
        },
        {
            icon: 'fas fa-leaf',
            title: 'Fertilizer Application',
            description: 'NPK levels suggest applying balanced fertilizer for optimal crop growth this week.'
        },
        {
            icon: 'fas fa-bug',
            title: 'Pest Monitoring',
            description: 'Weather conditions favor pest activity. Regular field monitoring recommended.'
        }
    ];
    
    if (farmProfile && weatherData) {
        const avgTemp = weatherData.daily.temperature_2m_max.slice(0, 3).reduce((a, b) => a + b, 0) / 3;
        const totalRain = weatherData.daily.precipitation_sum.slice(0, 3).reduce((a, b) => a + b, 0);
        
        if (avgTemp > 35) {
            recommendations.push({
                icon: 'fas fa-thermometer-full',
                title: 'Heat Stress Alert',
                description: 'High temperatures expected. Ensure adequate irrigation and consider shade netting.'
            });
        }
        
        if (totalRain < 5) {
            recommendations.push({
                icon: 'fas fa-cloud-rain',
                title: 'Drought Conditions',
                description: 'Low rainfall forecast. Implement water conservation measures immediately.'
            });
        }
    }
    
    const container = document.getElementById('recommendationCards');
    container.innerHTML = recommendations.map(rec => `
        <div class="recommendation-card">
            <div class="icon">
                <i class="${rec.icon}"></i>
            </div>
            <h3>${rec.title}</h3>
            <p>${rec.description}</p>
        </div>
    `).join('');
}

function updateInsights() {
    if (!farmProfile || !weatherData) return;
    
    const irrigationPlan = calculateIrrigationPlan();
    document.getElementById('irrigationPlan').innerHTML = irrigationPlan;
    
    const fertilizerPlan = calculateFertilizerPlan();
    document.getElementById('fertilizerPlan').innerHTML = fertilizerPlan;
    
    const pestAlerts = generatePestAlerts();
    document.getElementById('pestAlerts').innerHTML = pestAlerts;
    
    const marketTrends = generateMarketTrends();
    document.getElementById('marketTrends').innerHTML = marketTrends;
}

function calculateIrrigationPlan() {
    const daily = weatherData.daily;
    let plan = '<div class="irrigation-schedule">';
    
    for (let i = 0; i < Math.min(7, daily.time.length); i++) {
        const date = daily.time[i];
        const et0 = daily.et0_fao_evapotranspiration[i] || 0;
        const rain = daily.precipitation_sum[i] || 0;
        const need = Math.max(0, et0 - rain);
        
        const status = need > 5 ? 'high' : need > 2 ? 'medium' : 'low';
        const statusColor = status === 'high' ? '#f44336' : status === 'medium' ? '#ff9800' : '#4caf50';
        
        plan += `
            <div class="irrigation-day">
                <div class="date">${new Date(date).toLocaleDateString()}</div>
                <div class="need" style="color: ${statusColor}">
                    ${need.toFixed(1)} mm needed
                </div>
            </div>
        `;
    }
    
    plan += '</div>';
    return plan;
}

function calculateFertilizerPlan() {
    if (!farmProfile) return '<p>Please save your farm profile first.</p>';
    
    const crop = cropDatabase[farmProfile.cropType];
    if (!crop) return '<p>Crop data not available.</p>';
    
    const npk = crop.fertilizerNPK;
    let areaHa = farmProfile.farmArea;
    if (farmProfile.areaUnit === 'acres') {
        areaHa = farmProfile.farmArea * 0.404686;
    }
    
    return `
        <div class="fertilizer-plan">
            <div class="nutrient">
                <span class="nutrient-name">Nitrogen (N):</span>
                <strong>${Math.round(npk.N * areaHa)} kg</strong>
            </div>
            <div class="nutrient">
                <span class="nutrient-name">Phosphorus (P):</span>
                <strong>${Math.round(npk.P * areaHa)} kg</strong>
            </div>
            <div class="nutrient">
                <span class="nutrient-name">Potassium (K):</span>
                <strong>${Math.round(npk.K * areaHa)} kg</strong>
            </div>
            <div class="application-note">
                <small>Apply in 3 split doses: Basal (50%), 30 days (25%), 60 days (25%)</small>
            </div>
        </div>
    `;
}

function generatePestAlerts() {
    if (!weatherData) return '<p>Weather data not available.</p>';
    
    const humidity = weatherData.hourly.relative_humidity_2m[0] || 0;
    const temp = weatherData.hourly.temperature_2m[0] || 0;
    
    let alerts = '<div class="pest-alerts">';
    
    if (humidity > 80 && temp > 25) {
        alerts += '<div class="alert high">High risk of fungal diseases due to high humidity and temperature.</div>';
    } else if (temp > 35) {
        alerts += '<div class="alert medium">Moderate risk of pest activity due to high temperature.</div>';
    } else {
        alerts += '<div class="alert low">Low pest risk. Continue regular monitoring.</div>';
    }
    
    alerts += '</div>';
    return alerts;
}

function generateMarketTrends() {
    if (!farmProfile) return '<p>Please save your farm profile first.</p>';
    
    const cropName = farmProfile.cropType.charAt(0).toUpperCase() + farmProfile.cropType.slice(1);
    const marketItem = marketData.find(item => item.crop.toLowerCase() === cropName.toLowerCase());
    
    if (!marketItem) return '<p>Market data not available for this crop.</p>';
    
    return `
        <div class="market-trend">
            <div class="crop-price">
                <span class="crop-name">${marketItem.crop}</span>
                <span class="price">₹${marketItem.price}/quintal</span>
            </div>
            <div class="price-change ${marketItem.changeType}">
                ${marketItem.change}
            </div>
            <div class="market-info">
                <small>Last updated: ${marketItem.updated} | Market: ${marketItem.market}</small>
            </div>
        </div>
    `;
}

function updateDashboardStats() {
    const temp = Math.floor(Math.random() * 10) + 25;
    const humidity = Math.floor(Math.random() * 30) + 50;
    const soilMoisture = Math.floor(Math.random() * 20) + 40;
    
    if (!weatherData) {
        document.getElementById('currentTemp').textContent = `${temp}°C`;
        document.getElementById('humidity').textContent = `${humidity}%`;
        document.getElementById('soilMoisture').textContent = `${soilMoisture}%`;
    }
    
    updateRecommendations();
}

function updateMarketDisplay(filteredData = marketData) {
    const tableBody = document.getElementById('marketTableBody');
    tableBody.innerHTML = '';
    
    filteredData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${item.crop}</strong></td>
            <td>₹${item.price}/quintal</td>
            <td><span class="price-change ${item.changeType}">${item.change}</span></td>
            <td>${item.market}</td>
            <td>${item.updated}</td>
        `;
        tableBody.appendChild(row);
    });
}

function filterMarketData() {
    const searchTerm = document.getElementById('searchCrop').value.toLowerCase();
    const selectedLocation = document.getElementById('marketLocation').value;
    
    let filteredData = marketData.filter(item => {
        const matchesSearch = item.crop.toLowerCase().includes(searchTerm);
        const matchesLocation = selectedLocation === 'all' || 
                               item.market.toLowerCase() === selectedLocation.toLowerCase();
        return matchesSearch && matchesLocation;
    });
    
    updateMarketDisplay(filteredData);
}

// Auto-refresh data every 5 minutes
setInterval(() => {
    updateDashboardStats();
}, 300000);

// Initialize market display on load
setTimeout(() => {
    updateMarketDisplay();
}, 1000);
