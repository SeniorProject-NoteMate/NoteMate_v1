const router = require("express").Router();
const verify = require("./verifyToken");

router.get("/", verify, (req, res) => {
    res.json({
        posts: {
            course_name: "English",
            title: "What is today"
        }
    });
});

module.exports = router;