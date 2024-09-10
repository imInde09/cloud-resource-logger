import fs from 'fs';
import path from 'path';
import readline from 'readline';

const configPath = path.resolve('config.json');

// Function to prompt for AWS credentials and region
const promptForCredentials = () => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        rl.question('Enter AWS Access Key ID: ', (accessKeyId) => {
            rl.question('Enter AWS Secret Access Key: ', (secretAccessKey) => {
                rl.question('Enter AWS Region: ', (region) => {
                    rl.close();
                    resolve({ accessKeyId, secretAccessKey, region });
                });
            });
        });
    });
};

// Start environment and save credentials to config.json
const startEnvironment = async () => {
    try {
        const credentials = await promptForCredentials();

        // Save credentials to config.json
        fs.writeFileSync(configPath, JSON.stringify(credentials, null, 2));
        console.log('Environment started and AWS credentials saved.');
    } catch (error) {
        console.error('Failed to start environment:', error);
    }
};

// Stop environment and delete config.json
const stopEnvironment = () => {
    try {
        if (fs.existsSync(configPath)) {
            fs.unlinkSync(configPath);
            console.log('Environment stopped and AWS credentials removed.');
        } else {
            console.log('No environment is currently active.');
        }
    } catch (error) {
        console.error('Failed to stop environment:', error);
    } finally {
        // Ensure the process exits cleanly
        process.exit(0);
    }
};

export { startEnvironment, stopEnvironment };
