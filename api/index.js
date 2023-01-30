const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const convRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
const path = require("path");


dotenv.config();
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'", 'google.com', 'youtube.com'],
                styleSrc: ["'self'", 'google.com', 'youtube.com', "'unsafe-inline'"],
                scriptSrc: ["'self'", 'google.com', 'youtube.com', "'unsafe-inline'"],
                imgSrc: ["'self'", 'google.com', 'youtube.com', 'data:', 'blob:'],
                connectSrc: ["'self'", 'google.com', 'youtube.com', 'ws:', 'wss:'],
                frameSrc: ["'self'", 'google.com', 'youtube.com'],
                frameAncestors: ["'self'", 'google.com', 'youtube.com'],
                mediaSrc: ["'self'", 'google.com', 'youtube.com', 'data:', 'blob:'],
            },
        },
        frameguard: { action: 'SAMEORIGIN' },
    })
);
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
mongoose.connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log("Connected to MongoDB");
    }
);
app.use("/images", express.static(path.join(__dirname, "public/images")));

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
        return res.status(200).json("File uploded successfully");
    } catch (error) {
        console.error(error);
    }
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversations", convRoute);
app.use("/api/messages", messageRoute);

app.listen(8800, () => {
    console.log("Backend server is running!");
});
