const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, VolunteeringOpportunity, VolunteerExperience } = require('./models');
const PORT = process.env.PORT || 5678;
const app = express();
const path = require('path');

// Static hosting for built files
app.use("/", express.static("./build/"));

app.use(bodyParser.json());

const jwtSecret = 'sssshhhhhhttt1987';

app.get('/api/opportunities', async (req, res) => {
    let opportunity = {};
    let lat = parseFloat(req.query.lat);
    let lng = parseFloat(req.query.lng);
    let zipcode = req.query.zipcode
    if (req.query.zipcode) {
        opportunity = {
            where: {
                address: {
                    $like: `%${zipcode}%`
                }
            }
        }
    }
    if (req.query.lng && req.query.lat) {
        opportunity = {
            where: {
                $and: [
                    { latitude: { $between: [(lat - 0.02), (lat + 0.02)] } },
                    { longitude: { $between: [(lng - 0.01), (lng + 0.01)] } }
                ]
            }
        }
    }

    const opportunities = await VolunteeringOpportunity.findAll(opportunity);
    res.json(opportunities);
});

app.get('/api/opportunities/:id', async (req, res) => {
    const id = req.params.id;

    const volunteeringOppportunity = await VolunteeringOpportunity.findOne({
        where: { id: id }
    });
    res.json(volunteeringOppportunity);
});

app.post('/api/volunteer/opportunities', async (req, res) => {
    const { opportunityId } = req.body;

    const token = req.headers['jwt-token'];
    let tokenData;
    try {
        tokenData = jwt.verify(token, jwtSecret);
    } catch (e) {
        console.log(e);
    }

    const user = await User.findOne({
        where: {
            id: tokenData.userId
        }
    });

    const volunteeringOportunity = await VolunteeringOpportunity.findOne({
        where: {
            id: opportunityId
        }
    });

    user.addVolunteeringOpportunity(volunteeringOportunity);
    res.sendStatus(201);

})

app.post('/api/register', async (req, res) => {
    const { fullName, dob, address, username, email, password, profilePicture } = req.body;

    const existingUser = await User.findOne({
        where: {
            username: username
        }
    });

    if (existingUser) {
        res.status(409).json({ message: 'This username already exists' });
        return;
    }
    if (fullName && address && username && email && password) {
        const passwordDigest = await bcrypt.hash(password, 12);
        const newUser = await User.create({
            fullName: fullName,
            address: address,
            dob: dob,
            username: username,
            email: email,
            passwordDigest: passwordDigest,
            profilePicture: profilePicture
        });
        const token = jwt.sign({ userId: newUser.id }, jwtSecret);
        res.json({ token: token });
    }
});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({
            message: "Login requires a username and a password."
        });
        return;
    }
    const user = await User.findOne({
        where: {
            username: username
        }
    });

    if (!user) {
        res.status(401).json({ message: 'Username or password invalid' });
        return;
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.passwordDigest)

    if (isPasswordCorrect) {
        const token = jwt.sign({ userId: user.id }, jwtSecret);
        res.json({ token: token });
    } else {
        res.status(401).json({ message: 'Username or password invalid' });
    }
});

app.get('/api/volunteers', async (req, res) => {
    const users = await User.findAll({});
    res.json(users);
});

app.get('/api/volunteer', async (req, res) => {
    const token = req.headers['jwt-token'];
    let tokenData;
    try {
        tokenData = jwt.verify(token, jwtSecret);
    } catch (e) {
        console.log(e);
    }
    const user = await User.findOne({
        where: {
            id: tokenData.userId
        }
    });
    res.json(user);
});

app.put('/api/volunteer', async (req, res) => {
    const { fullName, dob, address, email, password, profilePicture } = req.body;
    const token = req.headers['jwt-token'];
    let tokenData;
    try {
        tokenData = jwt.verify(token, jwtSecret);
    } catch (e) {
        console.log(e);
    }
    const user = await User.findOne({
        where: {
            id: tokenData.userId
        }
    });
    if (fullName) {
        user.fullName = fullName;
        await user.save();
    }
    if (dob) {
        user.dob = dob;
        await user.save();
    }
    if (address) {
        user.address = address;
        await user.save();
    }
    if (email) {
        user.email = email;
        await user.save();
    }
    if (password) {
        user.password = password;
        await user.save();
    }
    if (profilePicture) {
        user.profilePicture = profilePicture;
        await user.save();
    }
    res.sendStatus(201);
});

app.delete('/api/volunteer', async (req, res) => {
    const token = req.headers['jwt-token'];
    let tokenData;
    try {
        tokenData = jwt.verify(token, jwtSecret);
    } catch (e) {
        console.log(e);
    }
    await User.destroy({
        where: {
            id: tokenData.userId
        }
    });
    res.sendStatus(200);
});

app.get('/api/experiences/:id', async (req, res) => {
    const id = req.params.id;
    const pastExperiences = await VolunteerExperience.findAll({
        where: {

            $and: [
                { volunteeringOpportunityId: id },
                { rating: { $not: null } }
            ]
        }
    });
    res.json(pastExperiences);
});

app.get('/api/experiences/:id/volunteer', async (req, res) => {
    const id = req.params.id;
    const { rating, comment } = req.query;
    const experiences = await VolunteerExperience.findAll({
        where: {

            $and: [
                { volunteeringOpportunityId: id },
                { rating: rating },
                { comment: comment }
            ]
        }
    });

    const experiencesVolunteerIds = experiences.map(experience => {
        return (
            experience.userId
        )
    })

    const experiencesUserDetails = await User.findOne({
        where: {
            id: experiencesVolunteerIds
        }
    })

    res.json(experiencesUserDetails.username);
})

app.get('/api/volunteer/experiences/coming', async (req, res) => {
    const token = req.headers['jwt-token'];
    let tokenData;
    try {
        tokenData = jwt.verify(token, jwtSecret);
    } catch (e) {
        console.log(e);
    }
    const userComingExperiences = await VolunteerExperience.findAll({
        where: {
            $and: [
                { userId: tokenData.userId },
                { rating: null }
            ]
        }
    });

    const userComingExperiencesIds = userComingExperiences.map(userComingExperience => {
        return (
            userComingExperience.volunteeringOpportunityId
        )
    });

    const userComingExperiencesDetails = await VolunteeringOpportunity.findAll({
        where: {
            id: userComingExperiencesIds
        }
    })

    res.json(userComingExperiencesDetails);
});

app.get('/api/volunteer/experiences/past', async (req, res) => {
    const token = req.headers['jwt-token'];
    let tokenData;
    try {
        tokenData = jwt.verify(token, jwtSecret);
    } catch (e) {
        console.log(e);
    }

    const userPastExperiences = await VolunteerExperience.findAll({
        where: {
            $and: [
                { userId: tokenData.userId },
                { rating: { $not: null } }
            ]
        }
    });

    const userPastExperiencesIds = userPastExperiences.map(userPastExperience => {
        return (
            userPastExperience.volunteeringOpportunityId
        )
    });

    const userPastExperiencesDetails = await VolunteeringOpportunity.findAll({
        where: {
            id: userPastExperiencesIds
        }
    });

    res.json(userPastExperiencesDetails);
});

app.post('/api/volunteer/experiences', async (req, res) => {
    const { experienceId, rating, comment } = req.body;
    const token = req.headers['jwt-token'];

    if (!rating || rating > 5) {
        res.status(401).json({ message: 'Please rate your experience out of 5' });
        return;
    }

    let tokenData;
    try {
        tokenData = jwt.verify(token, jwtSecret);
    } catch (e) {
        console.log(e);
    }
    const user = await User.findOne({
        where: {
            id: tokenData.userId
        }
    });

    const volunteerExperience = await VolunteerExperience.findOne({
        where: {
            $and: [
                { userId: user.id },
                { volunteeringOpportunityId: experienceId }
            ]
        }
    });
    if (comment) {
        volunteerExperience.comment = comment;
        await volunteerExperience.save();
    }

    volunteerExperience.rating = rating;
    await volunteerExperience.save();
    user.score += 10;
    await user.save();

    res.sendStatus(201);
});

app.post('/api/volunteer/experiences/comment', async (req, res) => {
    const { experienceId, comment } = req.body;
    const token = req.headers['jwt-token'];

    let tokenData;
    try {
        tokenData = jwt.verify(token, jwtSecret);
    } catch (e) {
        console.log(e);
    }

    const volunteerExperience = await VolunteerExperience.findOne({
        where: {
            $and: [
                { userId: tokenData.userId },
                { volunteeringOpportunityId: experienceId }
            ]
        }
    });
    volunteerExperience.comment = comment;
    await volunteerExperience.save();

    res.sendStatus(201);
});

app.get('/api/volunteer/experiences/:id', async (req, res) => {
    const id = req.params.id;
    const token = req.headers['jwt-token'];
    let tokenData;
    try {
        tokenData = jwt.verify(token, jwtSecret);
    } catch (e) {
        console.log(e);
    }
    const user = await User.findOne({
        where: {
            id: tokenData.userId
        }
    });

    const pastExperience = await VolunteerExperience.findOne({
        where: {
            $and: [
                { userId: user.id },
                { volunteeringOpportunityId: id }
            ]
        }
    });
    res.json(pastExperience);
});

app.get('/api/volunteer/opportunities/:id', async (req, res) => {
    const id = req.params.id;
    const token = req.headers['jwt-token'];
    let tokenData;
    try {
        tokenData = jwt.verify(token, jwtSecret);
    } catch (e) {
        console.log(e);
    }
    const user = await User.findOne({
        where: {
            id: tokenData.userId
        }
    });

    const volunteerOpportunity = await VolunteeringOpportunity.findOne({
        where: {
            id: id
        },
        include: [
            {
                model: User,
                where: {
                    id: user.id
                },
                attributes: []
            }
        ]
    });
    res.json(volunteerOpportunity);
});

app.delete('/api/volunteer/experiences', async (req, res) => {
    const { experienceId } = req.body;
    const token = req.headers['jwt-token'];
    let tokenData;
    try {
        tokenData = jwt.verify(token, jwtSecret);
    } catch (e) {
        console.log(e);
    }
    await VolunteerExperience.destroy({
        where: {
            $and: [
                { userId: tokenData.userId },
                { volunteeringOpportunityId: experienceId }
            ]
        }
    });
    res.sendStatus(200);
});

// In production, any request that doesn't match a previous route
// should send the front-end application, which will handle the route.
if (process.env.NODE_ENV == "production") {
    app.get("/*", function (request, response) {
        response.sendFile(path.join(__dirname, "build", "index.html"));
    });
}

app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`);
});