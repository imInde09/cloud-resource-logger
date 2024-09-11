// src/iam.js
import {
    IAMClient,
    ListUsersCommand,
    ListAttachedUserPoliciesCommand,
    ListGroupsForUserCommand,
    ListAttachedGroupPoliciesCommand,
    GetPolicyCommand,
    GetPolicyVersionCommand
} from '@aws-sdk/client-iam';

export const listIAMUsers = async (accessKeyId, secretAccessKey, region) => {
    const iamClient = new IAMClient({
        region,
        credentials: {
            accessKeyId,
            secretAccessKey,
        },
    });

    try {
        // List IAM Users
        const usersCommand = new ListUsersCommand({});
        const usersResponse = await iamClient.send(usersCommand);
        const users = usersResponse.Users.map(user => ({
            UserName: user.UserName,
            UserId: user.UserId,
        }));

        console.log('IAM Users and Attached Policies:');

        // List Policies attached to each user
        for (const user of users) {
            console.log(`\nUser: ${user.UserName}`);
            
            // Directly Attached Policies
            const attachedPoliciesCommand = new ListAttachedUserPoliciesCommand({ UserName: user.UserName });
            const attachedPoliciesResponse = await iamClient.send(attachedPoliciesCommand);
            const attachedPolicies = attachedPoliciesResponse.AttachedPolicies.map(policy => policy.PolicyName);

            if (attachedPolicies.length > 0) {
                console.log(`  Directly Attached Policies: ${attachedPolicies.join(', ')}`);
            } else {
                console.log('  No directly attached policies.');
            }

            // Policies via Groups
            const groupsCommand = new ListGroupsForUserCommand({ UserName: user.UserName });
            const groupsResponse = await iamClient.send(groupsCommand);
            const groups = groupsResponse.Groups.map(group => group.GroupName);

            if (groups.length > 0) {
                console.log(`  Groups: ${groups.join(', ')}`);

                // List policies attached to each group the user belongs to
                for (const group of groups) {
                    const groupPoliciesCommand = new ListAttachedGroupPoliciesCommand({ GroupName: group });
                    const groupPoliciesResponse = await iamClient.send(groupPoliciesCommand);
                    const groupPolicies = groupPoliciesResponse.AttachedPolicies.map(policy => policy.PolicyName);

                    if (groupPolicies.length > 0) {
                        console.log(`    Policies via Group "${group}": ${groupPolicies.join(', ')}`);
                    } else {
                        console.log(`    No policies attached to group "${group}".`);
                    }
                }
            } else {
                console.log('  User does not belong to any groups.');
            }
        }
    } catch (error) {
        console.error('Error fetching IAM users and policies:', error);
    }
};
