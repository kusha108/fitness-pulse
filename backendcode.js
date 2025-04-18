const express = require('express');
const cors = require("cors")
const bodyParser = require('body-parser');
const app = express();

app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Sample exercise plans in JSON format
const exercisePlans = {
    weightLoss: {
        home: {
            description: "Home-based plan for weight loss.",
              image: "https://th.bing.com/th/id/OIP.oY9SD_y3w--EHbi9RVGXswHaKe?rs=1&pid=ImgDetMain"
              //https://i.pinimg.com/originals/3d/c0/e8/3dc0e8497651c29af3fb11a5ce8346c7.jpg"
            
        },
        gym: {
            description: "Gym-based plan for weight loss.",
            image: "https://i.pinimg.com/originals/3d/c0/e8/3dc0e8497651c29af3fb11a5ce8346c7.jpg"
        }
    },
    weightGain: {
        home: {
            description: "Home-based plan for weight gain.",
            image: "https://www.fitnesshealthforever.com/wp-content/uploads/2019/11/SkinnyGuys.jpg"
        },
        gym: {
            description: "Gym-based plan for weight gain.",
            image: "https://i.pinimg.com/originals/60/01/61/600161026e4f3665955a62a2a4f9b897.jpg"
        }
    }
};

// API endpoint to get the exercise plan
app.post('/getExercisePlan', (req, res) => {
    const { gender, age, height, weight, exerciseMode, goal } = req.body;

    // Basic validation
    if (!gender || !age || !height || !weight || !exerciseMode || !goal) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Select the exercise plan based on the goal and exercise mode
    // const plan = exercisePlans[goal] && exercisePlans[goal][exerciseMode];
    const plan = exercisePlans[goal][exerciseMode];
    console.log(plan);
    
    if (plan) {
        res.json({
            planDescription: plan.description,
            planImage: plan.image
        });
    } else {
        res.status(404).json({ error: 'Plan not found' });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
