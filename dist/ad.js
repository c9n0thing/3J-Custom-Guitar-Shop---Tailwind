document.addEventListener("DOMContentLoaded", () => {
    generateRegions();
    addRegionChangeListener();
});

async function generateRegions() {
    try {
        const url = 'https://psgc.gitlab.io/api/regions/';

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const results = await response.json();

        const selector = document.getElementById('region');
        let append = '';

        for (let x in results) {
            let row = results[x];
            let cell = `<option value="${row.code}">${row.name}</option>`;
            append = append + cell;
        }

        selector.innerHTML = append;
    } catch (error) {
        console.error(`Fetch error: ${error.message}`);
    }
}

function addRegionChangeListener() {
    const regionSelector = document.getElementById('region');
    const provinceSelector = document.getElementById('province');
    const citySelector = document.getElementById('city');
    const barangaySelector = document.getElementById('barangay');

    regionSelector.addEventListener('change', async () => {
        const selectedRegionCode = regionSelector.value;
        await generateProvinces(selectedRegionCode, provinceSelector);
        provinceSelector.innerHTML = '<option value="">Select Province</option>';
        citySelector.innerHTML = '<option value="">Select City/Municipality</option>';
        barangaySelector.innerHTML = '<option value="">Select Barangay</option>';
    });

    provinceSelector.addEventListener('change', async () => {
        const selectedProvinceCode = provinceSelector.value;
        await generateCities(selectedProvinceCode, citySelector);
        citySelector.innerHTML = '<option value="">Select City/Municipality</option>';
        barangaySelector.innerHTML = '<option value="">Select Barangay</option>';
    });

    citySelector.addEventListener('change', async () => {
        const selectedCityName = citySelector.value;
        await generateBarangays(selectedCityName, barangaySelector);
        barangaySelector.innerHTML = '<option value="">Select Barangay</option>';
    });
}

async function generateProvinces(regionCode, provinceSelector) {
    try {
        const url = `https://psgc.gitlab.io/api/regions/${regionCode}/provinces/`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const results = await response.json();

        let append = '';

        for (let x in results) {
            let row = results[x];
            let cell = `<option value="${row.code}">${row.name}</option>`;
            append = append + cell;
        }

        provinceSelector.innerHTML = append;
    } catch (error) {
        console.error(`Fetch error: ${error.message}`);
    }
}

async function generateCities(provinceCode, citySelector) {
    try {
        const url = `https://psgc.gitlab.io/api/provinces/${provinceCode}/cities/`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const results = await response.json();

        let append = '';

        for (let x in results) {
            let row = results[x];
            let cell = `<option>${row.name}</option>`;
            append = append + cell;
        }

        citySelector.innerHTML = append;
    } catch (error) {
        console.error(`Fetch error: ${error.message}`);
    }
}

async function generateBarangays(cityName, barangaySelector) {
    try {
        const url = `https://psgc.gitlab.io/api/cities/${cityName}/barangays/`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const results = await response.json();

        let append = '';

        for (let x in results) {
            let row = results[x];
            let cell = `<option>${row.name}</option>`;
            append = append + cell;
        }

        barangaySelector.innerHTML = append;
    } catch (error) {
        console.error(`Fetch error: ${error.message}`);
    }
}
