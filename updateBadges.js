// const fetch = require('node-fetch');
const fs = require('fs');

const packageName = 'cloud-resource-logger';
const url = `https://npm-stat.com/api/download-counts?package=${packageName}&from=2024-07-01&until=${new Date().toISOString().split('T')[0]}`;

async function fetchDownloadCounts() {
    try {
        const response = await fetch(url);
        const data = await response.json();

        const totalDownloads = Object.values(data[packageName]).reduce((a, b) => a + b, 0);
        const downloadsThisWeek = data[packageName][new Date().toISOString().split('T')[0]] || 0;
        const downloadsLastMonth = Object.entries(data[packageName])
            .slice(-30)
            .reduce((sum, [_, count]) => sum + count, 0);

        // Prepare badges content
        const badgesContent = `
## Download Statistics

![Total Downloads](https://img.shields.io/badge/total_downloads-${totalDownloads}-blue)
![Downloads This Week](https://img.shields.io/badge/this_week-${downloadsThisWeek}-green)
![Downloads Last Month](https://img.shields.io/badge/last_month-${downloadsLastMonth}-yellow)
        `;

        // Write to README.md
        fs.writeFileSync('README.md', badgesContent, 'utf8');
        console.log('Badges updated in README.md');
    } catch (error) {
        console.error('Error fetching download counts:', error);
    }
}

fetchDownloadCounts();
