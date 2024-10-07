// Importing modules using ES module syntax
import fs from 'fs';
import fetch from 'node-fetch';
import path from 'path';

// Constants for your npm package and date range
const packageName = 'cloud-resource-logger';
const fromDate = '2024-08-27';
const toDate = new Date().toISOString().split('T')[0]; // Today's date

// Fetching download counts from npm-stat API
const url = `https://npm-stat.com/api/download-counts?package=${packageName}&from=${fromDate}&until=${toDate}`;

async function updateBadges() {
    try {
        const response = await fetch(url);
        const data = await response.json();

        // Extract download statistics
        const totalDownloads = Object.values(data[packageName]).reduce((a, b) => a + b, 0);
        const downloadsThisWeek = data[packageName][toDate] || 0;
        const lastMonthDates = Array.from({ length: 30 }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - i);
            return date.toISOString().split('T')[0];
        });
        const downloadsLastMonth = lastMonthDates.reduce((sum, date) => sum + (data[packageName][date] || 0), 0);

        // Create badge markdown
        const badgesMarkdown = `## Download Statistics

![Total Downloads](https://img.shields.io/badge/total_downloads-${totalDownloads}-blue)
![Downloads This Week](https://img.shields.io/badge/this_week-${downloadsThisWeek}-green)
![Downloads Last Month](https://img.shields.io/badge/last_month-${downloadsLastMonth}-yellow)
`;

        // Define the path to README.md
        const readmePath = path.resolve('./README.md');
        const readmeContent = fs.readFileSync(readmePath, 'utf-8');

        // Replace the existing badges section
        const updatedReadmeContent = readmeContent.replace(/## Download Statistics.*?\n\n/s, badgesMarkdown);

        // Write the updated content back to README.md
        fs.writeFileSync(readmePath, updatedReadmeContent);
        console.log('Badges updated successfully!');
    } catch (error) {
        console.error('Error updating badges:', error);
    }
}

// Run the function to update badges
updateBadges();
