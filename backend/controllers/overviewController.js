import asyncHandler from 'express-async-handler';
import dotenv from 'dotenv';
import humanizeDuration from 'humanize-duration';
dotenv.config();

// todo: Need a service discovery.
const services = {
    "User Service": process.env.USER_SERVICE,
    "Problem Service": process.env.PROBLEMS_SERVICE
}

const GetStatus = asyncHandler(async (req, res) => {
    let statuses = [];
    for (let service in services) {
        try {
            let startTime = Date.now();
            let response;
            try {
                response = await fetch(services[service] + '/status');
            } catch (err) {
                response = { ok: false };
            }
            let endTime = Date.now();
            const ping = humanizeDuration(endTime - startTime);
            if (!response.ok) {
                statuses.push({ name: service, online: false, uptime: 'offline', environment: 'null', ping: ping });
            } else {
                const data = await response.json();
                const uptime = humanizeDuration(Math.floor(data.uptime * 1000));
                statuses.push({ name: service, online: true, uptime: uptime, environment: data.environment, ping: ping });
            }
        } catch (err) {
            console.error(err);
            statuses.push({ name: service, online: false, uptime: 'offline', environment: 'null', ping: ping });
        }
    }
    res.status(200).send(statuses);
});

export default { GetStatus };